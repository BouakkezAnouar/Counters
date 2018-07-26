import React, { Component } from "react";
import NavBar from "./components/navbar";
import "./App.css";
import Counters from "./components/counters";

class App extends Component {
  state = {
    counters: [
      { id: 1, value: 0 },
      { id: 2, value: 0 },
      { id: 3, value: 0 },
      { id: 4, value: 0 },
      { id: 5, value: 0 }
    ]
  };

  handleReset = () => {
    const counters = this.state.counters.map(c => {
      c.value = 0;
      return c;
    });
    this.setState({ counters });
  };

  handleDelete = counterId => {
    this.setState({
      counters: this.state.counters.filter(c => c.id !== counterId)
    });
  };

  handleIncrement = counter => {
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index] = { ...counter };
    counters[index].value++;

    /* for (var i in counters) {
        if (counters[i] === counter) {
          counters[i].value++;
          break; //Stop this loop, we found it!
        }
      }*/

    this.setState({ counters });
  };

  handleDecrement = counter => {
    const counters = [...this.state.counters];
    for (var i in counters) {
      if (counters[i] === counter) {
        if (counters[i].value <= 0) {
          // pour que le valeur toujours positive
          counters[i].value = 0;
          break;
        }
        counters[i].value--;
        break; //Stop this loop, we found it!
      }
    }
    this.setState({ counters });
  };

  calculeTotal = () => {
    const counters = this.state.counters;
    let somme = counters.reduce((acc, counter) => acc + counter.value, 0);
    // 8alta let somme = counters.filter(c => c.value > 0).length;
    return somme;
  };

  handleAddItem = () => {
    const counters = [...this.state.counters];
    counters.push({ id: this.lastId() + 1, value: 0 });
    this.setState({ counters });
  };

  lastId() {
    const counters = [...this.state.counters];
    return counters.reduce(
      (max, counter) => (counter.id > max ? counter.id : max),
      0
    );
  }

  render() {
    return (
      <React.Fragment>
        <NavBar totalCounters={this.calculeTotal()} />
        <main className="Container">
          <Counters
            counters={this.state.counters}
            onReset={this.handleReset}
            onIncrement={this.handleIncrement}
            onDecrement={this.handleDecrement}
            onDelete={this.handleDelete}
            onAddItem={this.handleAddItem}
          />
        </main>
      </React.Fragment>
    );
  }
}

export default App;
