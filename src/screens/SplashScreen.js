console.log("SplashScreen");
import React, { Component } from "react";
import { NavigationActions, SafeAreaView } from "react-navigation";
import { Image, StyleSheet, View, Dimensions } from "react-native";
import logoPic from "../assets/images/lightening.png";
import { checkIsLogin } from "../store/member";
import { connect } from "react-redux";
const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#ed1b34",
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	imageContainer: {
		height: height / 4
	},
	imageItem: {
		flex: 1,
		aspectRatio: 1,
		resizeMode: "contain"
	}
});

class SplashScreen extends Component {
	state = {
		isReady: true,
		isLogin: true
		// notification: {}
	};

	componentDidMount() {
		this.props.checkIsLogin({
			NavigationActions,
			navigation: this.props.navigation
		});
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.imageContainer}>
					<Image style={styles.imageItem} source={logoPic} />
				</View>
			</View>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		checkIsLogin: data => dispatch(checkIsLogin(data))
	};
};

export default connect(
	null,
	mapDispatchToProps
)(SplashScreen);
