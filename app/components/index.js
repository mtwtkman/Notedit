import m from 'mithril';
import { xhrConfig, SIGN_OUT } from '../api';
import { mainRegion, indexContentRegion } from '../regions';
import { IndexModel } from '../models/index';
import SignIn from './sign-in';
import Published from './published';
import Drafts from './drafts';
import Create from './create';


let mountComponent = component => {
  const COMPONENTS = {
    Published,
    Drafts,
    Create
  };
  m.mount(indexContentRegion(), COMPONENTS[component]);
};

let onSignOut = () => {
  m.request({method: 'POST', url: SIGN_OUT, config: xhrConfig}).then(response => {
    m.mount(mainRegion, SignIn);
  });
};

let controller = data => {
  let model = new IndexModel();
  model.nickname(data.nickname);
  model.noteCount(data.note_count);
  model.draftCount(data.draft_count);
  model.userIconSource(data.user_profile_image_path);

  return {
    props: {
      nickname: model.nickname,
      noteCount: model.noteCount,
      draftCount: model.draftCount,
      userIconSource: model.userIconSource
    }
  };
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
                onclick: mountComponent.bind(this, 'Published')
              },
              'published'
            )
          ),
          m('li#nav-drafts',
            m('a.cursor-pointer',
              {
                'data-toggle': 'tab',
                onclick: mountComponent.bind(this, 'Drafts')
              },
              'drafts'
            )
          ),
          m('li#nav-create',
            m('a.cursor-pointer',
              {
                'data-toggle': 'tab',
                onclick: mountComponent.bind(this, 'Create')
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
      m('div#published', Published),
      m('div#drafts'),
      m('div#create')
    ]),
    m('div#modal')
  ]);
};

export default { controller, view }
