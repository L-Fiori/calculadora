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
      operation: "",
      memory: []
    };
    this.addNumber = this.addNumber.bind(this);
    this.addOperation = this.addOperation.bind(this);
    this.addComma = this.addComma.bind(this);
    this.calculate = this.calculate.bind(this);
    this.clearAllMemory = this.clearAllMemory.bind(this);
    this.recallLast = this.recallLast.bind(this);
    this.addToLast = this.addToLast.bind(this);
    this.save = this.save.bind(this);
    this.clearSingleMemoryValue = this.clearSingleMemoryValue.bind(this);
    this.recallSingleMemoryValue = this.recallSingleMemoryValue.bind(this);

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
  };

  clearAllMemory() {
    this.setState(state => {
      return {
        memory: []
      };
    });
  };

  recallLast() {
    let lastValue = this.state.memory[0];
    const newMemory = this.state.memory.filter((item) => item !== lastValue);

    this.setState(state => {
      return {
        currentOperand: lastValue,
        memory: newMemory
      };
    });
  };

  addToLast() {
    let newNumber = operate(this.state.currentOperand, this.state.memory[0], "+");
    this.state.memory.splice(0, 1, newNumber);

    this.setState(state => {
      return {
        currentOperand: ""
      }
    })
  }

  save() {
    if (this.state.currentOperand !== "" || this.state.previousOperand !== "") {
      this.state.currentOperand !== "" ? this.state.memory.splice(0, 0, this.state.currentOperand) : this.state.memory.splice(0, 0, this.state.previousOperand);
    };

    this.setState(state => {
      return {
        currentOperand: ""
      };
    });
  };

  clearSingleMemoryValue(i) {
    const newMemory = this.state.memory.filter((item) => item !== this.state.memory[i]);

    this.setState(state => {
      return {
        memory: newMemory
      };
    });
  };
  
  recallSingleMemoryValue(i) {
    const newMemory = this.state.memory.filter((item) => item !== this.state.memory[i]);

    this.setState(state => {
      return {
        currentOperand: state.memory[i],
        memory: newMemory
      };
    });
  };

  render() {
    return (
      <div className="App">
        <div className="content">
          <div className="display">
            <Display className="prev-op" value={this.state.previousOperand + this.state.operation} />
            <Display className="curr-op" value={this.state.currentOperand} />
          </div>
          {/* <Keypad/> */}

          <Button className="memory-button" text="MC" aoClicar={() => this.clearAllMemory()}/>
          <Button className="memory-button" text="MR" aoClicar={() => this.recallLast()} />
          <Button className="memory-button" text="M+" aoClicar={() => this.addToLast()}/>
          <Button className="memory-button" text="MS" aoClicar={() => this.save()}/>

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
        <div className="sep">
        </div>
        <div className="content">
          <Display className="memory-display" value={this.state.memory[0]} />
          <Button className="memory-button" text="MC" aoClicar={() => this.clearSingleMemoryValue(0)} />
          <Button className="memory-button" text="MR" aoClicar={() => this.recallSingleMemoryValue(0)} />

          <Display className="memory-display" value={this.state.memory[1]} />
          <Button className="memory-button" text="MC" aoClicar={() => this.clearSingleMemoryValue(1)} />
          <Button className="memory-button" text="MR" aoClicar={() => this.recallSingleMemoryValue(1)} />

          <Display className="memory-display" value={this.state.memory[2]} />
          <Button className="memory-button" text="MC" aoClicar={() => this.clearSingleMemoryValue(2)} />
          <Button className="memory-button" text="MR" aoClicar={() => this.recallSingleMemoryValue(2)} />

          <Display className="memory-display" value={this.state.memory[3]} />
          <Button className="memory-button" text="MC" aoClicar={() => this.clearSingleMemoryValue(3)} />
          <Button className="memory-button" text="MR" aoClicar={() => this.recallSingleMemoryValue(3)} />

          <Display className="memory-display" value={this.state.memory[4]} />
          <Button className="memory-button" text="MC" aoClicar={() => this.clearSingleMemoryValue(4)} />
          <Button className="memory-button" text="MR" aoClicar={() => this.recallSingleMemoryValue(4)} />

          <Display className="memory-display" value={this.state.memory[5]} />
          <Button className="memory-button" text="MC" aoClicar={() => this.clearSingleMemoryValue(5)} />
          <Button className="memory-button" text="MR" aoClicar={() => this.recallSingleMemoryValue(5)} />

          <Display className="memory-display" value={this.state.memory[6]} />
          <Button className="memory-button" text="MC" aoClicar={() => this.clearSingleMemoryValue(6)} />
          <Button className="memory-button" text="MR" aoClicar={() => this.recallSingleMemoryValue(6)} />
        </div>
      </div>
    );
  };
};

export default App;