import React, { Component, Fragment } from "react";
import {
	Image,
	Text,
	TouchableOpacity,
	View,
	ImageBackground,
	Dimensions
} from "react-native";
import Swiper from 'react-native-swiper';
import { isIphoneX } from 'react-native-iphone-x-helper';
import styles from "./style";
import close from "../../../../assets/images/icons/close_red.png";
import { CONFIG } from "../../../../../config";
import xOpeningGif from "../../../../assets/animations/messageOpenX.gif";
import notXOpeningGif from "../../../../assets/animations/messageOpen.gif";
import xBackground from "../../../../assets/animations/messageOpenXBackground.png";
import notXBackground from "../../../../assets/animations/messageOpenBackground.png";
const { height, width } = Dimensions.get('window');

const openingGif = isIphoneX() ? xOpeningGif : notXOpeningGif;
const background = isIphoneX() ? xBackground : notXBackground;
const colors = CONFIG.colors;

export default class Intro extends Component {
	constructor(props){
		super(props);
		this.state = {
			animationDone: false
		}
	}
	componentDidMount(){
		setTimeout(() => {
			this.setState({
				animationDone: true
			})
		}, 600)
	}

	render() {
		return (
			<Fragment>
			{
				!this.state.animationDone &&	
				<Image
					source={openingGif}
					style={styles.openingGif}
				/>
			}
				<ImageBackground style={styles.container} source={background}>
				<View style={styles.messageBox}>
					<TouchableOpacity
						onPress={() => this.props.navigation.goBack()}
						style={styles.closeButton}
					>
						<Image style={styles.closeIcon} source={close} />
					</TouchableOpacity>
					<View style={styles.textInputBox}>
					<Swiper style={styles.wrapper} showsButtons={true}>
						<View style={styles.slide1}>
							<Text style={styles.text}>Hello Swiper</Text>
						</View>
						<View style={styles.slide2}>
							<Text style={styles.text}>Beautiful</Text>
						</View>
						<View style={styles.slide3}>
							<Text style={styles.text}>And simple</Text>
						</View>
					</Swiper>
					</View>
				</View>
			</ImageBackground>
			</Fragment>
		)
	}
}
