import * as types from './actionTypes';
import tranactionsService from '../../_services/tranactionsService';

export function startTransactions(data) {
  return async(dispatch, getState) => {
    try {
      var callback = function(transactionStatusList) {
        //transactionStatusList is an array of Transation Status objects
        //Each Transaction Status object contains the following properties:
        //transactionId: string - the id of the transaction (unique across all transactions)
        //receivedTime: number - the time that the transaction was received by the transaction processing system, in milliseconds since unix epoch.
        //ccNetwork: string - the credit card network (e.g. Visa, MasterCard, etc.)
        //ccNumber: string - the credit card number
        //amount: number - the amount of money ($ USD) transferred from the card in the transaction
        //status: string - one of PENDING, IN_PROGRESS, SUCCESS, and DECLINED
        //progress: number - a number from 0 to 100
        //console.log(transactionStatusList)
        dispatch({ type: types.TRANSACTIONS_FETCH, transactionStatusList });

        //NOTE: transationStatusList will only contain updates for a subset of all transactions, so make sure to account for this in your code.
      }
      data.registerStatusUpdateListener(callback);
    } catch (error) {
    	dispatch({type: types.SET_ERROR, error});
    }
  };

}

