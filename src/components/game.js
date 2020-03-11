import React from 'react';
import {Modal} from 'antd';
import Quiz from './quiz';

class Game extends React.Component{

  _isMounted = false;
  constructor(props){
    super(props);
    
    this.state = {
      isGameOver:false,
      score: 0,
      time: 0,
      countdown: 5,

    }

  }

  componentDidMount(){
    this._isMounted = true;
    this.startTimer();
  }

  componentWillUnmount(){
    this._isMounted = false;
    this.clearInterval(this.counter)
  }
  
  startTimer = (changeState=true)=>{
    if(this.state.countdown===0 && changeState){
      clearInterval(this.counter)
      this.setState({
        isGameOver:true,
      })
    }
    else this.counter = setInterval(this.timer, 1000)
     
  }


  timer = ()=> {
    this.setState((prevState)=>({
      countdown: prevState.countdown-1,
    }
    ))
    if(this.state.countdown===0){
      clearInterval(this.counter)
      this.setState({
        isGameOver:true,
      })
    }
  }

  showModal = () => {
    this.setState({
      isGameOver:true,
    })
  }

  handleCancel = () => {
    this.setState({
      isGameOver:false,
      countdown: 5,
      time: 0,
    })
    this.startTimer(false);
  }

  onAnswerClick = ()=>{
    this.setState((prevState)=>({
      score: prevState.score+1
    }))
  }

  render(){
    return (
      <div>
      {this.state.isGameOver &&
      <Modal
          title="Game Over"
          visible={true}
          onOk={this.handleCancel}
          onCancel={this.handleCancel}
      >
        <p>Total time taken: {this.state.time}</p>
        <p>Score: {this.state.score}</p>
      </Modal>}
      <div style={{ position: 'fixed', zIndex: 1, width: '100%', padding:'20px' }}>
      <span style={{padding:'30px'}}>Time Left: {this.state.countdown}</span>
      <span style={{padding:'30px'}}>Time: {this.state.time}</span>
      <span style={{padding:'30px'}}>Score: {this.state.score}</span>
      <Quiz onAnswerClick = {this.onAnswerClick} />
      <div />     
    </div>
    </div>
    )
  }
}

export default Game;
