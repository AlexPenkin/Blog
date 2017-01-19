import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import {Link} from 'react-router'
export default class PortfolioDetails extends Component {

    constructor(props) {
        super(props);
    }

    componentDidUpdate() {}

    render() {
        return (
            <div>
                <span><Link to="/">Works!!!</Link></span>

            </div>
        )
    }
}
