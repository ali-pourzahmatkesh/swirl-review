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
			newList: []
		};
		this.getListData.bind(this);
	}

	componentDidMount() {
        this.getListData();
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
						//PagedContacts.emailAddresses
					])
					.then(contacts => {
						//Use contacts here
						console.log(
							"page",
							this.state.page,
							"limit",
							this.state.limit,
							"contacts list",
							contacts
						);

						if (contacts.length > 0) {

                            let sectionList = this.generateSectionList(contacts);
                            console.log(sectionList)
							this.setState({
                                list: sectionList,
								loading: false,
								// newContactList: contacts,
								refreshing: false
							});
						}
					});
			});
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

    render() {
		return (
			<SafeAreaView style={styles.container}>
				<SectionList
					sections={this.state.list}
					extraData={this.state.list}
					keyExtractor={( item, index ) => index}
					ListEmptyComponent={() => <EmptyList />}
					renderItem={( { item } ) => (
						<TouchableOpacity
							style={styles.sectionItems}
						>
                           <View style={{flexDirection:'row', alignItems:'center', justifyContent:'flex-start'}}>
                               {/*<Image style={{width:45, height:45}} resizeMode={'contain'} source={{uri:item.thumbnailImageData}}/>*/}

							   <Image style={{ width: 45, height: 45 }} resizeMode={'contain'} source={logo}/>

							   <Text
								   style={[ appCss.defaultFontApp, appCss.countryNameSearch ]}
								   numberOfLines={1}
								   ellipsizeMode="tail"
							   >

                                   {item.displayName}
							   </Text>

						   </View>
							<View/>
						</TouchableOpacity>
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
