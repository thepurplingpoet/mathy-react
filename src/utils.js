  export function getQuestion(level=1) {
    return `${getOperand(level)} ${getOperator()} ${getOperand(level)}`;
  }

  function getOperand(level=1){
      return Math.floor(Math.random()*Math.pow(10, level))
  }
    
  function getOperator(){
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

  export function getOptions(answer){
    return shuffle([answer,answer-1, answer+2,answer+Math.ceil(Math.random())])
  }

  export function getAnswer(question){
      // eslint-disable-next-line no-eval
      return eval(question);
  }

  function shuffle(array){
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
