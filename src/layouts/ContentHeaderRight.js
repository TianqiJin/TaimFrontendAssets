import React from "react";

export default class ContentHeaderRight extends React.Component{

    render() {
        return (
            <div className="content-header-right col-md-6 col-12">
                {this.props.children}
            </div>
        );
    }
}
