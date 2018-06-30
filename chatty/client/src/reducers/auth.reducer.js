import {REHYDRATE} from 'redux=-persisit';
import Immutable from 'seamless-immutable';
const InitialState= Immutable({
loading:true,
});i
import { LOGOUT, SET_CURRENT_USER } from '../constants/constants';

export const setCurrentUser = user => ({
  type: SET_CURRENT_USER,
  user,
});
export const logout = () => {
  client.resetStore();
  return { type: LOGOUT };
};
  switch (action.type) {
    case REHYDRATE:
      // convert persisted data to Immutable and confirm rehydration
      const { payload = {} } = action;
      return Immutable(payload.auth || state)
        .set('loading', false);
    case SET_CURRENT_USER:
      return state.merge(action.user);
    case LOGOUT:
      return Immutable({ loading: false });
    default:
      return state;
  }

