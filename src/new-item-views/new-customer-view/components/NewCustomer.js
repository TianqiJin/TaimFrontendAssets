import React from 'react';
import ContentHeader from "../../../layouts/ContentHeader";
import ContentHeaderLeft from "../../../layouts/ContentHeaderLeft";
import ContentBody from "../../../layouts/ContentBody";
import NewCustomerActions from "../actions/NewCustomerActions";
import NewCustomerStore from "../stores/NewCustomerStore";
import _ from 'lodash';
import {Button, Card, CardBody, CardTitle, Col, Form, FormGroup, Input, Label, Modal, Row} from "reactstrap";
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
import Spinner from "../../../layouts/Spinner";

export default class NewCustomer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            customer: null,
            customerClasses: null,
            userTypes: null,
            processing: false
        };
    }

    componentDidMount() {
        this.unsubscribe_store = NewCustomerStore.listen(this.onStoreUpdate.bind(this));
        NewCustomerActions.initNewCustomer();
        NewCustomerActions.getAllCustomerClasses();
        NewCustomerActions.getAllUserTypes();
    }

    componentWillUnmount() {
        this.unsubscribe_store();
    }

    onStoreUpdate(data) {
        this.setState({
            customer: data.customer,
            customerClasses: data.customerClasses,
            userTypes: data.userTypes,
            processing: false
        });
    }

    onEditFirstName = (event) => {
        NewCustomerActions.updateFirstName(event.target.value);
    };

    onEditLastName = (event) => {
        NewCustomerActions.updateLastName(event.target.value);
    };

    onEditEmail = (event) => {
        NewCustomerActions.updateEmail(event.target.value);
        console.log(this.state.customer);
    };

    onEditPhoneNumber = (event) => {
        NewCustomerActions.updatePhoneNumber(event.target.value);
    };

    onEditPstNumber = (event) => {
        NewCustomerActions.updatePstNumber(event.target.value);
    };

    onEditStoreCredit = (event) => {
        NewCustomerActions.updateStoreCredit(event.target.value);
    };

    onChangeCustomerClass = (event) => {
        NewCustomerActions.updateCustomerClass(event.target.value);
    };

    onChangeUserType = (event) => {
        NewCustomerActions.updateUserType(event.target.value);
    };

    onSaveNewCustomer = (event) => {
        this.setState({processing:true});
        event.preventDefault();
        NewCustomerActions.saveNewCustomer();
    };

    createNewCustomerView() {

        let customerClassesOptions = _.map(this.state.customerClasses, (customerClass) => {
            let displayValue = customerClass.customerClassName + ' (' + customerClass.customerDiscount + '% off)';
            return <option key={customerClass.id} value={customerClass.customerClassName}>{displayValue}</option>
        });

        let userTypeOptions = _.map(this.state.userTypes, (userType) => {
            return <option key={userType.key} value={userType.key}>{userType.value}</option>;
        });

        return <Col>
            <ContentHeader>
                <ContentHeaderLeft>
                    <h3 className="content-header-title mb-0 d-inline-block">Create New Customer</h3>
                </ContentHeaderLeft>
            </ContentHeader>
            <ContentBody>
                <Row>
                    <Col className="col-12">
                        <Card>
                            <div className="card-header">
                                <CardTitle>Customer Profile</CardTitle>
                            </div>
                            <CardBody>
                                <Form onSubmit={this.onSaveNewCustomer}>
                                    <h4 className="form-section"><i className="la la-eye"/>About Customer</h4>
                                    <Row>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="firstname">First Name</Label>
                                                <Input onBlur={this.onEditFirstName} type="text" id="firstname"
                                                       className="border-primary" placeholder="Name" name="firstname"/>
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="lastname">Last Name</Label>
                                                <Input onBlur={this.onEditLastName} type="text" id="lastname"
                                                       className="form-control border-primary" placeholder="Last Name"
                                                       name="lastname"/>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="customertype">Customer Type</Label>
                                                <Input type={'select'} onChange={this.onChangeUserType}
                                                       id="customertype" name="customerType"
                                                       className="form-control border-primary">
                                                    <option value="none" selected="" disabled="">Select a customer
                                                        type
                                                    </option>
                                                    {userTypeOptions}
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="customerclass">Customer Class</Label>
                                                <Input type={'select'} onChange={this.onChangeCustomerClass}
                                                       id="customerclass" name="customerClass"
                                                       className="form-control border-primary">
                                                    <option value="0" selected="" disabled="">Select a customer class
                                                    </option>
                                                    {customerClassesOptions}
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="pstnumber">PST Number</Label>
                                                <Input onBlur={this.onEditPstNumber} type="text" id="pstnumber"
                                                       className="border-primary"
                                                       placeholder="PST Number" name="pstNumber"/>
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="storecredit">Store Credit</Label>
                                                <Input onBlur={this.onEditStoreCredit} type="number" step={'any'} id="storecredit"
                                                       className="border-primary" placeholder="Store Credit"
                                                       name="storeCredit"/>
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <h4 className="form-section"><i className="ft-mail"/>Contact Info</h4>

                                    <FormGroup>
                                        <Label for="email">Email</Label>
                                        <Input onBlur={this.onEditEmail} className="border-primary" type="email"
                                               placeholder="Email" id="email"/>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="contactnumber">Contact Number</Label>
                                        <Input onBlur={this.onEditPhoneNumber} className="border-primary"
                                               id="contactnumber" type="tel" placeholder="Contact Number"/>
                                    </FormGroup>

                                    <div className="form-actions right">
                                        <Button type="button" color={'warning'} className="mr-1">
                                            <i className="ft-x"/> Cancel
                                        </Button>
                                        <Button type="submit" color={'primary'}>
                                            <i className="la la-check-square-o"/> Save
                                        </Button>
                                    </div>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </ContentBody>
        </Col>;
    }

    render() {
        return <BlockUi tag={"div"} blocking={this.state.processing} loader={<Spinner/>}>
            {this.createNewCustomerView()}
        </BlockUi>
    }
}
