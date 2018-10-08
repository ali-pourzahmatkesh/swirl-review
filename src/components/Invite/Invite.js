import React, {Component} from "react";
import {TextInput, TouchableOpacity, View} from "react-native";
import styles from "./style";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import InviteTabs from "../InviteTabs";
import appCss from "../../../app.css";
import { CONFIG } from "../../../config";
const COLORS = CONFIG.colors;

export default class Invite extends Component {


    state = {
        searchText : ""
    }
    search = text => {
        this.setState({searchText : text})
        this.setState({searchText : text})
    };
    render() {
        return (
            <View style={styles.container}>
                <View style={appCss.header}>
                    <View style={styles.headerAction}>
                        <TouchableOpacity
                            style={appCss.headerIconBox}
                            onPress={() => this.props.navigation.goBack()}
                        >
                            <Ionicons
                                style={styles.backButton}
                                size={30}
                                color={COLORS.bodyColor}
                                name="ios-arrow-back"
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.search}>
                        <View style={styles.SectionStyle}>
                            <Feather
                                style={styles.ImageStyle}
                                size={15}
                                color={COLORS.bodyColor}
                                name="search"
                            />
                            <TextInput
                                style={{ flex: 1, color:COLORS.bodyColor }}
                                placeholderTextColor={COLORS.bodyColor}
                                placeholder="Search By Username"
                                onChangeText={text => this.search(text)}
                                underlineColorAndroid="transparent"
                            />
                        </View>
                    </View>
                    <View style={styles.headerAction}/>
                </View>
                <InviteTabs/>
            </View>

        );
    }
}
