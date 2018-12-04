import {StyleSheet} from 'react-native';
import {CONFIG} from '../../../config';
const colors = CONFIG.colors;
export default class StyleSheetFactory {
    static getSheet(avatarSize) {
        return StyleSheet.create({
            avatarItem: {
                borderWidth: 1,
                width: avatarSize,
                height: avatarSize,
                borderColor: colors.borderColor,
                borderRadius: avatarSize/2,
                overflow: "hidden",
            },

            avatarImage: {
                flex:1,
                width: undefined,
                height: undefined,
                // resizeMode:'contain'
            },
        })
    }
}
