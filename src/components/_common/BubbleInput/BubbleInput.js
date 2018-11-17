import React, { Component } from "react";
import {
    View,
    Image,
    TextInput,
    Text
} from "react-native";
import styles from "./style";
import phoneIcon from "../../../assets/images/icons/phone3.png";
import CountryCodeModal from "../CountryCodeModal";
import {CONFIG} from "../../../../config";
const COLORS = CONFIG.colors;

export default class BubbleInput extends Component {
    constructor(props){
        super(props);
        this.state = {
            countryCodeVisible: false,
            modalVisible: false,
            cellphoneCountryCode: '',
            flag: ''
        }
    }

    render(){
        let {
            icon,
            inputProps,
            cellphone,
            phoneNumber
        } = this.props;

        return(
            !phoneNumber ?
            <View style={styles.iconFormInput}>
                <Image style={styles.formInputIcon} source={icon}/>
                <TextInput
                    style={styles.textInput}
                    placeholderTextColor={COLORS.highlightColorTwo}
                    autoCorrect={false}
                    {...inputProps}
                />
            </View>
            :
            <View style={styles.iconFormInput}>
            {this.state.countryCodeVisible || this.state.modalVisible ?
                <CountryCodeModal
                defaultCountryCode={this.props.defaultCountryCode}
                defaultFlag={this.props.defaultFlag}
                setCountryCode={this.props.setCountryCode}
                updateModalVisible={
                    modalVisible => {
                        this.setState({
                            modalVisible
                        })
                    }
                }
            />
                :
                <Image style={styles.formInputIcon} source={phoneIcon}/>
            }
                <TextInput
                    ref={ref => this.phoneInput = ref}
                    style={styles.textInput}
                    keyboardType='number-pad'
                    placeholder='Phone Number'
                    placeholderTextColor={COLORS.highlightColorTwo}
                    autoCorrect={false}
                    onFocus={()=>this.setState({countryCodeVisible: true})}
                    onBlur={()=>this.setState({countryCodeVisible: false})}
                    {...inputProps}
                />
            </View>
        )
    }
}