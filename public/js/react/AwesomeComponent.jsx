import React from 'react';


class AwesomeComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            likesCount: 0
        };
        this.onLike = this.onLike.bind(this);
    }

    onLike() {
        let newLikesCount = this.state.likesCount + 1;
        this.setState({likesCount: newLikesCount});
    }

    render() {
        return (
          <div>
            <div ref={myButton} onMouseEnter={this.refs.myButton}className = 'portItem col-lg-4 col-md-4 col-sm-12 col-xs-12'>
              <img src="/img/portfolio/megabitPort.png"></img>
            </div>
            <div className = 'portItem col-lg-4 col-md-4 col-sm-12 col-xs-12'>
              <img src="/img/portfolio/megabitPort.png"></img>
            </div>
            <div className = 'portItem col-lg-4 col-md-4 col-sm-12 col-xs-12'>
              <img src="/img/portfolio/megabitPort.png"></img>
            </div>
          </div>
        );
    }

}

export default AwesomeComponent;
