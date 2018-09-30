import {
    Dimensions,
    StyleSheet
} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import {CONFIG} from '../../../config';
import appCss from '../../../app.css';


const  {height, width} = Dimensions.get('window');
const COLORS = CONFIG.colors;

export default class Styles{
    static getSheet(outerStyles, topHeight, activityListHeight){ // name is WIP
        let {
            button,
            activeHeadsList,
            headerBackground,
            label,
            activityContainer,
            activityItem,
            title,
            dragZone
        } = outerStyles

        return StyleSheet.create({
            container: {
                position: 'absolute',
                zIndex: 1,
                width: '100%'
            },
        
            titleText: StyleSheet.flatten([appCss.defaultFontApp, title, {
                color: COLORS.tapeWhite,
                fontSize: 25,
                alignSelf: 'center',
            }]),
        
            activityToggleButton: {
                position: 'absolute',
                bottom: button.radius * -1,
                left: (width/2) - button.radius,
                borderColor: COLORS.tapeWhite,
                borderWidth: 1,
                borderRadius: button.radius,
                backgroundColor: COLORS.appColor,
                width: button.radius * 2
            },
        
            activeHeadsContainer: {
                width: 0.9 * width,
                marginLeft: 0.05 * width,
                backgroundColor: COLORS.appColor,
                zIndex: 2,
                height: activeHeadsList.height,
            },
        
            activeHeadsList: {
                // borderWidth: 1,
                // paddingLeft: 10
            },
        
            listLabel: {
                marginBottom: label.marginBottom,
            },
        
            listLabelText: StyleSheet.flatten([appCss.defaultFontApp, {
                fontSize: 12,
                marginLeft: 10,
                color: COLORS.tapeWhite,
                lineHeight: label.lineHeight,
            }]),
        
            activityContainer: {
                position: 'absolute',
                zIndex: 2,
                top: topHeight,
                backgroundColor: COLORS.appColor,
                width: width,
                paddingTop: activityContainer.paddingTop
            },
        
            activityFeed: {
                height: activityListHeight,
                width: width
            },
        
            dragZone: {
                width: '100%',
                height: dragZone.height,
                backgroundColor: COLORS.appColor,
                borderTopColor: COLORS.tapeDarkGrey,
                borderTopWidth: 1,
                borderBottomWidth: 2
            },
        
            headerBackground: {
                width: '100%',
                backgroundColor: COLORS.appColor,
                paddingTop: headerBackground.paddingTop
            },
        
            activityItem: {
                height: activityItem.height,
                flexDirection: 'row',
                alignItems: 'center',
                // borderWidth: 1
            },
        
            activityTextHeavy: StyleSheet.flatten([appCss.defaultFontApp, {
                color: COLORS.tapeWhite
            }]),
        
            activityTextLight: StyleSheet.flatten([appCss.thinDefaultFontApp, {
                color: COLORS.tapeWhite
            }])
        });
    }
}




// export default STYLES;