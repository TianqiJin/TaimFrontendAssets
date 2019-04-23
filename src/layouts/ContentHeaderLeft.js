import React from "react";


export default class ContentHeaderLeft extends React.Component{

    render() {
        return (
            <div className="content-header-left col-md-6 col-12 mb-2 breadcrumb-new">
                {this.props.children}
            </div>
        );
    }
}

