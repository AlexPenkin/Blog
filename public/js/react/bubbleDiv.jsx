import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'
class BubbleDiv extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            bubbleDivStyle: {
                width: '0px',
                height: '0px',
                backgroundColor: 'rgba(89, 89, 89, 0.7)',
                position: 'absolute',
                top: 0,
                left: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                // marginLeft: '50%',
                // marginTop: '50%',
                color: 'white',
                flexDirection: 'column',
                overflow: 'hidden',
                fontSize: '16px',
                whiteSpace: 'nowrap',
                opacity: '0',
                transition: 'all 1.5s'
            }
        }

        this.speed = 400;
        // this.expander = this.expander.bind(this);
        this.getPosition = this.getPosition.bind(this);

    }
    getPosition(value) {
        let el = ReactDOM.findDOMNode(this),
        obj = {
            top: (el.parentNode.clientHeight- el.clientHeight) / 2,
            left: (el.parentNode.clientWidth - el.clientWidth) / 2,
            sizeParWidth: el.parentNode.clientWidth,
            sizeSelfWidth: el.clientWidth,
            sizeParHeight: el.parentNode.clientHeight,
            sizeSelfHeight: el.clientHeight

        }
        return obj[value]
    }

    componentDidMount() {

      window.addEventListener('resize', () =>  { this.setState((prevState, props) => {
            setTimeout(() => {return {
                bubbleDivStyle: {
                    width: `${(this.getPosition('sizeParWidth'))}px`,
                    height: `${(this.getPosition('sizeParHeight'))}px`,
                    backgroundColor: 'rgba(89, 89, 89, 0.7)',
                    position: 'absolute',
                    transform: `scale(0) translateZ(0px)`,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    top: 0,
                    left: 0,
                    backfaceVisibility: 'hidden',
                    // marginLeft: '50%',
                    // marginTop: '50%',
                    color: 'white',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    fontSize: '16px',
                    whiteSpace: 'nowrap',
                    visibility: 'hidden',
                    opacity: '0',
                    animationFillMode: 'forwards',
                     transition: 'all .5s ease-in-out'
                }

            } }, 200);
        })})
        setTimeout(() => {
            this.setState((prevState, props) => {
                return {
                    bubbleDivStyle: {
                        width: `${(this.getPosition('sizeParWidth'))}px`,
                        height: `${(this.getPosition('sizeParHeight'))}px`,
                        backgroundColor: 'rgba(89, 89, 89, 0.7)',
                        position: 'absolute',
                        transform: `scale(0)`,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        top: 0,
                        left: 0,
                        backfaceVisibility: 'hidden',
                        // marginLeft: '50%',
                        // marginTop: '50%',
                        color: 'white',
                        flexDirection: 'column',
                        overflow: 'hidden',
                        fontSize: '16px',
                        whiteSpace: 'nowrap',
                        opacity: '0',
                        animationFillMode: 'forwards',
                         transition: 'all .4s ease-in-out'
                    }
                };
            })
        }, 200)
    }



    componentDidUpdate() {
        // this.expander();
    }
    render() {
        return (
            <div className='bubbleDiv' style={this.state.bubbleDivStyle}>
                <span><Link to={"/details/" + this.props.title}>{this.props.title}</Link></span>
                <br></br>
                <span>{this.props.defenition}</span>
            </div>

        )
    }

}
export default BubbleDiv;
