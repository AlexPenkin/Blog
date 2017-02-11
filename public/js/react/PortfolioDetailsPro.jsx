import React,  {Component} from 'react'
import PortText from './PortText.jsx';
import PortBigImg from './PortBigImg.jsx';

export default function PortfolioDetailsPro (props){
  var id = props.id.toLowerCase();
    return (
      <div className = 'portWrapper' style= {{/*transform:'translateY(-1vh)'*/}}>
          <PortBigImg id = {props.id}/>
          <PortText id = {props.id}/>
      </div>
    )
}
