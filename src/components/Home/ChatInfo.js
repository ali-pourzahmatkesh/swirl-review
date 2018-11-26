import React, { Component } from 'react';
import {
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    Image,
    Animated
} from "react-native";
import moment from "moment";
import momentTz from "moment-timezone";
import TimerCountdown from "react-native-timer-countdown";
import Avatar from "../Avatar";
import appCss from "../../../app.css";
import styles from "./style";
import {CONFIG} from "../../../config";

import logo1 from "../../assets/images/logo3/deSat.png";
import logo2 from "../../assets/images/logo3/sat1.png";
import logo3 from "../../assets/images/logo3/sat2.png";
import logo4 from "../../assets/images/logo3/sat3.png";
import logo5 from "../../assets/images/logo3/sat4.png";
import logo6 from "../../assets/images/logo3/sat5.png";
import logo7 from "../../assets/images/logo3/fullSat.png";

const LOGOS = [logo1, logo2, logo3, logo4, logo5, logo6, logo7];
const COLORS = CONFIG.colors;
const { height, width } = Dimensions.get('window');

export default class ChatInfo extends Component {
    constructor(props){
        super(props);
        this.state = {
            defaultAnimationStep: 0
        }

        this.logoAnimations = [
            new Animated.Value(0),
            new Animated.Value(0),
            new Animated.Value(0),
            new Animated.Value(0),
            new Animated.Value(0),
            new Animated.Value(0)
        ]
    }

    componentDidMount(){
        // let {
        //     item
        // } = this.props;
        let item = this.props.messageList.item[0];



        // for time elapsed logo animation
        //shortening to separate the final part of the fade from the jump when reordering
        let fullTime = (new Date(item['availableAt']) - new Date(item['createdAt'])) - (1 * 1000);
        // console.log(fullTime, 'full time')
        let step = fullTime / 6;
        // console.log(step, 'step')
        // console.log(new Date(), new Date(item['availableAt']))
        //shortening to separate the final part of the fade from the jump when reordering
        let timeLeft = (new Date(item['availableAt']) - new Date()) - (1 * 1000);
        // console.log(timeLeft, 'time until available');
        let stepsLeft = timeLeft / step;
        // console.log(stepsLeft, 'stepsLeft');
        let defaultAnimationStep = timeLeft < 0 ? 6 : 7 - (Math.ceil(stepsLeft) + 1);
        stepsLeft = Math.floor(stepsLeft);
        console.log(defaultAnimationStep, 'default anim step');
        let secondsLeftCurrentStep = timeLeft - (step * stepsLeft);
        // console.log(secondsLeftCurrentStep, 'seconds left current step')


        // shorter animations on step
        if(defaultAnimationStep < 6){
            console.log(item.textContent, 'setting timeouts from did mount')
            setTimeout(() => {
                Animated.timing(this.logoAnimations[defaultAnimationStep], {
                    duration: 500,
                    toValue: 1
                }).start();
            }, secondsLeftCurrentStep);
    
            for(let i = 1; i <= stepsLeft; i++){
                console.log('times for each timeout ', (step * i) + secondsLeftCurrentStep);
                setTimeout(() => {
                    console.log(i, 'is the timeout running');
                    Animated.timing(this.logoAnimations[defaultAnimationStep + i], {
                        duration: 500,
                        toValue: 1
                    }).start();
                }, (step * i) + secondsLeftCurrentStep);

                // console.log('times for each timeout ', (step * i) + secondsLeftCurrentStep);
                // ((additionalStep) => {
                //     setTimeout(() => {
                //         console.log(additionalStep, 'is the timeout running');
                //         Animated.timing(this.logoAnimations[defaultAnimationStep + additionalStep], {
                //             duration: 500,
                //             toValue: 1
                //         }).start();
                //     }, (step * additionalStep) + secondsLeftCurrentStep);
                // })(i);
            }
        }
        // with gradual animations
        // if(defaultAnimationStep < 6){
        //     this.logoAnimations[defaultAnimationStep] = new Animated.Value((step - secondsLeftCurrentStep)/step);
        //     Animated.timing(this.logoAnimations[defaultAnimationStep], {
        //         duration: secondsLeftCurrentStep,
        //         toValue: 1
        //     }).start();
    
        //     for(let i = 1; i <= stepsLeft; i++){
        //         setTimeout(() => {
        //             Animated.timing(this.logoAnimations[defaultAnimationStep + i], {
        //                 duration: step,
        //                 toValue: 1
        //             }).start();
        //         }, step * i);
        //     }
        // }
        // end stuff for time elapsed logo animation

        this.setState({
            defaultAnimationStep
        }, () => console.log(this.state.defaultAnimationStep, 'default animmmmmmmmmmmmm'));
    }

    componentWillReceiveProps(nextProps){
        if(this.props.messageList.item[0] !== nextProps.messageList.item[0]){
            let item = nextProps.messageList.item[0];

            // for time elapsed logo animation
            //shortening to separate the final part of the fade from the jump when reordering
            let fullTime = (new Date(item['availableAt']) - new Date(item['createdAt'])) - (1 * 1000);
            let step = fullTime / 6;
            //shortening to separate the final part of the fade from the jump when reordering
            let timeLeft = (new Date(item['availableAt']) - new Date()) - (1 * 1000);
            let stepsLeft = timeLeft / step;
            let defaultAnimationStep = timeLeft < 0 ? 6 : 7 - (Math.ceil(stepsLeft) + 1);
            stepsLeft = Math.floor(stepsLeft);
            let secondsLeftCurrentStep = timeLeft - (step * stepsLeft);
    
    
            // shorter animations on step
            if(defaultAnimationStep < 6){
                console.log(item.textContent, 'setting timeouts from did mount')
                setTimeout(() => {
                    Animated.timing(this.logoAnimations[defaultAnimationStep], {
                        duration: 500,
                        toValue: 1
                    }).start();
                }, secondsLeftCurrentStep);
        
                for(let i = 1; i <= stepsLeft; i++){
                    console.log('times for each timeout ', (step * i) + secondsLeftCurrentStep);
                    setTimeout(() => {
                        console.log(i, 'is the timeout running');
                        Animated.timing(this.logoAnimations[defaultAnimationStep + i], {
                            duration: 500,
                            toValue: 1
                        }).start();
                    }, (step * i) + secondsLeftCurrentStep);
                }
            }
    
            this.setState({
                defaultAnimationStep
            }, () => console.log(this.state.defaultAnimationStep, 'default animmmmmmmmmmmmm'));
        }
    }

    loadPostTypeEmoji = postType => {
		if(postType === 'text'){
			return '✉️';
		}
		else if(postType === 'image'){
			return '📷';
		}
		// else if(postType === 'video'){ // is it called video?
		// 	return '🎥';
		// }
	}

	loadDetail = data => {
		console.log("start showing a message detail", data);
		this.props.navigation.push("MessageDetailScreen", { data });
		if (data.isSeen === false) {
			console.log("this message need to update with new status isSeen");
			this.props.visitMessage({
				listOfId: [data.id]
			});
		}
    };

    render(){
        // let {
        //     item
        // } = this.props;
        let item = this.props.messageList.item[0];
        console.log('message list ****************************************', this.props.messageList)
        console.log('item')

        let {
            defaultAnimationStep
        } = this.state;
        

        const isAvailable =
			new Date(item["availableAt"]).getTime() <= new Date().getTime();
		let messageHint = "";
		let messageOnpress;
		let messageStyle;
		const BOX_HEIGT = 30 + (height * 0.06);
		if (isAvailable) {
			if (item.isSeen) {
				messageHint = () => {
					return (
						"Unswirled " +
						// momentTz(item["availableAt"], "YYYYMMDD")
						// 	.startOf("hour")
                        // 	.fromNow(true) +
                        momentTz(item["createdAt"]).fromNow(true) +
						" ago"
					);
				};
				messageOnpress = () => {
					this.props.setHomeState({ newMessageModalVisible: true });
				};
				messageStyle = "Archived";
            } 
            else {
				messageHint = () => {
					return "Tap to unswirl! " + this.loadPostTypeEmoji(item.postType);
				};
				messageOnpress = () => {
					this.loadDetail(item);
				};
				messageStyle = "Ready";
			}
		} else {
			const remainingSeconds =
				new Date(item["availableAt"]).getTime() - new Date().getTime();

			messageHint = () => {
				return (
					<View style={styles.timerCountdown}>
						<Text>⏳ </Text>
						<View>
							<TimerCountdown
								initialSecondsRemaining={remainingSeconds}
								allowFontScaling={true}
								style={[appCss.defaultFontApp,{ fontSize: 14, fontFamily: 'MuseoSansRounded-500' }]}
								formatSecondsRemaining={
									(milliseconds) => {
                                        if(milliseconds > 0 && milliseconds < 60 * 1000){
                                            return '00:01';
                                        }
										const remainingSec = Math.round(milliseconds / 1000);
										const minutes = parseInt(((remainingSec / 60) % 60).toString(), 10);
										const hours = parseInt((remainingSec / 3600).toString(), 10);
										return `${hours < 10 ? 0 : ''}${hours}:${minutes < 10 ? 0 : ''}${minutes}`;
									}
								}
							/>{" "}
						</View>
						<Text style={appCss.defaultFontApp}> left {this.loadPostTypeEmoji(item.postType)}</Text>
					</View>
				);
			};

			messageOnpress = () => {};
			messageStyle = "Waiting";
        }

		return (
			<View
				style={[
					styles.chatListBox,
					isAvailable && !item.isSeen && styles.chatListBlockBox
				]}
			>
				<TouchableOpacity
					onPress={messageOnpress}
					style={styles.chatListSubjectBox}
				>
					<View style={styles.avatarBox}>
						<Avatar userId={item.senderMemberId} size={BOX_HEIGT * 0.8} position='image'/>
					</View>
					<View style={[styles.messageInfoBox, !isAvailable && {paddingTop: BOX_HEIGT * 0.05, paddingBottom: BOX_HEIGT * 0.05}]}>
						<Text
							style={[
								styles.chatSubject,
								messageStyle == "Ready" && { color: COLORS.bodyColor }
							]}
						>
							{item.senderName}
						</Text>
						<View style={styles.messageHintContainer}>
					{isAvailable ?
							<Text
								style={[
									styles.chatDesc,
									messageStyle == "Ready" && { color: COLORS.bodyColor },
								]}
							>
								{messageHint()}
							</Text>
						:
						messageHint()
					}
						</View>
					</View>
					<View style={styles.otherInfo}>
						<Text
							style={[
								styles.chatTime,
								messageStyle == "Ready" && { color: COLORS.bodyColor }
							]}
						>
                            {/* {momentTz(item["createdAt"], "YYYYMMDD").fromNow(true)} */}
                            {momentTz(item["createdAt"]).fromNow(true)}
						</Text>
						{(messageStyle == "Ready" || messageStyle == "Waiting") && (
							// <Image
							// 	source={(messageStyle == "Waiting" && logoOther) || logo}
							// 	style={styles.otherInfoLogo}
                            // />
                            LOGOS.map((logoAtIndex, index) => {
                                if(index >= defaultAnimationStep ){
                                    return (
                                        <Animated.Image
                                            // source={(messageStyle == "Waiting" && logoOther) || logo}
                                            key={index}
                                            source={logoAtIndex}
                                            style={[
                                                styles.otherInfoLogo,
                                                {opacity: index === defaultAnimationStep ? 1 : this.logoAnimations[index - 1]}
                                            ]}
                                        />
                                    )
                                }
                            })
						)}
					</View>
				</TouchableOpacity>
			</View>
		);
    }
}