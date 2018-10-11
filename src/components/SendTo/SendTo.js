import React, {Component} from "react";
import EmptyList from "../EmptyList";
import {Dimensions, Image, SectionList, Text, TouchableOpacity, View} from "react-native";
import styles from "./style";
import appCss from "../../../app.css";
import Avatar from "../../components/Avatar";
import {SafeAreaView} from "react-navigation";
import {PagedContacts} from "react-native-paged-contacts";
import checkedImage from "../../assets/images/icons/check_white.png";
import {CONFIG} from "../../../config";
import next from "../../assets/images/icons/next.png";
let pg = new PagedContacts();
const colors = CONFIG.colors;
const { width } = Dimensions.get('window');

export default class SendTo extends Component {
    constructor( props ) {
        super(props);
        this.state = {
            finalList: [],
            list: [
                {
                    "_id": "5b742feff6d5974bd647f5ce",
                    "senderMemberId": "5b732315dc53ae8206441e5e",
                    "receiverMemberId": "5b8e829ff22ae764b833921d",
                    "name": "majid azad",
                    "isApproved": false,
                    "isCanceled": false
                },
                {
                    "_id": "5b74300bf6d5974bd647f5cf",
                    "senderMemberId": "5b7322b7dc53ae8206441e5d",
                    "receiverMemberId": "5b732315dc53ae8206441e5e",
                    "name": "ali Pourzahmatkeshhhhhhhhhhhhhhh",
                    "isApproved": false,
                    "isCanceled": false
                },
                {
                    "_id": "5b8e8bd9a4ee0d8b6de0b5e4",
                    "createdAt": "2018-09-04T13:42:49.290Z",
                    "isApproved": true,
                    "isCanceled": false,
                    "name": "seyed",
                    "receiverMemberId": "5b8e829ff22ae764b833921d",
                    "senderMemberId": "5b7322b7dc53ae8206441e5d",
                    "updatedAt": "2018-09-04T13:42:49.290Z"
                },
                {
                    "_id": "5b8ff5e2a4ee0d8b6de0e783",
                    "createdAt": "2018-09-05T15:27:30.133Z",
                    "isApproved": true,
                    "isCanceled": false,
                    "name": "mgs",
                    "receiverMemberId": "5b8ff1333d956ba8d028ec7b",
                    "senderMemberId": "5b8e829ff22ae764b833921d",
                    "updatedAt": "2018-09-05T15:27:30.133Z"
                }
            ]
        };
        // this.getListData.bind(this);
    }

    componentDidMount() {
        this.getListData();
    }

    componentDidUpdate( prevProps ) {
    }

    getListData = () => {
        const { list } = this.state;
        this.setState({ finalList: this.generateSectionList(list, 'name') })

    };
    generateSectionList = ( array, key ) => {
        let list = { letters: [] };
        array.forEach(item => {
            let itLetter = item[ key ].substring(0, 1).toUpperCase();
            if( !(
                itLetter in list) ) {
                list[ itLetter ] = [];
                list.letters.push(itLetter);
            }
            list[ itLetter ].push(item);
        });
        list.letters = list.letters.sort();
        let sectionList = [];

        list.letters.forEach(item => {
            sectionList.push({
                title: item,
                data: list[ item ]
            });
        });
        return sectionList;
    };

    loadList = ( { item } ) => {
        return (
            <View style={appCss.listItems}>
                {this.avatarFunc(item)}
                {this.titleFunc(item)}
                {this.actionFunc(item)}
            </View>
        );
    };

    avatarFunc = item => {
        return (
            <TouchableOpacity onPress={() => this.props.screenProps.profileNavigate(item)} style={appCss.avatarBox}>
                <Avatar userId={item.memberId} position="image" size={45}/>
            </TouchableOpacity>
        );
    };

    titleFunc = item => {
        return (
            <View style={appCss.titleBox}>
                <View>
                    <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={appCss.titleBoxSubject}
                    >
                        {this.Capitalize(item.name)}
                    </Text>
                </View>
            </View>
        );
    };

    actionFunc = item => {
        return (
            <View style={styles.actionBox}>
                <TouchableOpacity
                    onPress={() => {
                        this.onChange(item)
                    }}
                    style={[ styles.actionBtn, item[ 'checked' ]? styles.actionBtnSelect: styles.actionBtnUnSelect ]}>

                    {
                        item[ 'checked' ] &&
                        <Image source={checkedImage} resizeMode={'contain'} style={styles.actionIcon}/>
                    }

                </TouchableOpacity>
            </View>
        );
    };
    onChange = item => {
        const { finalList } = this.state;
        item[ 'checked' ] = !item[ 'checked' ];
        this.setState({ finalList });
    }

    Capitalize( str ) {
        if( str ) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        } else {
            return str;
        }
    }

    render() {

        const {finalList} = this.state;
        return (
            <SafeAreaView style={styles.container}>
                <SectionList
                    sections={finalList}
                    extraData={finalList}
                    keyExtractor={( item, index ) => index}
                    ListEmptyComponent={() => <EmptyList />}
                    renderItem={( { item } ) => this.loadList({ item })}
                    renderSectionHeader={( { section } ) => (
                        <View style={styles.sectionHeader}>
                            <Text
                                style={[ appCss.defaultFontApp, styles.sectionHeaderTitle ]}
                            >
                                {section.title}
                            </Text>
                        </View>
                    )}
                />
                <View style={{
                    height: 50,
                    width: 50,
                    position: 'absolute',
                    bottom: 50,
                    right: 15,
                }}>
                    <TouchableOpacity style={styles.footer} onPress={() => this.props.friendList(finalList)}>
                        <Image resizeMode={'contain'} style={styles.nextIcon} source={next}/>
                    </TouchableOpacity>
                </View>

            </SafeAreaView>
        );
    }
}
