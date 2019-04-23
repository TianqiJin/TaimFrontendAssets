import React from 'react';
import {Table} from "reactstrap";

import _ from 'lodash';
export default class QuotationTotalSummary extends React.Component{

    constructor(props) {
        super(props);
    }

    render() {
        let total = 0;
        _.forEach(this.props.quotationItems, (item) => {
            total += item.subtotal;
        });

        return <div>
            <p className="lead">Total due</p>
            <div className="table-responsive">
                <Table>
                    <tbody>
                    <tr>
                        <td>Sub Total</td>
                        <td className="text-right">{total}</td>
                    </tr>
                    <tr>
                        <td className="text-bold-800">Total</td>
                        <td className="text-bold-800 text-right">{total}</td>
                    </tr>
                    </tbody>
                </Table>
            </div>
        </div>
    }
}