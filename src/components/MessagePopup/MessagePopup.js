import React, {Component} from "react";
import {Image, KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View} from "react-native";
import styles from "./style";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import close from "../../assets/images/icons/close_red.png";
import chat from "../../assets/images/icons/chat.png";
import camera from "../../assets/images/icons/camera.png";
import next from "../../assets/images/icons/next.png";
import {SafeAreaView} from "react-navigation";
import {CONFIG} from "../../../config";
const colors = CONFIG.colors;

export default class MessagePopup extends Component {
    state = {
        message: ""
    };
    componentDidMount() {
    }
    render() {

        const { message } = this.state;
        const count = message.length;
        return (
            <SafeAreaView style={styles.container}>
                <KeyboardAvoidingView style={styles.messageBox} behavior="padding">
                    <View style={styles.messageBoxHeader}>
                        <TouchableOpacity onPress={this.props.closeMessageModal}>
                            <Image style={styles.closeIcon} source={close}/>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.myTextInput.focus()} style={styles.subjectBox}>
                            <MaterialCommunityIcons
                                size={17}
                                color={colors.combinatorialColor}
                                name="playlist-edit"
                            />

                            <Text style={styles.headerSubject}>Type here…</Text>
                        </TouchableOpacity>
                        <View></View>
                    </View>
                    <View style={styles.textInputBox}>
                        <View>
                            <TextInput
                                style={styles.textInput}
                                placeholderTextColor="#000"
                                autoCorrect={false}
                                multiline={true}
                                value={message}
                                autoFocus={true}
                                blurOnSubmit={true}
                                returnKeyType="next"
                                ref={( ref ) => {
                                    this.myTextInput = ref
                                }}
                                onChangeText={message => {
                                    this.setState({ message: message.slice(0, 120) })
                                }}
                            />
                        </View>
                        <View style={styles.footer}>
                            <View style={styles.footerCounter}>
                                <Text style={styles.footerCounterText}>{count} / 120</Text>
                            </View>
                            <View style={styles.footerActions}>

                                <View style={styles.nextButton}/>
                                <View style={styles.footerActions}>
                                    <TouchableOpacity style={styles.actionBox}>
                                        <Image resizeMode="contain" style={styles.actionBoxIcon} source={chat}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.actionBox}>
                                        <Image resizeMode="contain" style={styles.actionBoxIcon} source={camera}/>
                                    </TouchableOpacity>

                                </View>
                                <TouchableOpacity style={[styles.nextButton,{backgroundColor: colors.combinatorialColor}]}>
                                    <Image style={styles.iconButton} source={next}/>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>

                </KeyboardAvoidingView>
            </SafeAreaView>

        );
    }
}

