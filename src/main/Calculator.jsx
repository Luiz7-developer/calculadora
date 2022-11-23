import React, { Component } from "react";
import "./Calculator.css";

import Button from "../components/Button";
import Display from "../components/Display";

const initialState = {
  displayValue: "0",
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0,
};

export default class Calculator extends Component {
  state = { ...initialState };

  constructor(props) {
    super(props);
    this.clearMemory = this.clearMemory.bind(this);
    this.setOperation = this.setOperation.bind(this);
    this.addDigit = this.addDigit.bind(this);
  }
  clearMemory() {
    this.setState({ ...initialState });
  }

  setOperation(operation) {
    if (this.state.current === 0) {
      this.setState({ operation, current: 1, clearDisplay: true }); // Alterando o valor dos stados => current e Display
    } else {
      const equals = operation === "=";
      const currentOperation = this.state.operation;

      const values = [...this.state.values];

      try {
        values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`); // pega o valor do case[0]  sinal colocado(curreOperation) case[1]
      } catch (e) {
        values[0] = this.state.values[0]; //Se a operação de cima der um erro pega o valor zero e pego o valor que esta no estado pra não mudar o valor atula do estado
      }

      values[1] = 0;
      //o resulatdo fica no indide 0 e o indice 1 vai ser zerado

      this.setState({
        displayValue: values[0],
        operation: equals ? null : operation,
        current: equals ? 0 : 1,
        clearDisplay: !equals,
        values,
      });
    }
  }

  addDigit(numero) {
    if (numero === "." && this.state.displayValue.includes(".")) {
      return;
    }

    const clearDisplay =
      this.state.displayValue === "0" || this.state.clearDisplay;

    const currentValue = clearDisplay ? "" : this.state.displayValue;
    // se precisar limpar o display o valor corrente vai ser vazio e se não precisar vai ser de fato o valor que esta no display

    const displayValue = currentValue + numero;
    // o novo valor a ser colocado no display vai ser o currentValue mais a variavel numero

    this.setState({ displayValue, clearDisplay: false });

    if (numero !== ".") {
      const indice = this.state.current; //peguei o indice do valor que eu estou alterando

      const newValue = parseFloat(displayValue); //converti pra float

      const values = [...this.state.values]; //clonei os valores apartir do sprades(...) dentro de um novo array[]

      values[indice] = newValue; //alterei o valor atual que o indice que poded ser o 0 ou o 1

      this.setState({ values }); //substitui o novo array dentro de state
      console.log(values);
    } // se for digitado qualquer valor diferente de ponto (0 ao 9)=>
  }

  render() {
    return (
      <div className="Calculator">
        <Display value={this.state.displayValue} />
        <Button label="AC" click={this.clearMemory} triple />
        <Button label="/" click={this.setOperation} operation />
        <Button label="7" click={this.addDigit} />
        <Button label="8" click={this.addDigit} />
        <Button label="9" click={this.addDigit} />
        <Button label="*" click={this.setOperation} operation />
        <Button label="4" click={this.addDigit} />
        <Button label="5" click={this.addDigit} />
        <Button label="6" click={this.addDigit} />
        <Button label="-" click={this.setOperation} operation />
        <Button label="1" click={this.addDigit} />
        <Button label="2" click={this.addDigit} />
        <Button label="3" click={this.addDigit} />
        <Button label="+" click={this.setOperation} operation />
        <Button label="0" click={this.addDigit} double />
        <Button label="." click={this.addDigit} />
        <Button label="=" click={this.setOperation} operation />
      </div>
    );
  }
}
