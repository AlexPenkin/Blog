import React from 'react';
import ReactDOM from 'react-dom';
import AwesomeComponent from './AwesomeComponent.jsx';
import PortfolioDetails from './PortfolioDetails.jsx';
import NotFound from './NotFound.jsx';
import {Router, Route, IndexRoute, Link, hashHistory} from 'react-router'

// ...
class App extends React.Component {
    render() {
        return (
            <div className='portWrapReact row'>
                <AwesomeComponent title='MEGABIT' defenition='Russian Federal Web Market Many work for that'/>
                <AwesomeComponent title='MEGABIT' defenition='Russian Federal Web Market Many work for that'/>
                <AwesomeComponent title='MEGABIT' defenition='Russian Federal Web Market Many work for that'/>
            </div>
        );
    }
}

ReactDOM.render(
    <Router history={hashHistory}>
    <Route path="/" component={App} />
    <Route path="/details" component={PortfolioDetails}/>
</Router>, document.getElementById('portWrapR'));
// import React from 'react'
// import { render } from 'react-dom'
//
// // First we import some modules...
//
//
// // Then we delete a bunch of code from App and
// // add some <Link> elements...
// const App = React.createClass({
//   render() {
//     return (
//       <div>
//         <h1>App</h1>
//         {/* change the <a>s to <Link>s */}
//         <ul>
//           <li><Link to="/about">About</Link></li>
//           <li><Link to="/inbox">Inbox</Link></li>
//         </ul>
//
//         {/*
//           next we replace `<Child>` with `this.props.children`
//           the router will figure out the children for us
//         */}
//         {this.props.children}
//       </div>
//     )
//   }
// })
//
// // Finally, we render a <Router> with some <Route>s.
// // It does all the fancy routing stuff for us.
// render((
//   <Router history={hashHistory}>
//     <Route path="/" component={App}>
//       <IndexRoute component={Home} />
//       <Route path="about" component={About} />
//       <Route path="inbox" component={Inbox} />
//     </Route>
//   </Router>
// ), document.body)
