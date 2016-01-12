import m from 'mithril';


let view = ctrl => {
  let props = ctrl.props;
  return m('div#sign-in-wrapper', [
    m('h2', 'Sign In'),
    m('input#username',
      {
        name: 'username',
        placeholder: 'username',
        value: props.username(),
        onchange: m.withAttr('value', props.username)
      }
    ),
    m('p'),
    m('input#password',
      {
        name: 'password',
        type: 'password',
        placeholder: 'password',
        value: props.password(),
        onchange: m.withAttr('value', props.password)
      }
    ),
    m('div#failed-sign-in'),
    m('p'),
    m('a',
      {
        role: 'button',
        className: 'btn btn-primary',
        onclick: ctrl.signIn.bind(this, props.username(), props.password())
      },
      'yo'
    )
  ]);
};

export default view;
