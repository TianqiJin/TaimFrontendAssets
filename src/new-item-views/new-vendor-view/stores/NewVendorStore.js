import Reflux from 'reflux';
import UserTypeService from "../../../services/UserTypeService";
import CustomerService from "../../../services/CustomerService";
import NewVendorActions from "../actions/NewVendorActions";
import VendorService from "../../../services/VendorService";

let NewVendorStore = Reflux.createStore({

    listenables: [NewVendorActions],
    
    init: function () {
       this.data = {
           vendor: {},
           userTypes: []
       };
       this.userTypeService = new UserTypeService();
       this.vendorService = new VendorService();
    },

    updateFirstName: function (firstName) {
        this.data.vendor.firstName = firstName;
        this.trigger(this.data);
    },

    updateLastName: function (lastName) {
        this.data.vendor.lastName = lastName;
        this.trigger(this.data);
    },

    updateEmail: function (email) {
        this.data.vendor.email = email;
        this.trigger(this.data);
    },

    updatePhoneNumber: function (phoneNumber) {
        this.data.vendor.phone = phoneNumber;
        this.trigger(this.data);
    },

    updateUserType: function (userType) {
        this.data.vendor.userType = userType;
        this.trigger(this.data);
    },

    initNewVendor: function () {
        this.data.vendor = {};
        this.trigger(this.data);
    },

    getAllUserTypes: function () {
        this.userTypeService.getAllUserTypes()
            .then(result => {
                this.data.userTypes = result;
                this.trigger(this.data);
            });
    },

    saveNewVendor: function () {
        this.customerService.createNewCustomer(this.data.customer)
            .then(result => {this.trigger(this.data)});
    }
});

export default NewVendorStore;