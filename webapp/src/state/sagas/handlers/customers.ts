import { call, put } from 'redux-saga/effects';
import { Customer } from 'src/interfaces';
import { customerDoneLoading } from 'src/state/redux/ducks/user';
import { ResponseGenerator } from 'types/responseGenerator';
import { setCustomers } from '../../redux/ducks/customer';
import { apicall } from '../requests';
import { backend_base_url, apiContext } from './constants';

export function* handleGetCustomers(action: any) {
  try {

    const response: ResponseGenerator = yield call(apicall,{ 
      method: 'GET', 
      url: `${backend_base_url}${apiContext}/customer`,
      headers: { Authorization: `Bearer ${action.payload}` }
    });
    const { data } = response;
    
    yield put(setCustomers(data as Customer[]));
    yield put(customerDoneLoading());


  } catch (error) {
    console.log(error);
  }
}

