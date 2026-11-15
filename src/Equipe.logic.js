window.__dcDefine(function (DCLogic) {
class Component extends DCLogic {
  constructor(props) { super(props); this.state = { open: false, sel: false, went: false }; }
  renderVals() {
    const s = this.state;
    return {
      open: s.open ? 'true' : 'false', isOpen: s.open, has: s.sel, none: !s.sel,
      chevRot: s.open ? 'rotate(-90deg)' : 'rotate(90deg)',
      toggle: () => this.setState({ open: !this.state.open }),
      pick: () => this.setState({ sel: true, open: false, went: false }),
      onKey: (e) => { if (e.key === 'Escape' && this.state.open) { this.setState({ open: false }); } },
      go: () => this.setState({ went: true }),
      newTeam: () => this.setState({ open: false, msg2: true }),
      msg: s.msg2 ? 'Novo time: o cadastro do time fica para uma próxima tela.' : !s.sel ? 'Selecione um time para continuar.' : (s.went ? 'Time Zagaia confirmado. A próxima tela é a escolha do astronauta.' : '')
    };
  }
}
return Component;
});
