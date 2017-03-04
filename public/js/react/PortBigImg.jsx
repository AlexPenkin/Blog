import React,  {Component} from 'react'
import ReactDOM from 'react-dom';
import {Link} from 'react-router';
import { RouteTransition } from 'react-router-transition';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import portsDetailsObj from './portsDetailsObj.jsx';

export default function PortBigImg (props) {
var id = props.id.toLowerCase();
     return (
       <ReactCSSTransitionGroup className = 'portBigImg'    component="div"  transitionName="img" transitionLeave={true} transitionEnterTimeout={1001}  transitionLeaveTimeout={1001}>
         <div style = {{backgroundColor: portsDetailsObj[props.id.toLowerCase()].imgBackgroundColor }} className = 'portBigImgCh' key = {props.id + 'img'}>
          <div className = 'portBigImgCh2'>{props.id}</div>
         </div>
     </ReactCSSTransitionGroup>
     )
   }
