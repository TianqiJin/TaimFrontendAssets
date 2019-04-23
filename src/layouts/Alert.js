import React from "react";
import classNames from "classnames";

export default class Alert extends React.Component{

    constructor(props) {
        super(props);
    }

    render() {
        let type = 'alert-' + this.props.type;
        return (
            <div className={classNames('alert', type, 'mb-2')} role="alert">
                {this.props.content}
            </div>
        );
    }
}