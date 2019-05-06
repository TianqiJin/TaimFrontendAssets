import React from 'react';
import {Button, Input} from "reactstrap";
import NewQuotationActions from "../actiions/NewQuotationActions";
import QuotationItemNoteModal from "./QuotationItemNoteModal";

export default class QuotationItem extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            noteModal : false
        }
    }

    onBlurItemQuantity = (event)  => {
        NewQuotationActions.editQuotationItemQuantity(event.target.value, this.props.index);
    };

    onClickRemoveItem = ()  => {
        NewQuotationActions.removeQuotationItem(this.props.index)
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
                <Button onClick={this.onClickEditItemNote} className={'mr-1'} ><i className={"ft-edit ft-2x"}/></Button>
                <QuotationItemNoteModal modal={this.state.noteModal}
                                        toggle={this.onToggleItemNodeModal}
                                        item={this.props.item}
                                        index={this.props.index}/>
                <Button onClick={this.onClickRemoveItem}><i className={"ft-trash-2 ft-2x"}/></Button>
            </td>
        </tr>
    }
}