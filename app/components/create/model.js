import m from 'mithril';


export default class CreateModel {
  constructor(id=null, name='', body='', saved=false) {
    this.id = m.prop(id);
    this.name = m.prop(name);
    this.body = m.prop(body);
    this.saved = m.prop(saved);
  }
};
