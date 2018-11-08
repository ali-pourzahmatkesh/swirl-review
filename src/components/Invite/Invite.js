import React, {Component} from "react";
import {
    TextInput,
    TouchableOpacity,
    View,
    Image
} from "react-native";
import styles from "./style";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import InviteTabs from "../InviteTabs";
import appCss from "../../../app.css";
import search from "../../assets/images/icons/search3.png";
import { CONFIG } from "../../../config";
const COLORS = CONFIG.colors;

export default class Invite extends Component {


    state = {
        searchText : ""
    };
    search = text => {
        this.setState({searchText : text})
    };


    prepareForRedirectToProfile = item => {
        console.log("********::", item)
        this.props.navigation.push("ProfileScreen", {
            userId: item,
            x: 1
        });
    };
    render() {
        const {searchText} = this.state;
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
                        <View style={styles.sectionStyle}>
                            {/* <Feather
                                style={styles.ImageStyle}
                                size={15}
                                color={COLORS.bodyColor}
                                name="search"
                            /> */}
                            <Image
                                source={search}
                                style={styles.imageStyle}
                                resizeMode='contain'
                            />
                            <TextInput
                                style={{ color:COLORS.bodyColor, fontFamily: 'MuseoSansRounded-900', fontSize: 19, borderWidth: 0 }}
                                placeholderTextColor={COLORS.bodyColor}
                                placeholder="Search By Username"
                                onChangeText={text => this.search(text)}
                                underlineColorAndroid="transparent"
                            />
                        </View>
                    </View>
                    <View style={styles.headerAction}/>
                </View>
                <InviteTabs  screenProps={{searchText, profileNavigate:this.prepareForRedirectToProfile}}/>
            </View>

        );
    }
}
