import Reflux from 'reflux';
import VendorOverviewActions from "../actions/VendorOverviewActions";
import VendorService from "../../../services/VendorService";

let VendorOverviewStore = Reflux.createStore({

    listenables: [VendorOverviewActions],

    init: function () {
        this.vendorList = [];
        this.vendorService = new VendorService();
    },

    updateVendorList: function () {
        this.vendorService.getAllVendors()
            .then(result => {
                console.log(result);
                this.vendorList = result;
                this.trigger(this.vendorList);
            });
    }
});

export default VendorOverviewStore;