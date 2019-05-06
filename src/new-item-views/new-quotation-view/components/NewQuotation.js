import React from 'react';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
import Spinner from "../../../layouts/Spinner";
import _ from "lodash";
import {Alert, Button, ButtonGroup, Card, CardBody, Col, Input, Label, Row} from "reactstrap";
import ContentHeader from "../../../layouts/ContentHeader";
import ContentHeaderLeft from "../../../layouts/ContentHeaderLeft";
import ContentBody from "../../../layouts/ContentBody";
import NewQuotationStore from "../stores/NewQuotationStore";
import NewQuotationActions from "../actiions/NewQuotationActions";
import QuotationItemList from "./QuotationItemList";
import QuotationTotalSummary from "./QuotationTotalSummary";

export default class NewQuotation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            quotation : {quotationSummary: {}, quotationCustomer: {}, quotationItems: []},
            productList: [],
            customerList: [],
            processing : false,
            alertVisible : false,
            alertMessage : null
        };
    }

    componentDidMount() {
        this.unsubscribe_store = NewQuotationStore.listen(this.onStoreUpdate.bind(this));
        NewQuotationActions.getAllProducts();
        NewQuotationActions.getAllCustomers();
        NewQuotationActions.initQuotation();
    }

    componentWillUnmount() {
        this.unsubscribe_store();
    }

    onStoreUpdate(data) {
        this.setState({
            quotation: data.quotation,
            productList: data.productList,
            customerList: data.customerList,
            processing: false
        });
    }

    onSelectCustomer = (event) => {
        let selectedCustomer = _.find(this.state.customerList, (customer) => {
            return customer.id == event.target.value;
        });

       NewQuotationActions.selectCustomer(selectedCustomer);
    };

    onSelectProduct = (event) => {
        let selectedProduct = _.find(this.state.productList, (product) => {
            return product.sku === event.target.value;
        });

        let checkProduct = _.find(NewQuotationStore.getData().quotation.quotationItems, (product) => {
            return product.sku === selectedProduct.sku;
        });

        if (checkProduct) {
            this.setState({
                alertVisible : true,
                alertMessage : 'Product ' + checkProduct.sku + " has already been added!"
            })
        } else {
            NewQuotationActions.selectProduct(selectedProduct);
        }
    };

    onBlurQuotationId = (event) => {
        NewQuotationActions.editQuotationId(event.target.value);
    };

    onBlurQuotationNote = (event) => {
        NewQuotationActions.editQuotationNote(event.target.value);
    };

    onEditQuotationDate = (event) => {
        NewQuotationActions.editQuotationDate(event.target.value);
    };

    onEditQuotationDueDate = (event) => {
        NewQuotationActions.editQuotationDueDate(event.target.value);
    };

    onDismissAlert = () => {
        this.setState({alertVisible : false});
    };

    onClickSaveButton = () => {
        NewQuotationActions.saveQuotation();
    };

    createNewQuotation() {
        let productListOptions = _.map(this.state.productList, (product) => {
            let displayValue = product.sku;
            return <option key={product.id} value={product.sku}>{displayValue}</option>
        });

        let customerListOptions = _.map(this.state.customerList, (customer) => {
            let displayValue = customer.firstName + ' ' + customer.lastName;
            return <option key={customer.id} value={customer.id}>{displayValue}</option>
        });

        let alert = this.state.alertVisible &&
            <Alert color="info" isOpen={this.state.alertVisible} toggle={this.onDismissAlert} className={' alert-icon-right alert-arrow-right alert-warning alert-dismissible mb-2'}>
                <span className="alert-icon"><i className="la la-warning"/></span>
                {this.state.alertMessage}
            </Alert>;

        return <Col>
            <ContentHeader>
                <ContentHeaderLeft>
                    <h3 className="content-header-title mb-0 d-inline-block">Create New Quotation</h3>
                </ContentHeaderLeft>
            </ContentHeader>
            <ContentBody>
                <Card>
                    <CardBody>
                        <Row>
                            <Col md = {{size : 6, offset : 3}}>
                                {alert}
                            </Col>
                        </Row>
                        <Row>
                            <Col md={10}>
                                <Row>
                                    <Col md={8} className={'text-center text-md-left'}>
                                        <h2>QUOTATION - {this.state.quotation.quotationSummary.status}</h2>
                                    </Col>
                                </Row>
                                <Row className={'pt-3 pb-2'}>
                                    <Col md={3}>
                                        <Label for={'quotation-number'}>Quotation Number</Label>
                                        <Input key={this.state.quotation.quotationSummary.quotationId}
                                               id={'quotation-number'}
                                               placeholder={'Set Quotation Number'}
                                               defaultValue={this.state.quotation.quotationSummary.quotationId}
                                               onBlur={this.onBlurQuotationId}/>
                                    </Col>
                                    <Col md={3}>
                                        <Label for={'customer-select'}>Customer</Label>
                                        <Input type={'select'} id={'customer-select'} onChange={this.onSelectCustomer}>
                                            <option selected={'true'} disabled={'true'}>
                                                Select a customer
                                            </option>
                                            {customerListOptions}
                                        </Input>
                                    </Col>

                                </Row>
                                <Row className={'pt-2 pb-2'}>
                                    <Col md={3}>
                                        <Label for={'quotation-date'}>Quotation Date</Label>
                                        <Input type={"date"} id={'quotation-date'} onChange={this.onEditQuotationDate}/>
                                    </Col>
                                    <Col md={3}>
                                        <Label for={'due-date'}>Due Date</Label>
                                        <Input type={"date"} id={'due-date'} onChange={this.onEditQuotationDueDate}/>
                                    </Col>
                                </Row>
                                <Row className={'pt-2 pb-2'}>
                                    <Col md={3}>
                                        <Label for={'bill-to'}>Bill To</Label>
                                        <Input type={"textarea"} id={'bill-to'}/>
                                    </Col>
                                    <Col md={3}>
                                        <Label for={'bill-from'}>Bill From</Label>
                                        <Input type={"textarea"} id={'bill-from'}/>
                                    </Col>
                                    <Col md={4}>
                                        <Label for={'note'}>Note</Label>
                                        <Input type={"textarea"} id={'note'} onBlur={this.onBlurQuotationNote}/>
                                    </Col>
                                </Row>
                                <Row className={'pt-3'}>
                                    <Col md={3}>
                                        <Input type="select" onChange={this.onSelectProduct}>
                                            <option selected={'true'} disabled={'true'}>
                                                Select a product
                                            </option>
                                            {productListOptions}
                                        </Input>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={2}>
                                <Row>
                                    <Col>
                                        <ButtonGroup vertical>
                                            <Button color={'primary'} style={{marginBottom : '10px'}} onClick={this.onClickSaveButton}>
                                                Save and Submit Later
                                            </Button>
                                            <Button color={'secondary'}>Submit Quotation</Button>
                                        </ButtonGroup>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row className="pt-2">
                            <div className="table-responsive">
                                <Col>
                                    <QuotationItemList quotationItems={this.state.quotation.quotationItems}/>
                                </Col>
                            </div>
                        </Row>
                        <Row style={{marginTop : '15em'}}>
                            <Col md={{size : 5, offset : 7}}>
                                <QuotationTotalSummary quotationItems={this.state.quotation.quotationItems}/>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </ContentBody>
        </Col>;
    }

    render() {
        return <BlockUi tag={"div"} blocking={this.state.processing} loader={<Spinner/>}>
            {this.createNewQuotation()}
        </BlockUi>
    }

}