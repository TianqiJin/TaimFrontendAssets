import _ from 'lodash';

export default class AccountUtils {

     static calculateQuotationItemSubtotal(quotationItem) {
         _.forEach(quotationItem.taxItems, (taxItem) => {
             taxItem.taxAmount = quotationItem.unitPrice * quotationItem.quantity * taxItem.taxRate;
         });

         let taxTotal = _.sum(_.map(quotationItem.taxItems, (taxItem) => {return taxItem.taxAmount}));
         quotationItem.subtotal = quotationItem.unitPrice * quotationItem.quantity + taxTotal;

         return quotationItem;
    }

}