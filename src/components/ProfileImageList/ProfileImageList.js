import React, { Component } from "react";
import appCss from "../../../app.css";
import logo from "../../assets/images/lightening.png";
import {
	ScrollView,
	View,
	TouchableOpacity,
	Image,
	Modal,
	SafeAreaView
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {CONFIG} from "../../../config";
import styles from "./style";
import checkmark from "../../assets/images/checked.png";

const colors = CONFIG.colors;

export default class ProfileImageList extends Component {
	state = {
		modalVisible: false,
		imageSelected: "",
		excludedPicIds: {}
	};

	componentDidMount() {
		if (this.props.user === undefined) {
			// console.log("empty instagram feed");
			this.props.resetInstagramFeed();
		}
	}

	componentWillReceiveProps(nextProps) {
		// console.log(
		// 	"@@@@@@conditions for call instagram feed all must be > ",
		// 	(this.props.user === undefined &&
		// 		nextProps.user &&
		// 		nextProps.user.instagramToken) ||
		// 	(nextProps.user &&
		// 		this.props.user &&
		// 		this.props.user.instagramToken != nextProps.user.instagramToken)
		// 		? true
		// 		: false
		// );
		if (
			(this.props.user === undefined &&
				nextProps.user &&
				nextProps.user.instagramToken) ||
			(nextProps.user &&
				this.props.user &&
				this.props.user.instagramToken != nextProps.user.instagramToken)
		) {
			// console.log("call instagram feed ******************");
			this.props.getInstagramFeed(nextProps.user.instagramToken);
		}
	}

	toggleModal = img => {
		const status = this.state.modalVisible;
		this.setState({ modalVisible: !status, imageSelected: img ? img : "" });
	};

	renderSection = () => {
		if (
			this.props.user &&
			this.props.user.instagramToken &&
			this.props.instagramFeed
		) {
			return this.props.instagramFeed.map((item, index) => {
				return (
					this.props.editMode ?
						<TouchableOpacity
							key={index}
							style={[
								styles.imageBox,
								index % 3 !== 0 ? { paddingLeft: 2 } : { paddingLeft: 0 }
							]}
							onPress={
								this.props.editMode ? 
								() => {
									let curExcludedPicIds = {...this.state.excludedPicIds}
									if(curExcludedPicIds.hasOwnProperty(item.id)){
										delete curExcludedPicIds[item.id]
									}
									else{
										curExcludedPicIds[item.id] = 1
									}
									this.setState({
										excludedPicIds: curExcludedPicIds
									})
								}
								:
								() => this.toggleModal(item.images.standard_resolution.url)
							}
						>
							
						{(this.props.editMode && !this.state.excludedPicIds.hasOwnProperty(item.id)) &&
							<Image
								style={{
									height: 22,
									position: 'absolute',
									zIndex: 2,
									top: 3,
									// right: 20,
									left: 10
								}}
								source={checkmark}
								resizeMode='contain'
							/>
						}
							<Image
								style={styles.imageItem}
								source={{ uri: item.images.thumbnail.url }}
							/>
						</TouchableOpacity>
						:
						(this.state.excludedPicIds.hasOwnProperty(item.id) ||
							<TouchableOpacity
								key={index}
								style={[
									styles.imageBox,
									index % 3 !== 0 ? { paddingLeft: 2 } : { paddingLeft: 0 }
								]}
								onPress={() => this.toggleModal(item.images.standard_resolution.url)}
							>
								<Image
									style={styles.imageItem}
									source={{ uri: item.images.thumbnail.url }}
								/>
							</TouchableOpacity>
						)
				);
			});
		} else {
			return null;
		}
	};

	render() {
		// console.log("all props in feed components", this.props);
		const img = this.state.imageSelected;
		let result = (
			<View style={styles.container}>
				<Modal visible={this.state.modalVisible} animationType={"slide"}>
					<SafeAreaView style={styles.modalBox}>
						<View style={[styles.modalHeader, {flexDirection:'row', justifyContent:'space-between', marginRight:16, marginLeft:16}]}>
							<TouchableOpacity onPress={() => this.toggleModal()}>
								<MaterialIcons size={25} color={colors.tapeWhite} name="close" />
							</TouchableOpacity>
							<View style={{height:120, width:40}}>
								<Image
									style={appCss.headerIcon}
									resizeMode={'contain'}
									source={logo}
								/>

							</View>
							<View/>
						</View>

						<View style={styles.modalImageBox}>
							<View style={styles.modalImage}>
								{img ? (
									<Image style={styles.imageItem} source={{ uri: img }} />
								) : null}
							</View>
						</View>
					</SafeAreaView>
				</Modal>
				<ScrollView showsVerticalScrollIndicator={false}>
					<View style={styles.imageList}>{this.renderSection()}</View>
				</ScrollView>
			</View>
		);
		return this.props.user &&
			this.props.user.instagramToken &&
			this.props.instagramFeed
			? result
			: null;
	}
}
