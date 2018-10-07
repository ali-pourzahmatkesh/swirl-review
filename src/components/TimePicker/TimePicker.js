import React, {Component} from "react";
import PropTypes from "prop-types";
import {Dimensions, Picker, StyleSheet, Text, View} from "react-native";
import {CONFIG} from "../../../config";
const colors = CONFIG.colors;
const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
    container:{
        backgroundColor: colors.appColor,
        width,
        height:'100%',
        alignItems:'center',
        justifyContent:'center'
    },
    timePickerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        // backgroundColor:'green',
        height:'100%',
        position: 'absolute', width,
        //
    },
    backPicker:{
        height:111,
        width,
        backgroundColor:colors.bodyColor,
        opacity:0.3
    },
    picker: {
        height:'100%',
        width: 100,
    },
    pickerItem: {
        height:'100%',
        color: colors.bodyColor,
        fontSize: 64,
        fontWeight: 'bold'

    },
    timeDivider: {
        color: colors.bodyColor,
        fontSize: 64,
        fontWeight: 'bold'
    }
});

const MAX_HOURS = 23;
const MAX_MINUTES = 59;

export default class TimePicker extends Component {
    static propTypes = {
        selectedHours: PropTypes.number,
        selectedMinutes: PropTypes.number,
        onChange: PropTypes.func,
        hoursUnit: PropTypes.string,
        minutesUnit: PropTypes.string,
    }

    static defaultProps = {
        selectedHours: 0,
        selectedMinutes: 0,
        onChange: null,
        hoursUnit: '',
        minutesUnit: '',
    }

    constructor( props ) {
        super(props);
        const { selectedHours, selectedMinutes } = props;
        this.state = {
            selectedHours,
            selectedMinutes,
        };
    }

    getHoursItems = () => {
        const items = [];
        const { hoursUnit } = this.props;
        for( let i = 0; i <= MAX_HOURS; i++ ) {
            items.push(
                <Picker.Item key={i} value={i} label={`${i < 10 && '0' + i.toString() || i.toString()}${hoursUnit}`}/>,
            );
        }
        return items;
    };

    getMinutesImtes = () => {
        const items = [];
        const { minutesUnit } = this.props;
        for( let i = 0; i <= MAX_MINUTES; i++ ) {
            items.push(
                <Picker.Item key={i} value={i}
                             label={`${i < 10 && '0' + i.toString() || i.toString()}${minutesUnit}`}/>,
            );
        }
        return items;
    };

    handleChangeHours = ( itemValue ) => {
        const { onChange } = this.props;
        this.setState({
            selectedHours: itemValue,
        }, () => {
            const { selectedHours, selectedMinutes } = this.state;
            onChange(selectedHours, selectedMinutes);
        });
    };

    handleChangeMinutes = ( itemValue ) => {
        const { onChange } = this.props;
        this.setState({
            selectedMinutes: itemValue,
        }, () => {
            const { selectedHours, selectedMinutes } = this.state;
            onChange(selectedHours, selectedMinutes);
        });
    }

    render() {
        const { selectedHours, selectedMinutes } = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.backPicker}/>
                <View style={styles.timePickerContainer}>
                    <Picker
                        style={styles.picker}
                        itemStyle={styles.pickerItem}
                        selectedValue={selectedHours}
                        onValueChange={( itemValue ) => this.handleChangeHours(itemValue)}
                    >
                        {this.getHoursItems()}
                    </Picker>
                    <Text style={styles.timeDivider}>:</Text>
                    <Picker
                        style={styles.picker}
                        itemStyle={styles.pickerItem}
                        selectedValue={selectedMinutes}
                        onValueChange={( itemValue ) => this.handleChangeMinutes(itemValue)}
                    >
                        {this.getMinutesImtes()}
                    </Picker>
                </View>
            </View>
        );
    }
}
