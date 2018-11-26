import React, {Component} from "react";
import {NetInfo, StyleSheet, Text, View, Dimensions, Image} from "react-native";
const {height, width} = Dimensions.get('window');
import appCss from "../../../app.css";
import {CONFIG} from "../../../config";
import noInternet from "../../assets/images/toastIcons/noInternet.png"
const colors = CONFIG.colors;

export default class NoConnection extends Component {
	state = {
		isConnected: true
	};

	componentDidMount() {
		NetInfo.isConnected.fetch().then(isConnected => {
			this.setState({ isConnected });
		});

		NetInfo.isConnected.addEventListener(
			"connectionChange",
			this.handleFirstConnectivityChange
		);
	}

	componentWillUnmount() {
		NetInfo.isConnected.removeEventListener(
			"connectionChange",
			this.handleFirstConnectivityChange
		);
	}

	handleFirstConnectivityChange = isConnected => {
		this.setState({ isConnected });
	};

	render() {
		if (this.state.isConnected) {
			return null;
		} else {
			return (
					<View style={styles.container}>
						<Image
							source={noInternet}
							style={{
								height: 30,
								width: 30
							}}
							resizeMode='contain'
						/>
						<Text style={styles.text}>
							No Internet Connection
						</Text>
						<Image
							// source={noInternet}
							style={{
								height: 30,
								width: 30
							}}
							resizeMode='contain'
						/>
					</View>
			);
		}
	}
}
const styles = StyleSheet.flatten({
	container: {
        position: "absolute",
        top: height === 812 ? 43 : 20,
		// height: height * 0.065,
		height: 35 + (height * 0.02),
        width: width * 0.90,
        backgroundColor: colors.highlightColorTwo,
		borderRadius: 15,
		alignSelf: 'center',
        alignItems: "center",
		justifyContent: "space-between",
		flexDirection: 'row',
		paddingLeft: width * 0.04,
		paddingRight: width * 0.04,
		
        shadowOffset: {
            height: 1.5
        },
        shadowOpacity: 0.6,
        shadowRadius: 2
    },
    text: {
		fontSize: 15,
		fontFamily: 'MuseoSansRounded-700',
        color: colors.bodyColor,
		textAlign: "center",
		flex: 1,
    }
});
