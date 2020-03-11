import React from 'react';
import {Modal} from 'antd';
import Quiz from './quiz';
import Header from './header';

class Game extends React.Component{

  _isMounted = false;
  
  constructor(props){
    super(props);
    
    this.state = {
      isGameOver:false,
      score: 0,
      time: 0,
      countdown: 5,
      updateQuiz: false,
      prevTime: 0,
      level: 1,
    }

  }

  componentDidMount(){
    this._isMounted = true;
    this.startTimer();
  }

  componentWillUnmount(){
    this._isMounted = false;
    clearInterval(this.counter)
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
      updateQuiz: false,
      countdown: prevState.countdown-1,
      time : prevState.prevTime + 5 - prevState.countdown + 1,
    }
    ))
    if(this.state.countdown===0){
      clearInterval(this.counter)
      this.setState({
        isGameOver:true,
      })
    }
  }

  reset = () => {
    this.setState({
      isGameOver:false,
      countdown: 5,
      time: 0,
      score: 0,
    })
    this.startTimer(false);
  }

  onAnswerClick = (clickedOption, answer)=>{
    if(clickedOption===answer){
      clearInterval(this.counter)
      
      this.setState((prevState)=>({
        isGameOver: false,
        score : prevState.score+1,
        updateQuiz : true,
        time : prevState.time + 5 - prevState.countdown,
        prevTime : prevState.time,
        countdown: 5,
        level : prevState.score < 5 ? 1 : (prevState.score <10 ? 2 : 3),
      }));
      this.startTimer(false);
    }
    else{
      clearInterval(this.counter)
      this.setState({
        isGameOver: true,
      })
    }
  }

  render(){
    return (
      <div>
        {!this.state.isGameOver && 
        <div>
        <Header countdown= {this.state.countdown} time = {this.state.time} score = {this.state.score}/>
        <Quiz onAnswerClick = {this.onAnswerClick} update = {this.state.updateQuiz} level = {this.state.level} />
        </div>
     
            }      
      <Modal
          title="Game Over"
          visible={this.state.isGameOver}
          onOk={this.reset}
          onCancel={this.reset}
      >
        <p>Total time taken: {this.state.time}</p>
        <p>Score: {this.state.score}</p>
      </Modal>
      
    </div>
    )
  }
}

export default Game;
