import React from 'react';

function Header(props){
return (
    <div><span style={{padding:'30px'}}>Time Left: {props.countdown}</span>
    <span style={{padding:'30px'}}>Time: {props.time}</span>
    <span style={{padding:'30px'}}>Score: {props.score}</span></div>
   
)
}

export default Header;