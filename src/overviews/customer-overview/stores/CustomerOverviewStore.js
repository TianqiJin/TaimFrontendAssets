import Reflux from 'reflux';
import CustomerOverviewActions from '../actions/CustomerOverviewActions';
import CustomerService from "../../../services/CustomerService";

let CustomerOverviewStore = Reflux.createStore({

    listenables: [CustomerOverviewActions],

    init: function () {
        this.customerList = [];
        this.customerService = new CustomerService();
    },

    onUpdateCustomerList: function () {
        this.customerService.getAllCustomers()
            .then(result => {
                this.customerList = result;
                this.trigger(this.customerList);
            });
    }
});

export default CustomerOverviewStore;