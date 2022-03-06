import React, { Component } from 'react';
import { sendNewlyPickedPerson } from './InternetFunctions';
import Button from 'react-bootstrap/Button';

import './Registration.css';


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
            <Button variant="danger"  type="button" className='button' size="lg" onClick={this.props.chooseNewPerson}>No</Button>
            <Button variant="success" type="button" className='button' size="lg" onClick={this.yesButtonPressed}>Yes</Button>
        </div>

        if (nobodyLeft) {
            buttons = <Button variant="dark" className="btn btn-primary btn-lg button" onClick={this.props.goBack}>Try again</Button>;
        }
        if (this.state.yesButtonPressed) {
            message = this.props.chosenPerson + ' will host the daily';
            buttons = <Button variant="dark" className="btn btn-primary btn-lg button" onClick={this.props.goBack}>Start again</Button>
        }
        return (
            <div>
                <h1 className='header-text'>
                    {message}
                </h1>
                {buttons}
            </div>
        );
    }
}

export default SuccessPage;
