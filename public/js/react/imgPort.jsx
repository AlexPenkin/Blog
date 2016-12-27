import React from 'react';
import ReactDOM from 'react-dom';
class ImagePort extends React.Component {

    constructor(props) {
        super(props);

        var clicked = false;
    }

    componentDidUpdate() {


    }
    render() {
        return (
            <img src={this.props.source}></img>
        )
    }

}
export default ImagePort;
