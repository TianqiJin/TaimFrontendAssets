import React from "react";
import _ from "lodash";
import ProductOverviewActions from "../actions/ProductOverviewActions";
import ProductOverviewStore from "../stores/ProductOverviewStore";
import ContentHeader from "../../../layouts/ContentHeader";
import ContentHeaderLeft from "../../../layouts/ContentHeaderLeft";
import ContentHeaderRight from "../../../layouts/ContentHeaderRight";
import ContentBody from "../../../layouts/ContentBody";
import {ButtonGroup, Card, CardBody, CardTitle, Col, Input, Row, Table} from "reactstrap";
import {NavLink} from "react-router-dom";
import Alert from "../../../layouts/Alert";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

export default class ProductOverview extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            productList: null,
            gridOptions : {
                columnDefs: this.createColumnDefs()
            },
            rowData: [],
            quickFilterText: null,
            error: false
        };
    }

    componentDidMount() {
        this.unsubscribe_store = ProductOverviewStore.listen(this.onStoreUpdate.bind(this));
        ProductOverviewActions.updateProductList();
    }

    componentWillUnmount() {
        this.unsubscribe_store();
    }

    onStoreUpdate(productList) {
        this.setState({
            productList: productList,
            rowData: this.createRowData(productList)
        });
    }

    onGridReady = (params) => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;

        ProductOverviewActions.updateProductList();
    };

    onQuickFilterText = (event) => {
        this.setState({quickFilterText: event.target.value});
    };

    createColumnDefs() {
        return [
            {headerName: "#", field: "index", sortable: true},
            {headerName: "SKU", field: "sku", sortable: true, filter: "agTextColumnFilter"},
            {headerName: "Display Name", field: "displayName", sortable: true, filter: "agTextColumnFilter"},
            {headerName: "Texture", field: "texture", sortable: true, filter: "agTextColumnFilter"},
            {headerName: "Color", field: "color", sortable: true, filter: "agTextColumnFilter"},
            {headerName: "Total Number", field: "totalNumber", sortable: true, filter: "agNumberColumnFilter"},
            {headerName: "Total Number Virtual", field: "totalNumberVirtual", sortable: true, filter: "agNumberColumnFilter"}
            ];
    };

    createRowData = (productList) => {
        return _.map(productList, (product, index) => {
            return {
                index: index + 1,
                sku: product.sku,
                displayName: product.displayName,
                texture: product.texture,
                color: product.color,
                totalNumber: product.totalNum,
                totalNumberVirtual: product.totalNumVirtual
            };
        });
    };

    createAlertMessage(){
        return this.state.error && <Alert type={'danger'} content={'Unable to load products. Something went wrong.'}/>
    };

    onFirstDataRendered = (params) => {
        this.gridApi.sizeColumnsToFit();
    };

    createProductTableView() {
        return <div>
            <ContentHeader>
                <ContentHeaderLeft>
                    <h3 className="content-header-title mb-0 d-inline-block">Product Overview</h3>
                </ContentHeaderLeft>
                <ContentHeaderRight>
                    <ButtonGroup className={'float-md-right'}>
                        <NavLink to={"/products/new"} className="btn btn-info" type="button">
                            Create Product
                        </NavLink>
                    </ButtonGroup>
                </ContentHeaderRight>
            </ContentHeader>
            <ContentBody>
                <Row>
                    <Col>
                        <Card>
                            <div className="card-header">
                                <CardTitle>Product Overview</CardTitle>
                                <a className="heading-elements-toggle"><i className="la la-ellipsis-v font-medium-3"/></a>
                                <div className="heading-elements">
                                    <ul className="list-inline mb-0">
                                        <li><a data-action="reload"><i className="ft-rotate-cw"/></a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <CardBody>
                                <Col md={2}>
                                    <Input onChange={this.onQuickFilterText} type="text" id="filterText"
                                           placeholder="Type text to filter..." name="filterText"/>
                                </Col>
                                <Col>
                                    <div style={{ height: '100%', width: '100%' }} className="ag-theme-material" >
                                        <AgGridReact
                                            gridOptions={this.state.gridOptions}
                                            rowData={this.state.rowData}
                                            onGridReady={this.onGridReady}
                                            onFirstDataRendered={this.onFirstDataRendered}
                                            quickFilterText ={this.state.quickFilterText}>
                                        </AgGridReact>
                                    </div>
                                </Col>
                            </CardBody>
                        </Card>

                    </Col>
                </Row>
            </ContentBody>
        </div>
    }


    render() {
        return (
            <div>
                {this.createAlertMessage()}
                {this.createProductTableView()}
            </div>
        );
    }

}