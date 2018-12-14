import React, {Component} from "react";
import PropTypes from "prop-types";
import {
    Picker,
    Text,
    View,
    TouchableOpacity,
    Dimensions
} from "react-native";
import {isIphoneX} from "react-native-iphone-x-helper";
import DeviceInfo from 'react-native-device-info';
import momentTz from "moment-timezone";
import styles from './style'
const MAX_HOURS = 23;
const MAX_MINUTES = 59;
const { height, width } = Dimensions.get('window');
export default class TimePicker extends Component {
    static propTypes = {
        selectedHours: PropTypes.number,
        selectedMinutes: PropTypes.number,
        onChange: PropTypes.func,
        hoursUnit: PropTypes.string,
        minutesUnit: PropTypes.string,
    };

    constructor( props ) {
        super(props);
        this.state = {
           twentyFourHour: DeviceInfo.is24Hour(),
           selectedMoment: momentTz(),
           currentMoment: momentTz()
        };
    }

    componentDidMount(){
        this.props.onChange(momentTz());
        this.setState({
            selectedHours: momentTz().hours(),
            selectedMinutes: momentTz().minutes(),
            selectedDayHalf: momentTz().hours() < 12 ? 'am' : 'pm',
            currentMoment: momentTz(),
            selectedMoment: momentTz()
        })
    }

    getHoursItems = () => {
        const items = [];
        const {
            currentMoment,
            selectedMoment,
            twentyFourHour,
            selectedDayHalf
        } = this.state;
        const sameDaySelected = selectedMoment.isSame(currentMoment, 'day');
        const startingValue = sameDaySelected ?
                                currentMoment.hour() :
                                0;
        for(let i = startingValue; i <= MAX_HOURS; i++){
            if(twentyFourHour){
                let hourString = i < 10 ? `0${i}` : `${i}`;
                items.push(
                    <Picker.Item
                        key={i}
                        value={i}
                        label={hourString}
                    />
                );
            }
            else{
                if(
                    sameDaySelected &&
                    selectedDayHalf === 'am'
                ){
                    if(i < 12){
                        let hourString = i < 10 ? `0${i}` : `${i}`;
                        hourString = hourString === '00' ? '12' : hourString;
                        items.push(
                            <Picker.Item
                                key={i}
                                value={i}
                                label={hourString}
                            />
                        );
                    }
                }
                else if(
                    sameDaySelected &&
                    selectedDayHalf === 'pm'
                ){
                    let hourPm = i - 12;
                    let hourString = hourPm < 10 ? `0${hourPm}` : `${hourPm}`;
                    hourString = hourString === '00' ? '12' : hourString;
                    items.push(
                        <Picker.Item
                            key={i}
                            value={i}
                            label={hourString}
                        />
                    );
                }
                // not the same day
                else{
                    if(selectedDayHalf === 'am'){
                        if(i < 12){
                            let hourString = i < 10 ? `0${i}` : `${i}`;
                            hourString = hourString === '00' ? '12' : hourString;
                            items.push(
                                <Picker.Item
                                    key={i}
                                    value={i}
                                    label={hourString}
                                />
                            );
                        }
                    }
                    else{
                        if(i >= 12){
                            let hourPm = i - 12;
                            let hourString = hourPm < 10 ? `0${hourPm}` : `${hourPm}`;
                            hourString = hourString === '00' ? '12' : hourString;
                            items.push(
                                <Picker.Item
                                    key={i}
                                    value={i}
                                    label={hourString}
                                />
                            );
                        }
                    }
                }
            }
        }
        return items;
    };

    getMinutesItems = () => {
        const items = [];
        const {
            currentMoment,
            selectedMoment
        } = this.state;
        const sameHourSelected = selectedMoment.isSame(currentMoment, 'hour');
        const startingValue = sameHourSelected ? currentMoment.minute() : 0;
        for(let i = startingValue; i <= MAX_MINUTES; i++){
            let minuteString = i < 10 ? `0${i}` : `${i}`
            items.push(
                <Picker.Item
                    key={i}
                    value={i}
                    label={minuteString}
                />
            );
        }
        return items;
    };

    getDateItems = () => {
        const items = [];
        let dateValue = momentTz(this.state.currentMoment);
        for(let i = 0; i < 7; i++){
            let dateString = dateValue.format('MMM Do');
            if(i === 0){
                dateString = 'Today';
            }
            else if(i === 1){
                dateString = 'Tomorrow';
            }
            items.push( 
                <Picker.Item
                    key={i}
                    // has to be a string or integer
                    value={JSON.stringify(momentTz(dateValue))}
                    label={dateString}
                />
            );
            dateValue.add(1, 'd');
        }
        return items;
    }

    handleChangeHours = itemValue => {
        const { onChange } = this.props;
        let newMoment = momentTz(this.state.selectedMoment);
        newMoment.hour(itemValue)
        this.setState({
            selectedMoment: newMoment,
            selectedHours: itemValue
        }, () => {
            const { selectedMoment } = this.state;
            onChange(selectedMoment);
        });
    };

    handleChangeMinutes = itemValue => {
        const { onChange } = this.props;
        let newMoment = momentTz(this.state.selectedMoment);
        newMoment.minute(itemValue)
        this.setState({
            selectedMoment: newMoment,
            selectedMinutes: itemValue
        }, () => {
            const { selectedMoment } = this.state;
            onChange(selectedMoment);
        });
    };

    handleChangeDayHalf = itemValue => {
        const { onChange } = this.props;
        let newMoment = momentTz(this.state.selectedMoment);
        if(
            this.state.selectedDayHalf === 'am' &&
            itemValue === 'pm'
        ){
            newMoment.add(12, 'hours');
        }
        else if(
            this.state.selectedDayHalf === 'pm' &&
            itemValue === 'am'  
        ){
            newMoment.subtract(12, 'hours');
        }
        this.setState({
            selectedDayHalf: itemValue,
            selectedMoment: newMoment,
            selectedHours: newMoment.hours(),
            selectedMinutes: newMoment.minutes()
        }, () => {
            const { selectedMoment } = this.state;
            onChange(selectedMoment);
        })
    }

    handleChangeDate = itemValue => {
        const { onChange } = this.props;
        const parsedDateString = JSON.parse(itemValue);
        const newDay = momentTz(parsedDateString);
        let newMoment = momentTz(this.state.selectedMoment);
        newMoment.year(newDay.year());
        newMoment.month(newDay.month());
        newMoment.day(newDay.day());
        if(newMoment.isBefore(this.state.currentMoment)){
            newMoment = momentTz(this.state.currentMoment);
        }
        this.setState({
            selectedDate: itemValue,
            selectedMoment: newMoment,
            selectedHours: newMoment.hours(),
            selectedMinutes: newMoment.minutes(),
            selectedDayHalf: newMoment.hours() < 12 ? 'am' : 'pm'
        }, () => {
            const { selectedMoment } = this.state;
            onChange(selectedMoment);
        });
    }

    render() {
        const {
            selectedHours,
            selectedMinutes,
            selectedDayHalf,
            selectedDate,
            twentyFourHour,
            currentMoment,
            selectedMoment
        } = this.state;
        const sameDaySelected = selectedMoment.isSame(currentMoment, 'day');
        return (
            <View style={styles.container}>
                <View style={styles.datePickerContainer}>
                    <View style={styles.dateBackPicker}/>
                    <Picker
                        style={styles.datePicker}
                        itemStyle={styles.datePickerItem}
                        selectedValue={selectedDate}
                        onValueChange={itemValue => this.handleChangeDate(itemValue)}
                    >
                        {this.getDateItems()}
                    </Picker>
                </View>

                <View style={styles.timePickerContainer}>
                    <View style={styles.timeBackPicker}/>
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
                        {this.getMinutesItems()}
                    </Picker>
                {
                    !twentyFourHour &&
                    <Picker
                        style={[styles.picker, {width: width * 0.25, borderWidth: 0, marginLeft: width * -0.06}]}
                        itemStyle={[styles.pickerItem, {fontSize: (((height - (isIphoneX() ? 120 : 0)) / 850) * 30)+ 15}]}
                        selectedValue={selectedDayHalf}
                        onValueChange={( itemValue ) => this.handleChangeDayHalf(itemValue)}
                    >
                    {
                        (!sameDaySelected ||
                        (sameDaySelected && selectedDayHalf === 'am')) &&
                        <Picker.Item key={'am'} value={'am'} label={'am'}/>
                    }
                        <Picker.Item key={'pm'} value={'pm'} label={'pm'}/>
                    </Picker>
                }
                </View>
            </View>
        );
    }
}
