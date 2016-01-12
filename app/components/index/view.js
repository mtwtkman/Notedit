import m from 'mithril';
import Notes from '../notes/component';


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
                onclick: ctrl.mountComponent.bind(this, 'published')
              },
              'published'
            )
          ),
          m('li#nav-drafts',
            m('a.cursor-pointer',
              {
                'data-toggle': 'tab',
                onclick: ctrl.mountComponent.bind(this, 'drafts')
              },
              'drafts'
            )
          ),
          m('li#nav-create',
            m('a.cursor-pointer',
              {
                'data-toggle': 'tab',
                onclick: ctrl.mountComponent.bind(this, 'create')
              },
              'create'
            )
          ),
        ]),
        m('ul.nav.navbar-nav.navbar-right', [
          m('li', m('a.cursor-pointer', {onclick: ctrl.onSignOut}, 'sign out'))
        ])
      ])
    ]),
    m('div#index-content', [
      m('div#published', m(Notes, 'published')),
      m('div#drafts'),
      m('div#create')
    ]),
    m('div#modal')
  ]);
};

export default view;
