import m from 'mithril';
import { xhrConfig, TEXT_NOTES, NOTES } from '../../api';


export default class CreateModel {
  constructor() {
    this.id = m.prop();
    this.name = m.prop('');
    this.body = m.prop('');
    this.mode = m.prop();
    this.saved = m.prop(false);
    this.alert = m.prop(false);
  }
  createDraft(key) {
    if (key) {
      this.editDraft(key);
    } else {
      this.createNote();
    }
  }
  createNote() {
    return m.request({method: 'POST', url: TEXT_NOTES, config: xhrConfig}).then(response => {
      this.id(response.data.id);
      this.mode('draft');
    });
  }
  editDraft(key) {
    return m.request({method: 'GET', url: `${NOTES}/${key}?draft=true`}).then(response => {
      this.id(response.data.id);
      this.name(response.data.name);
      this.body(response.data.body);
      this.mode('published');
    });
  }
};
