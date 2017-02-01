import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import {Link} from 'react-router';
import { RouteTransition } from 'react-router-transition';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
export default class PortfolioDetails extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {

      console.log('mounted');
    }
    componentWillUnmount() {
    }
    componentDidUpdate() {}

    render() {
        return (
          <ReactCSSTransitionGroup
    transitionName="example"
    transitionAppear={true}
    transitionLeave={true}

    transitionApperTimeout={500} transitionLeaveTimeout={300}>
            <div key = {1} >
                <span><Link to="/">Works!!!</Link></span>
            </div>
              </ReactCSSTransitionGroup>
        )
    }
}
