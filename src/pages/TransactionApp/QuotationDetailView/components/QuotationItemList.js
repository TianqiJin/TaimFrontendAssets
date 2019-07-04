import React from 'react';
import QuotationItem from "./QuotationItem";
import _ from "lodash";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Table from "@material-ui/core/Table";
import {withStyles} from "@material-ui/core";

const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

export default class QuotationItemList extends React.Component{

    constructor(props) {
        super(props);
    }

    render() {
        let items = _.map(this.props.quotationItems, (quotationItem, index) => {
            return <QuotationItem key={quotationItem.productName + '-' + index}
                                  item={quotationItem}
                                  index={index}
                                  allowedTaxRateMap={this.props.allowedTaxRateMap}
                                  isSubmitted={this.props.isSubmitted}/>
        });

        let taxRateHeaders =  _.map(_.keys(this.props.allowedTaxRateMap), (taxType) => {
            return <CustomTableCell key={taxType}>{taxType + ' Rate'}</CustomTableCell>
        });

        let taxAmountHeaders = _.map(_.keys(this.props.allowedTaxRateMap), (taxType) => {
            return <CustomTableCell key={taxType}>{taxType + ' Amount'}</CustomTableCell>
        });

        return <React.Fragment>
                <Table size={'small'}>
                    <TableHead>
                        <TableRow>
                            <CustomTableCell>#</CustomTableCell>
                            <CustomTableCell>Product</CustomTableCell>
                            <CustomTableCell>Unit Price</CustomTableCell>
                            <CustomTableCell>Quantity</CustomTableCell>
                            {taxRateHeaders}
                            {taxAmountHeaders}
                            <CustomTableCell>Quotation Amount</CustomTableCell>
                            {!this.props.isSubmitted && <CustomTableCell>Actions</CustomTableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items}
                    </TableBody>
                </Table>
            </React.Fragment>
    }

}