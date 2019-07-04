import React from 'react';
import NumberFormat from 'react-number-format';
import _ from 'lodash';
import {Table, TableBody, TableCell, TableRow, Typography} from "@material-ui/core";

export default class QuotationTotalSummary extends React.Component{

    constructor(props) {
        super(props);
    }

    render() {
        let subtotal = 0;
        _.forEach(this.props.quotationItems, (item) => {
            subtotal += item.subtotal;
        });

        let taxTotalMap = {};

        let sampleQuotationItem = this.props.quotationItems[0];
        if (sampleQuotationItem) {
            _.forEach(sampleQuotationItem.taxItems, (taxItem) => {
                taxTotalMap[taxItem.taxType] = {};
            })
        }

        _.forEach(this.props.quotationItems, (quotationItems) => {
            _.forEach(quotationItems.taxItems, (taxItem) => {
                if (taxItem.taxRate in taxTotalMap[taxItem.taxType]) {
                    taxTotalMap[taxItem.taxType][taxItem.taxRate].push(taxItem.taxAmount);
                } else {
                    taxTotalMap[taxItem.taxType][taxItem.taxRate] = [];
                    taxTotalMap[taxItem.taxType][taxItem.taxRate].push(taxItem.taxAmount);
                }
            })
        });

        let taxTotalComponentList = [];
        let total = subtotal;

        _.forEach(_.keys(taxTotalMap), (taxType) => {
            taxTotalComponentList.push(_.map(_.keys(taxTotalMap[taxType]), (taxRate) => {
                let taxTotal = _.sum(taxTotalMap[taxType][taxRate]);
                total += taxTotal;
                let displayTaxRate = <NumberFormat value={taxRate * 100} displayType={'text'} decimalScale={0} suffix={'% ' + taxType}/>;
                return <TableRow key={taxType + '-' + taxRate}>
                    <TableCell>Total of {displayTaxRate}</TableCell>
                    <TableCell className="text-right"><NumberFormat value={taxTotal} displayType={'text'} decimalScale={2} thousandSeparator={true} prefix={'$'}/></TableCell>
                </TableRow>
            }));
        });


        return <React.Fragment>
            <Table>
                <TableBody>
                <TableRow>
                    <TableCell >Subtotal</TableCell>
                    <TableCell>
                        <NumberFormat value={subtotal}
                                      displayType={'text'}
                                      decimalScale={2}
                                      thousandSeparator={true}
                                      prefix={'$'}/></TableCell>
                </TableRow>
                {taxTotalComponentList}
                <TableRow>
                    <TableCell align={'left'}>Total</TableCell>
                    <TableCell align={'left'}>
                        <NumberFormat value={total}
                                      displayType={'text'}
                                      decimalScale={2}
                                      thousandSeparator={true}
                                      prefix={'$'}/>
                    </TableCell>
                </TableRow>
                </TableBody>
            </Table>
        </React.Fragment>
    }
}