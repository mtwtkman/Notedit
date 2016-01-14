import m from 'mithril';
import { xhrConfig, TEXT_NOTES } from '../../api';


export default class CreateModel {
  constructor(id=null, name='', body='', saved=false) {
    this.id = m.prop(id);
    this.name = m.prop(name);
    this.body = m.prop(body);
    this.saved = m.prop(saved);
  }
  createNote() {
    return m.request({method: 'POST', url: TEXT_NOTES, config: xhrConfig}).then(response => {
      this.id(response.data.id);
    });
  }
};
