import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

function Display(props) {
  return (
    <div className={props.className}>
      <p>{props.value}</p>
    </div>
);
}

function Button(props) {
  return (
    <button onClick={props.aoClicar} className={props.className}>{props.text}</button>
  );
}

function getDisplayNumber(number) {
  const stringNumber = number.toString();
  const integerDigits = parseFloat(stringNumber.split('.')[0]);
  const decimalDigits = stringNumber.split('.')[1];
  let integerDisplay;
  if(isNaN(integerDigits)) {
    integerDisplay = '';
  } else {
    integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0});
  }
  if(decimalDigits != null) {
    return `${integerDisplay}.${decimalDigits}`;
  } else {
    return integerDisplay;
  }
}

function operate(v1, v2, op) {
  let result;
  v1 = parseFloat(v1.replace(",", "."));
  v2 = parseFloat(v2.replace(",", "."));

  if (op==="+") {
    result = v1 + v2;
  }
  else if (op==="-") {
    result = v1 - v2;
  }
  else if (op==="*") {
    result = v1 * v2;
  }
  else if (op==="/") {
    result = v1 / v2;
  };

  return String(result);
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentOperand: "",
      previousOperand: "",
      operation: ""
    };
    this.addNumber = this.addNumber.bind(this);
    this.addOperation = this.addOperation.bind(this);
    this.addComma = this.addComma.bind(this);
    this.calculate = this.calculate.bind(this);
    this.clear = this.clear.bind(this);
    console.log(
      getDisplayNumber('1231213')
    );
  }

  addNumber(number) {
    this.setState(state => {
      return {        
        currentOperand: state.currentOperand + number,
      };
    });
  };

  addComma() {
    let hasComma = this.state.currentOperand.includes(",");
    
    this.state.currentOperand = hasComma ? this.state.currentOperand : this.state.currentOperand + ",";

    this.setState(state => {
      return {        
        currentOperand: state.currentOperand,
      };
    });
  };

  addOperation(op) {
    if ((this.state.currentOperand !== "") || (this.state.previousOperand !== "")) {
      if (this.state.operation === "" && this.state.currentOperand !== "") {
        this.setState(state => {
          return {
            operation: op,
            previousOperand: state.currentOperand,
            currentOperand: ""
          };
        });
      }
      else if (this.state.currentOperand === "") {
        this.setState(state => {
          return {
            operation: op,
          };
        });
      }
      else {
        this.setState(state => {
          return {
            previousOperand: operate(state.previousOperand, state.currentOperand, state.operation),
            currentOperand: "",
            operation: op,
          }
        });
      };
    };
  };

  calculate() {
    if (this.state.previousOperand !== "" && this.state.operation !== "" && this.state.currentOperand !== "") {
      this.setState(state => {
        return {
          previousOperand: operate(state.previousOperand, state.currentOperand, state.operation),
          currentOperand: "",
          operation: "",
        }
      });
    };
  }; 

  clear() {
    this.setState(state => {
      return {
        currentOperand: "",
      };
    });
  }

  render() {
    return (
      <div className="App">
        <div className="content">
          <div className="display">
            <Display className="prev-op" value={this.state.previousOperand + this.state.operation} />
            <Display className="curr-op" value={this.state.currentOperand} />
          </div>
          {/* <Keypad/> */}
          <Button className="triplo" text="AC" aoClicar={() => this.clear()} />
          <Button className="op" text="/" aoClicar={() => this.addOperation("/")} />

          <Button className="num" text="7" aoClicar={() => this.addNumber("7")} />
          <Button className="num" text="8" aoClicar={() => this.addNumber("8")} />
          <Button className="num" text="9" aoClicar={() => this.addNumber("9")} />
          <Button className="op" text="*" aoClicar={() => this.addOperation("*")} />

          <Button className="num" text="4" aoClicar={() => this.addNumber("4")} />
          <Button className="num" text="5" aoClicar={() => this.addNumber("5")} />
          <Button className="num" text="6" aoClicar={() => this.addNumber("6")} />
          <Button className="op" text="+" aoClicar={() => this.addOperation("+")} />

          <Button className="num" text="1" aoClicar={() => this.addNumber("1")} />
          <Button className="num" text="2" aoClicar={() => this.addNumber("2")} />
          <Button className="num" text="3" aoClicar={() => this.addNumber("3")} />
          <Button className="op" text="-" aoClicar={() => this.addOperation("-")} />

          <Button className="comma" text="," aoClicar={() => this.addComma()} />
          <Button className="num" text="0" aoClicar={() => this.addNumber("0")} />

          {/* <EqualButton/> */}
          <Button className="equal" text="=" aoClicar={() => this.calculate()} />
        </div>
      </div>
    );
  };
};

export default App;