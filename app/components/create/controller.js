import m from 'mithril';
import autosize from 'autosize';
import marked from 'marked';
import { xhrConfig, TEXT_NOTES, DRAFT_SAVE } from '../../api';
import { indexContentRegion } from '../../regions';
import CreateModel from './model';
import Notes from '../notes/component';
import { toggleTab } from '../../utils';


let controller = (name='', body='', id=null) => {
  let autoResize = (element, isInitialized) => {
    if (isInitialized) {
      return;
    }
    autosize(element);
  };

  let alertNoTitle = (props, element, isInitialized) => {
    if (props.name() || !isInitialized) {
      return;
    }
    let child = element.childNodes[0];
    child.setAttribute('class', 'show-alert-tx');
    setTimeout(() => {
      child.setAttribute('class', 'hidden-tx');
    }, 3000);
  }

  let toggleSaveMessage = (props, element, isInitialized) => {
    if (!props.saved() || !isInitialized) {
      return;
    }
    let child = element.childNodes[0];
    child.setAttribute('class', 'show-tx');
    setTimeout(() => {
      child.setAttribute('class', 'hidden-tx');
    }, 3000);
  }

  let autoSave = props => {
    if (!props.name()) {
      return;
    }
    let data = {
      name: props.name(),
      body: marked(props.body()),
      id: props.id(),
      status: 'draft'
    };
    m.request({method: 'POST', url: DRAFT_SAVE, data, config: xhrConfig}).then(response => {
      localStorage['drafts_modernized'] = false;
      props.saved(true);
    });
  };

  let onPublish = props => {
    if (!props.name()) {
      return;
    }
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
      localStorage['published_modernized'] = false;
      m.mount(indexContentRegion(), m(Notes, 'published'));
      toggleTab(['drafts', 'create'], 'published');
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
    onPublish,
    toggleSaveMessage,
    alertNoTitle
  };
};

export default controller;
