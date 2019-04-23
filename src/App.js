import React, { Component } from 'react';
import './App.css';
import Layout from "./layouts/Layout";
import { Switch, Route } from 'react-router-dom';
import CustomerOverview from "./overviews/customer-overview/components/CustomerOverview";
import ProductOverview from "./overviews/product-overview/components/ProductOverview";
import NewCustomer from "./new-item-views/new-customer-view/components/NewCustomer";
import NewProduct from "./new-item-views/new-product-view/components/NewProduct";
import VendorOverview from "./overviews/vendor-overview/components/VendorOverview";
import NewVendor from "./new-item-views/new-vendor-view/components/NewVendor";
import NewQuotation from "./new-item-views/new-quotation-view/components/NewQuotation";


class App extends Component {

      render() {
          return (
                <div>
                    <Layout>
                        <Switch>
                            <Route path={'/quotations/new'} component={NewQuotation}/>
                            <Route path={'/customers/new'} component={NewCustomer}/>
                            <Route path={'/customers'} component={CustomerOverview}/>
                            <Route path={'/products/new'} component={NewProduct} />
                            <Route path={'/products'} component={ProductOverview}/>
                            <Route path={'/vendors/new'} component={NewVendor}/>
                            <Route path={'/vendors'} component={VendorOverview}/>
                        </Switch>
                    </Layout>
                </div>
          );
      }
}

export default App;
