import React from 'react';
import {Button, Grid, Typography, withStyles} from "@material-ui/core";
import classnames from "classnames";
import TextField from "@material-ui/core/TextField";
import _ from "lodash";
import QuotationDetailActions from "../actions/QuotationDetailActions";
import moment from "moment";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

const styles = theme => ({
    button: {
        width: '300px',
        float: 'right'
    }
});

class QuotationSummary extends React.Component {
    
    constructor(props) {
        super(props);
    }

    onSelectCustomer = (event) => {
        let selectedCustomer = _.find(this.props.customerList, (customer) => {
            return customer.id == event.target.value;
        });

        console.log(selectedCustomer);

        QuotationDetailActions.selectCustomer(selectedCustomer);
    };

    onChangeQuotationId = (event) => {
        QuotationDetailActions.editQuotationId(event.target.value);
    };

    onChangeQuotationNote = (event) => {
        QuotationDetailActions.editQuotationNote(event.target.value);
    };

    onEditQuotationDate = (event) => {
        QuotationDetailActions.editQuotationDate(event.target.value);
    };

    onEditQuotationDueDate = (event) => {
        QuotationDetailActions.editQuotationDueDate(event.target.value);
    };

    onChangeQuotationBillFromAddress = (event) => {
        QuotationDetailActions.editQuotationBillFromAddress(event.target.value);
    };

    onBlurQuotationBillToAddress = (event) => {
        QuotationDetailActions.editQuotationBillToAddress(event.target.value);
    };

    onClickSaveButton = () => {
        this.props.onChangeProcessingStatus(true);
        QuotationDetailActions.saveQuotation(false);
    };

    onClickSubmitButton = () => {
        this.props.onChangeProcessingStatus(true);
        QuotationDetailActions.saveQuotation(true);
    };

    shouldPreventSaveAndSubmit() {
        return _.isEmpty(this.props.quotation.quotationCustomer) || _.isEmpty(this.props.quotation.quotationItems);
    }

    formatDateToString(date) {
        return moment(date).format("YYYY-MM-DD");
    }

    createEditableQuotationSummary() {
        let customerListOptions = _.map(this.props.customerList, (customer) => {
            let displayValue = customer.firstName + ' ' + customer.lastName;
            return <option key={customer.id} value={customer.id}>{displayValue}</option>
        });

        return <React.Fragment>
            <Grid container item style={{width : 1000}}>
                <Grid container item spacing={2} className={'pt-3'}>
                    <Grid item sm={3}>
                        {this.props.isSubmitted
                            ? (<div>
                                <Typography variant={"subtitle2"}>Quotation ID</Typography>
                                <Typography variant={"body1"}>{this.props.quotation.quotationSummary.quotationId}</Typography>
                            </div>)
                            : ( <TextField required
                                           value={this.props.quotation.quotationSummary.quotationId}
                                           id="quotation-number"
                                           label="Quotation Number"
                                           onChange={this.onChangeQuotationId}
                                           variant="outlined"
                                           margin="dense"
                                           InputLabelProps={{shrink: true}}
                                           fullWidth/>)}
                    </Grid>
                </Grid>

                <Grid container spacing={2} className={'pt-2'}>
                    <Grid item sm={3}>
                        {this.props.isSubmitted
                            ? (<div>
                                <Typography variant={"subtitle2"}>Quotation Date</Typography>
                                <Typography variant={"body1"}>{this.formatDateToString(this.props.quotation.quotationSummary.quotationDate)}</Typography>
                            </div>)
                            : <TextField
                                id="quotation-date"
                                label="Quotation Date"
                                type="date"
                                value={this.formatDateToString(this.props.quotation.quotationSummary.quotationDate)}
                                onChange={this.onEditQuotationDate}
                                variant="outlined"
                                margin="dense"
                                InputLabelProps={{shrink: true}}
                                fullWidth/>
                        }
                    </Grid>
                    <Grid item sm={3}>
                        {this.props.isSubmitted ?
                            (<div>
                                <Typography variant={"subtitle2"}>Quotation Due Date</Typography>
                                <Typography variant={"body1"}>{this.formatDateToString(this.props.quotation.quotationSummary.dueDate)}</Typography>
                            </div>) :
                            (<TextField
                                id="due-date"
                                label="Quotation Due Date"
                                type="date"
                                value={this.formatDateToString(this.props.quotation.quotationSummary.dueDate)}
                                onChange={this.onEditQuotationDueDate}
                                variant="outlined"
                                margin="dense"
                                InputLabelProps={{shrink: true}}
                                fullWidth/>)
                        }
                    </Grid>
                    <Grid item sm={3}>
                        {this.props.isSubmitted?
                            (<div>
                                <Typography variant={"subtitle2"}>Customer</Typography>
                                <Typography variant={"body1"}>{this.props.quotation.quotationCustomer.firstName + ' ' + this.props.quotation.quotationCustomer.lastName}</Typography>
                            </div>) :
                            (<TextField select
                                        id="customer-select"
                                        label="Select Customer"
                                        value={this.props.quotation.quotationCustomer.id}
                                        onChange={this.onSelectCustomer}
                                        variant="outlined"
                                        margin="dense"
                                        InputLabelProps={{shrink: true}}
                                        SelectProps={{native: true}}
                                        fullWidth>
                                <option selected disabled/>
                                {customerListOptions}
                            </TextField>)
                        }
                    </Grid>
                </Grid>
                <Grid container spacing={2} className={'pt-2'}>
                    <Grid item sm={3}>
                        {this.props.isSubmitted?
                            (<div>
                                <Typography variant={"subtitle2"}>Customer</Typography>
                                <Typography variant={"body1"}>{this.props.quotation.quotationSummary.billFromAddress}</Typography>
                            </div>) :
                            ( <TextField value={this.props.quotation.quotationSummary.billFromAddress}
                                         id="bill-from"
                                         label="Bill From"
                                         onChange={this.onChangeQuotationBillFromAddress}
                                         variant="outlined"
                                         multiline
                                         InputLabelProps={{shrink: true}}
                                         rowsMax="4"
                                         fullWidth/>)
                        }
                    </Grid>
                    <Grid item sm={3}>
                        {this.props.isSubmitted?
                            (<div>
                                <Typography variant={"subtitle2"}>Bill To Address</Typography>
                                <Typography variant={"body1"}>{this.props.quotation.quotationSummary.billToAddress}</Typography>
                            </div>) :
                            (<TextField required
                                        value={this.props.quotation.quotationSummary.billToAddress}
                                        id="bill-to"
                                        label="Bill To"
                                        onBlur={this.onBlurQuotationBillToAddress}
                                        variant="outlined"
                                        multiline
                                        InputLabelProps={{shrink: true}}
                                        rowsMax="4"
                                        fullWidth/>
                            )
                        }
                    </Grid>
                </Grid>
                <Grid container spacing={2} className={'pt-2'}>
                    <Grid item sm={5}>
                        {this.props.isSubmitted?
                            (<div>
                                <Typography variant={"subtitle2"}>Quotation Note</Typography>
                                <Typography variant={"body1"}>{this.props.quotation.quotationSummary.note}</Typography>
                            </div>) :
                            (<TextField value={this.props.quotation.quotationSummary.note}
                                        id="quotation-note"
                                        label="Quotation Note"
                                        onChange={this.onChangeQuotationNote}
                                        variant="outlined"
                                        multiline
                                        InputLabelProps={{shrink: true}}
                                        rowsMax="4"
                                        fullWidth/>)
                        }
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    }

    createQuotationOperationButtons() {
        const {classes} = this.props;

        if (!this.props.isSubmitted) {
            return <Grid item sm={2}>
                <Button variant={"contained"}
                        color={'primary'}
                        onClick={this.onClickSaveButton}
                        disabled={this.shouldPreventSaveAndSubmit()}
                        className={classnames('mb-1', classes.button)}>
                    Save and Submit Later
                </Button>
                <Button variant={"contained"}
                        onClick={this.onClickSubmitButton}
                        disabled={this.shouldPreventSaveAndSubmit()}
                        className={classnames(classes.button)}>
                    Submit Quotation
                </Button>
            </Grid>;
        } else {
            return <Grid item sm={2}>
                <Button variant={"contained"}
                        color={'primary'}
                        disabled={this.shouldPreventSaveAndSubmit()}
                        className={classnames('mb-1', classes.button)}>
                    Convert To Purchase Order
                </Button>
            </Grid>;
        }
    }

    render() {
        return <React.Fragment>
            <Grid container item sm={10}>
                <Grid item sm={8}>
                    <Typography variant={'h6'}>QUOTATION - {this.props.quotation.quotationSummary.status} </Typography>
                </Grid>
                {this.createEditableQuotationSummary()}
            </Grid>
            {this.createQuotationOperationButtons()}
        </React.Fragment>
    }
}

export default withStyles(styles)(QuotationSummary);