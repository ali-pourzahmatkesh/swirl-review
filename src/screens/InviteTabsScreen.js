import React, {Component} from "react";
import Invite from "../components/Invite";

export default class InviteTabsScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null
        };
    };

    render() {
        return <Invite />;
    }
}
