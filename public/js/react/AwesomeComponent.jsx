import React from 'react';
import ReactDOM from 'react-dom';
import ImagePort from './imgPort.jsx';
import BubbleDivStyle from './bubbleDiv.jsx';
import TransitionGroup from 'react-addons-transition-group';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'
class AwesomeComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            shouldShowBox: 'mouseleave'
        };
        this.setState = this.setState.bind(this);
        this.first = true;

    }
    // propagateEventHover(e) {
    //     var a = e.type;
    //     this.setState((prevState, props) => {
    //         return {
    //             shouldShowBox: a,
    //             left: ReactDOM.findDOMNode(this).clientWidth / 2,
    //             top: ReactDOM.findDOMNode(this).height / 2
    //         };
    //     })
    // }
    // componentDidUpdate() {
    //   if (this.first ){
    //     this.first = false
    //     this.setState((prevState, props) => {
    //
    //         return {
    //             shouldShowBox: 'mouseleave',
    //             left: ReactDOM.findDOMNode(this).clientWidth / 2,
    //             top: ReactDOM.findDOMNode(this).height / 2
    //         };
    //     })
    //   }
    //
    // }
    render() {

        return (
            <Link to={"/details/" + this.props.title} style = {{backgroundColor: this.props.back}} className='portItem  middle3 col-md-offset-0 col-xs-12 col-sm-12'>
              <span >{this.props.title}</span>
                <BubbleDivStyle  size={ReactDOM.findDOMNode(this)} defenition= {this.props.defenition} trigger={this.state}/>
            </Link>
        );
    }

}

export default AwesomeComponent;
