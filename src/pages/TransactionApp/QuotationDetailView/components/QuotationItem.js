import React from 'react';
import QuotationDetailActions from "../actions/QuotationDetailActions";
import QuotationItemNoteModal from "./QuotationItemNoteModal";
import _ from "lodash";
import NumberFormat from 'react-number-format';
import {DEFAULT_GST_RATE, DEFAULT_PST_RATE, TAXTYPE} from "../../../../utils/Constants";
import {IconButton, MenuItem, TableCell, TableRow, withStyles} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import EditIcon from '@material-ui/icons/Edit';
import TrashIcon from '@material-ui/icons/Delete';

const styles = theme => ({
    textField: {
        width: 100
    },
    selectField: {
        width: 70
    },
    iconButton: {
        marginLeft: theme.spacing(1),
    },
});

class QuotationItem extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            noteModal : false
        }
    }

    onChangeItemQuantity = (event)  => {
        QuotationDetailActions.editQuotationItemQuantity(event.target.value, this.props.index);
    };

    onClickRemoveItem = ()  => {
        QuotationDetailActions.removeQuotationItem(this.props.index)
    };

    onClickEditItemNote = () => {
        this.setState({
            noteModal : true
        });
    };

    onToggleItemNodeModal = () => {
        this.setState((previousState) => ({
            noteModal: !previousState.noteModal
        }));
    };

    onSelectTaxRate = (taxType) => (event) => {
        QuotationDetailActions.selectTaxRate(taxType, event.target.value, this.props.index);
    };

    render() {

        const {classes} = this.props;

        console.log(this.props.item.taxItems);

        let taxRateDropDowns = _.map(_.keys(this.props.allowedTaxRateMap), (taxType) => {
            let foundTaxItem =  _.find(this.props.item.taxItems, (taxItem) => {return taxItem.taxType === taxType});
            let rateOptions = _.map(this.props.allowedTaxRateMap[taxType], (taxRate) => {
                let selected = false;
                if (foundTaxItem) {
                    if (foundTaxItem.taxRate === taxRate) {
                        selected = true;
                    }
                } else {
                    if (taxType === TAXTYPE.GST && taxRate === DEFAULT_GST_RATE) {
                        selected  = true;
                    }
                    if (taxType === TAXTYPE.PST && taxRate === DEFAULT_PST_RATE) {
                        selected  = true;
                    }
                }
                return <option selected={selected}
                               key={taxType + '-' + taxRate}
                               value={taxRate}>{taxRate + '%'}
                </option>
            });

            return <TableCell key={taxType}>
                { this.props.isSubmitted
                    ? (<NumberFormat value={foundTaxItem.taxRate * 100}
                                     displayType={'text'}
                                     decimalScale={0}
                                     suffix={'%'}/>)
                    : (<TextField select
                                  id={taxType + '-dropdown'}
                                  SelectProps={{
                                      native: true
                                  }}
                                  className={classes.selectField}
                                  onChange={this.onSelectTaxRate(taxType)}>
                        {rateOptions}
                    </TextField>)
                }
            </TableCell>
        });

        let taxAmounts = _.map(_.keys(this.props.allowedTaxRateMap), (taxType) => {
            let foundTaxItem =  _.find(this.props.item.taxItems, (taxItem) => {return taxItem.taxType === taxType});
            if (foundTaxItem) {
                return <TableCell key={taxType}>
                    <NumberFormat value={foundTaxItem.taxAmount}
                                  displayType={'text'}
                                  decimalScale={2}
                                  thousandSeparator={true}
                                  prefix={'$'}/>
                </TableCell>
            }
        });

        return <TableRow key={this.props.item.sku}>
            <TableCell>{this.props.index + 1}</TableCell>
            <TableCell>
                {this.props.item.sku}
                <br/>
                {this.props.item.displayName}
            </TableCell>
            <TableCell>{this.props.item.unitPrice}</TableCell>
            <TableCell>
                { this.props.isSubmitted
                    ? (<NumberFormat value={this.props.item.quantity}
                                     displayType={'text'}
                                     decimalScale={2}
                                     thousandSeparator={true}/>)
                    : (<TextField value={this.props.item.quantity}
                               id="item-quantity"
                               className={classes.textField}
                               onChange={this.onChangeItemQuantity}/>)
                }
            </TableCell>
            {taxRateDropDowns}
            {taxAmounts}
            <TableCell>
                <NumberFormat value={this.props.item.subtotal} displayType={'text'} decimalScale={2} thousandSeparator={true} prefix={'$'}/>
            </TableCell>
            {!this.props.isSubmitted && <TableCell>
                <Button onClick={this.onClickRemoveItem} color={'secondary'} variant={'contained'} size={'small'}>
                    Delete
                    <TrashIcon className={classes.iconButton} fontSize={'small'}/>
                </Button>
            </TableCell>}
        </TableRow>
    }
}

export default withStyles(styles)(QuotationItem);