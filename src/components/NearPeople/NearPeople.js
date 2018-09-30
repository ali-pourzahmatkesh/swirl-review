import React, {Component} from "react";
import {Animated, Dimensions, Easing} from "react-native";
import styles from "./style";
import Avatar from "../Avatar";
import {CONFIG} from "../../../config";
const { width, height } = Dimensions.get("window");
const imageWidth = width / 5;
const { animationDuration: ANIMATION_DURATION } = CONFIG;
const contentBoxHeight = height === 812 && height - 300 || height - 280;
let Status = 0;
class Triangle {
    constructor() {
        this.PI = Math.PI / 180.0;
    }

    getSin( angle ) {
        return Math.sin(angle * this.PI);
    };

    getAngle( angle ) {
        let side = 'x';
        if( angle > 90 && angle < 180 ) {
            angle -= 90;
            side = 'y';
        }
        if( angle > 180 && angle < 270 ) {
            angle -= 180;
        }
        if( angle > 270 && angle < 360 ) {
            angle -= 270;
            side = 'y'
        }
        return { angle, side };
    };

    getData( compass, distance ) {
        distance+=height === 812 && 10 || 14;
        const { angle, side } = this.getAngle(compass);

        return this.getDimensions(compass, side, distance, this.getXorYAngle(angle, distance));
    };

    getXorYAngle( angle, distance ) {
        return (
            this.getSin(angle) * distance) / this.getSin(90);
    };

    getDimensions( compass, side, distance, other ) {
        const otherDistance = this.getPythagorean(distance, other);
        const dimensions = {
            distance,
            x: 0,
            y: 0,
            compass
        };
        if( compass === 0 || compass === 180 || compass === 360 ) {
            dimensions.y = distance;
        } else
            if( compass === 90 || compass === 270 ) {
                dimensions.x = distance;
            } else {
                dimensions.x = side === 'x' && other || otherDistance;
                dimensions.y = side === 'x' && otherDistance || other;
            }
        return dimensions

    };

    getPythagorean( distance, other ) {
        return Math.sqrt(distance ** 2 - other ** 2)
    };

}
const triangle = new Triangle();

class DimensionUser {
    constructor( step, users ) {
        this.step = step;
        this.users = users + 5
    }

    getDistancePure( { x, y, compass } ) {
        if( compass > 180 && compass !== 360 ) {
            if( compass > 180 && compass < 270 ) {
                return {
                    x: (
                    this.users - x) * this.step - (
                    imageWidth / 2),
                    y: (
                    this.users + y) * this.step - (
                    imageWidth / 2),
                }
            } else {
                return {
                    x: (
                    this.users - x) * this.step - (
                    imageWidth / 2),
                    y: (
                    this.users - y) * this.step - (
                    imageWidth / 2),
                }
            }

        } else {
            if( compass > 90 && compass <= 180 ) {
                return {
                    x: (
                    contentBoxHeight / 2) + (
                        x) * this.step - (
                    imageWidth / 2),
                    y: (
                    this.users + y) * this.step - (
                    imageWidth / 2),
                }
            } else {
                return {
                    x: (
                    contentBoxHeight / 2) + (
                        x) * this.step - (
                    imageWidth / 2),
                    y: (
                    this.users - y) * this.step - (
                    imageWidth / 2),
                }
            }

        }
    }
}
let DimensionUserClass = '';
let GetTriangleClass = '';
export default class NearPeople extends Component {
	state = {
        _animated: new Animated.Value(0),
        avatarPositionX: 0,
        avatarPositionY: 0,
        beforeAvatarPositionX: 0,
        beforeAvatarPositionY: 0,
        status:true
	};

    componentDidMount() {
        Status = 0;
        this.getUserInfo(this.props.compass, this.props.distance, this.props.users,undefined,undefined, true)
    }

    getUserInfo = ( compass=0, distance=30, users=30, beforeX, beforeY, status ) => {
        GetTriangleClass = triangle.getData(compass, distance);
        DimensionUserClass = new DimensionUser(
            contentBoxHeight / ((users + 5) * 2),
            users
        );
        const { x: avatarPositionX, y: avatarPositionY } = DimensionUserClass.getDistancePure(GetTriangleClass);
        this.state._animated.setValue(0);
        Animated.timing(this.state._animated, {
            toValue: 1,
            duration: ANIMATION_DURATION,
            easing: Easing.linear
        }).start();
        this.setState({
            avatarPositionX,
            avatarPositionY,
            beforeAvatarPositionX: beforeX && beforeX || avatarPositionX,
            beforeAvatarPositionY: beforeY && beforeY || avatarPositionY,
            status
        });

    };

	componentWillReceiveProps(nextProps) {
        let { compass, distance, users } = nextProps;
        let { compass : compassProps, distance : distanceProps } = this.props;
        let { avatarPositionX, avatarPositionY } = this.state;

        if( compass !== compassProps || distance !== distanceProps ){
            this.getUserInfo(compass, distance, users, avatarPositionX, avatarPositionY, false)
        }

	}

    componentWillUnmount() {
            // Animated.timing(this.state._animated, {
            //     toValue: 0,
            //     duration: ANIMATION_DURATION,
            //     easing: Easing.linear
            // }).start();

    }



    getUser = ()=>{
        const userId = this.props.userId;
        const { avatarPositionX, avatarPositionY, beforeAvatarPositionX, beforeAvatarPositionY, status } = this.state;
        // console.log("avatarPositionX,avatarPositionY:",  avatarPositionX, avatarPositionY, beforeAvatarPositionX, beforeAvatarPositionY , Status)
        if(avatarPositionX===0 && avatarPositionY===0 && beforeAvatarPositionX===0 && beforeAvatarPositionY===0){
            return null
        }else{
            let myStyleSheet = styles.getSheet(imageWidth);
            let rowStylesRotate = [
                {

                    transform: [
                        {
                            rotate: this.props.setTop,
                        }
                    ],
                },
            ];
            // console.log("********************************", this.props.compass, Status, this.state.status)
            if(status){
                rowStylesRotate.push({
                    opacity: this.state._animated.interpolate({
                        inputRange: [  0, 1 ],
                        outputRange: [ 0, 1 ],
                    })
                });
            }
            let rowStylesMove = [
                myStyleSheet.avatarImageBox,
                {


                    transform: [
                        {
                            translateY: this.state._animated.interpolate({
                                inputRange: [ 0, 1 ],
                                outputRange: [ beforeAvatarPositionY, avatarPositionY ]
                            }),
                        },
                        {
                            translateX: this.state._animated.interpolate({
                                inputRange: [ 0, 1 ],
                                outputRange: [ beforeAvatarPositionX, avatarPositionX ]
                            }),
                        }
                    ],
                },
            ];
            return (
                <Animated.View style={rowStylesMove}>
                    <Animated.View style={rowStylesRotate}>
                        <Avatar userId={userId} size={imageWidth} />
                    </Animated.View>
                </Animated.View>
            );
        }
    };
	render() {
        return this.getUser()
    }
}
