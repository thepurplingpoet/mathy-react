import React from 'react';
import {List, Card, Button} from 'antd';

class Quiz extends React.Component{
  constructor(props){
    super(props);
    this.state = {

    }
  }

  getQuestion = (level)=> {
    return `${this.getOperand(level)} ${this.getOperator()} ${this.getOperand(level)}`;
  }

  getOperand = (level=1) => (Math.floor(Math.random()*Math.pow(10, level)))
    
  getOperator = () => {
    const random = Math.random();
    let op = "";
    switch(true){
      case (random<0.25):
        op = "+";
        break;
      case (random<0.5):
        op = "-";
        break;
      case (random<0.75):
        op = "*";
        break;
      default:
        op = "/";      
    }

    return op;
  }

  getAnswers = (answer)=>(
    this.shuffle([answer,answer-1, answer+2,answer+Math.ceil(Math.random())])
  )

  shuffle = (array) => {
    let i = 0
      , j = 0
      , temp = null
  
    for (i = array.length - 1; i > 0; i -= 1) {
      j = Math.floor(Math.random() * (i + 1))
      temp = array[i]
      array[i] = array[j]
      array[j] = temp
    }
    return array;
  }

  onAnswer = () =>{
    this.props.onAnswerClick();
  }

  render(){
    const question = this.getQuestion();
    // eslint-disable-next-line
    const answer = eval(question);
    const data = this.getAnswers(answer);
   return(
    <Card>  
       <List
        header = {question}
        bordered
        dataSource = {data}
        renderItem={item => (
          <List.Item>
            <Button type="link" onClick={this.onAnswer}>
              {item}
            </Button>
          </List.Item>
        )}
       />
    </Card>
   )}
}

export default Quiz
