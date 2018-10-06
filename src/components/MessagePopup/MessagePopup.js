import React, {Component} from "react";
import {Image, KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View, Dimensions} from "react-native";
const {height, width} = Dimensions.get('window');
import styles from "./style";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ImagePicker from "react-native-image-picker";
import close from "../../assets/images/icons/close_red.png";
import chat from "../../assets/images/icons/chat.png";
import chatDisable from "../../assets/images/icons/chatDisable.png";
import camera from "../../assets/images/icons/camera.png";
import cameraDisable from "../../assets/images/icons/cameraDisable.png";
import next from "../../assets/images/icons/next.png";
import {SafeAreaView} from "react-navigation";
import {CONFIG} from "../../../config";
const colors = CONFIG.colors;
const options = {
    title: 'Select Avatar',
    // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

export default class MessagePopup extends Component {
    state = {
        message: "",
        tabSelected : 'chat'
    };
    componentDidMount() {
    }



    tabSelectedFunction= (tabSelected)=>{
        this.setState({ tabSelected, avatarSource: '' });

        if( tabSelected === 'chat' ) {

        } else {
            /**
             * The first arg is the options object for customization (it can also be null or omitted for default options),
             * The second arg is the callback which sends object: response (more info in the API Reference)
             */

            ImagePicker.showImagePicker(options, ( response ) => {
                console.log('Response = ', response);

                if( response.didCancel ) {
                    console.log('User cancelled image picker');
                } else
                    if( response.error ) {
                        console.log('ImagePicker Error: ', response.error);
                    } else
                        if( response.customButton ) {
                            console.log('User tapped custom button: ', response.customButton);
                        } else {
                            const source = { uri: response.uri };

                            // You can also display the image using data:
                            // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                            this.setState({
                                avatarSource: source,
                            });
                        }
            });

        }

    };
    render() {

        const { message, tabSelected, avatarSource } = this.state;
        console.log("this.state.avatarSource", this.state.avatarSource)
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
                            {
                                tabSelected === 'chat' &&
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
                            }
                            {
                                avatarSource &&
                                <View style={{ width: width-50, maxHeight:height-100,height:height-200, }}>
                                    <Image resizeMode={'contain'} source={avatarSource} style={styles.actionBoxIcon}/>
                                </View>
                            }


                        </View>
                        <View style={styles.footer}>
                            <View style={styles.footerCounter}>
                                <Text style={styles.footerCounterText}>{count} / 120</Text>
                            </View>
                            <View style={styles.footerActions}>

                                <View style={styles.nextButton}/>
                                <View style={styles.footerActions}>
                                    <TouchableOpacity onPress={()=>this.tabSelectedFunction('chat')} style={styles.actionBox}>
                                        <Image resizeMode="contain" style={styles.actionBoxIcon} source={tabSelected==='chat' && chat || chatDisable}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={()=>this.tabSelectedFunction('camera')} style={styles.actionBox}>
                                        <Image resizeMode="contain" style={styles.actionBoxIcon} source={tabSelected==='camera' && camera || cameraDisable}/>
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

