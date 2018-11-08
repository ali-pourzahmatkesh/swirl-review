import { Dimensions, StyleSheet } from "react-native";
import appCss from "../../../app.css";
import { CONFIG } from "../../../config";
const { width, height } = Dimensions.get("window");
const colors = CONFIG.colors;
const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.appColor,
		flex: 1
	},
	forgotPassword: {
		color: colors.tapeWhite,
		textDecorationLine: "underline",
		fontSize: 14,
		marginTop: 50,
		fontFamily: 'Avenir',
		fontSize: 14,
		fontWeight: '500'
	},

    imageContainer: {
        flex: 2,
        justifyContent: "center",
		alignItems: "center",
		marginBottom: 50,
		paddingTop: 15
    },
	imageItem: {
		height: 80,
		width: 80,
		aspectRatio: 1,
		resizeMode: "contain",
	},
	signUpText: {
		color: colors.tapeWhite,
		textAlign: "center",
		fontFamily: 'MuseoSansRounded-700',
		fontSize: 14
	},
});

export default styles;
