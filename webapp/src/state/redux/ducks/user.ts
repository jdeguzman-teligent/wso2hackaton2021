import {
  LOAD_USER,
  REQUEST_APIM_TOKEN,
  APIM_TOKEN_LOADED,
  REQUEST_API_TOKEN,
  API_TOKEN_LOADED,
  REGISTER_SUCCESS,
  CUSTOMER_LOADING,
  CUSTOMER_DONE_LOADING,
  ISTOKEN_REQUEST,
  ISTOKEN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  LOGOUT,
  LOGOUT_SUCCESS,
} from "../types";
import { UserAction, UserState } from "../../../interfaces";
import { decodeIdToken } from "../../../actions/session";

//actions
export const loadUser = () => ({
  type: LOAD_USER,
});

export const userLoaded = (payload: any) => ({
  type: USER_LOADED,
  payload,
});

export const getAPIMToken = (payload: any| null) => {
  return {
    type: REQUEST_APIM_TOKEN,
    payload,
  };
};

export const customerLoading = () => ({
  type: CUSTOMER_LOADING,
});

export const customerDoneLoading = () => ({
  type: CUSTOMER_DONE_LOADING,
});

export const setAPIMToken = (payload: any) => ({
  type: APIM_TOKEN_LOADED,
  payload,
});

export const getISToken = (payload: any) => ({
  type: ISTOKEN_REQUEST,
  payload,
});

export const setISToken = (payload: any) => ({
  type: ISTOKEN_SUCCESS,
  payload,
});

export const logout = () => ({
  type: LOGOUT,
});

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});

export const requestAPIToken = () => ({
  type: REQUEST_API_TOKEN,
  payload: null,
});

export const receivedAPIToken = (payload: any) => ({
  type: API_TOKEN_LOADED,
  payload,
});

// const token =
//   typeof window !== "undefined" ? localStorage.getItem("token") : null;

const initialState: UserState = {
  token: null,
  ISToken: null,
  isAuthenticated: null,
  loading: true,
  user: null,
};

//reducers
export default function (state = initialState, action: UserAction): UserState {
  const { type, payload } = action;

  switch (type) {
    case CUSTOMER_LOADING:
      return {
        ...state,
        loading: true,
      };

    case CUSTOMER_DONE_LOADING:
      return {
        ...state,
        loading: false,
      };
    case ISTOKEN_SUCCESS:
      const _decoded = decodeIdToken(payload.ISToken?.id_token);
      console.log('ISTOKEN_SUCCESS', _decoded);
      localStorage.setItem("token", payload.ISToken?.id_token || '');

      return {
        ...state,
        ISToken: payload.ISToken,
        isAuthenticated: true,
        loading: true,
      };

    case APIM_TOKEN_LOADED:
      console.log('APIM_TOKEN_LOADED', payload);
      
      const _state = {
        ...state,
        token: payload.token,
        loading: true,
      };


      return _state;
    case REGISTER_SUCCESS:
    case USER_LOADED:
      
      payload.token && localStorage.setItem("token", payload.token);

      return {
        ...state,
        ISToken: payload.ISToken,
        isAuthenticated: true,
        loading: true,
      };

    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
      console.log('LOGOUT_SUCCESS');
    
      localStorage.removeItem("token");
      return {
        ...state,
        ISToken: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      };

    default:
      return state;
  }
}
