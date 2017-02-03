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
            component="div"
    transitionName="blog"
    transitionAppear={true}
    transitionLeave={true}

    transitionAppear={true}
        transitionLeave={true}
        transitionEnterTimeout={500}
        transitionAppearTimeout={500}
        transitionLeaveTimeout={500}>
            <div key = {'12232ss'} >
                <span><Link to="/">Works!!!</Link></span>
            </div>
              </ReactCSSTransitionGroup>
        )
    }
}
