import m from 'mithril';
import autosize from 'autosize';
import { xhrConfig, TEXT_NOTES, DRAFT_SAVE } from '../../api';
import { indexContentRegion } from '../../regions';
import CreateModel from './model';
import Notes from '../notes/component';


let controller = (name='', body='', id=null) => {
  let autoResize = (element, isInitialized, context) => {
    if (isInitialized) {
      return;
    }
    autosize(element);
  };

  let autoSave = props => {
    if (!props.name()) {
      return;
    }
    let data = {
      name: props.name(),
      body: props.body(),
      id: props.id(),
      status: 'draft'
    };
    m.request({method: 'POST', url: DRAFT_SAVE, data, config: xhrConfig}).then(response => {
      props.saved(true);
    });
  };

  let onPublish = props => {
    let data = {
      free_body: props.body(),
      hastags: [],
      limited: false,
      magazine_ids: [],
      name: props.name(),
      pay_body: '',
      price: 0,
      status: 'published'
    };
    return m.request({method: 'PUT', url: TEXT_NOTES + `/${props.id()}`, data, config: xhrConfig}).then(response => {
      m.mount(indexContentRegion(), m(Notes, 'published'));
    });
  };

  m.redraw.strategy('diff');

  let props = new CreateModel(id=id, name=name, body=body);
  if (!id) {
    id = props.createNote();
  }
  return {
    props,
    autoResize,
    autoSave,
    onPublish
  };
};

export default controller;
