import { StyleSheet, Dimensions } from "react-native";
import appCss from "../../../../../app.css";
import { CONFIG } from "../../../../../config";
const COLORS = CONFIG.colors;
const {width, height} = Dimensions.get('window');

const styles = {
    getStyle: styleProps => {
        let {
            radius,
            border,
            degreesPastHalf
        } = styleProps;

        console.log(degreesPastHalf, '*************************')
        const circleStyles = StyleSheet.create({
            containingCircle: {
                width: radius * 2,
                height: radius * 2,
                borderRadius: radius,
                backgroundColor: 'transparent',
                justifyContent: 'center',
            },
            halfContainer: {
                position: 'absolute',
                height: radius * 2,
                width: radius * 2,
                transform: [{rotate:'90deg'}],
                // borderWidth: 1
            },
            halfFill: {
                width: radius,
                height: radius * 2,
                borderWidth: border,
                borderColor: COLORS.tapeWhite,
                borderRadius: radius,
                borderRightWidth: 0,
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
            },
            topContainer: {
                position: 'absolute',
                height: radius * 2,
                width: radius * 2,
                transform: [{rotate: (90 + (degreesPastHalf || 0)) + 'deg'}]
            },
            topFill: {
                width: radius,
                height: radius * 2,
                borderWidth: border,
                borderColor: COLORS.tapeWhite,
                borderRadius: radius,
                borderRightWidth: 0,
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
                overflow: 'hidden'
            }
        });
        return circleStyles;
    }
}



export default styles;
