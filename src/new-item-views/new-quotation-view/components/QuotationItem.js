import React from 'react';
import {Button, Input} from "reactstrap";
import NewQuotationActions from "../actiions/NewQuotationActions";

export default class QuotationItem extends React.Component{

    constructor(props) {
        super(props);
        this.onClickRemoveItem = this.onClickRemoveItem.bind(this);
        this.onBlurItemQuantity = this.onBlurItemQuantity.bind(this);
    }

    onBlurItemQuantity(event) {
        NewQuotationActions.editQuotationItemQuantity(event.target.value, this.props.index);
    }

    onClickRemoveItem() {
        NewQuotationActions.removeQuotationItem(this.props.index)
    }

    render() {
        return <tr key={this.props.item.sku}>
            <td>{this.props.index + 1}</td>
            <td>
                {this.props.item.sku}
                <br/>
                {this.props.item.displayName}
            </td>
            <td>{this.props.item.unitPrice}</td>
            <td>
                <Input type={'number'}
                       step={'0.001'}
                       defaultValue={this.props.item.quantity}
                       style={{'width': '7em'}}
                       onBlur={this.onBlurItemQuantity}/>
            </td>
            <td>{this.props.item.subtotal}</td>
            <td>
                <Button onClick={this.onClickRemoveItem}><i className="ft-trash-2 ft-2x"/></Button>
            </td>
        </tr>
    }
}