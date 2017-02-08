import React,  {Component} from 'react'
import ReactDOM from 'react-dom';
import {Link} from 'react-router';
import { RouteTransition } from 'react-router-transition';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
var portsDetailsObj = { megabit : {
  imgBackgroundColor : '#fd5d34',
  text: "t had been set for four o'clock as it should have been; it certainly must have rung. Yes, but was it possible to quietly sleep through that furniture-rattling noise? True, he had not slept peacefully, but probably all the more deeply because of that. What should he do now? The next train went at seven; if he were to catch that he would have to rush.",
  next: 'Pronet',
  prev: 'CemRus',
},
pronet : {
  imgBackgroundColor : '#009ee3',
  text: "t had been set for four o'clock as it should have been; it certainly must have rung. Yes, but was it possible to quietly sleep through that furniture-rattling noise? True, he had not slept peacefully, but probably all the more deeply because of that. What should he do now? The next train went at seven; if he were to catch that he would have to rush.",
  next: 'CemRus',
  prev: 'Megabit',
},
cemrus : {
  imgBackgroundColor : '#53b306',
  text: "t had been set for four o'clock as it should have been; it certainly must have rung. Yes, but was it possible to quietly sleep through that furniture-rattling noise? True, he had not slept peacefully, but probably all the more deeply because of that. What should he do now? The next train went at seven; if he were to catch that he would have to rush.",
  next: 'Megabit',
  prev: 'Pronet',
},

}
 function PortBigImg (props) {
var id = props.id.toLowerCase();
      return (
        <ReactCSSTransitionGroup className = 'portBigImg'    component="div"  transitionName="img" transitionLeave={true} transitionEnterTimeout={1000}  transitionLeaveTimeout={1000}>
          <div style = {{backgroundColor: portsDetailsObj[props.id.toLowerCase()].imgBackgroundColor }} className = 'portBigImgCh' key = {props.id + 'img'}>
              <span className = 'nextButton' > <Link to = {'details/' + portsDetailsObj[id].next}>След</Link> </span>
            <span className = 'prevButton' ><Link to = {'details/' + portsDetailsObj[id].prev}>Пред</Link> </span>
            <div   className = 'portBigImgCh2'>{props.id}</div>
          </div>
      </ReactCSSTransitionGroup>
      )


}
// function PortBigImg (props){
//   var background = portsDetailsObj[props.id.toLowerCase()].imgBackgroundColor;
//   return (
//     <ReactCSSTransitionGroup  className = 'portBigImg'  component="div"  transitionName="img" transitionLeave={true} transitionEnterTimeout={1000}  transitionLeaveTimeout={1000}>
//       <div key = {props.id + 'img'} style = {{backgroundColor: background}} className = 'portBigImgCh'>{props.id}</div>
//     </ReactCSSTransitionGroup>
//   )
// }
// PortBigImg.prototype.shouldComponentUpdate  = function (nextProps, nextState) {
//   console.log('a');
//     return true;
//   }


function PortText (props){
  var id = props.id.toLowerCase();
  console.log(props.id);
  return (
    <ReactCSSTransitionGroup   className = 'portText'  component="div"  transitionName="text" transitionLeave={true} transitionEnterTimeout={1000}  transitionLeaveTimeout={1000}>
      <div key = {props.id + 'text'}>

        <div className = 'portTextCh'>{portsDetailsObj[id].text}</div>
    </div>
    </ReactCSSTransitionGroup>
)
}

function PortfolioDetailsPro (props){
  var id = props.id.toLowerCase();
  console.log(id);
    return (

      <div className = 'portWrapper'>
          <PortBigImg id = {props.id}/>
          <PortText id = {props.id}/>
      </div>
    )

}
export default class PortfolioDetails extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
    }
    componentWillUnmount() {

    }
    componentDidUpdate() {}

    render() {
        return (
          <ReactCSSTransitionGroup
              component="div"
              transitionName="blog"
              transitionAppear={true}
              transitionLeave={true}
              transitionEnterTimeout={1000}
              transitionAppearTimeout={1000}
              transitionLeaveTimeout={1000}>

                    <span style = {{position: 'absolute', top: '-33px'}}><Link to="/">Назад</Link></span>


                      <PortfolioDetailsPro id = {this.props.params.portId} />



              </ReactCSSTransitionGroup>
        )
    }
}
