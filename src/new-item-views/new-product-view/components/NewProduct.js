import React from 'react';
import ContentHeader from "../../../layouts/ContentHeader";
import ContentHeaderLeft from "../../../layouts/ContentHeaderLeft";
import ContentBody from "../../../layouts/ContentBody";
import {Button, Card, CardBody, CardTitle, Col, Form, FormGroup, Input, Label, Row} from "reactstrap";
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
import Spinner from "../../../layouts/Spinner";
import NewCustomerStore from "../../new-customer-view/stores/NewCustomerStore";
import NewCustomerActions from "../../new-customer-view/actions/NewCustomerActions";
import NewProductStore from "../stores/NewProductStore";

export default class NewProduct extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            product: null,
            processing: false
        };

        this.onEditSku = this.onEditSku.bind(this);
        this.onEditDisplayName = this.onEditDisplayName.bind(this);
        this.onEditTexture = this.onEditTexture.bind(this);
        this.onEditColor = this.onEditColor.bind(this);
        this.onEditTotalNumber = this.onEditTotalNumber.bind(this);
        this.onEditTotalVirtualNumber = this.onEditTotalVirtualNumber.bind(this);
        this.onEditUnitPrice = this.onEditUnitPrice.bind(this);
        this.onEditLength = this.onEditLength.bind(this);
        this.onEditHeight = this.onEditHeight.bind(this);
        this.onEditWidth = this.onEditWidth.bind(this);
        this.onEditPiecesPerBox = this.onEditPiecesPerBox.bind(this);
        this.onCreateNewProduct = this.onCreateNewProduct.bind(this);
    }

    componentDidMount() {
        this.unsubscribe_store = NewProductStore.listen(this.onStoreUpdate.bind(this));
        NewProductStore.initNewProduct();
    }

    componentWillUnmount() {
        this.unsubscribe_store();
    }

    onStoreUpdate(product) {
        this.setState({
            product: product,
            processing: false
        });
    }

    onEditSku(event) {
        NewProductStore.updateSku(event.target.value);
    }

    onEditDisplayName(event) {
        NewProductStore.updateDisplayName(event.target.value);
    }

    onEditTexture(event) {
        NewProductStore.updateTexture(event.target.value);
    }

    onEditColor(event) {
        NewProductStore.updateColor(event.target.value);
    }

    onEditTotalNumber(event) {
        NewProductStore.updateTotalNumber(event.target.value);
    }

    onEditTotalVirtualNumber(event) {
        NewProductStore.updateTotalVirtualNumber(event.target.value);
    }

    onEditUnitPrice(event) {
        NewProductStore.updateUnitPrice(event.target.value);
    }

    onEditLength(event) {
        NewProductStore.updateLength(event.target.value);
    }

    onEditWidth(event) {
        NewProductStore.updateWidth(event.target.value);
    }

    onEditHeight(event) {
        NewProductStore.updateHeight(event.target.value);
    }

    onEditPiecesPerBox(event) {
        NewProductStore.updatePiecesPerBox(event.target.value);
    }

    onCreateNewProduct(event) {
        event.preventDefault();
        NewProductStore.saveNewProduct();
    }

    createNewProduct() {
        return <Col>
            <ContentHeader>
                <ContentHeaderLeft>
                    <h3 className="content-header-title mb-0 d-inline-block">Create New Product</h3>
                </ContentHeaderLeft>
            </ContentHeader>
            <ContentBody>
                <Row>
                    <Col className="col-12">
                        <Card>
                            <div className="card-header">
                                <CardTitle>Product Profile</CardTitle>
                            </div>
                            <CardBody>
                                <Form onSubmit={this.onCreateNewProduct}>
                                    <h4 className="form-section"><i className="la la-briefcase"/>About Product</h4>
                                    <Row>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="sku">SKU</Label>
                                                <Input onBlur={this.onEditSku} type="text" id="sku" placeholder="SKU" name="sku"/>
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="displayname">Display Name</Label>
                                                <Input onBlur={this.onEditDisplayName} type="text" id="displayname" placeholder="Display Name" name="displayname"/>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="texture">Texture</Label>
                                                <Input onBlur={this.onEditTexture} type="text" id="texture" placeholder={'Texture'} name="texture"/>
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="color">Color</Label>
                                                <Input onBlur={this.onEditColor} type="text" id="color" placeholder="Color" name="color"/>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="totalNumber">Total Number</Label>
                                                <Input onBlur={this.onEditTotalNumber} type="number" step="any" id="totalNumber" placeholder="Total Number" name="totalNumber"/>
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="totalVirtualNumber">Total Virtual Number</Label>
                                                <Input onBlur={this.onEditTotalVirtualNumber} type="number" step="any" id="totalVirtualNumber" placeholder="Total Virtual Number" name="totalVirtualNumber"/>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="unitPrice">Unit Price</Label>
                                                <Input onBlur={this.onEditUnitPrice} type="number" step="any" id="unitPrice" placeholder="Unit Price" name="unitPrice"/>
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <h4 className="form-section"><i className="ft-mail"/>Product Measurement</h4>
                                    <Row>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="length">Length</Label>
                                                <Input onBlur={this.onEditLength} type="number" step="any" id="length" placeholder="Length" name="length"/>
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="width">Width</Label>
                                                <Input onBlur={this.onEditWidth} type="number" step="any" id="width" placeholder="Width" name="width"/>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="height">Height</Label>
                                                <Input onBlur={this.onEditHeight} type="number" step="any" id="height" placeholder="Height" name="height"/>
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="piecesPerBox">Pieces per box</Label>
                                                <Input onBlur={this.onEditPiecesPerBox} type="number" step="any" id="piecesPerBox" placeholder="Pieces per box" name="piecesPerBox"/>
                                            </FormGroup>
                                        </Col>
                                    </Row>

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
            {this.createNewProduct()}
        </BlockUi>
    }


}