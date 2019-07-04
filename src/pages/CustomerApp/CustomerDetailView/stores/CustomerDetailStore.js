import Reflux from "reflux";
import CustomerService from "../../../../services/CustomerService";
import CustomerDetailActions from "../actions/CustomerDetailActions";

let CustomerDetailStore = Reflux.createStore({

    listenables: [CustomerDetailActions],

    init: function () {
        this.data = {
            customerDetail: {}
        };
        this.customerService = new CustomerService();
    },

    getCustomerDetailByCustomerId : function (customerId) {
        this.customerService.getCustomerByCustomerId(customerId)
            .then(result => {
                this.data.customerDetail = result;
                this.trigger(this.data);
            })
    }
});

export default CustomerDetailStore;