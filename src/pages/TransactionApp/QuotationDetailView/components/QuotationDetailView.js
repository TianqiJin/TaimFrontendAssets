import React from 'react';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
import _ from "lodash";
import QuotationDetailStore from "../stores/QuotationDetailStore";
import QuotationDetailActions from "../actions/QuotationDetailActions";
import QuotationItemList from "./QuotationItemList";
import QuotationTotalSummary from "./QuotationTotalSummary";
import {Wrapper} from "../../../../components";
import Toolbar from "@material-ui/core/Toolbar";
import {Card, CardContent, Grid, Typography, withStyles} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import TextField from "@material-ui/core/es/TextField/TextField";
import QuotationService from "../../../../services/QuotationService";
import CustomerService from "../../../../services/CustomerService";
import ProductService from "../../../../services/ProductService";
import {withRouter} from "react-router-dom";
import 'react-block-ui/style.css';
import CircularProgress from "@material-ui/core/CircularProgress";
import QuotationSummary from "./QuotationSummary";

const styles = theme => ({
    appBar: {
        marginBottom: theme.spacing(3),
        boxShadow: 'none'
    },
    button: {
        width: '300px',
        float: 'right'
    }
});

class QuotationDetailView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            quotation : {quotationSummary: {}, quotationCustomer: {}, quotationItems: []},
            productList: [],
            customerList: [],
            processing : false,
            submitSuccessful : false
        };
        this.quotationService = new QuotationService();
        this.customerService = new CustomerService();
        this.productService = new ProductService();
    }

    componentDidMount() {
        this.unsubscribe_store = QuotationDetailStore.listen(this.onStoreUpdate);
        let quotationId = this.props.match.params.quotationId;
        if (quotationId) {
            this.quotationService.getQuotationByQuotationId(quotationId)
                .then(result => {
                    this.setState({quotation: result.data});
                    QuotationDetailActions.updateStoreQuotation(this.state.quotation);
                });
        } else {
            this.quotationService.initNewQuotation()
                .then(result => {
                    this.setState({quotation: result.data});
                    QuotationDetailActions.updateStoreQuotation(this.state.quotation);
                });
        }

        this.customerService.getAllCustomers()
            .then(result => {
                this.setState({customerList: result.data});
            });

        this.productService.getAllProducts()
            .then(result => {
                this.setState({productList: result.data});
            });
    }

    componentWillUnmount() {
        this.unsubscribe_store();
    }

    onStoreUpdate = (status, quotation) => {
        if (status === QuotationDetailView.UPDATE_ONLY) {
            this.setState({
                quotation: quotation
            });
        } else if (status === QuotationDetailView.SUBMIT_SUCCESSFUL) {
            this.props.history.push('/transaction-app/quotations/' + quotation.quotationSummary.quotationId);
            this.quotationService.getQuotationByQuotationId(quotation.quotationSummary.quotationId)
                .then(result => {
                    this.setState({quotation: result.data, processing: false});
                    QuotationDetailActions.updateStoreQuotation(this.state.quotation);
                });
        }
    };

    onSelectProduct = (event) => {
        let selectedProduct = _.find(this.state.productList, (product) => {
            return product.sku === event.target.value;
        });

        let checkProduct = _.find(this.state.quotation.quotationItems, (product) => {
            return product.sku === selectedProduct.sku;
        });

        if (!checkProduct) {
            QuotationDetailActions.selectProduct(selectedProduct);
        }
    };

    onChangeProcessingStatus = (status) => {
        this.setState({processing: status});
    };

    createQuotationDetailView() {
        const {classes} = this.props;

        let productListOptions = _.map(this.state.productList, (product) => {
            let displayValue = product.sku;
            return <option key={product.id} value={product.sku}>{displayValue}</option>
        });


        return <React.Fragment>
            <Card>
                <CardContent>
                   <Grid container justify={'space-between'}>
                       <QuotationSummary quotation={this.state.quotation}
                                         customerList={this.state.customerList}
                                         onChangeProcessingStatus={this.onChangeProcessingStatus}
                                         isSubmitted={this.state.quotation.submitted}/>
                   </Grid>
                    {!this.state.quotation.submitted && <Grid container spacing={2} className={'pt-3'}>
                        <Grid item sm={3}>
                            <TextField select
                                       id="product-select"
                                       label="Select Product"
                                       onChange={this.onSelectProduct}
                                       variant="outlined"
                                       margin="dense"
                                       defaultValue={''}
                                       SelectProps={{native: true}}
                                       InputLabelProps={{shrink: true,}}
                                       fullWidth>
                                {productListOptions}
                            </TextField>
                        </Grid>
                    </Grid>}

                    <Grid container spacing={2} className="pt-3">
                        <Grid item sm={12}>
                            <QuotationItemList quotationItems={this.state.quotation.quotationItems}
                                               allowedTaxRateMap={this.state.quotation.allowedTaxRateMap}
                                               isSubmitted={this.state.quotation.submitted}/>
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} style={{marginTop: "100px"}}>
                        <Grid item sm={6}/>
                        <Grid item sm={6}>
                            <QuotationTotalSummary quotationItems={this.state.quotation.quotationItems}/>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </React.Fragment>;
    }

    render() {
        return <Wrapper>
            <BlockUi tag={"div"} blocking={this.state.processing} loader={<CircularProgress color="secondary"/>}>
                {this.createQuotationDetailView()}
            </BlockUi>
        </Wrapper>
    }
}

QuotationDetailView.UPDATE_ONLY = 'r';
QuotationDetailView.SUBMIT_SUCCESSFUL = 's';
QuotationDetailView.SUBMIT_FAIL = 'f';


export default withRouter( withStyles(styles)(QuotationDetailView))
