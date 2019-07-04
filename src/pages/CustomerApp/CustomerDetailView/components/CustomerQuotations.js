import React from 'react';
import QuotationService from "../../../../services/QuotationService";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import _ from "lodash";
import NumberFormat from "react-number-format";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import Table from "@material-ui/core/Table";
import {TableCell} from "@material-ui/core";
import Moment from "react-moment";

export default class CustomerQuotations extends React.Component{

    constructor(props) {
        super(props);
        this.quotationService = new QuotationService();
        this.state = {
            quotations: []
        };
    }

    componentDidMount() {
        this.quotationService.getQuotationOverviewByCustomerId(this.props.customerId)
            .then(result => {
                let quotations = result.data;
                this.setState({quotations});});
    }

    createTableData() {
        return _.map(this.state.quotations, (quotation, index) => {
            return <TableRow key={quotation.quotationId}>
                <TableCell component="th" scope="row">
                    {index + 1}
                </TableCell>
                <TableCell>{quotation.quotationId}</TableCell>
                <TableCell> <Moment format={"MMM DD YYYY"}>{quotation.quotationDate}</Moment></TableCell>
                <TableCell><Moment format={"MMM DD YYYY"}>{quotation.dueDate}</Moment></TableCell>
                <TableCell>{quotation.taxTotal}</TableCell>
                <TableCell>{quotation.total}</TableCell>
                <TableCell>{quotation.status}</TableCell>
            </TableRow>
        });
    };

    render() {
        return <React.Fragment>
            <Table size={'small'}>
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>Quotation ID</TableCell>
                        <TableCell>Quotation Date</TableCell>
                        <TableCell>Due Date</TableCell>
                        <TableCell>Tax Amount</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.createTableData()}
                </TableBody>
            </Table>
        </React.Fragment>;
    }

}