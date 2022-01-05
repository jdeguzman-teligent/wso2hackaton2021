import { ObjectId } from 'mongoose';

export type User = {
  id: number
  name: string
}

export type UserModel = {
  _id: ObjectId
  name: string
  email: string
  avatar: string
  token: string
  usertype: number
}

export type ISTokenModel = {
  access_token: string
  refresh_token: string
  scope: string
  id_token: string 
  token_type: string
  expires_in: number
}

export type UserState = {
  token: string | null
  ISToken: ISTokenModel | null
	isAuthenticated: boolean | null
	loading: boolean
	user: UserModel | null
};


export interface APITokenLoadedAction {
	type: string,
	payload: UserState
}

export interface LoginSuccessAction {
	type: string,
	payload: UserState
}
export interface RegisterSuccessAction {
	type: string,
	payload: UserState
}

export interface LoginFailAction {
	type: string,
	payload: UserState
}

export interface LogoutAction {
	type: string,
	payload: UserState
}

export type UserAction = APITokenLoadedAction 
                    | LoginSuccessAction 
                    | RegisterSuccessAction 
                    | LoginFailAction 
                    | LogoutAction;

//customers
export type Customer = {
  _id: ObjectId
  customerid: string
  customertoken: string
  user: UserType
  __v: number
  date: Date
  meterids: [string]
}

export type CustomerState = {
  payload: Customer[] ;
  loading: boolean ;
};

export type UserType = {
  _id: string;
  name: string;
  avatar: string;
}

export interface SetCustomerAction {
	type: string,
	payload?: Customer[]
}

export type CustomerAction = SetCustomerAction;




//####################
//Bills

export type Bill = {
  _id: ObjectId
  meterid: string
  reading: string
  amountdue: string
  duedate: Date | null
  previous: string
  consumedkw: string
}

export type BillState = {
  payload: Bill[];
  selectedBill: Bill | null;
  id?: string;
  reading?: number;
  duedate?: Date | null;
  previous?: string;
  consumedkw?: string;
};


export interface SetBillsAction {
	type: string,
	payload?: Bill[]
}

export interface UpdateBillAction {
	type: string,
	payload?: Bill
  id?: string;
  reading?: number;
  duedate?: Date;
}

export interface BillPayload {
	payload: Bill
}

export type BillAction = SetBillsAction | UpdateBillAction;


