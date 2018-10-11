import React, {Component} from "react";
import {
    Dimensions,
    Image,
    ImageBackground,
    KeyboardAvoidingView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import styles from "./style";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ImagePicker from "react-native-image-picker";
import close from "../../assets/images/icons/close_red.png";
import closeWhite from "../../assets/images/icons/close.png";
import chat from "../../assets/images/icons/chat.png";
import chatDisable from "../../assets/images/icons/chatDisable.png";
import camera from "../../assets/images/icons/camera.png";
import cameraDisable from "../../assets/images/icons/cameraDisable.png";
import cameraBtn from "../../assets/images/icons/cameraBtn.png";
import background from "../../assets/images/logo_bigger.png";
import logo from "../../assets/images/logo_bigger.png";
import next from "../../assets/images/icons/next.png";
import {CONFIG} from "../../../config";
import SendTo from "../SendTo/SendTo";
import TimePicker from "../TimePicker/TimePicker";
import appCss from "../../../app.css";
const colors = CONFIG.colors;
const { height, width } = Dimensions.get('window');


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
        tabSelected: 'chat',
        selectedHours: 0,
        selectedMinutes: 0,
        lastSection : ''
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


            ImagePicker.launchCamera(options, ( response ) => {
                console.log('Response = ', response);

                if( response.error ) {
                        console.log('ImagePicker Error: ', response.error);
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
    loadMessageContent = () => {
        const { message, tabSelected, avatarSource } = this.state;
        console.log("this.state.avatarSource", this.state.avatarSource)
        const count = message.length;
        return (
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
                    <View style={styles.footer}>
                        <View style={styles.footerCounter}>
                            <Text style={styles.footerCounterText}>{count} / 120</Text>
                        </View>
                        <View style={styles.footerActions}>

                            <View style={styles.nextButton}/>
                            <View style={styles.footerActions}>
                                <TouchableOpacity onPress={() => this.tabSelectedFunction('chat')}
                                                  style={styles.actionBox}>
                                    <Image resizeMode="contain" style={styles.actionBoxIcon}
                                           source={tabSelected === 'chat' && chat || chatDisable}/>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.tabSelectedFunction('camera')}
                                                  style={styles.actionBox}>
                                    <Image resizeMode="contain" style={styles.actionBoxIcon}
                                           source={tabSelected === 'camera' && camera || cameraDisable}/>
                                </TouchableOpacity>

                            </View>
                            <TouchableOpacity
                                onPress={() => this.setState({ tabSelected: 'timePicker', lastSection:'chat' })}
                                style={[ styles.nextButton, { backgroundColor: colors.combinatorialColor } ]}>
                                <Image style={styles.iconButton} source={next}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        )

    };

    tackPhoto = ()=>{
        this.setState({tabSelected : 'image'})
    };

    loadCameraContent = () => {
        const { tabSelected } = this.state;
        return (
            <View style={styles.cameraActionBox}>
                <View style={styles.messageBoxHeader}>
                    <TouchableOpacity onPress={this.props.closeMessageModal}>
                        <Image style={styles.closeIcon} source={close}/>
                    </TouchableOpacity>
                    <View/><View/>
                </View>
                <View style={styles.cameraActions}>
                    <View style={styles.cameraBtnBox}>
                        <TouchableOpacity onPress={() => this.tackPhoto('chat')}
                                          style={styles.actionBox}>
                            <Image resizeMode="contain" style={styles.cameraBtn}
                                   source={cameraBtn}/>
                        </TouchableOpacity>
                    </View>
                    <View style={[ styles.footerActions, { width } ]}>
                        <View style={styles.nextButton}/>
                        <View style={styles.footerActions}>
                            <TouchableOpacity onPress={() => this.tabSelectedFunction('chat')}
                                              style={styles.actionBox}>
                                <Image resizeMode="contain" style={styles.actionBoxIcon}
                                       source={tabSelected === 'chat' && chat || chatDisable}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.tabSelectedFunction('camera')}
                                              style={styles.actionBox}>
                                <Image resizeMode="contain" style={styles.actionBoxIcon}
                                       source={tabSelected === 'camera' && camera || cameraDisable}/>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.nextButton}/>
                    </View>

                </View>
            </View>
        )
    };






    loadImageContent = ()=>{
        return(
            <ImageBackground style={styles.cameraActionBox} source={background}>
                <View style={styles.messageBoxHeader}>
                    <TouchableOpacity onPress={()=>this.setState({tabSelected : 'camera'})}>
                        <Image style={styles.closeIcon} source={close}/>
                    </TouchableOpacity>
                    <View/><View/>
                </View>
                <View style={styles.cameraActions}>
                    <View style={styles.footer}>
                        <View style={[styles.footerActions, {justifyContent:'flex-end', width, paddingRight:15}]}>
                            <TouchableOpacity
                                onPress={() => this.setState({ tabSelected: 'timePicker' , lastSection:'camera'})}
                                style={[ styles.nextButton, { backgroundColor: colors.combinatorialColor } ]}>
                                <Image style={styles.iconButton} source={next}/>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </ImageBackground>
        )
    };

    loadContacts = ()=>{
        return (
            <View style={styles.containerOtherPage}>
                <View style={[ appCss.header, { width } ]}>
                    <TouchableOpacity
                        onPress={() => this.setState({ tabSelected: 'timePicker' })}
                        style={appCss.otherHeaderIconBox}
                    >
                        <Image
                            style={appCss.headerIcon}
                            resizeMode={"contain"}
                            source={closeWhite}
                        />
                    </TouchableOpacity>
                    <View>
                        <Text style={appCss.headerTitle}>Send To</Text>
                    </View>
                   <View/>
                </View>
                <SendTo friendList={this.friendList} />
            </View>
        )
    };
    friendList = list=>{
        let memberListId = [];
        this.props.closeMessageModal()
        list.forEach(i=>i['data'].forEach(ii=>ii['checked'] && memberListId.push(ii['receiverMemberId'])));
        console.log("memberListId", memberListId)
    };

    loadTimePicker = () => {
        const { selectedHours, selectedMinutes , lastSection} = this.state;
        return (
            <View style={styles.containerOtherPage}>
                <View style={[ appCss.header, { width } ]}>
                    <TouchableOpacity
                        onPress={() => this.setState({ tabSelected: lastSection })}
                        style={appCss.otherHeaderIconBox}
                    >
                        <Image
                            style={appCss.headerIcon}
                            resizeMode={"contain"}
                            source={closeWhite}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={appCss.headerLogoBox}>
                        <Image
                            style={appCss.headerIcon}
                            resizeMode={"contain"}
                            source={logo}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={appCss.headerIconBox}
                        onPress={this.handleSubmit}
                    >

                    </TouchableOpacity>
                </View>
                <Text style={styles.pickerText}>Time until unswirl... </Text>
                <View style={{ backgroundColor: 'yellow', height: '70%' }}>
                    <TimePicker
                        selectedHours={selectedHours}
                        selectedMinutes={selectedMinutes}
                        onChange={( hours, minutes ) => this.setState({
                            selectedHours: hours,
                            selectedMinutes: minutes
                        })}
                    />
                </View>

                <View style={{ height: 100, width, flexDirection:'row', justifyContent:'flex-end'  }}>
                    <View style={styles.footer}>
                        <View style={[styles.footerActions, {justifyContent:'flex-end', width, paddingRight:15}]}>
                            <TouchableOpacity
                                onPress={() => this.setState({ tabSelected: 'contacts' })}
                                style={[ styles.nextButton, { backgroundColor: colors.combinatorialColor } ]}>
                                <Image style={styles.iconButton} source={next}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
    };

    render() {
        const { tabSelected } = this.state;
        let contentLoader = '';
        switch(tabSelected){
            case 'chat':
                contentLoader = this.loadMessageContent();
                break;
            case 'camera':
                contentLoader = this.loadCameraContent();
                break;
            case 'image':
                contentLoader = this.loadImageContent();
                break;
            case 'contacts':
                contentLoader = this.loadContacts();
                break;
            case 'timePicker':
                contentLoader = this.loadTimePicker();
                break;
        }
        return (
            <View style={styles.container}>
                {contentLoader}
            </View>
        );
    }
}

