import m from 'mithril';
import { xhrConfig, SIGN_IN } from '../api';
import { mainRegion, failedSignIn } from '../regions';
import { cookie } from '../utils';
import Index from './index';


let onClick = (props, e) => {
  signIn(props.username(), props.password());
}

let signIn = (username, password) => {
  m.request({
    method: 'POST',
    url: SIGN_IN,
    config: xhrConfig,
    data: {
      login: username,
      password: password,
      follow: null,
      magazine_follow: null,
      likable_id: null,
      likables: null
    }
  }).then(response => {
    if (response.data) {
      // store user information to cookie.
      cookie('username', username);
      cookie('password', password);
      m.mount(mainRegion, m(Index, response.data));
    } else {
      m.mount(failedSignIn(), {
        controller: () => {
          m.redraw.strategy('diff');
        },
        view: ctrl => {
          return m('span', 'oops... Please retry.');
        }
      });
    }
  });
}

let controller = () => {
  let props = {
    username: m.prop(cookie('username')),
    password: m.prop(cookie('password'))
  }
  return { props };
};

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
        onclick: onClick.bind(this, props)
      },
      'yo'
    )
  ]);
};

export default { controller, view }
