import React, { Component } from 'react';
import Discussion from '../components/Discussion';

export default class DiscussionScreen extends Component {
    static navigationOptions = {
        header : null
    };
    render() {
        return (
            <Discussion/>
        )
    }
}