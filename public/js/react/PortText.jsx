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
      <div key = {props.id + 'text'} style = {{minHeight: '100%', width: '100%'}}>

        <a className = 'aTitle'href={portsDetailsObj[id].href} target="_blank"><div  className = 'titleTextPort'> <img className ='titleLink' src='./img/link.png'></img> {portsDetailsObj[id].title}</div></a>
        <div className = 'preTextPort'>{portsDetailsObj[id].projectDescription}</div>
        <div className = 'portTextCh'>{portsDetailsObj[id].text}</div>
        <ul className = 'portList'>{
              portsDetailsObj[id].list.map((n)=> {
              return <li>{n}</li>
            })}
        </ul>
        {portsDetailsObj[id].github &&
          <a className= 'gitLink' href = {portsDetailsObj[id].github}>
            <img src = '/img/GitHub-Mark-120px-plus.png'></img>
          </a>}
        <div className= 'backToListWrap' >
          <div className= 'ButtonsWrap'></div>
          <Link className= 'backToList' to="/">  Back to the list </Link>
        </div>
        <div className= 'buttonsWrap'>
          <span className = 'prevButton' ><Link style = {{backgroundColor: portsDetailsObj[props.id.toLowerCase()].imgBackgroundColor }}to = {'details/' + portsDetailsObj[id].prev}>Prev</Link> </span>
          <span  className = 'nextButton' > <Link style = {{backgroundColor: portsDetailsObj[props.id.toLowerCase()].imgBackgroundColor }} to = {'details/' + portsDetailsObj[id].next}>Next</Link> </span>
        </div>
    </div>
    </ReactCSSTransitionGroup>
)
}
