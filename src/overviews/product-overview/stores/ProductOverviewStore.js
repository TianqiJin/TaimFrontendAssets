import Reflux from 'reflux';
import ProductOverviewActions from '../actions/ProductOverviewActions';
import ProductService from "../../../services/ProductService";

let ProductOverviewStore = Reflux.createStore({

    listenables: [ProductOverviewActions],

    init: function () {
        this.productList = [];
        this.productService = new ProductService();
    },

    updateProductList: function () {
        this.productService.getAllProducts()
            .then(result => {
                console.log(result);
                this.productList = result;
                this.trigger(this.productList);
            });
    }
});

export default ProductOverviewStore;