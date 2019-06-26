import React from 'react';
import { connect } from 'react-redux';
import * as transactionActions from '../_store/transactions/actions';
import * as transactionSelector from '../_store/transactions/reducer';
import './TransactionStatusPage.css';

class TransactionStatusPage extends React.Component {
    state = {}

    componentDidMount() {
        this.props.dispatch(transactionActions.startTransactions(this.props.data));
        window.moment.relativeTimeThreshold('ss', -1);
    }

    render() {
        let header = <thead className="text-center">
            <tr>
              <th style={{textAlign: 'center'}}>Received time</th>
              <th style={{textAlign: 'center'}}>CC network</th>
              <th style={{textAlign: 'center'}}>CC Number</th>
              <th style={{textAlign: 'center'}}>Amount</th>
              <th style={{textAlign: 'center'}}>Status</th>
              <th style={{textAlign: 'center'}}>Progress</th>
            </tr>
          </thead>
        return (
            <div className="container-fluid">
        {
          (this.props.itransactionsList.length > 0) ?
          <div className="table-responsive-md"  >
          <table className="table table-striped table-sm">
            {header}
            <tbody>
              {
                this.props.itransactionsList && this.props.itransactionsList.map(data => {
                  let pro = data["progress"]+ "%";
                  let classN = 'text-warning';
                    if(data['status'] === 'IN_PROGRESS'){
                      classN = 'text-primary';
                    }
                  return(
                    <tr key={data['transactionId']}>
                      <td className="col-sm-1">{window.moment(data["receivedTime"]).format("MM/DD/YY hh:mm:ss.SSS")}</td>
                      <td className="col-sm-2">{data["ccNetwork"]}</td>
                      <td>{data["ccNumber"]}</td>
                      <td style={{textAlign: 'right'}}>{data["amount"]}</td>
                      <td className="col-sm-2"><span className={classN}><b>{data["status"]}</b></span></td>                      
                      <td className="col-sm-4">
                          <div className="progress">
                          { data['status'] === "PENDING" ?
                          <div className="progress-bar" role="progressbar" style={{width:`${pro}`}} aria-valuenow={pro} aria-valuemin="0" aria-valuemax="100">{pro}%</div>
                          : 
                          <div className="progress-bar" role="progressbar" style={{width:`${pro}`}} aria-valuenow={pro} aria-valuemin="0" aria-valuemax="100">{pro}%</div>
                        } </div>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div> : null}
        {(this.props.ctransactionsList.length > 0) ?
        
          <div className="table-responsive-md" >
            <table className="table table-striped table-sm" >
              {header}
              <tbody>
                {
                  this.props.ctransactionsList && this.props.ctransactionsList.map(data => {
                    let pro = data["progress"] + "%";
                    let classN = 'text-warning';

                    if(data['status'] === 'DECLINED'){
                      classN = 'text-danger';
                    }

                    else if(data['status'] === 'SUCCESS'){
                      classN = 'text-success';
                    }
                      return( 
                        <tr  key={data['transactionId']}>
                          <td className="col-sm-1">{window.moment(data["receivedTime"]).format("MM/DD/YY hh:mm:ss.SSS")}</td>
                          <td className="col-sm-2">{data["ccNetwork"]}</td>
                          <td>{data["ccNumber"]}</td>
                          <td style={{textAlign: 'right'}}>{data["amount"]}</td>
                          <td className="col-sm-2"><span className={classN}><b>{data["status"]}</b></span></td>
                          <td className="col-sm-4">
                            <div className="progress">{ 

                            data['status'] === "DECLINED" 
                              ?
                              <div className="progress-bar" role="progressbar" style={{width:`${pro}`}} aria-valuenow={pro} aria-valuemin="0" aria-valuemax="100">{pro}%</div>
                              : 
                              <div className="progress-bar" role="progressbar" style={{width:`${pro}`}} aria-valuenow={pro} aria-valuemin="0" aria-valuemax="100">{pro}%</div>
                            }
                            </div>
                          </td>
                        </tr>
                      ) 
                  })
                }              </tbody>
            </table>
                </div>  :null}
      </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        error: transactionSelector.getError(state),
        itransactionsList: transactionSelector.getTransactionsList(state),
        ctransactionsList: transactionSelector.getcTransactionsList(state),
    };
}

export default connect(mapStateToProps)(TransactionStatusPage);