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

    }
    propagateEventHover(e) {
    var a = e.type

        this.setState((prevState, props) => {

            return {
                shouldShowBox: a };
        })
        }

    render() {
        return (
            <div onMouseEnter={this.propagateEventHover} onMouseLeave={this.propagateEventHover} className='portItem col m12 l3'>
                <ImagePort source='/img/portfolio/megabitPort.jpg'/>
                <BubbleDivStyle title='MEGABIT' defenition='Russian Federal Web Market Many work for that' trigger={this.state.shouldShowBox}/>
            </div>
        );
    }

}

export default AwesomeComponent;
