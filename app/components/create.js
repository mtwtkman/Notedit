import m from 'mithril';
import { xhrConfig, TEXT_NOTES } from '../api';
import autosize from 'autosize';


let autoResize = (element, isInitialized, context) => {
  if (isInitialized) return;
  autosize(element);
};

let autoSave = () => {
  console.log('hoge');
};

let onPublish = props => {
};

let createNote = () => {
  return m.request({method: 'POST', url: TEXT_NOTES, config: xhrConfig}).then(response => {
    return {
      id: m.prop(response.data.id),
      name: m.prop(''),
      body: m.prop('')
    };
  });
};

let controller = (name=null, body=null, id=null) => {
  m.redraw.strategy('diff');
  let props;
  if (!id) {
    props = createNote();
  } else {
    props = m.prop({
      id: m.prop(id),
      name: m.prop(name),
      body: m.prop(body)
    });
  }
  return { props };
};

let view = ctrl => {
  let props = ctrl.props();
  return m('div#edit-wrapper', [
    m('div#edit-button', [
      m('a', {
        type: 'button',
        id: 'publish-button',
        className: 'btn btn-primary',
        onclick: onPublish.bind(this, props)
      }, 'publish'),
    ]),
    m(`div#${props.id ? props.id() : 'new-note'}`, [
      m('h3#edit-name',
        m('input', {
          placeholder: 'Title',
          onchange: m.withAttr('value', props.name),
          value: props.name()
        })
      ),
      m('div#edit-body',
        m('textarea', {
          rows: 1,
          config: autoResize,
          placeholder: 'Body',
          onchange: m.withAttr('value', props.body),
          value: props.body()
        })
      )
    ])
  ]);
};

export default { controller, view };
