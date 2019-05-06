import React from "react";
import CustomerOverviewStore from "../stores/CustomerOverviewStore";
import _ from "lodash";
import CustomerOverviewActions from "../actions/CustomerOverviewActions";
import ContentBody from "../../../layouts/ContentBody";
import ContentHeader from "../../../layouts/ContentHeader";
import ContentHeaderLeft from "../../../layouts/ContentHeaderLeft";
import ContentHeaderRight from "../../../layouts/ContentHeaderRight";
import {NavLink} from "react-router-dom";
import {ButtonGroup, Card, CardBody, CardTitle, Col, Input, Row, Table} from "reactstrap";
import {AgGridReact} from "ag-grid-react";

export default class CustomerOverview extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            customerList: null,
            gridOptions : {
                columnDefs: this.createColumnDefs()
            },
            quickFilterText: null,
            rowData: []
        };
    }

    componentDidMount() {
        this.unsubscribe_store = CustomerOverviewStore.listen(this.onStoreUpdate.bind(this));
    }

    componentWillUnmount() {
        this.unsubscribe_store();
    }

    onStoreUpdate(customerList){
        this.setState({
            customerList: customerList,
            rowData: this.createRowData(customerList)
        });
    }

    onGridReady = (params) => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;

        CustomerOverviewActions.updateCustomerList();
    };

    onQuickFilterText = (event) => {
        this.setState({quickFilterText: event.target.value});
    };

    createColumnDefs() {
        return [
            {headerName: "#", field: "index", sortable: true},
            {headerName: "Name", field: "name", sortable: true, filter: "agTextColumnFilter"},
            {headerName: "Email", field: "email", sortable: true, filter: "agTextColumnFilter"},
            {headerName: "Phone", field: "phone", sortable: true, filter: "agTextColumnFilter"},
            {headerName: "Type", field: "type", sortable: true, filter: "agTextColumnFilter"},
            {headerName: "Customer Class", field: "customerClass", sortable: true, filter: "agTextColumnFilter"}
            ];
    };

    createRowData = (customerList) => {
        return _.map(customerList, (customer, index) => {
            return {
                index: index + 1,
                name: customer.firstName +' ' + customer.lastName,
                email: customer.email,
                phone: customer.phone,
                type: customer.userType,
                customerClass: customer.userClass
            };
        });
    };

    onFirstDataRendered = (params) => {
        this.gridApi.sizeColumnsToFit();
    };

    render() {
        return (
            <div>
                <ContentHeader>
                    <ContentHeaderLeft>
                        <h3 className="content-header-title mb-0 d-inline-block">Customer Overview</h3>
                    </ContentHeaderLeft>
                    <ContentHeaderRight>
                        <ButtonGroup className={'float-md-right'}>
                            <NavLink to={"/customers/new"} className="btn btn-info" type="button" aria-haspopup="true" aria-expanded="false">
                                Create Customer
                            </NavLink>
                        </ButtonGroup>
                    </ContentHeaderRight>
                </ContentHeader>
                <ContentBody>
                    <Row>
                        <Col>
                            <Card>
                                <div className={'card-header'}>
                                    <CardTitle>Customer Overview</CardTitle>
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
                                                quickFilterText={this.state.quickFilterText}>
                                            </AgGridReact>
                                        </div>
                                    </Col>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </ContentBody>
            </div>
        );
    }

}