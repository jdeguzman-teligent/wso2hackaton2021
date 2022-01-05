import { BillAction, BillState, Bill } from "../../../interfaces";
import { REQUEST_UPDATE_BILL_DETAILS,
  REQUEST_BILL_DETAILS,
  RECEIVE_BILL_DETAILS,
  GET_BILLS,
  SET_BILLS,
  RESET_BILLS,
  SET_SELECTED_BILL
} from "../types";


// payload = customer id
export const setSelectedBill = (selectedBill: Bill)  => ({
  type: SET_SELECTED_BILL,
  payload: selectedBill
});

export const resetBills = () => ({
  type: RESET_BILLS
});

export const requestBills = (payload: any) => ({
  type: GET_BILLS,
  payload
});

export const receivedBills = (payload : any) => ({
  type: SET_BILLS,
  payload
});

export const requestUpdateBillDetails = (payload: any) => ({
  type: REQUEST_UPDATE_BILL_DETAILS,
  payload
});

export const requestBillDetails = (payload: any) => ({
  type: REQUEST_BILL_DETAILS,
  payload
});

export const receiveBillDetails = (payload: any) => {
  return ({
    type: RECEIVE_BILL_DETAILS, 
    payload,
  });
}

const initialState: BillState = {
  payload: [],
  selectedBill: null,
  id: '',
  reading: 0,
  duedate: null
}

export default function (state = initialState, action : BillAction ) : BillState {

	const { type, payload } = action;

  switch (type) {
    case REQUEST_UPDATE_BILL_DETAILS:
	    const { id, reading, duedate } = payload as any;    
      return {
        ...state,
        id ,
        reading,
        duedate
      };
    case SET_SELECTED_BILL: 

      const data = {
        ...state,
        selectedBill: payload as Bill
      };
      
      return data;
    case RESET_BILLS:
      return {
        ...state,
        selectedBill: null,
        payload: []
      };
    case RECEIVE_BILL_DETAILS:
	    const { _id } = payload as Bill;    
      const listObject = state.payload.filter(item => item._id !== _id);

      return {
				...state,
        payload: [...listObject, payload as Bill],
        selectedBill: payload as Bill 
			};
    case SET_BILLS:
      return {
				...state,
				payload: payload as Bill[],
        selectedBill: null 
			};
    default:
      
      return state;
  }
}