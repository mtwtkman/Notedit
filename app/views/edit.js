import m from 'mithril';
import autosize from 'autosize';


let autoResize = (element, isInitialized, context) => {
  if (isInitialized) return;
  autosize(element);
}

let editView = props => {
  let nameValue = props.name ? `[value=${props.name}]` : '';
  let bodyValue = props.body ? `[value=${props.body}]` : '';
  return m('div#edit-wrapper', [
    m(`div#${props.id ? props.id : 'new-note'}`, [
      m('h3#edit-name', m(`input[placeholder=Title]${nameValue}`)),
      m('div#edit-body', m(`textarea[placeholder=Body]${bodyValue}`, {config: autoResize}))
    ])
  ]);
};

export default editView;
