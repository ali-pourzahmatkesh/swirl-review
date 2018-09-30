import React, { Component } from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import appCss from '../../../app.css'

export default class MemberSearch extends Component{

    render() {
        return (
            <View style={{marginTop:100}}>
                <Text style={appCss.defaultFontApp}>MemberSearch</Text>
                {/*<TouchableOpacity onPress={() => this.props.navigation.navigate('ProfileScreen')}>*/}
                    {/*<Text>Profile</Text>*/}
                {/*</TouchableOpacity>*/}
                {/*<TouchableOpacity onPress={() => this.props.navigation.navigate('NotificationScreen')}>*/}
                    {/*<Text>Notification</Text>*/}
                {/*</TouchableOpacity>*/}
                {/*<TouchableOpacity onPress={() => this.props.navigation.navigate('RecordedVideoScreen')}>*/}
                    {/*<Text>RecordedVideo</Text>*/}
                {/*</TouchableOpacity>*/}
            </View>
        )
    }
}