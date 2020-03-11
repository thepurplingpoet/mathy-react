import React from 'react';
import {List, Card, Button} from 'antd';
import {getAnswer, getOptions, getQuestion} from '../utils';
class Quiz extends React.Component{

  constructor(props){
    super(props);
    const question = getQuestion(props.level);
    const answer = getAnswer(question);
    const options = getOptions(answer);
    this.state = {
      question,
      answer,
      options,
    }
  
  }

  static getDerivedStateFromProps(nextProps, prevState){
    if(nextProps.update===true){
      const question = getQuestion();
      const answer = getAnswer(question);
      const options = getOptions(answer);
    
      return {
        question,
        answer,
        options,
      }
   }
   else return null;
 }

  onAnswer = (e) =>{
    this.props.onAnswerClick(String(e.target.textContent), String(this.state.answer));
  }

  render(){
    if(this.props.updateQuiz===true)this.forceUpdate();
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
