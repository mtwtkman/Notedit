import m from 'mithril';
import { xhrConfig, TEXT_NOTES, DRAFT_SAVE } from '../api';
import autosize from 'autosize';
import { indexContentRegion } from '../regions';
import Published from './published';


let autoResize = (element, isInitialized, context) => {
  if (isInitialized) return;
  autosize(element);
};

let autoSave = props => {
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

let onPublish = (props, urlname) => {
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
    m.mount(indexContentRegion, m(Published, urlname));
  });
};

let createNote = () => {
  return m.request({method: 'POST', url: TEXT_NOTES, config: xhrConfig}).then(response => {
    return {
      id: m.prop(response.data.id),
      name: m.prop(''),
      body: m.prop(''),
      saved: m.prop(false)
    };
  });
};

let controller = (urlname, name=null, body=null, id=null) => {
  m.redraw.strategy('diff');
  let props;
  if (!id) {
    props = createNote();
  } else {
    props = m.prop({
      id: m.prop(id),
      name: m.prop(name),
      body: m.prop(body),
      saved: m.prop(false)
    });
  }
  return { props, urlname };
};

let view = ctrl => {
  let props = ctrl.props();
  return m('div#edit-wrapper', [
    m('div#edit-status', [
      m('div#save-message', `${props.saved() ? 'saved draft.' : ''}`),
      m('div#edit-button', [
        m('a', {
          type: 'button',
          id: 'publish-button',
          className: 'btn btn-primary',
          onclick: onPublish.bind(this, props, ctrl.urlname)
        }, 'publish'),
      ]),
    ]),
    m(`div#${props.id ? props.id() : 'new-note'}`, [
      m('h3#edit-name',
        m('input', {
          placeholder: 'Title',
          onchange: m.withAttr('value', props.name),
          value: props.name(),
          onfocusout: autoSave.bind(this, props)
        })
      ),
      m('div#edit-body',
        m('textarea', {
          rows: 10,
          config: autoResize,
          placeholder: 'Body',
          onchange: m.withAttr('value', props.body),
          value: props.body(),
          onfocusout: autoSave.bind(this, props)
        })
      )
    ])
  ]);
};

export default { controller, view };
