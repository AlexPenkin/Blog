import React,  {Component} from 'react'
import ReactDOM from 'react-dom';
import {Link} from 'react-router';
import { RouteTransition } from 'react-router-transition';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import PortfolioDetailsPro from './PortfolioDetailsPro.jsx';

export default class PortfolioDetails extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
          <ReactCSSTransitionGroup
              component="div"
              transitionName="blog"      
              transitionEnterTimeout={1001}
        >
                  
                      <PortfolioDetailsPro id = {this.props.params.portId} />
                    </ReactCSSTransitionGroup>
        )
    }
}
