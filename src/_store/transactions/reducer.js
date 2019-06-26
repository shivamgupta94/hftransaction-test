// reducers hold the store's state (the initialState object defines it)
// reducers also handle plain object actions and modify their state (immutably) accordingly
// this is the only way to change the store's state
// the other exports in this file are selectors, which is business logic that digests parts of the store's state
// for easier consumption by views
import * as types from './actionTypes';

const initialState = {
  transactionsList: [],
  keysList: new Set(),
  error: null,
}

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
  	case types.TRANSACTIONS_FETCH:
      const updatedTransactions = state.transactionsList.slice();
      const transactionStatusList = action.transactionStatusList;
      const keysList = state.keysList;

      for(const s of transactionStatusList){
        if(keysList.has(s['transactionId'])){
          updatedTransactions.splice(updatedTransactions.findIndex(o => o['transactionId'] === s['transactionId']),1);
        }
        updatedTransactions.splice(s['transactionId'],0,s);
      }
      
      transactionStatusList.forEach(item => keysList.add(item['transactionId']))
      return {
          ...state,
    			transactionsList: updatedTransactions
    		};

    case types.SET_ERROR:
        return {
          ...state,
          error: action.error
        };
    default:
      	return state;
  }
}

export function getError(state) {
  const error = state.transactions.error;
  return error;
}

export function getTransactionsList(state) {
  let transactionsList = state.transactions.transactionsList;
  
  let updatedList = [];
    updatedList = transactionsList.filter(transaction => {
        return transaction['status'] === "PENDING" ||  transaction['status'] === "IN_PROGRESS";
    });
    updatedList.sort((a, b) => {
      if(a['receivedTime']>b['receivedTime']) return 3;
      else if (a['receivedTime'] < b['receivedTime']) return -3;
      else if (a['status'] > b['status']) return 2;
      else if (a['status'] > b['status']) return -2;
      else if (a['progress'] > b['progress']) return 1;
      else if (a['progress'] < b['progress']) return -1;
      else return 0;
    })
  return updatedList;
}

export function getcTransactionsList(state) {
  let transactionsList = state.transactions.transactionsList;
  let updatedList = [];
  updatedList = transactionsList.filter(transaction => {
        return transaction['status'] === "DECLINED" ||  transaction['status'] === "SUCCESS";
    });
      updatedList.sort((a, b) => {
        if(a['receivedTime']>b['receivedTime']) return 3;
        else if (a['receivedTime'] < b['receivedTime']) return -3;
        else if (a['status'] > b['status']) return 2;
        else if (a['status'] > b['status']) return -2;
        else if (a['progress'] > b['progress']) return 1;
        else if (a['progress'] < b['progress']) return -1;
        else return 0;
      })


  return updatedList;
}