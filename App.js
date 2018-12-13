import React, { Component, Fragment } from "react";
import RootStack from "./src/stacks/RootStack";
import { Provider } from "react-redux";
import store from "./src/store/store";
import Toast from "./src/components/Toast";
import SocketWatcher from "./src/components/SocketWatcher";
import { AppState } from "react-native";
import { updateAppStatus } from "./src/store/app";
import { setMemberFromLocal } from "./src/store/member";
import { setChatFromLocal } from "./src/store/chat";
import { setFriendRequestFromLocal } from "./src/store/friendRequest";

export default class App extends Component {
	state = {
		appState: AppState.currentState
	};

	componentDidMount() {
		AppState.addEventListener("change", this._handleAppStateChange);
		
		store.dispatch(setMemberFromLocal());
		store.dispatch(setChatFromLocal());
		store.dispatch(setFriendRequestFromLocal());
	}

	_handleAppStateChange = nextAppState => {
		if (
			this.state.appState.match(/inactive|background/) &&
			nextAppState === "active"
		) {
			console.log("App has come to the foreground!");
			store.dispatch(updateAppStatus("active"));
		} else {
			console.log("App has come to the background!");
			store.dispatch(updateAppStatus("inactive"));
		}
		this.setState({ appState: nextAppState });
	};

	render() {
		return (
			<Provider store={store}>
				<Fragment>
					<SocketWatcher />
					<RootStack />
					<Toast />
				</Fragment>
			</Provider>
		);
	}
}
