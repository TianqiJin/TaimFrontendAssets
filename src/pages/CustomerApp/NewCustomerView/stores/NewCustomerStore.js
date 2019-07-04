import Reflux from 'reflux';
import NewCustomerActions from "../actions/NewCustomerActions";
import CustomerService from "../../../../services/CustomerService";

let NewCustomerStore = Reflux.createStore({

    listenables: [NewCustomerActions],
    
    init: function () {
       this.customerService = new CustomerService();
    },

    updateStoreCustomer: function (customer) {
        this.customer = customer;
    },

    updateFirstName: function (firstName) {
        this.customer.firstName = firstName;
        this.trigger(this.customer);
    },

    updateLastName: function (lastName) {
        this.customer.lastName = lastName;
        this.trigger(this.customer);
    },

    updateEmail: function (email) {
        this.customer.email = email;
        this.trigger(this.customer);
    },

    updatePhoneNumber: function (phoneNumber) {
        this.customer.phone = phoneNumber;
        this.trigger(this.customer);
    },

    updatePstNumber: function (pst) {
        this.customer.pstNumber = pst;
        this.trigger(this.customer);
    },

    updateStoreCredit: function (storeCredit) {
        this.customer.storeCredit = storeCredit;
        this.trigger(this.customer);
    },

    updateCustomerClass: function (customerClass) {
        this.customer.customerClass = customerClass;
        this.trigger(this.customer);
    },

    updateUserType: function (userType) {
        this.customer.userType = userType;
        this.trigger(this.customer);
    },

    saveNewCustomer: function () {
        // this.customerService.createNewCustomer(this.customer)
        //     .then(result => {this.trigger(this.customer)});
    }
});

export default NewCustomerStore;