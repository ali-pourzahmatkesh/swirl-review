import React, { Component } from "react";
import {
	FlatList,
	Image,
	Slider,
	Text,
	TouchableOpacity,
	View,
	Dimensions
} from "react-native";
import appCss from "../../../app.css";
import { CONFIG } from "../../../config";
import logo from "../../assets/images/tape-logo.png";
import x from "../../assets/images/x.png";
import styles from "./style";

import MultiSlider from "react-native-multi-slider-alischv1";

const colors = CONFIG.colors;
const MIN_DISTANCE_RANGE = CONFIG.aroundMeFilters.distance.min;
const MAX_DISTANCE_RANGE = CONFIG.aroundMeFilters.distance.max;
const MIN_AGE_RANGE = CONFIG.aroundMeFilters.age.min;
const MAX_AGE_RANGE = CONFIG.aroundMeFilters.age.max;
const DEFAULT_GENDER_INDEX = CONFIG.aroundMeFilters.gender.defaultIndex;

export default class AroundMeFilter extends Component {
	constructor(props) {
		super(props);
		var selectedGenderIndex = DEFAULT_GENDER_INDEX;
		if (props.aroundMeFilterGender || props.aroundMeFilterGender.length) {
			if (props.aroundMeFilterGender[0] == "male") {
				selectedGenderIndex = 0;
			}
			if (props.aroundMeFilterGender[0] == "female") {
				selectedGenderIndex = 1;
			}
			if (
				(props.aroundMeFilterGender[0] == "male" &&
					props.aroundMeFilterGender[1] == "female") ||
				(props.aroundMeFilterGender[1] == "male" &&
					props.aroundMeFilterGender[0] == "female")
			) {
				selectedGenderIndex = 2;
			}
		}
		this.state = {
			distanceRange: props.aroundMeFilterToDistance || MAX_DISTANCE_RANGE,
			ageRangeMin: props.aroundMeFilterFromAge || MIN_AGE_RANGE,
			ageRangeMax: props.aroundMeFilterToAge || MAX_AGE_RANGE,
			tabSelected: "AroundMeFilter",
			genderChoices: ["Men", "Women", "Both"],
			selectedGenderIndex: selectedGenderIndex
		};
	}

	componentDidMount() {
		// this.props.callGetProfile(this.props.id);
		// this.props.getListPeopleNearMe(this.props.id);
	}

	createFilterButtons = choices => {
		let selected;
		return choices.map((choice, i) => {
			selected = i === this.state.selectedGenderIndex;
			return (
				<TouchableOpacity
					key={i}
					style={[
						styles.filterButton,
						selected && { backgroundColor: colors.appColor }
					]}
					onPress={() => this.setState({ selectedGenderIndex: i })}
				>
					<Text
						style={[
							styles.filterButtonText,
							selected && { color: colors.tapeWhite }
						]}
					>
						{choice}
					</Text>
				</TouchableOpacity>
			);
		});
	};

	render() {
		let { tabSelected } = this.state;
		return (
			<View style={styles.container}>
				<View style={appCss.appColor}>
					<View style={appCss.header}>
						<View style={{ flex: 1 }} />
						<Text style={styles.headerText}>Show Only</Text>
						<View style={styles.closeModalButtonContainer}>
							<View style={{ flex: 1 }} />
							<View style={{ flex: 1 }} />
							<TouchableOpacity
								style={styles.closeModalButton}
								onPress={this.props.closeFilter}
							>
								<Image source={x} style={styles.closeModalButtonImage} />
							</TouchableOpacity>
						</View>
					</View>
				</View>
				<View style={{ flex: 2 }}>
					<View style={styles.container}>
						<View style={styles.filterBlock}>
							<View style={styles.filterText}>
								<Text style={styles.filterLabel}>Distance</Text>
								<Text style={styles.filterValue}>
									{this.state.distanceRange}M
								</Text>
							</View>
							<Slider
								style={styles.filterSlider}
								minimumTrackTintColor={colors.appColor}
								value={this.state.distanceRange}
								minimumValue={MIN_DISTANCE_RANGE}
								maximumValue={MAX_DISTANCE_RANGE}
								step={1}
								onValueChange={val => this.setState({ distanceRange: val })}
							/>
						</View>
						<View style={[styles.filterBlock, { paddingBottom: 0 }]}>
							<View style={styles.filterText}>
								<Text style={styles.filterLabel}>Age Range</Text>
								<Text style={styles.filterValue}>
									{this.state.ageRangeMin}-{this.state.ageRangeMax}
								</Text>
							</View>
							<MultiSlider
								values={[this.state.ageRangeMin, this.state.ageRangeMax]}
								min={MIN_AGE_RANGE}
								max={MAX_AGE_RANGE}
								//style for the selected portion of the track
								selectedStyle={{ backgroundColor: colors.appColor }}
								//window width minus the padding from the whole filter block
								//minus a bit more b/c the markers on the multislide go out
								//further than the built in slider
								sliderLength={Dimensions.get("window").width - 24 - 33}
								onValuesChange={values =>
									this.setState({
										ageRangeMin: values[0],
										ageRangeMax: values[1]
									})
								}
								containerStyle={{
									marginTop: 30,
									marginLeft: 16,
									//the actual slider part is at the top so you can
									//kind of think of the height as bottom margin
									height: 40
								}}
							/>
						</View>
						<View style={styles.filterBlock}>
							<View style={styles.filterText}>
								<Text style={styles.filterLabel}>Gender</Text>
								<Text style={styles.filterValue}>
									{this.state.genderChoices[this.state.selectedGenderIndex]}
								</Text>
							</View>
							<View style={styles.filterButtonContainer}>
								{this.createFilterButtons(this.state.genderChoices)}
							</View>
						</View>
					</View>
					<View style={appCss.closeButtonBox}>
						<TouchableOpacity onPress={this.props.closeModal}>
							<View style={appCss.closeButton}>
								<Image style={appCss.closeButtonIcon} source={logo} />
							</View>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		);
	}
}
