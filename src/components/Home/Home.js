import React, { Component } from "react";
import { Text, View, Dimensions } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import HomeHeader from "../HomeHeader";
// import Discussion from "../Discussion";
const { height, width } = Dimensions.get("window");

class Home extends Component {
	constructor(props) {
		super(props);

		// let headerHeight = 60;
		// this.state = {
		//     pan: new Animated.ValueXY({x: 0, y: headerHeight}),
		//     activityShown: false,
		//     swipeConfig: {
		//         velocityThreshold: 0.3,
		//         directionalOffsetThreshold: 80
		//     },
		//     headerHeight
		// }

		// consolidating these custom styles
		this.state = {
			styles: {
				button: {
					radius: 10
				},
				activeHeadsList: {
					height: width * 0.14
				},
				headerBackground: {
					paddingTop: getStatusBarHeight(true)
				},
				label: {
					lineHeight: 15,
					marginBottom: 3
				},
				activityContainer: {
					paddingTop: 7
				},
				activityItem: {
					height: 40
				},
				title: {
					lineHeight: 30
				},
				dragZone: {
					height: 50
				}
			}
		};
	}

	render() {
		let titleAndHeadListHeight =
			this.state.styles.headerBackground.paddingTop +
			this.state.styles.title.lineHeight +
			this.state.styles.label.lineHeight +
			this.state.styles.label.marginBottom +
			this.state.styles.activeHeadsList.height;
		let activityStubHeight =
			this.state.styles.label.lineHeight +
			this.state.styles.label.marginBottom +
			this.state.styles.activityContainer.paddingTop +
			this.state.styles.activityItem.height;
		let activityListHeight =
			height -
			(titleAndHeadListHeight +
				this.state.styles.label.lineHeight +
				this.state.styles.label.marginBottom +
				this.state.styles.activityContainer.paddingTop +
				this.state.styles.dragZone.height);
		let discussionHeight =
			height - (titleAndHeadListHeight + activityStubHeight);

		return (
			<View style={{ flex: 1 }}>
				<HomeHeader
					outerStyles={this.state.styles}
					topHeight={titleAndHeadListHeight}
					activityListHeight={activityListHeight}
					activityStubHeight={activityStubHeight}
				/>
				<View style={{ flex: 1, justifyContent: "flex-end" }} />
				{/* <View>
                    <Text>content</Text>
                    <Text>content</Text>
                    <Text>content</Text>
                    <Text>content</Text>
                    <Text>content</Text>
                    <Text>content</Text>
                    <Text>content</Text>
                    <Text>content</Text>
                    <Text>content</Text>
                    <Text>content</Text>
                    <Text>content</Text>
                    <Text>content</Text>
                    <Text>content</Text>
                    <Text>content</Text>
                    <Text>content</Text>
                    <Text>content</Text>
                    <Text>content</Text>
                    <Text>content</Text>
                    <Text>content</Text>
                    <Text>content***</Text>
                    <Text>content</Text>
                    <Text>content</Text>
                    <Text>content</Text>
                    <Text>content</Text>
                    <Text>content</Text>
                    <Text>content</Text>
                    <Text>content</Text>
                    <Text>content</Text>
                    <Text>content</Text>
                    <Text>content</Text>
                    <Text>content</Text>
                    <Text>content</Text>
                    <Text>content</Text>
                    <Text>content</Text>
                    <Text>content</Text>
                    <Text>content</Text>
                    <Text>content</Text>
                    <Text>content</Text>
                    <Text>content</Text>
                </View> */}
			</View>
		);
	}
}

export default Home;
