import React from 'react';
import ReactDOM from 'react-dom';
import anime from 'animejs';
class BubbleDiv extends React.Component {

    constructor(props) {
        super(props);
        this.style = {
            bubbleDivStyle: {
                width: '0px',
                height: '0px',
                backgroundColor: 'rgba(89, 89, 89, 0.7)',
                position: 'absolute',
                top: '50%',
                left: '50%',
                // display: 'flex',
                // justifyContent: 'center',
                // alignItems: 'center',
                // marginLeft: '50%',
                // marginTop: '50%',
                color: 'white',
                flexDirection: 'column',
                overflow: 'hidden',
                fontSize: '16px',
                whiteSpace: 'nowrap',
                opacity: '0',
                transition: 'all .5s'
            }
        }
        this.speed = 100;
        this.expander = this.expander.bind(this);

    }

    getPosition(value) {
        let el = ReactDOM.findDOMNode(this),
            obj = {},
            sizeParWidth = el.parentNode.clientWidth,
            sizeSelfWidth = el.offsetWidth,
            sizeParHeight = el.parentNode.clientHeight,
            sizeSelfHeight = el.offsetHeight;

        obj = {
            top: (sizeParHeight / 2),
            left: (sizeParWidth / 2),
            sizeParWidth: sizeParWidth,
            sizeSelfWidth: sizeSelfWidth,
            sizeParHeight: sizeParHeight,
            sizeSelfHeight: sizeSelfHeight

        }
        return obj[value]
    }

    expander() {
        let el = ReactDOM.findDOMNode(this);
        this.style.bubbleDivStyle.left = this.getPosition('sizeParWidth');
        this.style.bubbleDivStyle.top = this.getPosition('sizeParHeight');
        this.fadeOut = anime({
            targets: el,

            // direction: 'alternate',
            duration: this.speed,
            width: {
                value: this.getPosition('sizeParWidth'),
                delay: 0,
                duration: this.speed,
                easing: 'easeOutExpo'
            },
            height: {
                value: this.getPosition('sizeParHeight'),
                delay: 0,
                duration: this.speed,
                easing: 'easeOutExpo'
            },
            // fontSize: {
            //     value: '16px',
            //     delay: 0,
            //     duration: this.speed,
            //     easing: 'easeOutExpo'
            // },
            left: {
                value: '0px',
                delay: 0,
                duration: this.speed,
                easing: 'easeOutExpo'
            },
            top: {
                value: '0px',
                delay: 0,
                duration: this.speed,
                easing: 'easeOutExpo'
            },
            opacity: {
                value: '1',
                delay: 0,
                duration: this.speed,
                easing: 'easeOutExpo'
            }
        });

        this.fadeIn = anime({
            targets: el, duration: this.speed,

            // direction: 'alternate',

            width: {
                value: '0px',
                delay: 0,
                duration: this.speed,
                easing: 'easeOutExpo'
            },
            height: {
                value: '0px',
                delay: 0,
                duration: this.speed,
                easing: 'easeOutExpo'
            },
            // fontSize: {
            //     value: '0px',
            //     delay: 0,
            //     duration: this.speed,
            //     easing: 'easeOutExpo'
            // },
            left: {
                value: `${this.getPosition('left')}px`,
                delay: 0,
                duration: this.speed,
                easing: 'easeOutExpo'
            },
            top: {
                value: `${this.getPosition('top')}px`,
                delay: 0,
                duration: this.speed,
                easing: 'easeOutExpo'
            },
            opacity: {
                value: '0',
                delay: 0,
                duration: this.speed,
                easing: 'easeOutExpo'
            }
        });

        if (this.props.trigger == 'mouseenter') {
            this.fadeIn.pause();
            this.fadeOut.restart();

        } else if (this.props.trigger == 'mouseleave') {
            this.fadeOut.pause();
            this.fadeIn.restart();
            this.fadeIn.play();

        }

    }

    componentDidUpdate() {
        this.expander();
    }
    render() {
        return (
            <div style={this.style.bubbleDivStyle}>
                <span>{this.props.title}</span>
                <br></br>
                <span>{this.props.defenition}</span>
            </div>

        )
    }

}
export default BubbleDiv;
