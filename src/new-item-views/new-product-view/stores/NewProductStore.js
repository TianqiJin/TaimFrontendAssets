import Reflux from "reflux";
import NewProductActions from "../actions/NewProductAction";
import ProductService from "../../../services/ProductService";

let NewProductStore = Reflux.createStore({

    listenables: [NewProductActions],

    init: function () {
        this.product = {};
        this.productService = new ProductService();
    },

    initNewProduct: function () {
        this.trigger(this.product);
    },

    updateSku: function (sku) {
        this.product.sku = sku;
        this.trigger(this.product);
    },

    updateDisplayName: function (displayName) {
        this.product.displayName = displayName;
        this.trigger(this.product);
    },

    updateTexture: function (texture) {
        this.product.texture = texture;
        this.trigger(this.product);
    },

    updateColor: function (color) {
        this.product.color = color;
        this.trigger(this.product);
    },

    updateTotalNumber: function (totalNumber) {
        this.product.totalNumber = totalNumber;
        this.trigger(this.product);
    },

    updateTotalVirtualNumber: function (totalVirtualNumber) {
        this.product.totalVirtualNumber = totalVirtualNumber;
        this.trigger(this.product);
    },

    updateUnitPrice: function (unitPrice) {
        this.product.unitPrice = unitPrice;
        this.trigger(this.product);
    },

    updateLength: function (length) {
        this.product.length = length;
        this.trigger(this.product);
    },

    updateWidth: function (width) {
        this.product.width = width;
        this.trigger(this.product);
    },

    updateHeight: function (height) {
        this.product.height = height;
        this.trigger(this.product);
    },

    updatePiecesPerBox: function (piecesPerBox) {
        this.product.piecesPerBox = piecesPerBox;
        this.trigger(this.product);
    },

    saveNewProduct: function () {
        this.productService.createNewProduct(this.product)
            .then(result => {this.trigger(this.product)});
    }


});

export default NewProductStore;