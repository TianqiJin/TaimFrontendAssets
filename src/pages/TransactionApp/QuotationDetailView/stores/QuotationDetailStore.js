import Reflux from "reflux";
import QuotationDetailActions from "../actions/QuotationDetailActions";
import QuotationService from "../../../../services/QuotationService";

import _ from 'lodash';
import AccountUtils from "../../../../utils/AccountUtils";
import {DEFAULT_GST_RATE, DEFAULT_PST_RATE, TAXTYPE} from "../../../../utils/Constants";
import QuotationDetailView from "../components/QuotationDetailView";

let QuotationDetailStore = Reflux.createStore({

    listenables: [QuotationDetailActions],

    init: function () {
        this.quotationService = new QuotationService();
    },

    updateStoreQuotation: function (quotation) {
        this.quotation = quotation;
    },
    
    selectCustomer: function (customer) {
        this.quotation.quotationCustomer.customerType = customer.userType;
        this.quotation.quotationCustomer.customerClass = customer.userClass;
        this.quotation.quotationCustomer.email = customer.email;
        this.quotation.quotationCustomer.phone = customer.phone;
        this.quotation.quotationCustomer.id = customer.id;

        this.trigger(QuotationDetailView.UPDATE_ONLY, this.quotation);
    },

    selectProduct: function (product) {
        let quotationItems = this.quotation.quotationItems;
        let quotationItem = {};
        quotationItem.sku = product.sku;
        quotationItem.displayName = product.displayName;
        quotationItem.unitPrice = product.unitPrice;
        quotationItem.quantity = 0;
        quotationItem.subtotal = 0;
        quotationItem.discount = 0;
        quotationItem.taxItems = _.map(_.keys(this.quotation.allowedTaxRateMap), (taxType) => {
            let taxRate = 0;
            if (taxType === TAXTYPE.GST) {
                taxRate = DEFAULT_GST_RATE;
            } else if (taxType === TAXTYPE.PST) {
                taxRate = DEFAULT_PST_RATE;
            }
            return {
                taxType: taxType,
                taxRate: taxRate / 100,
                taxAmount: 0
            };
        });

        quotationItems.push(quotationItem);
        this.trigger(QuotationDetailView.UPDATE_ONLY, this.quotation);
    },

    editQuotationId: function (quotationId) {
        this.quotation.quotationSummary.quotationId = quotationId;
        this.trigger(QuotationDetailView.UPDATE_ONLY, this.quotation);
    },

    editQuotationDate: function (date) {
        this.quotation.quotationSummary.quotationDate = date;
        this.trigger(QuotationDetailView.UPDATE_ONLY, this.quotation);
    },

    editQuotationDueDate: function (date) {
        this.quotation.quotationSummary.dueDate = date;
        this.trigger(QuotationDetailView.UPDATE_ONLY, this.quotation);
    },

    editQuotationNote: function (note) {
        this.quotation.quotationSummary.note = note;
        this.trigger(QuotationDetailView.UPDATE_ONLY, this.quotation);
    },

    editQuotationItemQuantity: function (quantity, itemIndex) {
        let quotationItem = _.find(this.quotation.quotationItems, (item, index) => {
            return index === itemIndex;
        });
        quotationItem.quantity = quantity;
        AccountUtils.calculateQuotationItemSubtotal(quotationItem);

        this.trigger(QuotationDetailView.UPDATE_ONLY, this.quotation);
    },

    editQuotationItemNote: function (note, itemIndex) {
        let quotationItem = _.find(this.quotation.quotationItems, (item, index) => {
            return index === itemIndex;
        });

        quotationItem.note = note;
        this.trigger(QuotationDetailView.UPDATE_ONLY, this.quotation);
    },

    removeQuotationItem: function (itemIndex) {
        _.remove(this.quotation.quotationItems, (item, index) => {
            return itemIndex === index;
        });
        this.trigger(QuotationDetailView.UPDATE_ONLY, this.quotation);
    },

    selectTaxRate: function (taxType, taxRate, itemIndex) {
        let quotationItem = _.find(this.quotation.quotationItems, (item, index) => {
            return index === itemIndex;
        });

        _.forEach(quotationItem.taxItems, (taxItem) => {
            if (taxItem.taxType === taxType) {
                taxItem.taxRate = taxRate / 100;
            }
        });

        AccountUtils.calculateQuotationItemSubtotal(quotationItem);
        this.trigger(QuotationDetailView.UPDATE_ONLY, this.quotation);
    },

    editQuotationBillFromAddress: function(billFromAddress) {
        this.quotation.quotationSummary.billFromAddress = billFromAddress;
        this.trigger(QuotationDetailView.UPDATE_ONLY, this.quotation);
    },

    editQuotationBillToAddress: function(billToAddress) {
        this.quotation.quotationSummary.billToAddress = billToAddress;
        this.trigger(QuotationDetailView.UPDATE_ONLY, this.quotation);
    },

    saveQuotation: function (isSubmit) {
        let createQuotationInput = {};
        let quotation = this.quotation;
        createQuotationInput.quotationId = quotation.quotationSummary.quotationId;
        createQuotationInput.note = quotation.quotationSummary.note;
        createQuotationInput.status = quotation.quotationSummary.status;
        createQuotationInput.quotationDate = quotation.quotationSummary.quotationDate;
        createQuotationInput.dueDate = quotation.quotationSummary.dueDate;
        createQuotationInput.customerId = quotation.quotationCustomer.id;
        createQuotationInput.billFromAddress = quotation.quotationSummary.billFromAddress;
        createQuotationInput.billToAddress = quotation.quotationSummary.billToAddress;
        createQuotationInput.submit = isSubmit;

        createQuotationInput.createQuotationDetailItems = _.map(quotation.quotationItems, (item) => {
            return {
                sku: item.sku,
                unitPrice: item.unitPrice,
                quantity: item.quantity,
                discount: item.discount,
                note: item.note,
                createQuotationDetailTaxItems: _.map(item.taxItems, (taxItem) => {
                    return {
                        taxType: taxItem.taxType,
                        taxRate: taxItem.taxRate
                    }})
            };
        });

        this.quotationService.saveQuotation(createQuotationInput)
            .then(result => {
                this.trigger(QuotationDetailView.SUBMIT_SUCCESSFUL, quotation);
            })
            .catch(error => {
                this.trigger(QuotationDetailView.FAIL, quotation);
            });
    }
});

export default QuotationDetailStore;