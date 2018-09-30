import {StyleSheet} from 'react-native';
import {CONFIG} from "../../../config";
const colors = CONFIG.colors;
export default class StyleSheetFactory{
    static getSheet(avatarSize) {
        return StyleSheet.create({
            peopleOnCameraVector: {
                width: avatarSize,
                height: avatarSize,
                position: 'absolute',
            },
            peopleOnCameraBoxRotate: {
                width: avatarSize,
                height: avatarSize,
                position: 'absolute',
            },
            avatarImageBox: {
                width: avatarSize,
                height: avatarSize,
                borderWidth: 1,
                borderColor: colors.tapeWhite,
                borderRadius: avatarSize/2,
                overflow: 'hidden',
                position: 'absolute',

            }
        });
    }
}
