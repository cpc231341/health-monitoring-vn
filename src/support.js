/*
 * Runtime mínimo das telas .dc.html do Vento Norte Health, sem dependências.
 * Cada tela traz o markup dentro de <template id="dc-tpl"><x-dc> e a lógica em <Tela>.logic.js, que chama __dcDefine(fn).
 * Suporta {{buracos}} com caminho pontilhado, <sc-if>, <sc-for>, eventos onClick="{{fn}}" e atualização
 * do DOM por comparação (mantém foco, rolagem e o elemento que está sendo arrastado).
 */
(function () {
  'use strict';
  var HOLE_G = /\{\{\s*([^{}]+?)\s*\}\}/g;
  var WHOLE = /^\s*\{\{\s*([^{}]+?)\s*\}\}\s*$/;
  var HAS_HOLE = /\{\{\s*[^{}]+?\s*\}\}/;
  var factory = null;

  window.__dcDefine = function (fn) { factory = fn; };

  function lookup(path, scope) {
    if (path === 'true') { return true; }
    if (path === 'false') { return false; }
    if (path === 'null') { return null; }
    if (/^-?\d+(\.\d+)?$/.test(path)) { return Number(path); }
    var parts = path.split('.');
    var v = scope[parts[0]];
    for (var i = 1; i < parts.length; i++) {
      if (v == null) { return undefined; }
      v = v[parts[i]];
    }
    return v;
  }

  function interp(str, scope) {
    return str.replace(HOLE_G, function (_, p) {
      var v = lookup(p, scope);
      return v == null ? '' : String(v);
    });
  }

  function renderChildren(src, dst, scope) {
    Array.prototype.forEach.call(src.childNodes, function (n) { renderNode(n, dst, scope); });
  }

  function renderNode(n, dst, scope) {
    if (n.nodeType === 3) { dst.appendChild(document.createTextNode(interp(n.nodeValue, scope))); return; }
    if (n.nodeType !== 1) { return; }
    var tag = n.tagName.toLowerCase();
    if (tag === 'helmet') { return; }
    if (tag === 'sc-if') {
      var raw = n.getAttribute('value') || '';
      var m = WHOLE.exec(raw);
      var val = m ? lookup(m[1], scope) : raw;
      if (val) { renderChildren(n, dst, scope); }
      return;
    }
    if (tag === 'sc-for') {
      var mm = WHOLE.exec(n.getAttribute('list') || '');
      var list = mm ? lookup(mm[1], scope) : [];
      var as = n.getAttribute('as');
      if (!Array.isArray(list)) { return; }
      list.forEach(function (item, i) {
        var s2 = Object.assign({}, scope);
        s2[as] = item; s2.$index = i;
        renderChildren(n, dst, s2);
      });
      return;
    }
    var el = n.namespaceURI ? document.createElementNS(n.namespaceURI, n.localName) : document.createElement(n.localName);
    var type = (n.getAttribute('type') || '').toLowerCase();
    var handlers = [];
    Array.prototype.slice.call(n.attributes).forEach(function (a) {
      var name = a.name, v = a.value;
      var whole = WHOLE.exec(v);
      if (/^on[a-z]+$/.test(name)) {
        el.removeAttribute(name);
        if (whole) {
          var fn = lookup(whole[1], scope);
          if (typeof fn === 'function') {
            var ev = name.slice(2);
            if (ev === 'change' && (tag === 'textarea' || (tag === 'input' && !/^(checkbox|radio|file|range)$/.test(type)))) { ev = 'input'; }
            el.addEventListener(ev, fn);
            handlers.push([ev, fn]);
          }
        }
        return;
      }
      if (whole) {
        var r = lookup(whole[1], scope);
        if (r === false || r == null) { el.removeAttribute(name); }
        else if (r === true) { el.setAttribute(name, ''); }
        else { el.setAttribute(name, String(r)); }
        if (name === 'checked') { el.checked = !!r; }
        if (name === 'value' && r != null && tag !== 'select') { el.value = String(r); }
        return;
      }
      el.setAttribute(name, HAS_HOLE.test(v) ? interp(v, scope) : v);
    });
    el.__dcH = handlers;
    dst.appendChild(el);
    renderChildren(n, el, scope);
    if (tag === 'select') {
      var w = WHOLE.exec(n.getAttribute('value') || '');
      if (w) { var sv = lookup(w[1], scope); if (sv != null) { el.value = String(sv); } }
    }
  }

  // ---- atualização por comparação ----
  function syncAttrs(a, b) {
    Array.prototype.slice.call(a.attributes).forEach(function (at) { if (!b.hasAttribute(at.name)) { a.removeAttribute(at.name); } });
    Array.prototype.forEach.call(b.attributes, function (at) { if (a.getAttribute(at.name) !== at.value) { a.setAttribute(at.name, at.value); } });
  }
  function syncHandlers(a, b) {
    (a.__dcH || []).forEach(function (h) { a.removeEventListener(h[0], h[1]); });
    (b.__dcH || []).forEach(function (h) { a.addEventListener(h[0], h[1]); });
    a.__dcH = b.__dcH || [];
  }
  function morph(a, b) {
    if (a.nodeType === 3) { if (a.nodeValue !== b.nodeValue) { a.nodeValue = b.nodeValue; } return; }
    syncAttrs(a, b);
    syncHandlers(a, b);
    var tag = a.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA') {
      if (a.value !== b.value) { a.value = b.value; }
      if (a.checked !== b.checked) { a.checked = b.checked; }
    }
    morphChildren(a, b);
    if (tag === 'SELECT' && a.value !== b.value) { a.value = b.value; }
  }
  function morphChildren(a, b) {
    var kids = Array.prototype.slice.call(b.childNodes);
    kids.forEach(function (nb, i) {
      var na = a.childNodes[i];
      if (!na) { a.appendChild(nb); }
      else if (na.nodeType === nb.nodeType && (na.nodeType === 3 || na.tagName === nb.tagName)) { morph(na, nb); }
      else { a.replaceChild(nb, na); }
    });
    while (a.childNodes.length > kids.length) { a.removeChild(a.lastChild); }
  }

  function mount() {
    var tpl = document.getElementById('dc-tpl');
    var xdc = tpl && tpl.content.querySelector('x-dc');
    if (!xdc || !factory) { return; }
    var helmet = xdc.querySelector('helmet');
    if (helmet) { Array.prototype.slice.call(helmet.children).forEach(function (c) { document.head.appendChild(document.importNode(c, true)); }); }
    var root = document.createElement('div');
    root.id = 'dc-root';
    tpl.parentNode.insertBefore(root, tpl);

    function DCLogic(props) { this.props = props || {}; this.state = {}; }
    DCLogic.prototype.setState = function (u) {
      var patch = typeof u === 'function' ? u(this.state) : u;
      this.state = Object.assign({}, this.state, patch);
      render();
    };
    DCLogic.prototype.forceUpdate = function () { render(); };

    var Component = factory(DCLogic);
    var inst = new Component({});
    var first = true;
    function render() {
      var vals = inst.renderVals();
      var tmp = document.createElement('div');
      renderChildren(xdc, tmp, Object.assign({}, vals));
      if (first) { first = false; while (tmp.firstChild) { root.appendChild(tmp.firstChild); } return; }
      morphChildren(root, tmp);
    }
    if (inst.componentDidMount) { inst.componentDidMount(); }
    render();
  }

  document.addEventListener('DOMContentLoaded', mount);
})();
