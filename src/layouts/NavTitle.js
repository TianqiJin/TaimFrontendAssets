import React, { Component } from "react";

export class NavTitle extends Component {

    render() {
        return (
            <nav className="header-navbar navbar-expand-md navbar navbar-with-menu navbar-without-dd-arrow fixed-top navbar-semi-dark navbar-shadow">
                <div className="navbar-wrapper">
                    <div className="navbar-header">
                        <ul className="nav navbar-nav flex-row">
                            <li className="nav-item mobile-menu d-md-none mr-auto"><a
                                className="nav-link nav-menu-main menu-toggle hidden-xs" href="#"><i className="ft-menu font-large-1"/>
                            </a>
                            </li>
                            <li className="nav-item mr-auto">
                                <a className="navbar-brand" href="index.html">
                                    <h3 className="brand-text">Modern Admin</h3>
                                </a>
                            </li>
                            <li className="nav-item d-none d-md-block float-right"><a className="nav-link modern-nav-toggle pr-0" data-toggle="collapse">
                                <i className="toggle-icon ft-toggle-right font-medium-3 white" data-ticon="ft-toggle-right"/>
                            </a>
                            </li>
                            <li className="nav-item d-md-none">
                                <a className="nav-link open-navbar-container" data-toggle="collapse" data-target="#navbar-mobile">
                                    <i className="la la-ellipsis-v"/>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="navbar-container content">
                        <div className="collapse navbar-collapse" id="navbar-mobile">
                            <ul className="nav navbar-nav mr-auto float-left"/>
                            <ul className="nav navbar-nav float-right">
                                <li className="dropdown dropdown-user nav-item">
                                    <a className="dropdown-toggle nav-link dropdown-user-link" href="#" data-toggle="dropdown">
                                        <span className="avatar avatar-online"/>
                                        <span className="user-name">John Doe</span>
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-right">
                                        <a className="dropdown-item" href="#">
                                            <i className="ft-user"/>
                                            Edit Profile
                                        </a>
                                        <a className="dropdown-item" href="#">
                                            <i className="ft-mail"/>
                                            My Inbox
                                        </a>
                                        <a className="dropdown-item" href="#">
                                            <i className="ft-check-square"/>
                                            Task
                                        </a>
                                        <a className="dropdown-item" href="#">
                                            <i className="ft-message-square"/>
                                            Chats
                                        </a>
                                        <div className="dropdown-divider"/>
                                        <a className="dropdown-item" href="#">
                                            <i className="ft-power"/>
                                            Logout
                                        </a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}
