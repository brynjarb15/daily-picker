import React, { Component } from 'react';
import Registration from './Registration';
import ErrorPage from './ErrorPage';
import SuccessPage from "./SuccessPage";
import logo from './ccp-logo-white.svg';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSuccessPage: false,
      showErrorPage: false
    }
    this.formSentCallback = this.formSentCallback.bind(this);
    this.goBackToRegistration = this.goBackToRegistration.bind(this);
    this.choosePersonFromListOfPersons = this.choosePersonFromListOfPersons.bind(this);
    this.chooseNewPerson = this.chooseNewPerson.bind(this);


  }

  formSentCallback(response) {
    /*if (err) {
      // do some error thing
      console.log('httpResponse', httpResponse);
      console.log('Error', err);
      this.setState({showErrorPage: true});
      return;
    }*/
    if (response.data.result === 'success') {
      let chosenPerson = this.choosePersonFromListOfPersons(response.data.persons);
      this.setState({ showSuccessPage: true, chosenPerson: chosenPerson, personsToChooseFrom: response.data.persons })
    } else {
      // do some error thing
      console.log('error response', response);
      this.setState({ showErrorPage: true });
      return;
    }
  }


  choosePersonFromListOfPersons(allPersons) {
    let sumOfInvertedNumbers = 0;
    for (let i = 0; i < allPersons.length; i++) {
      if (allPersons[i][2] === '') {
        let numberOfPicks = allPersons[i][1];
        let picksInverted = 1 / numberOfPicks;
        sumOfInvertedNumbers += picksInverted;
      }
    }
    // Get random number between 0 and 1
    let randomNumber = Math.random();
    let counter = 0
    let nobodyFound = true;
    for (let i = 0; i < allPersons.length; i++) {
      // Only take persons that have not the WasLastTime or NotHere flag
      if (allPersons[i][2] === '') {
        nobodyFound = false;
        // Get the current number of picks
        let numberOfPicks = allPersons[i][1];
        // Invert the number
        let picksInverted = 1 / numberOfPicks;
        // Devide by the whole to get a percentage of the whole list
        let percentageOfWhole = picksInverted / sumOfInvertedNumbers;
        // Increase the counter
        counter += percentageOfWhole;
        // Check if the counter has gone above the random number
        if (counter >= randomNumber) {
          return allPersons[i][0];
        }
      }
    }
    if (nobodyFound) {
      return 'nobody';
    }
    return 'Error';
  }

  chooseNewPerson() {
    let allPersons = this.state.personsToChooseFrom;
    let chosenPerson = this.state.chosenPerson;
    for (let i = 0; i < allPersons.length; i++) {
      if (allPersons[i][0] === chosenPerson) {
        allPersons[i][2] = 'NotHere';
      }
    }
    let nextChosenPerson = this.choosePersonFromListOfPersons(allPersons);
    this.setState({ chosenPerson: nextChosenPerson, personsToChooseFrom: allPersons })
  }

  goBackToRegistration() {
    this.setState({ showSuccessPage: false, showErrorPage: false })
  }

  render() {
    let page = <div></div>
    if (this.state.showSuccessPage) {
      page = <SuccessPage
        goBack={this.goBackToRegistration}
        chosenPerson={this.state.chosenPerson}
        personsToChooseFrom={this.state.personsToChooseFrom}
        chooseNewPerson={this.chooseNewPerson}
      />;
    } else if (this.state.showErrorPage) {
      page = <ErrorPage goBack={this.goBackToRegistration} />
    } else {
      page = <Registration formSentCallback={this.formSentCallback} />;
    }


    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        {page}
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.1/css/all.css" integrity="sha384-O8whS3fhG2OnA5Kas0Y9l3cfpmYjapjI0E4theH4iuMD+pLhbf6JI0jIMfYcK3yZ" crossOrigin="anonymous" />
        <script src="https://unpkg.com/react/umd/react.production.min.js" crossorigin></script>
        <script
          src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"
          crossorigin></script>
        <script
          src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js"
          crossorigin></script>
      </div>
    );
  }
}

export default App;