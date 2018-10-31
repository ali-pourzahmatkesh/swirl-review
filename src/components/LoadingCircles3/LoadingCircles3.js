import React, { Component } from "react";
import { Image } from "react-native";
import loadingCircles3 from "../../assets/images/loading_circles_3.gif";
import styles from "./style";

export default class LoadingCircles3 extends Component {
	render() {
		return (
			<Image
				resizeMode={"contain"}
				style={styles.icon}
				source={loadingCircles3}
			/>
		);
	}
}
