import Reflux from 'reflux';
import NewVendorActions from "../actions/NewVendorActions";
import CustomerService from "../../../../services/CustomerService";
import VendorService from "../../../../services/VendorService";

let NewVendorStore = Reflux.createStore({

    listenables: [NewVendorActions],
    
    init: function () {
       this.vendorService = new VendorService();
    },

    updateStoreVendor: function (vendor) {
        this.vendor = vendor;
    },

    updateFirstName: function (firstName) {
        this.vendor.firstName = firstName;
        this.trigger(this.vendor);
    },

    updateLastName: function (lastName) {
        this.vendor.lastName = lastName;
        this.trigger(this.vendor);
    },

    updateEmail: function (email) {
        this.vendor.email = email;
        this.trigger(this.vendor);
    },

    updatePhoneNumber: function (phoneNumber) {
        this.vendor.phone = phoneNumber;
        this.trigger(this.vendor);
    },

    updateUserType: function (userType) {
        this.vendor.userType = userType;
        this.trigger(this.vendor);
    },

    saveNewVendor: function () {
        // this.customerService.createNewCustomer(this.customer)
        //     .then(result => {this.trigger(this.customer)});
    }
});

export default NewVendorStore;