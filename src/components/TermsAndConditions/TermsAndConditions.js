import React, {Component} from "react";
import {Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import appCss from "../../../app.css";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#e6e7e9"
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

export default class TermsAndConditions extends Component {
    openURL = url => {
        try {
            Linking.openURL(url);
        } catch( error ) {
            console.log(error);
        }
    };


	render() {
		return (
			<View style={styles.container}>
				<ScrollView style={styles.flatList}>
					<Text style={[appCss.defaultFontApp, styles.terms]}>
						By using swirl you commit to a few restrictions to be part of the community:
					</Text>
					<Text style={[ appCss.defaultFontApp, styles.terms, styles.unorderedList ]}>
						<Text>{'\u2022'} </Text>
						You must not be prohibited from receiving any aspect of our Service under applicable laws or
						engaging in payments related Services if you are on an applicable denied party listing.
					</Text>
					<Text style={[ appCss.defaultFontApp, styles.terms, styles.unorderedList ]}>
						<Text>{'\u2022'} </Text>
						We must not have previously disabled your account for violation of law or any of our policies.
					</Text>
					<Text style={[ appCss.defaultFontApp, styles.terms, styles.unorderedList ]}>
						<Text>{'\u2022'} </Text>
						You must not be a convicted sex offender.
					</Text>
					<Text style={[ appCss.defaultFontApp, styles.terms, styles.unorderedList ]}>
						This is how you cannot use swirl.
					</Text>
					<Text style={[ appCss.defaultFontApp, styles.terms, styles.unorderedList ]}>
						<Text>{'\u2022'} </Text>
						You can't impersonate others or provide inaccurate information.
					</Text>
					<Text style={[ appCss.defaultFontApp, styles.terms, styles.unorderedList ]}>
						You don't have to disclose your identity on swirl, but you must provide us with accurate and up
						to date information (including registration information). Also, you may not impersonate someone
						you aren't, and you can't create an account for someone else unless you have their express
						permission.
					</Text>
					<Text style={[ appCss.defaultFontApp, styles.terms, styles.unorderedList ]}>
						<Text>{'\u2022'} </Text>
						You can't do anything unlawful, misleading, or fraudulent or for an illegal or unauthorized
						purpose.
					</Text>
					<Text style={[ appCss.defaultFontApp, styles.terms, styles.unorderedList ]}>
						<Text>{'\u2022'} </Text>
						You can't violate (or help or encourage others to violate) these Terms or our policies.
					</Text>
					<Text style={[ appCss.defaultFontApp, styles.terms, styles.unorderedList ]}>
						<Text>{'\u2022'} </Text>
						You can't do anything to interfere with or impair the intended operation of the Service.
					</Text>
					<Text style={[ appCss.defaultFontApp, styles.terms, styles.unorderedList ]}>
						<Text>{'\u2022'} </Text>
						You can't attempt to create accounts or access or collect information in unauthorized ways.
					</Text>
					<Text style={[appCss.defaultFontApp, styles.terms]}>
						This includes creating accounts or collecting information in an automated way without our
						express permission.
					</Text>
					<Text style={[ appCss.defaultFontApp, styles.terms, styles.unorderedList ]}>
						<Text>{'\u2022'} </Text>
						You can't post private or confidential information or do anything that violates someone else's
						rights, including intellectual property.
					</Text>
					<Text style={[appCss.defaultFontApp, styles.terms]}>
						Permissions You Give to Us.
					</Text>
					<Text style={[ appCss.defaultFontApp, styles.terms ]}>
						As part of our agreement, you also give us permissions that we need to provide the Service.
					</Text>
					<Text style={[ appCss.defaultFontApp, styles.terms, styles.unorderedList ]}>
						<Text>{'\u2022'} </Text>
						You agree that we can download and install updates to the Service on your device.
					</Text>
					<Text style={[ appCss.defaultFontApp, styles.terms, styles.unorderedList ]}>
						<Text>{'\u2022'} </Text>
						When you select a name for your account, we may change it if we believe it is appropriate or
						necessary (for example, if it infringes someone's intellectual property or impersonates another
						user).
					</Text>
					<Text style={[ appCss.defaultFontApp, styles.terms, styles.unorderedList ]}>
						<Text>{'\u2022'} </Text>
						If you use content covered by intellectual property rights that we have and make available in
						our Service (for example, images, designs, videos, or sounds we provide that you add to content
						you create or share), we retain all rights to our content (but not yours).
					</Text>
					<Text style={[ appCss.defaultFontApp, styles.terms, styles.unorderedList ]}>
						<Text>{'\u2022'} </Text>
						You can only use our intellectual property and trademarks or similar marks with our prior
						written permission.
					</Text>
					<Text style={[ appCss.defaultFontApp, styles.terms, styles.unorderedList ]}>
						<Text>{'\u2022'} </Text>
						You must obtain written permission from us or under an open source license to modify, create
						derivative works of, decompile, or otherwise attempt to extract source code from us.
					</Text>
					<Text style={[ appCss.defaultFontApp, styles.terms ]}>
						Content Removal and Disabling or Terminating Your Account
					</Text>
					<Text style={[ appCss.defaultFontApp, styles.terms, styles.unorderedList ]}>
						<Text>{'\u2022'} </Text>
						We can remove any content or information you share on the Service if we believe that it violates
						these Terms of Use, or we are permitted or required to do so by law. We can refuse to provide or
						stop providing all or part of the Service to you (including terminating or disabling your
						account) immediately to protect services, or if you create risk or legal exposure for us,
						violate these Terms of Use if you repeatedly infringe other people's intellectual property
						rights, or where we are permitted or required to do so by law.
					</Text>
					<Text style={[ appCss.defaultFontApp, styles.terms, styles.unorderedList ]}>
						<Text>{'\u2022'} </Text>
						Content you delete may persist for a limited period of time in backup copies and will still be
						visible where others have shared it. This paragraph, and the section below called "Our Agreement
						and What Happens if We Disagree," will still apply even after your account is terminated or
						deleted.
					</Text>
					<Text style={[ appCss.defaultFontApp, styles.terms ]}>
						Our Agreement and What Happens if We Disagree
					</Text>
					<Text style={[ appCss.defaultFontApp, styles.terms ]}>
						Our Agreement.
					</Text>
					<Text style={[ appCss.defaultFontApp, styles.terms, styles.unorderedList ]}>
						<Text>{'\u2022'} </Text>
						If any aspect of this agreement is unenforceable, the rest will remain in effect.
					</Text>
					<Text style={[ appCss.defaultFontApp, styles.terms, styles.unorderedList ]}>
						<Text>{'\u2022'} </Text>
						Any amendment or waiver to our agreement must be in writing and signed by us. If we fail to
						enforce any aspect of this agreement, it will not be a waiver.
					</Text>
					<Text style={[ appCss.defaultFontApp, styles.terms, styles.unorderedList ]}>
						<Text>{'\u2022'} </Text>
						We reserve all rights not expressly granted to you.
					</Text>
					<Text style={[ appCss.defaultFontApp, styles.terms ]}>
						Who Has Rights Under this Agreement.
					</Text>
					<Text style={[ appCss.defaultFontApp, styles.terms, styles.unorderedList ]}>
						<Text>{'\u2022'} </Text>
						This agreement does not give rights to any third parties.
					</Text>
					<Text style={[ appCss.defaultFontApp, styles.terms, styles.unorderedList ]}>
						<Text>{'\u2022'} </Text>
						You cannot transfer your rights or obligations under this agreement without our consent.
					</Text>
					<Text style={[ appCss.defaultFontApp, styles.terms, styles.unorderedList ]}>
						<Text>{'\u2022'} </Text>
						Our rights and obligations can be assigned to others. For example, this could occur if our
						ownership changes (as in a merger, acquisition, or sale of assets) or by law.
					</Text>
					<Text style={[ appCss.defaultFontApp, styles.terms ]}>
						Who Is Responsible if Something Happens.
					</Text>
					<Text style={[ appCss.defaultFontApp, styles.terms, styles.unorderedList ]}>
						<Text>{'\u2022'} </Text>
						Our Service is provided "as is," and we can't guarantee it will be safe and secure or will work
						perfectly all the time. TO THE EXTENT PERMITTED BY LAW, WE ALSO DISCLAIM ALL WARRANTIES, WHETHER
						EXPRESS OR IMPLIED, INCLUDING THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
						PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT.
					</Text>
					<Text style={[ appCss.defaultFontApp, styles.terms, styles.unorderedList ]}>
						<Text>{'\u2022'} </Text>
						We also don’t control what people and others do or say, and we aren’t responsible for their (or
						your) actions or conduct (whether online or offline) or content (including unlawful or
						objectionable content). We also aren’t responsible for services and features offered by other
						people or companies, even if you access them through our Service.
					</Text>
					<Text style={[ appCss.defaultFontApp, styles.terms, styles.unorderedList ]}>
						<Text>{'\u2022'} </Text>
						Our responsibility for anything that happens on the Service (also called "liability") is limited
						as much as the law will allow. If there is an issue with our Service, we can't know what all the
						possible impacts might be. You agree that we won't be responsible ("liable") for any lost
						profits, revenues, information, or data, or consequential, special, indirect, exemplary,
						punitive, or incidental damages arising out of or related to these Terms, even if we know they
						are possible. This includes when we delete your content, information, or account. Our aggregate
						liability arising out of or relating to these Terms will not exceed the greater of $100 or the
						amount you have paid us in the past twelve months.
					</Text>
					<Text style={[ appCss.defaultFontApp, styles.terms, styles.unorderedList ]}>
						<Text>{'\u2022'} </Text>
						You agree to defend (at our request), indemnify and hold us harmless from and against any
						claims, liabilities, damages, losses, and expenses, including without limitation, reasonable
						attorney's fees and costs, arising out of or in any way connected with these Terms or your use
						of the Service. You will cooperate as required by us in the defense of any claim. We reserve the
						right to assume the exclusive defense and control of any matter subject to indemnification by
						you, and you will not in any event settle any claim without our prior written consent.
					</Text>
					<Text style={[ appCss.defaultFontApp, styles.terms ]}>
						How We Will Handle Disputes.
					</Text>
					<Text style={[ appCss.defaultFontApp, styles.terms, styles.unorderedList ]}>
						<Text>{'\u2022'} </Text>
						Except as provided below, you and we agree that any cause of action, legal claim, or dispute
						between you and us arising out of or related to these Terms or swirl ("claim(s)") must be
						resolved by arbitration on an individual basis. Class actions and class arbitrations are not
						permitted; you and we may bring a claim only on your own behalf and cannot seek relief that
						would affect other swirl users. If there is a final judicial determination that any particular
						claim (or a request for particular relief) cannot be arbitrated in accordance with this
						provision's limitations, then only that claim (or only that request for relief) may be brought
						in court. All other claims (or requests for relief) remain subject to this provision.
					</Text>
					<Text style={[ appCss.defaultFontApp, styles.terms, styles.unorderedList ]}>
						<Text>{'\u2022'} </Text>
						<Text>
							Instead of using arbitration, you or we can bring claims in your local "small claims" court,
							if the rules of that court will allow it. If you don't bring your claims in small claims
							court (or if you or we appeal a small claims court judgment to a court of general
							jurisdiction), then the claims must be resolved by binding, individual arbitration. The
							American Arbitration Association will administer all arbitrations under its Consumer
							Arbitration Rules. You and we expressly waive a trial by jury.
						</Text>
						<Text>
							The following claims don't have to be arbitrated and may be brought in court: disputes
							related to intellectual property (like copyrights and trademarks), violations of our
							Platform Policy, or efforts to interfere with the Service or engage with the Service in
							unauthorized ways (for example, automated ways). In addition, issues relating to the scope
							and enforceability of the arbitration provision are for a court to decide.
						</Text>
						<Text>
							You can opt out of this provision within 30 days of the date that you agreed to these Terms.
							To opt out, you must send your name, residence address, username, email address or phone
							number you use for your swirl account, and a clear statement that you want to opt out of
							this arbitration agreement, and you must send them here:

								<Text
									onPress={() => this.openURL("mailto:info@realswirlapp.com")}
									style={{ color: 'blue', marginTop:20 }}> info@realswirlapp.com</Text>

						</Text>


					</Text>
					<Text style={[ appCss.defaultFontApp, styles.terms, styles.unorderedList ]}>
						<Text>{'\u2022'} </Text>
						Before you commence arbitration of a claim, you must provide us with a written Notice of Dispute
						that includes your name, residence address, username, email address or phone number you use for
						your swirl account, a detailed description of the dispute, and the relief you seek. Any Notice
						of Dispute you send to us should be mailed to swirl. Before we commence arbitration, we will
						send you a Notice of Dispute to the email address you use with your swirl account, or other
						appropriate means. If we are unable to resolve a dispute within thirty (30) days after the
						Notice of Dispute is received, you or we may commence arbitration.

					</Text>
					<Text style={[ appCss.defaultFontApp, styles.terms, styles.unorderedList ]}>
						<Text>{'\u2022'} </Text>
						The laws of the State of California, to the extent not preempted by or inconsistent with federal
						law, will govern these Terms and any claim, without regard to conflict of law provisions.
					</Text>
					<View style={{ height: 200 }} />
				</ScrollView>
			</View>
		);
	}
}
