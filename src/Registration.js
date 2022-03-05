import React, { Component } from 'react';
import { getAllNames } from './InternetFunctions';
import './Registration.css';


class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = { loading: false };

        this.handleChange = this.handleChange.bind(this);
        this.sendButtonPressed = this.sendButtonPressed.bind(this);
        this.formSentCallback = this.formSentCallback.bind(this);

    }

    /**
     * Handle change to text input fields
     */
    handleChange(event) {
        this.setState({ [event.target.name]: { name: this.state[event.target.name].name, val: event.target.value } });
    }


    /**
     * What happens when the send button is pressed
     * Error check and the the data is sent away
     */
    sendButtonPressed() {

        this.setState({ loading: true });

        // Send the data
        getAllNames(this.formSentCallback);


    }



    getInputFormField(field) {
        let input =
            <div key={field} className={this.state[field].class}>
                <label>
                    {this.state[field].name}:
                    <input className="form-control" type="text"
                        name={field}
                        placeholder={this.state[field].name}
                        onChange={this.handleChange}
                        value={this.state[field].val}
                    />
                    <small className="error-label">Það þarf að fylla inn þennan reit</small>
                    <br className="error-label" />
                </label>
            </div>;
        return input;
    }

    // Callback sent with the send form to sheet
    formSentCallback(response) {
        // Make all empty
        //this.setState(this.initState);
        console.log(response);
        this.props.formSentCallback(response);
    }

    updateEvents(DnDData) {
        this.setState({ eventsDnD: DnDData });
    }



    render() {


        let buttonValue = 'Senda';
        if (this.state.loading) {
            buttonValue = <div className="lds-ring"><div></div><div></div><div></div><div></div></div>;
        }
        return (
            <div className="registration-all">
                <h1>
                    Choose next daily person:
                </h1>
                <button type="button" className="btn btn-primary btn-lg" value="senda" onClick={this.sendButtonPressed}>
                    {buttonValue}
                </button>
            </div>
        );
    }
}

export default Registration;