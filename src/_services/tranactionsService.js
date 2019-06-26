// services are state-less
// they act as utility facades that abstract the details for complex operations
// normally, our interface to any sort of server API will be as a service

/*
transactions class for all admin level requests to server
*/
class transactionsService {

/*
This function is used to get all transactions on the platform
*/
    async getUsersList() {
        return "xyz"
    }
}

export default new transactionsService();