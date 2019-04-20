import React, { Component } from 'react';
import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentValue: null,
      display: '0',
      doingOperations: false,
      operator: null
    };

    this.addDecimal = this.addDecimal.bind(this);
    this.addDigit = this.addDigit.bind(this);
    this.clear = this.clear.bind(this);
    this.doOperation = this.doOperation.bind(this);
  }

  _calculate(n1, n2, operator) {
    let result = '';

    if (operator === '+') {
      result = parseFloat(n1) + parseFloat(n2);
    } else if (operator === '‑') {
      result = parseFloat(n1) - parseFloat(n2);
    } else if (operator === '*') {
      result = parseFloat(n1) * parseFloat(n2);
    } else if (operator === '/') {
      result = parseFloat(n1) / parseFloat(n2);
    }

    return result
  }

  addDecimal() {
    // this.state.display.substr(this.state.display.length - 1)
    if( this.state.display.includes('.') ) return;

    this.setState({
      display: this.state.display + ".",
      operandPending: false
    });
  }

  addDigit(e) {
    if (this.state.doingOperations) {
      this.setState({
        display: String(e.target.value),
        doingOperations: false
      });
    } else {
      this.setState({
        display: this.state.display === '0' ? String(e.target.value) : this.state.display + e.target.value
      });
    }
  }

  doOperation(e) {
    const operator = this.state.operator,
          value = this.state.currentValue;

    if (value === null) {
      this.setState({
        currentValue: parseFloat(this.state.display)
      });
    } else if (operator && !this.state.doingOperations) {
      const result = this._calculate(value, this.state.display, operator);

      this.setState({
        currentValue: result,
        display: String(result)
      });
    }

    this.setState({
      doingOperations: true,
      operator: e.target.value
    })
  }

  clear() {
    this.setState({
      currentValue: null,
      display: '0',
      doingOperations: false,
      operator: null
    });
  }

  render() {
    return (
      <div className="wrapper">
        <div className="braun">
          <div className="logo">Braun</div>
          <div className="screen">
            <div className="inner-screen">
              <div id="display" className="display">{this.state.display}</div>
            </div>
          </div>

          <div className="keyboard">
            <button id="" className="btn btn-brown">∆</button>
            <button id="seven" className="btn" onClick={this.addDigit} value="7">7</button>
            <button id="eight" className="btn" onClick={this.addDigit} value="8">8</button>
            <button id="nine" className="btn" onClick={this.addDigit} value="9">9</button>
            <button id="divide" className="btn btn-brown" onClick={this.doOperation} value="/">÷</button>
            <button id="" className="btn btn-brown">&radic;</button>
            <button id="four" className="btn" onClick={this.addDigit} value="4">4</button>
            <button id="five" className="btn" onClick={this.addDigit} value="5">5</button>
            <button id="six" className="btn" onClick={this.addDigit} value="6">6</button>
            <button id="multiply" className="btn btn-brown" onClick={this.doOperation} value="*">×</button>
            <button id="" className="btn btn-brown">%</button>
            <button id="one" className="btn" onClick={this.addDigit} value="1">1</button>
            <button id="two" className="btn" onClick={this.addDigit} value="2">2</button>
            <button id="three" className="btn" onClick={this.addDigit} value="3">3</button>
            <button id="subtract" className="btn btn-brown" onClick={this.doOperation} value="‑">‑</button>
            <button id="clear" className="btn btn-brown" onClick={this.clear}>CE</button>
            <button id="zero" className="btn" onClick={this.addDigit} value="0">0</button>
            <button id="decimal" className="btn btn-brown" onClick={this.addDecimal}>.</button>
            <button id="equals" className="btn btn-yellow" onClick={this.doOperation} value="=">=</button>
            <button id="add" className="btn btn-brown" onClick={this.doOperation} value="+">+</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
