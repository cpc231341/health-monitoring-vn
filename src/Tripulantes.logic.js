window.__dcDefine(function (DCLogic) {
class Component extends DCLogic {
  constructor(props) { super(props); this.state = {}; }
  pickUser(k) { return () => { try { localStorage.setItem('vn.user', k); } catch (e) { /* sem armazenamento: usa o primeiro tripulante */ } }; }
  renderVals() {
    const p = {};
    ['c0', 'c1', 'c2', 'c3', 'c4'].forEach((k) => { p[k] = this.pickUser(k); });
    return { pick: p };
  }
}
return Component;
});
