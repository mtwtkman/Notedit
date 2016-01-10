import m from 'mithril';
import { xhrConfig, SIGN_OUT } from '../api';
import { mainRegion, indexContentRegion } from '../regions';
import SignIn from './sign-in';
import Published from './published';
import Drafts from './drafts';
import Create from './create';


let onPublished = urlname => {
  m.mount(indexContentRegion(), m(Published, urlname));
};

let onDrafts = urlname => {
  m.mount(indexContentRegion(), m(Drafts, urlname));
};

let onCreate = () => {
  m.mount(indexContentRegion(), Create);
};

let onSignOut = () => {
  m.request({method: 'POST', url: SIGN_OUT, config: xhrConfig}).then(response => {
    m.mount(mainRegion, SignIn);
  });
};


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
          m('li#nav-published.active',
            m('a.cursor-pointer',
              {
                'data-toggle': 'tab',
                onclick: onPublished.bind(this, props.urlname())
              },
              'published'
            )
          ),
          m('li#nav-drafts',
            m('a.cursor-pointer',
              {
                'data-toggle': 'tab',
                onclick: onDrafts.bind(this, props.urlname())
              },
              'drafts'
            )
          ),
          m('li#nav-create',
            m('a.cursor-pointer',
              {
                'data-toggle': 'tab',
                onclick: onCreate
              },
              'create'
            )
          ),
        ]),
        m('ul.nav.navbar-nav.navbar-right', [
          m('li', m('a.cursor-pointer', {onclick: onSignOut}, 'sign out'))
        ])
      ])
    ]),
    m('div#index-content', [
      m('div#published', m(Published, props.urlname())),
      m('div#drafts'),
      m('div#create')
    ]),
    m('div#modal')
  ]);
};

export default { controller, view }
