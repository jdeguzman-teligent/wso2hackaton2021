import { call, put, takeLatest } from 'redux-saga/effects';
import { receiveBillDetails, receivedBills } from '../../redux/ducks/bill';
import { getAPIMToken } from '../../redux/ducks/user';
import { REQUEST_APIM_TOKEN } from '../../redux/types';
import { apicall } from '../requests';
import { apiContext, backend_base_url, apim_token } from './constants';



export function* handleGetBills(action) {


  const {customerid, token} = action.payload
  
  try {
    const response = yield call(apicall,{ 
                        method: 'GET', 
                        url: `${backend_base_url}${apiContext}/customer/bills/${customerid}`,
                        headers: { Authorization: `Bearer ${token}` }
                      });
    const { data } = response;
    yield put(receivedBills(data));
  } catch (error) {
    console.log(error);
  }
}

export function* handleGetBill(action) {


  try {
    const response = yield call(apicall,{ 
                        method: 'GET', 
                        url: `${backend_base_url}${apiContext}/bills/${action.payload}`,
                        headers: { Authorization: `Bearer ${apim_token}` }
                      });
    const { data } = response;
    yield put(receiveBillDetails(data));
  } catch (error) {
    console.log(error);
  }
}

export function* handleUpdateBill(action) {
  try {

    const {data, token } = action.payload;
    const {id, reading, duedate } = data;
    
    const response = yield call(apicall,{ 
                        method: 'PUT', 
                        url: `${backend_base_url}${apiContext}/bills/${id}` ,
                        data: { reading, duedate },
                        headers: { Authorization: `Bearer ${token}` }
                      });
    yield put(receiveBillDetails(response.data));
  } catch (error) {
    console.log(error);
  }
}