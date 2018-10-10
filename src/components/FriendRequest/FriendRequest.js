import React, {Component} from "react";
import {AlertIOS, FlatList, Image, Text, TouchableOpacity, View} from "react-native";
import EmptyList from "../EmptyList";
import Avatar from "../../components/Avatar";
import check from "../../assets/images/icons/check_white.png";
import cancel from "../../assets/images/icons/close.png";
import appCss from "../../../app.css";
import styles from "./style";

export default class FriendRequest extends Component {
    state = {
        contentList:[],
        list: [
            {
                "_id": "5b742feff6d5974bd647f5ce",
                "senderMemberId": "5b732315dc53ae8206441e5e",
                "receiverMemberId": "5b8e829ff22ae764b833921d",
				"name" : "majid azad",
                "isApproved": false,
                "isCanceled": false
            },
            {
                "_id": "5b74300bf6d5974bd647f5cf",
                "senderMemberId": "5b7322b7dc53ae8206441e5d",
                "receiverMemberId": "5b732315dc53ae8206441e5e",
                "name" : "ali Pourzahmatkeshhhhhhhh",
                "isApproved": false,
                "isCanceled": false
            },
            {
                "_id": "5b8e8bd9a4ee0d8b6de0b5e4",
                "createdAt": "2018-09-04T13:42:49.290Z",
                "isApproved": true,
                "isCanceled": false,
                "name" : "seyed",
                "receiverMemberId": "5b8e829ff22ae764b833921d",
                "senderMemberId": "5b7322b7dc53ae8206441e5d",
                "updatedAt": "2018-09-04T13:42:49.290Z"
            },
            {
                "_id": "5b8ff5e2a4ee0d8b6de0e783",
                "createdAt": "2018-09-05T15:27:30.133Z",
                "isApproved": true,
                "isCanceled": false,
                "name" : "mgs",
                "receiverMemberId": "5b8ff1333d956ba8d028ec7b",
                "senderMemberId": "5b8e829ff22ae764b833921d",
                "updatedAt": "2018-09-05T15:27:30.133Z"
            }
        ]
    };

    componentDidMount() {
        this.getListRequest();
        this.filterContact(this.state.list)
    }
    componentDidUpdate( prevProps ) {
        if( this.props.screenProps && prevProps.screenProps ) {
            if( this.props.screenProps.searchText !== prevProps.screenProps.searchText ) {
                this.filterContact(this.state.list, this.props.screenProps.searchText)
            }
        }
    }


    filterContact = (contentList, searchText)=>{
    	console.log(contentList, searchText)
    	if(searchText){
            contentList = contentList.filter(i=>i['name'].toLowerCase().search(searchText.toLowerCase()) > -1)
		}

		this.setState({contentList})

	};


	getListRequest = (/*loading = false, refreshing = false*/) => {
		// const { page, limit } = this.state;
		// let options = {
		// 	receiverMemberId: this.props.id,
		// 	skip: (page - 1) * limit,
		// 	limit: limit,
		// 	loading,
		// 	refreshing
		// };

		//this.props.getListData(options, "FriendRequests");
        // this.props.getListData(this.props.id, "FriendRequests");
	};

	handleChat = item => {
		if (this.props.onClickItem) {
			this.props.onClickItem();
		}
		this.props.navigation.navigate("DiscussionScreen", {
			friendMemberOwner: item.memberId,
			name: item.name
		});
	};

	handleDeleteChat = memberId => {
		this.props.callDeleteChat({
			memberId1: this.props.id,
			memberId2: memberId
		});
	};

	deleteNote = item => {
		AlertIOS.alert("Delete Chat", "Are you sure for delete this request ?", [
			{
				text: "No",
				style: "cancel"
			},
			{
				text: "Yes",
				onPress: () => this.handleDeleteChat(item.memberId)
			}
		]);
	};

	loadList = ({ item }) => {

		return (
			<View>
				<View backgroundColor="transparent">
					<View style={[appCss.listItems]}>
						{this.avatarFunc(item)}
						{this.titleFunc(item)}
					</View>
				</View>
			</View>
		);
	};

	Capitalize(str) {
		if (str) {
			return str.charAt(0).toUpperCase() + str.slice(1);
		} else {
			return str;
		}
	}

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

    loadList = ( { item } ) => {
        return (
			<View style={appCss.listItems}>
                {this.avatarFunc(item)}
                {this.titleFunc(item)}
                {this.positionFunc(item)}
			</View>
        );
    };

    positionFunc = item => {
        return (
			<View style={styles.actionBox}>
				<TouchableOpacity onPress={() => {
                    this.deleteNote(item)
                }} style={[ styles.actionBtn, styles.cancel ]}>
					<Image source={cancel} resizeMode={'contain'} style={styles.actionIcon}/>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => this.approve(item)} style={[ styles.actionBtn, styles.verify ]}>
					<Image source={check} resizeMode={'contain'} style={styles.actionIcon}/>
				</TouchableOpacity>
			</View>
        );
    };
	approve = item => {
		this.props.callApprove(item.id);
	};

	cancel = item => {
		this.props.callCancel(item.id);
	};

	render() {
        // console.log("console.log(this.props.screenProps.cats);cccc111", this.props.screenProps)
        // console.log("console.log(this.props.screenProps.cats);cccc111", this.props.navigation.state)
		return (
			<View style={styles.container}>
				<FlatList
					data={this.state.contentList}
					style={{flex:1}}
					keyExtractor={(item, index) => index.toString()}
					renderItem={({ item }) => this.loadList({ item })}
					ListEmptyComponent={() => <EmptyList />}
					onEndReachedThreshold={0.5}
				/>
			</View>
		);
	}
}
