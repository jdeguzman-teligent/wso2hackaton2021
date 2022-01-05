import { CustomerState, CustomerAction, Customer } from "../../../interfaces";
import { RESET_CUSTOMERS, GET_CUSTOMERS, SET_CUSTOMERS } from "../types";

//actions
export const resetCustomers = () => ({
  type: RESET_CUSTOMERS,
});

export const getCustomers = (payload: any) => ({
  type: GET_CUSTOMERS,
  payload,
});

export const setCustomers = (payload: Customer[]) => ({
  type: SET_CUSTOMERS,
  payload,
});

const initialState: CustomerState = {
  payload: [] ,
  loading: true,
};

//reducers
export default function (
  state = initialState,
  action: CustomerAction
): CustomerState {
  const { type, payload } = action;

  switch (type) {
    case RESET_CUSTOMERS:
      return {
        ...state,
        loading: false,
        payload: [],
      };
    case SET_CUSTOMERS:
      return {
        ...state,
        loading: false,
        payload: payload as Customer[],
      };

    default:
      return state;
  }
}
