import React from "react";
import {NavTitle} from "./NavTitle";
import Sidebar from "./Sidebar";


export default class Layout extends React.Component{

    render() {
        return (
            <div>
                <NavTitle/>
                <Sidebar/>
                <div className="app-content content">
                    <div className="content-wrapper">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}
