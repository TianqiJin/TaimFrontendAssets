import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';

export default class Sidebar extends React.Component {

    constructor(props) {
        super(props);
    }

    getNavLinkClass(path) {
        return this.props.location.pathname === path ? 'active' : '';
    }

    render() {
        return (
            <div className="main-menu menu-fixed menu-dark menu-accordion menu-shadow" data-scroll-to-active="true">
                <div className="main-menu-content">
                    <ul className="navigation navigation-main" id="main-menu-navigation" data-menu="menu-navigation">
                        <li className=" nav-item">
                            <a href="../../../html/ltr/vertical-modern-menu-template/index.html">
                                <i className="la la-home"/>
                                <span className="menu-title" data-i18n="">Dashboard</span>
                                <span className="badge badge badge-info badge-pill float-right mr-2">5</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="#">
                                <i className="la la-rocket"/><span className="menu-title" data-i18n="">Transaction</span>
                                </a>
                            <ul className="menu-content">
                                <li className={this.getNavLinkClass("/quotations")}>
                                    <NavLink to="/quotations" className="menu-item" >Quotations Overview</NavLink>
                                </li>
                                <li className={this.getNavLinkClass("/invoices")}>
                                    <NavLink to="/invoices" className="menu-item" >Invoices Overview</NavLink>
                                </li>
                                <li className={this.getNavLinkClass("/transactions/new")}>
                                    <NavLink to="/transactions/new" className="menu-item" >New Transaction</NavLink>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <a href="#">
                                <i className="la la-briefcase"/><span className="menu-title" data-i18n="">Product</span>
                            </a>
                            <ul className="menu-content">
                                <li className={this.getNavLinkClass("/products")}>
                                    <NavLink to="/products" className="menu-item" >Products Overview</NavLink>
                                </li>
                                <li className={this.getNavLinkClass("/products/new")}>
                                    <NavLink to="/products/new" className="menu-item" >New Product</NavLink>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <a href="#">
                                <i className="ft-user"/><span className="menu-title" data-i18n="">Customer</span>
                            </a>
                            <ul className="menu-content">
                                <li className={this.getNavLinkClass("/customers")}>
                                    <NavLink to="/customers" className="menu-item" >Customers Overview</NavLink>
                                </li>
                                <li className={this.getNavLinkClass("/customers/new")}>
                                    <NavLink to="/customers/new" className="menu-item" >New Customer</NavLink>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <a href="#">
                                <i className="la la-rocket"/><span className="menu-title" data-i18n="">Vendor</span>
                            </a>
                            <ul className="menu-content">
                                <li className={this.getNavLinkClass("/vendors")}>
                                    <NavLink to="/vendors" className="menu-item" >Vendors Overview</NavLink>
                                </li>
                                <li className={this.getNavLinkClass("/vendors/new")}>
                                    <NavLink to="/vendors/new" className="menu-item" >New Vendor</NavLink>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <a href="#">
                                <i className="la la-rocket"/><span className="menu-title" data-i18n="">Employer</span>
                            </a>
                            <ul className="menu-content">
                                <li className={this.getNavLinkClass("/employers")}>
                                    <NavLink to="/employers" className="menu-item" >Employers Overview</NavLink>
                                </li>
                                <li className={this.getNavLinkClass("/employers/new")}>
                                    <NavLink to="/employers/new" className="menu-item" >New Employer</NavLink>
                                </li>
                            </ul>
                        </li>
                        <li className="navigation-header">
                            <span>Support</span>
                            <i className="la la-ellipsis-h ft-minus" data-toggle="tooltip" data-placement="right" data-original-title="Support"/>
                        </li>
                        <li className=" nav-item">
                            <a href="https://pixinvent.ticksy.com/">
                                <i className="la la-support"/>
                                <span className="menu-title" data-i18n="">Raise Support</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

Sidebar = withRouter(Sidebar);