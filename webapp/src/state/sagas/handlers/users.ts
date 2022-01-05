import { call, put } from "redux-saga/effects";
import setAuthToken from "src/utils/setAuthToken";
import { ResponseGenerator } from "types/responseGenerator";
import { CONFIG } from "../../../../config";
import { resetBills } from "../../redux/ducks/bill";
import { resetCustomers } from "../../redux/ducks/customer";
import {
  setAPIMToken,
  logoutSuccess,
  setISToken,
  userLoaded,
} from "../../redux/ducks/user";
import { apicall } from "../requests";
import { backend_base_url, client_id, client_secret } from "./constants";


/**
 * Get logged in user and set local storage
 *
 */
export function* handleLoadingUser() {
  
  
	try {
    console.log('localStorage', localStorage);

    if (localStorage.token) {
      setAuthToken(localStorage.token);
      const ISTokenResponse1  = { ISToken: {id_token: localStorage.token} };
      yield put(userLoaded(ISTokenResponse1));
    } 
    // else {

    //   const ISTokenResponse2  = { ISToken: {id_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'} };
    //   yield put(userLoaded(ISTokenResponse2));
  
    // }
    
  
	} catch (err) {
    console.log(err);
	}  
  
}

/**
 * Get token from APIM using the application 
 * id and secret
 */
 export function* handleGetAPIMToken() {
  try {

    console.log('handleGetAPIMToken is hit' );
    
    const body = [];
    body.push(`client_id=${client_id}`);
    body.push(`client_secret=${client_secret}`);
    body.push(`grant_type=client_credentials`);

    const response: ResponseGenerator = yield call(apicall, {
      method: "POST",
      url: `${backend_base_url}/token`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "Access-Control-Allow-Headers":
          "append,delete,entries,foreach,get,has,keys,set,values,Authorization",
      },
      data: body.join("&"),
    });
    const { data } = response;
    const tokenObject = { token: data.access_token };

    yield put(setAPIMToken(tokenObject));
  } catch (error) {
    console.log(error);
  }
}

export function* handleLogout(action: any) {
  try {
    yield put(logoutSuccess());
    yield put(resetCustomers());
    yield put(resetBills());
  } catch (error) {
    console.log(error);
  }
}

export function* handleOauth2Token(action : any) {
  try {

    console.log('handleOauth2Token is hit' );

    const body = [];
    body.push(`username=${CONFIG.WSO2_USER}`);
    body.push(`password=${CONFIG.WSO2_PW}`);
    body.push(`grant_type=${CONFIG.GRANT_TYPE}`);
    body.push(`scope=${CONFIG.SCOPE}`);

    const _data = body.join("&");

    const response : ResponseGenerator = yield call(apicall, {
      method: "POST",
      url: `${CONFIG.TOKEN_ENDPOINT}`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${CONFIG.BASIC_AUTH}`,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
      },
      data: _data,
    });
    const { data } = response;
    const ISTokenResponse = { ISToken: data };

    yield put(setISToken(ISTokenResponse));
  } catch (error) {
    console.log(error);
  }
}

