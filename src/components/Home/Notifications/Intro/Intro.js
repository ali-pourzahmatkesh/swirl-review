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
import close from "../../../../assets/images/icons/close.png";
import { CONFIG } from "../../../../../config";
import xOpeningGif from "../../../../assets/animations/messageOpenX.gif";
import notXOpeningGif from "../../../../assets/animations/messageOpen.gif";
import xBackground from "../../../../assets/animations/messageOpenXBackground.png";
import notXBackground from "../../../../assets/animations/messageOpenBackground.png";
import intro1 from "../../../../assets/notifications/intro/intro1.png";
import intro2 from "../../../../assets/notifications/intro/intro2.png";
import intro3 from "../../../../assets/notifications/intro/intro3.png";
import intro4 from "../../../../assets/notifications/intro/intro4.png";
import logo from "../../../../assets/images/logo1.png";
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
				<ImageBackground style={[styles.container]} source={background}>
				<View style={styles.messageBox}>
					<View style={styles.header}>	
						<TouchableOpacity
							onPress={() => this.props.navigation.goBack()}
							style={styles.closeButton}
						>
							<Image style={styles.closeIcon} source={close} />
						</TouchableOpacity>
						<Text style={styles.headerTitle}>Welcome to Swirl</Text>
						<View style={styles.headerSpacer}/>
					</View>
					<Swiper
						style={styles.wrapper}
						containerStyle={{borderRadius: 20}}
						showsButtons={false}
						loop={false}
						activeDotColor="white"
						dotStyle={styles.dotStyle}
					>
						<View style={styles.slide}>
							<View style={styles.textContainer}>
								<View style={{flexDirection: 'row'}}>
									<Image
										source={logo}
										resizeMode='contain'
										style={styles.logo}
									/>
									<Text style={styles.text}>  A Swirl is a time capsule</Text>
								</View>
								<Text style={styles.text}>Hide Messages ✉️ and</Text>
								<Text style={styles.text}>Pictures 📷 in a Swirl</Text>
							</View>
							<Image
								source={intro1}
								resizeMode='contain'
								style={styles.slideImage}
							/>
						</View>
						<View style={styles.slide}>
							<View style={styles.textContainer}>
								<Text style={styles.text}>👫 Send it to Friends!</Text>
							</View>
							<Image
								source={intro2}
								resizeMode='contain'
								style={styles.slideImage}
							/>
						</View>
						<View style={styles.slide}>
							<View style={styles.textContainer}>
								<Text style={styles.text}>⏰ Set the time when it can be unswirled</Text>
							</View>
							<Image
								source={intro3}
								resizeMode='contain'
								style={styles.slideImage}
							/>
						</View>
						<View style={styles.slide}>
							<View style={styles.textContainer}>
								<Text style={styles.text}>👻 Your friends will be able to open your Swirl at the scheduled time</Text>
							</View>
							<Image
								source={intro4}
								resizeMode='contain'
								style={styles.slideImage}
							/>
						</View>
					</Swiper>
				</View>
			</ImageBackground>
			</Fragment>
		)
	}
}
