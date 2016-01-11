import m from 'mithril';


class IndexModel {
  constructor() {
    this.nickname = m.prop();
    this.urlname = m.prop();
    this.noteCount = m.prop();
    this.draftCount = m.prop();
    this.userIconSource = m.prop();
  }
};

export {
  IndexModel
};
