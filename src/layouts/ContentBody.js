import React from 'react';

export default class ContentBody extends React.Component{

    render() {
        return (
            <div className="content-body">
                {this.props.children}
            </div>
        );
    }
}