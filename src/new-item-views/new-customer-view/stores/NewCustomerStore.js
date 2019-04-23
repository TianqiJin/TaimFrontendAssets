import Reflux from 'reflux';
import NewCustomerActions from "../actions/NewCustomerActions";
import CustomerClassService from "../../../services/CustomerClassService";
import UserTypeService from "../../../services/UserTypeService";
import CustomerService from "../../../services/CustomerService";

let NewCustomerStore = Reflux.createStore({

    listenables: [NewCustomerActions],
    
    init: function () {
       this.data = {
           customer: {},
           customerClasses: [],
           userTypes: []
       };
       this.customerClassService = new CustomerClassService();
       this.userTypeService = new UserTypeService();
       this.customerService = new CustomerService();
    },

    updateFirstName: function (firstName) {
        this.data.customer.firstName = firstName;
        this.trigger(this.data);
    },

    updateLastName: function (lastName) {
        this.data.customer.lastName = lastName;
        this.trigger(this.data);
    },

    updateEmail: function (email) {
        this.data.customer.email = email;
        this.trigger(this.data);
    },

    updatePhoneNumber: function (phoneNumber) {
        this.data.customer.phone = phoneNumber;
        this.trigger(this.data);
    },

    updatePstNumber: function (pst) {
        this.data.customer.pst = pst;
        this.trigger(this.data);
    },

    updateStoreCredit: function (storeCredit) {
        this.data.customer.storeCredit = storeCredit;
        this.trigger(this.data);
    },

    updateCustomerClass: function (customerClass) {
        this.data.customer.customerClass = customerClass;
        this.trigger(this.data);
    },

    updateUserType: function (userType) {
        this.data.customer.userType = userType;
        this.trigger(this.data);
    },

    initNewCustomer: function () {
        this.data.customer = {};
        this.trigger(this.data);
    },

    getAllCustomerClasses: function () {
        this.customerClassService.getAllCustomerClasses()
            .then(result => {
                this.data.customerClasses = result;
                this.trigger(this.data);
            });
    },

    getAllUserTypes: function () {
        this.userTypeService.getAllUserTypes()
            .then(result => {
                this.data.userTypes = result;
                this.trigger(this.data);
            });
    },

    saveNewCustomer: function () {
        this.customerService.createNewCustomer(this.data.customer)
            .then(result => {this.trigger(this.data)});
    }
});

export default NewCustomerStore;