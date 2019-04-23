import React from 'react';
import {Table} from "reactstrap";
import QuotationItem from "./QuotationItem";
import _ from "lodash";

export default class QuotationItemList extends React.Component{

    constructor(props) {
        super(props);
    }

    render() {
        let items = _.map(this.props.quotationItems, (quotationItem, index) => {
            return <QuotationItem key={quotationItem.productName + '-' + index} item={quotationItem} index={index}/>
        });

        return <div className="table-responsive">
            <Table className={'mb-0'}>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Product Name & Description</th>
                    <th>Unit Price</th>
                    <th>Quantity</th>
                    <th>Quotation Amount</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {items}
                </tbody>
            </Table>
        </div>;
    }

}