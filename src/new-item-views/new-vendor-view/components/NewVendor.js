import React from 'react';
import ContentHeader from "../../../layouts/ContentHeader";
import ContentHeaderLeft from "../../../layouts/ContentHeaderLeft";
import ContentBody from "../../../layouts/ContentBody";
import _ from 'lodash';
import {Button, Card, CardBody, CardTitle, Col, Form, FormGroup, Input, Label, Modal, Row} from "reactstrap";
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
import Spinner from "../../../layouts/Spinner";
import NewVendorActions from "../actions/NewVendorActions";
import NewVendorStore from "../stores/NewVendorStore";

export default class NewVendor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            vendor: null,
            userTypes: null,
            processing: false
        };

        this.onEditEmail = this.onEditEmail.bind(this);
        this.onEditFirstName = this.onEditFirstName.bind(this);
        this.onEditLastName = this.onEditLastName.bind(this);
        this.onEditPhoneNumber = this.onEditPhoneNumber.bind(this);
        this.onChangeUserType = this.onChangeUserType.bind(this);
        this.onSaveNewVendor = this.onSaveNewVendor.bind(this);
    }

    componentDidMount() {
        this.unsubscribe_store = NewVendorStore.listen(this.onStoreUpdate.bind(this));
        NewVendorActions.initNewVendor();
        NewVendorActions.getAllUserTypes();
    }

    componentWillUnmount() {
        this.unsubscribe_store();
    }

    onStoreUpdate(data) {
        this.setState({
            vendor: data.vendor,
            userTypes: data.userTypes,
            processing: false
        });
    }

    onEditFirstName(event) {
        NewVendorActions.updateFirstName(event.target.value);
    }

    onEditLastName(event) {
        NewVendorActions.updateLastName(event.target.value);
    }

    onEditEmail(event) {
        NewVendorActions.updateEmail(event.target.value);
    }

    onEditPhoneNumber(event) {
        NewVendorActions.updatePhoneNumber(event.target.value);
    }

    onChangeUserType(event) {
        NewVendorActions.updateUserType(event.target.value);
    }

    onSaveNewVendor(event) {
        this.setState({processing:true});
        event.preventDefault();
        NewVendorActions.saveNewVendor();
    }

    createNewVendorView() {
        let userTypeOptions = _.map(this.state.userTypes, (userType) => {
            return <option key={userType.key} value={userType.key}>{userType.value}</option>;
        });

        return <Col>
            <ContentHeader>
                <ContentHeaderLeft>
                    <h3 className="content-header-title mb-0 d-inline-block">Create New Vendor</h3>
                </ContentHeaderLeft>
            </ContentHeader>
            <ContentBody>
                <Row>
                    <Col className="col-12">
                        <Card>
                            <div className="card-header">
                                <CardTitle>Vendor Profile</CardTitle>
                            </div>
                            <CardBody>
                                <Form onSubmit={this.onSaveNewVendor}>
                                    <h4 className="form-section"><i className="la la-eye"/>About Vendor</h4>
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
                                                <Label for="customertype">Vendor Type</Label>
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
            {this.createNewVendorView()}
        </BlockUi>
    }
}
