import React from 'react';
import ReactDOM from 'react-dom';
import AwesomeComponent from './AwesomeComponent.jsx';
import PortfolioDetails from './PortfolioDetails.jsx';
import NotFound from './NotFound.jsx';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import {Router, Route, IndexRoute, Link, hashHistory} from 'react-router'

// ...
class App extends React.Component {
    render() {
        return (
            <ReactCSSTransitionGroup   component="div" transitionAppear={true} transitionName="blog" transitionLeave={true} transitionEnterTimeout={5000} transitionAppearTimeout={5000} transitionLeaveTimeout={5000}>
                <div key = 'two' className='portWrapReact row'>
                  <AwesomeComponent title='Megabit' defenition='Russian Federal Web Market Many work for that'/>
                  <AwesomeComponent title='Pronet' defenition='Russian Federal Web Market Many work for that'/>
                  <AwesomeComponent title='CemRus' defenition='Russian Federal Web Market Many work for that'/>
                </div>
            </ReactCSSTransitionGroup>
        );
    }
}

ReactDOM.render(
    <Router history={hashHistory}>
      <Route path="/" component={App}/>
      <Route path="details/:portId" component={PortfolioDetails} />
      <Route path="details" component={PortfolioDetails} />
    </Router>, document.getElementById('portWrapR'));
