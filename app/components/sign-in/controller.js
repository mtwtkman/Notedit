import m from 'mithril';
import { xhrConfig, SIGN_IN } from '../../api';
import { mainRegion, failedSignIn } from '../../regions';
import { cookie, clearLocalStorage } from '../../utils';
import SignInModel from './model';
import Index from '../index/component';


let controller = () => {
  let username = cookie('username');
  let password = cookie('password');
  let props = new SignInModel(username=username, password=password);

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
        clearLocalStorage();
        // store user information to cookie.
        cookie('username', username);
        cookie('password', password);
        localStorage.urlname = response.data.urlname;
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
  };

  return {
    props,
    signIn
  };
};

export default controller;
