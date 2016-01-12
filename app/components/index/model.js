import m from 'mithril';


export default class IndexModel {
  constructor(userIconSource=null) {
    this.userIconSource = m.prop(userIconSource);
  }
};
