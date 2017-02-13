import React,  {Component} from 'react'
import ReactDOM from 'react-dom';
import {Link} from 'react-router';
import { RouteTransition } from 'react-router-transition';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import portsDetailsObj from './portsDetailsObj.jsx';

export default function PortText (props){
  var id = props.id.toLowerCase();
  return (
    <ReactCSSTransitionGroup   className = 'portText'  component="div"  transitionName="text" transitionLeave={true} transitionEnterTimeout={1000}  transitionLeaveTimeout={1000}>

      <div key = {props.id + 'text'} style = {{height: '100%'}}>
        <span  className = 'nextButton' > <Link style = {{backgroundColor: portsDetailsObj[props.id.toLowerCase()].imgBackgroundColor }} to = {'details/' + portsDetailsObj[id].next}>Next</Link> </span>
        <span className = 'prevButton' ><Link style = {{backgroundColor: portsDetailsObj[props.id.toLowerCase()].imgBackgroundColor }}to = {'details/' + portsDetailsObj[id].prev}>Prev</Link> </span>
        <div className = 'titleTextPort'>{portsDetailsObj[id].title}</div>
        <div className = 'preTextPort'>{portsDetailsObj[id].projectDescription}</div>
        <div className = 'portTextCh'>{portsDetailsObj[id].text}</div>
        <ul className = 'portList'>{
            portsDetailsObj[id].list.map((n)=> {
            return <li>{n}</li>
          })}</ul>

    </div>
    </ReactCSSTransitionGroup>
)
}