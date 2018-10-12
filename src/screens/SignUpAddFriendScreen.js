console.log("SignUpScreen");
import React, { Component } from "react";
import SignUpAddFriend from "../components/SignUpAddFriend";

export default class SignUpAddFriendScreen extends Component {
	static navigationOptions = () => {
        return {
            header: null
        };
	};
	render() {
		return <SignUpAddFriend />;
	}
}
