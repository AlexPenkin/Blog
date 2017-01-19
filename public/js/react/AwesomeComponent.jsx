import React from 'react';
import ReactDOM from 'react-dom';
import ImagePort from './imgPort.jsx';
import BubbleDivStyle from './bubbleDiv.jsx';
import TransitionGroup from 'react-addons-transition-group';
class AwesomeComponent extends React.Component {

    constructor(props) {
        super(props);
        this.propagateEventHover = this.propagateEventHover.bind(this);
        this.state = {
            shouldShowBox: 'mouseleave'
        };
        this.setState = this.setState.bind(this);
        this.first = true;

    }
    propagateEventHover(e) {
        var a = e.type;
        this.setState((prevState, props) => {
            return {
                shouldShowBox: a,
                left: ReactDOM.findDOMNode(this).clientWidth / 2,
                top: ReactDOM.findDOMNode(this).height / 2
            };
        })
    }
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
            <div onMouseEnter={this.propagateEventHover} onMouseLeave={this.propagateEventHover} className='portItem col col-md-3 col-xl-3 col-sm-12'>
                <ImagePort source='/img/portfolio/megabitPort.jpg'/>
                <BubbleDivStyle  title = {this.props.title} size={ReactDOM.findDOMNode(this)} defenition= {this.props.defenition} trigger={this.state}/>
            </div>
        );
    }

}

export default AwesomeComponent;
