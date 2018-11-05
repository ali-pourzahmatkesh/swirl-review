import React, { Component } from "react";
import {
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from "react-native";

import appCss from "../../../app.css";
import {CONFIG} from "../../../config";
const COLORS = CONFIG.colors;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.tapeWhite
    },

    flatList: {
        flex: 1,
        padding: 20
    },
    terms: {
        textAlign: "justify",
        marginBottom: 20,
        fontSize: 12
    },

    unorderedList: {
        marginBottom: 5,
    }
});

export default class PrivacyPolicy extends Component {
	// onPressButton( screenName ) {
	//     this.props.navigation.navigate(screenName);
	// }

	render() {
		return (
			<View style={styles.container}>
				<ScrollView style={styles.flatList}>
					<Text style={[appCss.defaultFontApp, styles.terms]}>
						You choose to give us certain information when using our services. This includes:
					</Text>
					<Text style={[appCss.defaultFontApp, styles.terms]}>
						When you create an account, you provide us with at least your login credentials, as well as some basic details necessary for the service to work, such as your gender and date of birth.
					</Text>
					<Text style={[ appCss.defaultFontApp, styles.terms, styles.unorderedList ]}>
						<Text>{'\u2022'} </Text>
						When you participate in surveys or focus groups, you give us your insights into our products and services, responses to our questions and testimonials.
					</Text>
					<Text style={[ appCss.defaultFontApp, styles.terms, styles.unorderedList ]}>
						<Text>{'\u2022'} </Text>
						If you contact our customer care team, we collect the information you give us during the interaction. Sometimes, we monitor or record these interactions for training purposes and to ensure a high quality of service.
					</Text>
					<Text style={[ appCss.defaultFontApp, styles.terms, styles.unorderedList ]}>
						<Text>{'\u2022'} </Text>
						If you ask us to communicate with or otherwise process information of other people (for example, if you ask us to send an email on your behalf to one of your friends), we collect the information about others that you give us in order to complete your request.
					</Text>
					<Text style={[ appCss.defaultFontApp, styles.terms, styles.unorderedList ]}>
						<Text>{'\u2022'} </Text>
						Of course, we also process your chats with other users as well as the content you publish, as part of the operation of the services.
					</Text>
					<Text style={[ appCss.defaultFontApp, styles.terms, styles.unorderedList ]}>
						Usage Information
					</Text>
					<Text style={[ appCss.defaultFontApp, styles.terms, styles.unorderedList ]}>
						We collect information about your activity on our services, for instance how you use them (e.g., date and time you logged in, features you’ve been using, searches, clicks and pages which have been shown to you, and how you interact with other users (e.g., users you connect and interact with, time and date of your exchanges, number of messages you send and receive).
					</Text>
					<Text style={[ appCss.defaultFontApp, styles.terms, styles.unorderedList ]}>
						Device information
					</Text>
					<Text style={[ appCss.defaultFontApp, styles.terms, styles.unorderedList ]}>
						We collect information from and about the device(s) you use to access our services, including:
					</Text>
					<Text style={[ appCss.defaultFontApp, styles.terms, styles.unorderedList ]}>
						<Text>{'\u25E6'} </Text>
						hardware and software information such as IP address, device ID and type,
						device-specific and apps settings and characteristics, app crashes, advertising IDs (such as Google’s AAID and Apple's IDFA, both of which are randomly generated numbers that you can reset by going into your device’ settings), browser type, version and language, operating system, time zones, identifiers associated with cookies or other technologies that may uniquely identify your device or browser (e.g., IMEI/UDID and MAC address);
					</Text>
					<Text style={[ appCss.defaultFontApp, styles.terms, styles.unorderedList ]}>
						<Text>{'\u25E6'} </Text>
						information on your wireless and mobile network connection, like your service provider and signal strength;
					</Text>
					<Text style={[ appCss.defaultFontApp, styles.terms, styles.unorderedList ]}>
						<Text>{'\u25E6'} </Text>
						information on device sensors such as accelerometers, gyroscopes and compasses.
					</Text>
					<Text style={[ appCss.defaultFontApp, styles.terms, styles.unorderedList ]}>
						How we use it?
					</Text>
					<Text style={[ appCss.defaultFontApp, styles.terms, styles.unorderedList ]}>
						Since our goal is to help you make meaningful connections, the main sharing of users’ information is, of course, with other users. We also share some users’ information with service providers and partners who assist us in operating the services, and, in some cases, legal authorities.
					</Text>
					<Text style={[ appCss.defaultFontApp, styles.terms, styles.unorderedList ]}>
						Read on for more details about how your information is shared with others.
					</Text>
					<Text style={[ appCss.defaultFontApp, styles.terms, styles.unorderedList ]}>
						<Text>{'\u2022'} </Text>
						When required by law
					</Text>
					<Text style={[ appCss.defaultFontApp, styles.terms, styles.unorderedList ]}>
						We may disclose your information if reasonably necessary: (i) to comply with a legal process, such as a court order, subpoena or search warrant, government / law enforcement investigation or other legal requirements; (ii) to assist in the prevention or detection of crime (subject in each case to applicable law); or (iii) to protect the safety of any person.
					</Text>
					<Text style={[ appCss.defaultFontApp, styles.terms, styles.unorderedList ]}>
						<Text>{'\u2022'} </Text>
						To enforce legal rights
					</Text>
					<Text style={[ appCss.defaultFontApp, styles.terms, styles.unorderedList ]}>
						We may also share information: (i) if disclosure would mitigate our liability in an actual or threatened lawsuit; (ii) as necessary to protect our legal rights and legal rights of our users, business partners or other interested parties; (iii) to enforce our agreements with you; and (iv) to investigate, prevent, or take other action regarding illegal activity, suspected fraud or other wrongdoing.
					</Text>
					<Text style={[ appCss.defaultFontApp, styles.terms, styles.unorderedList ]}>
						How long we retain your information
					</Text>
					<Text style={[ appCss.defaultFontApp, styles.terms, styles.unorderedList ]}>
						We keep your personal information only as long as we need it for legitimate business purposes and as permitted by applicable law. To protect the safety and security of our users on and off our services, we implement a safety retention window of three months following account deletion. During this period, account information will be retained although the account will of course not be visible on the services anymore.
					</Text>
					<Text style={[ appCss.defaultFontApp, styles.terms, styles.unorderedList ]}>
						In practice, we delete or anonymize your information upon deletion of your account (following the safety retention window), unless:
					</Text>
					<Text style={[ appCss.defaultFontApp, styles.terms, styles.unorderedList ]}>
						<Text>{'1\u2219'} </Text>
						We must keep it to comply with applicable law (for instance, some “traffic data” is kept for one year to comply with statutory data retention obligations);
					</Text>
					<Text style={[ appCss.defaultFontApp, styles.terms, styles.unorderedList ]}>
						<Text>{'2\u2219'} </Text>
						We must keep it to evidence our compliance with applicable law (for instance, records of consents to our Terms, Privacy Policy and other similar consents are kept for five years);
					</Text>
					<Text style={[ appCss.defaultFontApp, styles.terms, styles.unorderedList ]}>
						<Text>{'3\u2219'} </Text>
						There is an outstanding issue, claim or dispute requiring us to keep the relevant information until it is resolved; or
					</Text>
					<Text style={[ appCss.defaultFontApp, styles.terms, styles.unorderedList ]}>
						<Text>{'4\u2219'} </Text>
						The information must be kept for our legitimate business interests, such as fraud prevention and enhancing users' safety and security. For example, information may need to be kept to prevent a user who was banned for unsafe behavior or security incidents from opening a new account.
					</Text>
					<Text style={[ appCss.defaultFontApp, styles.terms, styles.unorderedList ]}>
						Keep in mind that even though our systems are designed to carry out data deletion processes according to the above guidelines, we cannot promise that all data will be deleted within a specific timeframe due to technical constraints.
					</Text>
					<Text style={[ appCss.defaultFontApp, styles.terms, styles.unorderedList ]}>
						Privacy policy changes
					</Text>
					<Text style={[ appCss.defaultFontApp, styles.terms, styles.unorderedList ]}>
						Because we’re always looking for new and innovative ways to help you build meaningful connections, this policy may change over time. We will notify you before any material changes take effect so that you have time to review the changes.
					</Text>
					<View style={{ height: 200 }} />
				</ScrollView>
			</View>
		);
	}
}
