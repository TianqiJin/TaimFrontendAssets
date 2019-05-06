import Reflux from "reflux";
import NewQuotationActions from "../actiions/NewQuotationActions";
import ProductService from "../../../services/ProductService";
import CustomerService from "../../../services/CustomerService";
import QuotationService from "../../../services/QuotationService";
import CustomerClassService from "../../../services/CustomerClassService";

import _ from 'lodash';

let NewQuotationStore = Reflux.createStore({

    listenables: [NewQuotationActions],

    init: function () {
        this.data = {
            productList: [],
            customerList: [],
            customerClassList: [],
            quotation: {}
        };

        this.productService = new ProductService();
        this.customerService = new CustomerService();
        this.quotationService = new QuotationService();
        this.customerClassService = new CustomerClassService();
    },

    getData() {
        return this.data;
    },

    getAllProducts: function () {
        this.productService.getAllProducts()
            .then(result => {
                this.data.productList = result;
                this.trigger(this.data);
            })
    },

    getAllCustomers: function () {
        this.customerService.getAllCustomers()
            .then(result => {
                this.data.customerList = result;
                this.trigger(this.data);
            })
    },

    getAllCustomerClasses: function () {
        this.customerClassService.getAllCustomerClasses()
            .then(result => {
                this.data.customerClassList = result;
                this.trigger()
            })
    },

    initQuotation: function () {
        this.quotationService.initNewQuotation()
            .then(result => {
                this.data.quotation = result;
                this.trigger(this.data);
            })
    },

    selectCustomer: function (customer) {
        this.data.quotation.quotationCustomer.customerType = customer.userType;
        this.data.quotation.quotationCustomer.customerClass = customer.userClass;
        this.data.quotation.quotationCustomer.email = customer.email;
        this.data.quotation.quotationCustomer.phone = customer.phone;

        this.trigger(this.data);
    },

    selectProduct: function (product) {
        let quotationItems = this.data.quotation.quotationItems;
        let quotationItem = {};
        quotationItem.sku = product.sku;
        quotationItem.displayName = product.displayName;
        quotationItem.unitPrice = product.unitPrice;
        quotationItem.quantity = 0;
        quotationItem.subtotal = 0;
        quotationItem.discount = 0;

        quotationItems.push(quotationItem);
        this.trigger(this.data);
    },

    editQuotationId: function (quotationId) {
        this.data.quotation.quotationSummary.quotationId = quotationId;
        this.trigger(this.data);
    },

    editQuotationDate: function (date) {
        this.data.quotation.quotationSummary.quotationDate = date;
        this.trigger(this.data);
    },

    editQuotationDueDate: function (date) {
        this.data.quotation.quotationSummary.dueDate = date;
        this.trigger(this.data);
    },

    editQuotationNote: function (note) {
        this.data.quotation.quotationSummary.note = note;
        this.trigger(this.data);
    },

    editQuotationItemQuantity: function (quantity, itemIndex) {
        let quotationItem = _.find(this.data.quotation.quotationItems, (item, index) => {
            return index === itemIndex;
        });

        quotationItem.subtotal = quotationItem.unitPrice * quantity;
        this.trigger(this.data);
    },

    editQuotationItemNote: function (note, itemIndex) {
        let quotationItem = _.find(this.data.quotation.quotationItems, (item, index) => {
            return index === itemIndex;
        });

        quotationItem.note = note;
        this.trigger(this.data);
    },

    removeQuotationItem: function (itemIndex) {
        _.remove(this.data.quotation.quotationItems, (item, index) => {
            return itemIndex === index;
        });
        this.trigger(this.data);
    },

    saveQuotation: function () {
        let createQuotationInput = {};
        let quotation = this.data.quotation;
        createQuotationInput.quotationId = quotation.quotationSummary.quotationId;
        createQuotationInput.note = quotation.quotationSummary.note;
        createQuotationInput.status = quotation.quotationSummary.status;
        createQuotationInput.quotationDate = quotation.quotationSummary.quotationDate;
        createQuotationInput.dueDate = quotation.quotationSummary.dueDate;
        createQuotationInput.customerId = quotation.quotationCustomer.id;

        createQuotationInput.createQuotationDetailItems = _.map(quotation.quotationItems, (item) => {
            return {
                sku: item.sku,
                unitPrice: item.unitPrice,
                quantity: item.quantity,
                discount: item.discount,
                note: item.note
            };
        });

        console.log(createQuotationInput);
    }
});

export default NewQuotationStore;