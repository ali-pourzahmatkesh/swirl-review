import React, { Component } from "react";
import {
    View,
    Text,
    SectionList,
    TouchableOpacity,
    ImageBackground,
    FlatList,
    TextInput,
    Image,
    Keyboard
} from "react-native";
import Avatar from "../Avatar";
import Header from "../Header";
import Ionicons from "react-native-vector-icons/Ionicons";
import background from "../../assets/images/background.png";
import x from "../../assets/images/cancel.png";
import appCss from "../../../app.css";
import {CONFIG} from "../../../config";
import styles from "./style";
const COLORS = CONFIG.colors;

let capitalize = (word, full = false) => {
    if(word.length > 0){
        if(full){
            return word.toUpperCase();
        }
        else{
            return word[0].toUpperCase() + word.slice(1);
        }
    }
    return false;
}

export default class CreateChatMembers extends Component{
    constructor(props){
        super(props);
        
        this.state = {
            fullContactList: [],
            contactSections: [],
            selectedContacts: [],
            searchParameter: '',
        };
    }

    componentDidMount(){
        // ajax call for list
        let contactList = [
            {
                firstName: 'Alan',
                lastName: 'Aaa'
            },
            {
                firstName: 'Cody',
                lastName: 'Bbb'
            },
            {
                firstName: 'Bao',
                lastName: 'Ccc'
            },
            {
                firstName: 'Awn',
                lastName: 'Aaa'
            },
            {
                firstName: 'Bill',
                lastName: 'Bbb'
            },
            {
                firstName: 'Bill',
                lastName: 'Bbb'
            },
            {
                firstName: 'Amethyst',
                lastName: 'Ccc'
            },
            {
                firstName: 'Bill',
                lastName: 'Acc'
            },
        ];
        contactList = contactList.sort((contactA, contactB)=>{
            // compare names without case sensitivity
            return capitalize(contactA.lastName, true) === capitalize(contactB.lastName, true) ? 
                    contactA.firstName > contactB.firstName : 
                    contactA.lastName > contactB.lastName;
        })
        .map((item) => {
            item.selected = false;
            return item;
        });
        this.setState({
            fullContactList: contactList,
            contactSections: this.arrToSections(contactList),
        })
    }

    toggleSelect = ({title}, index = null, item = null) => {
        Keyboard.dismiss();
        let newSections = [...this.state.contactSections];
        let newSelectedContacts = [...this.state.selectedContacts];
        let newFullContactList = [...this.state.fullContactList];
        for(let i = 0; i < newSections.length; i++){
            if(newSections[i].title === title){
                let newData = [...newSections[i].data];
                if(item){
                    for(let j = 0; j < newData.length; j++){
                        //change to id later?                        
                        if(newData[j].firstName === item.firstName){
                            index = j;
                        }
                    }
                }

                //updates on section list
                newData[index].selected = !newData[index].selected;
                newSections[i].data = newData

                //updates on the full list
                itemPosInFull = newFullContactList.indexOf(newData[index]);
                newFullContactList[itemPosInFull] = newData[index];

                //updates on selected list
                if(newData[index].selected === true){
                    newSelectedContacts.push(newData[index]);
                }
                else{
                    let itemPosInSelected = newSelectedContacts.indexOf(newData[index]);
                    if(itemPosInSelected !== -1){
                        newSelectedContacts.splice(itemPosInSelected, 1);
                    }
                    else{
                        console.log('error in toggling selected contacts list')
                    }
                }
            }
        }
        this.setState({
            contactSections: newSections,
            selectedContacts: newSelectedContacts,
            fullContactList: newFullContactList
        })
    }

    renderContactHeader = ({section: {title}}) => {
        return <Text style={styles.contactHeaderText}>{title}</Text>
    }

    renderContact = ({item, index, section = null}) => {
        return (
            <TouchableOpacity style={[styles.contactContainer, {borderTopWidth: index === 0 ? 0 : 0.5}]}
                onPress={
                    () => {
                        if(section){
                            this.toggleSelect(section, index)
                        }
                        else{
                            console.log('asdfa')
                            this.toggleSelect({title: item.lastName[0].toUpperCase()}, null, item)
                        }
                    }
                }
            
            >
                <Avatar
                userId={item.id}
                    size={40}
                    
                />
                <Text style={styles.contactText}>{item.firstName} <Text style={{fontFamily: 'MuseoSansRounded-900'}}>{item.lastName}</Text></Text>
                <View style={styles.contactHighlightContainer}>
                    <View style={[styles.contactHightlight, {backgroundColor: item.selected ? COLORS.appColor : null}]}/>
                </View>
            </TouchableOpacity>
        )
    }

    renderSelectedContact = ({item}) => {
        return (
            <View style={styles.selectedContactContainer}>
                <TouchableOpacity
                    style={styles.deselectButton}
                    onPress={() => this.toggleSelect({title: item.lastName[0].toUpperCase()}, null, item)}
                >
                    <Image
                        source={x}
                        style={styles.deselectImage}
                    />
                </TouchableOpacity>
                <Avatar
                    userId={item.id}
                    size={50}
                    position='profile'
                />
                <Text>{item.firstName}</Text>
            </View>
        )
    }

    arrToSections = (contactArr) => {
        return [...contactArr].reduce((acc, item, index, arr) => {
            if(index === 0 || (acc[acc.length - 1].title !== item.lastName.charAt(0).toUpperCase())){
                let section = {};
                section.title = item.lastName.charAt(0).toUpperCase();
                section.data = [item];
                acc.push(section)
            }
            else{
                acc[acc.length - 1].data.push(item)
            }
            return acc;
        }, [])
    }

    handleSearch = (text) => {
        let filteredContacts = this.state.fullContactList
        this.setState({
            searchParameter: text,
            filteredContacts
        })
    }

    handleNext = () => {
        this.props.navigation.navigate('CreateChatAddLocationScreen', {selectedContacts: this.state.selectedContacts});
    }

    renderFilteredContacts = () => {
        let capSearchParam = capitalize(this.state.searchParameter, true);
        let filteredContacts = [...this.state.fullContactList].filter((item) => {
            return capitalize(item.firstName, true).startsWith(capSearchParam) || 
                    capitalize(item.lastName, true).startsWith(capSearchParam);
        })
        return (
            <FlatList 
                data={filteredContacts}
                renderItem={this.renderContact}
                keyExtractor={(item, index) => item + index}
                keyboardShouldPersistTaps='handled'
            />
        )
    }

    render(){
        let {
            fullContactList,
            contactSections,
            selectedContacts,
            searchParameter
        } = this.state;

        return (
            <View style={{flex: 1}}>
                <ImageBackground style={styles.headerBackground} source={background}>
                    <Header
                        navigation={this.props.navigation}
                        title='Members'
                        rightButtonText='Next'
                        rightButtonOnPress={this.handleNext}
                        rightButtonDisable={!Array.isArray(selectedContacts) || !selectedContacts.length}
                    />
                    <View style={styles.searchBarContainer}>
                        <Ionicons
                            size={25}
                            name='ios-search'
                            style={styles.searchIcon}
                        />
                        <TextInput
                            placeholder='Search'
                            onChangeText={(text) => this.handleSearch(text)}
                            style={styles.searchInput}
                        />
                    </View>
                    <View style={styles.selectedContainer}>
                        <FlatList
                            data={selectedContacts}
                            renderItem={this.renderSelectedContact}
                            keyExtractor={(item, index) => item + index}
                            horizontal={true}
                            keyboardShouldPersistTaps='handled'
                        />
                    </View>
                </ImageBackground>

                {searchParameter === '' ?
                    <SectionList
                        sections={contactSections}
                        renderSectionHeader={this.renderContactHeader}
                        renderItem={this.renderContact}
                        keyExtractor={(item, index) => item + index}
                        keyboardShouldPersistTaps='handled'
                    />
                    :
                    this.renderFilteredContacts()
                }
            </View>
        )
    }
}