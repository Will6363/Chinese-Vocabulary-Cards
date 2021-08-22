import React, { Component } from 'react';
import Card from './component/Card';
import Radio from './component/Radio';
import shuffle from './functions/shuffle';
import randomInt from './functions/randomInt';
import './App.css'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      sampleSize: 0,
      stackSize: 10,
      selectedNum: 0,
      wordStack: [], //full api return as parsed words
      cards: [], //reduced array of words
      tabs: []
    };
    this.host = "http://localhost:9000/wordbank/range/"
    this.controller = new AbortController();
    this.handleClick = this.handleClick.bind(this);
    this.handleSelectionChange = this.handleSelectionChange.bind(this);
  }

  //clean up fetch requests on unmount
  componentWillUnmount() {
    this.controller.abort();
  }

  /*
    fetchData takes 2 arguments and gets JSON with chinese/eng translation for words
    returns JSON list of words if successful
    returns null if unsuccessful

    host: url of dictionary host
    extention: integer telling the api to get words 0 - rangeRequest
  */
  async fetchData(host, extention) {
    try {
      const response = await fetch(host + extention, {signal:this.controller.signal});
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  /*
    Generates an Array of Objects with props to be used in <Card />

    dataList: Array of Object
  */
  generateCards(dataList) {
    return dataList.map((data) => {
      const dataCore = data["translations"][randomInt(data["translations"].length)]; //takes a random translation for a chn word
      return {
        title: dataCore["simplified"],
        target: dataCore["pinyin"], //.replace(/[1-5]/g, '')
        body: dataCore["definition"],
        input: "",
        key: data["traditional"] + "-card",
        inputCallback: this.handleInputUpdate
      }
    });
  }

  /*
    generates an Array of tabs with values mapping from Array arr
  */
  generateTabs(arr) {
    return arr.map((element, index) => {
      return <option key={"option-"+index} value={index}>{String(element)}</option>
    })
  }

  /*
    Pass to Card to handle changing "input"

    input: value of new "input"
  */
  handleInputUpdate = (input) => {
    this.inputUpdate(input, this.state.selectedNum)

  }

  /*
    updates the value at "input" field of state.cards[index] with newInput
  */
  inputUpdate(newInput, index) {
    let newCards = [...this.state.cards];
    let card = {...newCards[index], input: newInput};
    newCards[index] = card;
    this.setState({cards: newCards})
  }

  /*
    handles change to which option is selected from a set of options
    assumes event.target triggering this function has name and value attributes corresponding to {name: value} in state

    e: event triggering this function
  */
  handleSelectionChange(event){
    const target = event.target;
    this.setState({[target.name]: target.value})
  }

  /*
    handles click event for Button
  */
  async handleClick() {
    // check if we need to call api
    let response;
    if (this.state.sampleSize != this.state.wordStack.length) {
      response = await this.fetchData(this.host, this.state.sampleSize);
      if (response != null) {
        response = shuffle(response);
      } else {
        response = this.state.wordStack
        alert ("There was a problem retrieving data. The last selection ["+response.length+"] was used.")
      }
    } else {
      response = shuffle(this.state.wordStack)
    }
    // checks if server responded
    //if (response != null) {
      this.setState({selectedNum: 0}) //resets current card
      this.setState({wordStack: response}, () => {
        this.setState({ cards: this.generateCards(this.state.wordStack.slice(0, this.state.stackSize)) }, () => {
          this.setState({ tabs: this.generateTabs(this.state.cards.map((item) => { return item["title"] })) })
        })
      })
    //}
  }

  render() {

    return (
      <div className="App">
        <p>Sample from n most common words:</p>
        <Radio handleChange={this.handleSelectionChange} 
          values={[
            {"text": "10", "value": 10},
            {"text": "20", "value":  20},
            {"text": "50", "value": 50},
            {"text": "100", "value": 100},
            {"text": "200", "value": 200},
            {"text": "1k", "value": 1000}
          ]}
          name="sampleSize"
          id="radio"
        />
        <button onClick={this.handleClick}>New Quiz!</button>
        <button onClick={() => {console.log(this.state.wordStack)}}>New Quiz2!</button>
        <select value={this.state.selectedNum} name="selectedNum" onChange={this.handleSelectionChange}>
          {this.state.tabs}
        </select>
        <div className="Card-display">
          {this.state.cards.length > 0 ? <Card {...this.state.cards[this.state.selectedNum]} /> : null}
        </div>
      </div>
    );
  }
}

export default App;