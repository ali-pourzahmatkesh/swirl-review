import React, {Component} from "react";
import EmptyList from "../EmptyList";
import {Image, SectionList, Text, TouchableOpacity, View} from "react-native";
import styles from "./style";
import appCss from "../../../app.css";
import {SafeAreaView} from "react-navigation";
import {PagedContacts} from "react-native-paged-contacts";
import logo from "../../assets/images/logo_bigger.png";
// import checkedImage from "../../assets/images/checked.png";
let pg = new PagedContacts();

export default class InviteFromContacts extends Component {
	constructor(props) {
		super(props);
		this.state = {
			list: [],
            contacts: [],
			newList: []
		};
		this.getListData.bind(this);
	}

	componentDidMount() {
        this.getListData();
	}

    componentDidUpdate( prevProps ) {
        if( this.props.screenProps.searchText !== prevProps.screenProps.searchText ) {
            this.filterContact(this.state.contacts, this.props.screenProps.searchText)
        }
    }

	getListData = function() {
		pg.requestAccess().then(granted => {
			if (granted !== true) {
				return;
			}
			// TODO: need to implement pagination to contacts
			pg.getContactsCount().then(count => {
				pg
					.getContactsWithRange(0, count, [
						PagedContacts.displayName,
                        PagedContacts.thumbnailImageData,
						PagedContacts.phoneNumbers
					])
					.then(contacts => {
                        this.setState({ contacts });
						if (contacts.length > 0) {
							this.getMobileNumberList(contacts)
						}
					});
			});
		});
	};

    filterContact = ( contacts, search ) => {
        if( search ) {
            contacts = contacts.filter(item => item[ 'displayName' ].search(search) > -1)
        }
        let sectionList = this.generateSectionList(contacts);
        this.setState({
            list: sectionList,
            loading: false,
            refreshing: false
        });
    };

    generateSectionList = array => {
        let list = { letters: [] };
        array.forEach(item => {
            let itLetter = item[ "displayName" ].substring(0, 1).toUpperCase();
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
    getMobileNumberList = (contacts)=>{
    	let numberList = [];
        contacts.forEach(item=>{
        	item['phoneNumbers'].forEach(itemNumber=>{
        		if(itemNumber.label==='mobile'){
                    numberList.push(itemNumber['value'])
				}
			})
		});
        console.log("numberList", numberList)
        this.filterContact(contacts)

	};

    addFriend = contact=>{
    	console.log(contact)
	};
    render() {

        return (
			<SafeAreaView style={styles.container}>
				<SectionList
					sections={this.state.list}
					extraData={this.state.list}
					keyExtractor={( item, index ) => index}
					ListEmptyComponent={() => <EmptyList />}
					renderItem={( { item } ) => (
						<View
							style={styles.sectionItems}
						>
                           <View style={{flexDirection:'row', alignItems:'center', justifyContent:'flex-start'}}>

							   <Image style={{ width: 45, height: 45, borderRadius: 22.5 }} resizeMode={'contain'}
									  source={item[ 'thumbnailImageData' ] && { uri: 'data:image/png;base64,' + item[ 'thumbnailImageData' ] } || logo}/>
							   <Text
								   style={[ appCss.defaultFontApp, appCss.countryNameSearch ]}
								   numberOfLines={1}
								   ellipsizeMode="tail"
							   >
                                   {item.displayName}
							   </Text>

						   </View>
							<TouchableOpacity
								style={styles.addBtn}
								onPress={()=>this.addFriend(item)}
							>
								<Text style={styles.addBtnText}> Add </Text>
							</TouchableOpacity>
						</View>
                    )}
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

			</SafeAreaView>
		);
	}
}
