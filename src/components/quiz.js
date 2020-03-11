import React from 'react';
import {List, Card, Button} from 'antd';
import {getAnswer, getOptions, getQuestion} from '../utils';
class Quiz extends React.Component{

  constructor(props){
    super(props);
    const question = getQuestion();
    const answer = getAnswer(question);
    const options = getOptions(answer);
    this.state = {
      question,
      answer,
      options,
    }
  
  }

  onAnswer = (e) =>{
    this.props.onAnswerClick(String(e.target.textContent), String(this.state.answer));
  }

  render(){
   return(
    <Card>  
       <List
        header = {this.state.question}
        bordered
        dataSource = {this.state.options}
        renderItem={item => (
          <List.Item>
            <Button type="link" onClick={this.onAnswer} style={{width:'100%'}} >
              {item}
            </Button>
          </List.Item>
        )}
       />
    </Card>
   )}
}

export default Quiz
