import React from 'react';

export default class Spinner extends React.Component{

    render() {
        return (
            <div className="loader-wrapper">
                <div className="loader-container">
                    <div className="line-scale loader-warning">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </div>
        );
    }
}

