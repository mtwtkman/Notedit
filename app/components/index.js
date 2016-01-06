import m from 'mithril';
import { xhrConfig, SIGN_OUT } from '../api';
import { mainRegion, indexContentRegion } from '../regions';
import SignIn from './sign-in';
import Published from './published';
import Drafts from './drafts';
import Create from './create';


let onSignOut = () => {
  m.request({method: 'POST', url: SIGN_OUT, config: xhrConfig}).then(response => {
    m.mount(mainRegion, SignIn);
  });
}

let controller = data => {
  let props = {
    nickname: m.prop(data.nickname),
    urlname: m.prop(data.urlname),
    noteCount: m.prop(data.note_count),
    draftCount: m.prop(data.draft_count),
    userIconSource: m.prop(data.user_profile_image_path)
  };
  return { props };
};

let view = ctrl => {
  let props = ctrl.props;
  return m('div#index-wrapper', [
    m('nav.navbar-inverse.navbar-default.navbar-fixed-top', [
      m('div.container-fluid', [
        m('div.navbar-header', [
          m('a.navbar-brand', [
            m('img', {src: props.userIconSource()})
          ])
        ]),
        m('ul.nav.navbar-nav', [
          m('li.active', m('a[href=#published][data-toggle=tab]', 'published')),
          m('li', m('a[href=#drafts][data-toggle=tab]', 'drafts')),
          m('li', m('a[href=#create][data-toggle=tab]', 'create')),
        ]),
        m('ul.nav.navbar-nav.navbar-right', [
          m('li', m('a[href=#]', {onclick: onSignOut}, 'sign out'))
        ])
      ])
    ]),
    m('div#index-content.tab-content', [
      m('div#published.tab-pane.active', m(Published, props.urlname())),
      m('div#drafts.tab-pane', m(Drafts, props.urlname())),
      m('div#create.tab-pane', Create),
    ]),
    m('div#modal')
  ]);
};

export default { controller, view }
