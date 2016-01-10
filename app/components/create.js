import m from 'mithril';
import { xhrConfig, TEXT_NOTES } from '../api';
import editView from '../views/edit';


let createNote = () => {
    return m.request({method: 'POST', url: TEXT_NOTES, config: xhrConfig}).then(response => {
      return response.data;
    });
};

let controller = (name=null, body=null, id=null) => {
  m.redraw.strategy('diff');
  let props;
  if (!id) {
    props = createNote();
  } else {
    props = m.prop({ name, body, id });
  }
  return { props };
};

let view = ctrl => {
  let props = ctrl.props();
  return editView(props);
};

export default { controller, view };
