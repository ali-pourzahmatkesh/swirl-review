import React, {Component} from 'react';
import TermsAndConditions from '../components/TermsAndConditions';
import {Text} from 'react-native';
import appCss from '../../app.css';

export default class TermsAndConditionsScreen extends Component{
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: (
                <Text style={[appCss.defaultFontApp,appCss.navigationTitle]} numberOfLines={1} ellipsizeMode='tail'>Terms of Use</Text>
            )
        }
    };
    render() {
        return (
            <TermsAndConditions/>
        )
    }
}