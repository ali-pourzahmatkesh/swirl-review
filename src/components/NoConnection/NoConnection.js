import React, {Component} from "react";
import {NetInfo, StyleSheet, Text, View, Dimensions, Image, TouchableOpacity} from "react-native";
const {height, width} = Dimensions.get('window');
import appCss from "../../../app.css";
import {CONFIG} from "../../../config";
import noInternet from "../../assets/images/toastIcons/noInternet.png"
import exit from "../../assets/images/icons/exit3.png";
const colors = CONFIG.colors;

export default class NoConnection extends Component {
	state = {
		isConnected: true,
		hideToast:false
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
    closeToast = () => {
        this.setState({hideToast: true});
    }

	render() {
		if (this.state.isConnected||this.state.hideToast)  {
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
                        <TouchableOpacity
                            style={{
                                height: 20,
                                width: 15,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                            onPress={this.closeToast}
                        >
                            <Image
                                source={exit}
                                style={{
                                    height: 15,
                                    width: 15,
                                }}
                                resizeMode='contain'
                            />
                        </TouchableOpacity>
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
		flexDirection: 'column',
		alignItem: "center",
		flex: 1,

    }
});
