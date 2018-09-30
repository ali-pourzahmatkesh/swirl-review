import React, { Component } from 'react';
import Setting from '../components/Setting';
import {Text} from 'react-native';
import appCss from '../../app.css';
import {CONFIG} from "../../config";

const COLORS = CONFIG.colors;
export default class SettingScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: (
                <Text style={appCss.navigationTitle}>Settings</Text>
            ),
            headerStyle: {
                backgroundColor: COLORS.appColor,
                borderBottomWidth:0,
            }
        }
    };
    render() {
        return (
            <Setting/>
        )
    }
}