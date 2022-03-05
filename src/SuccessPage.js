import React, { Component } from 'react';
import { sendNewlyPickedPerson } from './InternetFunctions';

class SuccessPage extends Component {
    constructor(props) {
        super(props);

        this.state = { yesButtonPressed: false }
        this.yesButtonPressed = this.yesButtonPressed.bind(this);
    }

    yesButtonPressed() {
        this.setState({ yesButtonPressed: true });
        // Send to the db who was chosen
        sendNewlyPickedPerson(this.props.chosenPerson);
    }

    render() {
        let nobodyLeft = false;
        // Default message
        let message = 'Is ' + this.props.chosenPerson + ' at the meeting?';
        // Change the message if nobody is left
        if (this.props.chosenPerson === 'nobody') {
            message = 'Nobody is left to host the meeting';
            nobodyLeft = true
        }

        let buttons = <div>
            <button type="button" onClick={this.yesButtonPressed}>Yes</button>
            <button type="button" onClick={this.props.chooseNewPerson}>No</button>
        </div>

        if (nobodyLeft) {
            buttons = <button type="button" onClick={this.props.goBack}>Try again</button>;
        }
        if (this.state.yesButtonPressed) {
            message = this.props.chosenPerson + ' will host the daily';
            buttons = ''
        }
        return (
            <div>
                <h1>
                    {message}
                </h1>
                {buttons}
            </div>
        );
    }
}

export default SuccessPage;
