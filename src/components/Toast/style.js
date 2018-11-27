import {StyleSheet, Dimensions} from "react-native";
const {height, width} = Dimensions.get('window');
import {CONFIG} from "../../../config";
const colors = CONFIG.colors;
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
		fontSize: 16,
		fontFamily: 'MuseoSansRounded-700',
        color: colors.bodyColor,
		textAlign: "center",
		flex: 1,
    }
});

export default styles;
