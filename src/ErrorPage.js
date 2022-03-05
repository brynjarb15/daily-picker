import React, { Component } from 'react';

class ErrorPage extends Component {
    render() {
        return (
            <div>
                <h1>
                    Það kom upp villa þegar þú reyndir að skrá þig.
                </h1>
                <h2>
                    Endilega reyndu að skrá þig aftur síðar eða láttu vita að þú ert að fá villu.
                </h2>
                <button type="button" onClick={this.props.goBack}>Fara til baka</button>
            </div>
        );
    }
}

export default ErrorPage;
