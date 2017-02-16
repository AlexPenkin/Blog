import React from 'react';
import ReactDOM from 'react-dom';
import AwesomeComponent from './AwesomeComponent.jsx';
import PortfolioDetails from './PortfolioDetails.jsx';
import NotFound from './NotFound.jsx';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import {Router, Route, IndexRoute, Link, hashHistory} from 'react-router'
import portsDetailsObj from './portsDetailsObj.jsx';

// ...
class App extends React.Component {
    render() {
      var arr = [];
      for (var i = 0; i < Object.keys(portsDetailsObj).length; i++) {
        arr[i] = portsDetailsObj[Object.keys(portsDetailsObj)[i]];
      }
      console.log(arr);
        return (
            <ReactCSSTransitionGroup   component="div" transitionAppear={true} transitionName="blog" transitionLeave={true} transitionEnterTimeout={5000} transitionAppearTimeout={5000} transitionLeaveTimeout={5000}>
                <div key = 'two' className='portWrapReact row'>
                  {arr.map((item)=>{
                    return <AwesomeComponent title= {item.title} defenition={item.projectDescription} back = {item.imgBackgroundColor}/>
                  })}
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
