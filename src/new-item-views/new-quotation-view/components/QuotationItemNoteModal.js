import React from 'react';
import {Button, ButtonGroup, Input, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import NewQuotationActions from "../actiions/NewQuotationActions";

export default class QuotationItemNoteModal extends React.Component {

    constructor(props) {
        super(props);
    }

    onClickConfirmButton = (event) => {
        NewQuotationActions.editQuotationItemNote(event.target.value, this.props.index);
        this.props.toggle();
    };


    render() {
        let modalHeading = 'Edit ' + this.props.item.sku + ' note';
        return <Modal isOpen={this.props.modal} toggle={this.props.toggle}>
            <ModalHeader toggle={this.props.toggle}>{modalHeading}</ModalHeader>
            <ModalBody>
                <Input type={"textarea"} id={'bill-from'} defaultValue={this.props.item.note}/>
            </ModalBody>
            <ModalFooter>
                <ButtonGroup>
                    <Button color="primary" onClick={this.onClickConfirmButton} className={'mr-1'}>Confirm</Button>
                    <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
                </ButtonGroup>
            </ModalFooter>
        </Modal>
    }


}