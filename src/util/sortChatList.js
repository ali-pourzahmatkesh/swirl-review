var _ = require("lodash");

export default function(list) {
	console.log("-------------- SORT AGAIN -----------------");

	let messageAreReady = [];
	let messageAreWaiting = [];
	let messageAreArchived = [];

	// ----------------------------------------------------------------------
	// separate messages by the 3 sections
	// ----------------------------------------------------------------------
	Array.isArray(list) &&
		list.length &&
		list.map(message => {
			if (message.isSeen) {
				// archived messages
				messageAreArchived.push(message);
			} else {
				let intervalByMiliSeconds =
					new Date(message["availableAt"]).getTime() - new Date().getTime();

				if (intervalByMiliSeconds > 0) {
					// waiting messages
					messageAreWaiting.push(message);
				} else {
					// ready messages
					messageAreReady.push(message);
				}
			}
		});
	// ----------------------------------------------------------------------
	console.log("messageAreReady", messageAreReady);
	console.log("messageAreWaiting", messageAreWaiting);
	console.log("messageAreArchived", messageAreArchived);

	// ----------------------------------------------------------------------
	// sort each part by when they are available
	// ----------------------------------------------------------------------
	if (messageAreReady.length > 1) {
		messageAreReady = _.reverse(
			_.sortBy(messageAreReady, [
				function(msg) {
					return msg.availableAt;
				}
			])
		);
	}

	if (messageAreWaiting.length > 1) {
		messageAreWaiting = _.sortBy(messageAreWaiting, [
			function(msg) {
				return msg.availableAt;
			}
		]);
	}

	if (messageAreArchived.length > 1) {
		messageAreArchived = _.reverse(
			_.sortBy(messageAreArchived, [
				function(msg) {
					return msg.availableAt;
				}
			])
		);
	}
	// ----------------------------------------------------------------------
	console.log("SORT messageAreReady", messageAreReady);
	console.log("SORT messageAreWaiting", messageAreWaiting);
	console.log("SORT messageAreArchived", messageAreArchived);
	list = _.concat(messageAreReady, messageAreWaiting, messageAreArchived);

	return list;
}
