import m from 'mithril';
import _ from 'lodash';
import autosize from 'autosize';
import { xhrConfig, TEXT_NOTES, DRAFT_SAVE, POST_ACTIVITIES } from '../../api';
import { indexContentRegion } from '../../regions';
import CreateModel from './model';
import Notes from '../notes/component';
import { toggleTab } from '../../utils';


const L = 'abcdefghijklmnopqrstuvwxyz';
const U = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const N = '1234567890';


let controller = key => {
  let prettify = str => {
    return str.split('</p>').filter(e => {
      if (e) { return e; }
    }).map(e => {
      let s = e.replace(/<p[^>]+>/, '');
      if (s === '<br>') {
        s = '\n';
      }
      return s;
    }).join('\n');
  };

  let tagging = str => {
    return str.split('\n').map(e => {
      let name = _.map(_.range(5), () => {return _.sample(L + U + N)}).join('');
      if (!e) { e = '<br>'; }
      return `<p name="${name}">${e}</p>`;
    }).join('');
  };

  let autoResize = (element, isInitialized) => {
    if (isInitialized) {
      return;
    }
    autosize(element);
  };

  let togglePlaceholderStatus = (props, element, isInitialized) => {
    element.addEventListener('focus', () => {
      delete(element.dataset.placeholderactive);
    });
    element.addEventListener('blur', () => {
      if (!props.body()) {
        element.dataset.placeholderactive = true;
      }
    });
  };

  let editConfig = (props, element, isInitialized) => {
    autoResize(element, isInitialized);
    togglePlaceholderStatus(props, element, isInitialized);
  };

  let alertNoTitle = (props, element, isInitialized) => {
    if (!props.alert() || !isInitialized) {
      return;
    }
    let child = element.childNodes[0];
    child.setAttribute('class', 'show-alert-tx');
    setTimeout(() => {
      child.setAttribute('class', 'hidden-tx');
      props.alert(false);
    }, 3000);
  };

  let toggleSaveMessage = (props, element, isInitialized) => {
    if (!props.saved() || !isInitialized) {
      return;
    }
    let child = element.childNodes[0];
    child.setAttribute('class', 'show-tx');
    setTimeout(() => {
      child.setAttribute('class', 'hidden-tx');
    }, 3000);
  };

  let autoSave = props => {
    if (!props.name()) {
      props.alert(true);
      return;
    }
    let data = {
      name: props.name(),
      body: tagging(props.body()),
      status: props.mode()
    };
    m.request({method: 'POST', url: `${DRAFT_SAVE}?id=${props.id()}`, data, config: xhrConfig}).then(response => {
      localStorage['drafts_modernized'] = false;
      props.saved(true);
      // m.request({method: 'POST', url: POST_ACTIVITIES, config: xhrConfig, data: {
      //   url: '/api/v1/text_notes/draft_save',
      //   area: 'NoteDetail'
      // }}).then(response => {
      //   localStorage['drafts_modernized'] = false;
      //   props.saved(true);
      // });
    });
  };

  let onPublish = props => {
    if (!props.name()) {
      return;
    }
    let data = {
      free_body: tagging(props.body()),
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
      localStorage['drafts_modernized'] = false;
      m.mount(indexContentRegion(), m(Notes, 'published'));
      toggleTab(['drafts', 'create'], 'published');
    });
  };

  m.redraw.strategy('diff');

  let props = new CreateModel();
  props.createDraft(key);

  return {
    props,
    editConfig,
    autoSave,
    onPublish,
    toggleSaveMessage,
    alertNoTitle,
    prettify
  };
};

export default controller;
