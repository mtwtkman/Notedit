import m from 'mithril';


export default class SignInModel {
  constructor(username='', password='') {
    this.username = m.prop(username);
    this.password = m.prop(password);
  }
};
