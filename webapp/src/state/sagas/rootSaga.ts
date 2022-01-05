import { takeLatest,all } from 'redux-saga/effects';
import { LOGOUT,LOAD_USER, REQUEST_BILL_DETAILS, REQUEST_UPDATE_BILL_DETAILS, REQUEST_APIM_TOKEN, REQUEST_API_TOKEN, GET_CUSTOMERS, GET_BILLS, ISTOKEN_REQUEST } from '../redux/types';
import { 
  handleGetBill, 
  handleUpdateBill,
  handleGetAPIMToken,
  handleGetCustomers,
  handleLogout,
  handleGetBills,
  handleOauth2Token,
  handleLoadingUser
} from './handlers';

function* watcherSaga() {
  yield all([
    takeLatest(REQUEST_BILL_DETAILS, handleGetBill),
    takeLatest(REQUEST_UPDATE_BILL_DETAILS, handleUpdateBill),
    takeLatest(REQUEST_APIM_TOKEN, handleGetAPIMToken),  //APIM login
    takeLatest(LOGOUT , handleLogout),
    takeLatest(GET_BILLS, handleGetBills),
    takeLatest(GET_CUSTOMERS, handleGetCustomers),
    takeLatest(ISTOKEN_REQUEST, handleOauth2Token), //Identity Server login
    takeLatest(LOAD_USER, handleLoadingUser)
  ])
}

export default watcherSaga

