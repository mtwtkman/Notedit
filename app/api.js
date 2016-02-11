import { cookie } from './utils';


const xhrConfig = xhr => {
  xhr.setRequestHeader('X-XSRF-TOKEN', decodeURIComponent(cookie('X-XSRF-TOKEN')));
};
const PATH_ROOT = 'https://note.mu';
const API_ROOT = `${PATH_ROOT}/api/v1`;
const SIGN_IN = `${API_ROOT}/sessions/sign_in`;
const SIGN_OUT = `${API_ROOT}/sessions/sign_out`;
const CURRENT_USER = `${API_ROOT}/current_user`;
const NOTES = `${API_ROOT}/notes`;
const DRAFTS = `${NOTES}/drafts`;
const TEXT_NOTES = `${API_ROOT}/text_notes`;
const DRAFT_DELETE = `${TEXT_NOTES}/draft_delete`;
const DRAFT_SAVE = `${TEXT_NOTES}/draft_save`;
const ACTIVITIES = `${API_ROOT}/activities`;
const POST_ACTIVITIES = `${ACTIVITIES}/log?post=%7B%22method%22:%22POST%22%7D`;

export {
  xhrConfig,
  PATH_ROOT,
  SIGN_IN,
  SIGN_OUT,
  CURRENT_USER,
  NOTES,
  DRAFTS,
  TEXT_NOTES,
  DRAFT_DELETE,
  DRAFT_SAVE,
  ACTIVITIES,
  POST_ACTIVITIES
}
