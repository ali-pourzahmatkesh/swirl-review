var _ = require("lodash");

export default function(list) {
	console.log("-------------- SORT AGAIN -----------------");

	// sort by sender
	let sortedBySender = list.reduce((sortedObj, message) => {
		if(!sortedObj.hasOwnProperty(message.senderMemberId)){
			sortedObj[message.senderMemberId] = [message];
		}
		else{
			sortedObj[message.senderMemberId].push(message);
		}
		return sortedObj;
	}, {});

	console.log(list, '_______________ sorted obj', sortedBySender);

	let readyOnTop = [];
	let pendingOnTop = [];
	let seenOnTop = [];

	// need to sort the messages for each sender
	for(sender in sortedBySender){
		console.log('sender', sender);
		// messges grouped 3 ways
		let ready = [];
		let pending = [];
		let seen = [];

		// spliting sender's full message array into the 3 parts
		sortedBySender[sender].forEach(message => {
			if(message.isSeen){
				seen.push(message);
			}
			else{
				let intervalByMiliSeconds =
					new Date(message.availableAt).getTime() - new Date().getTime();
				// pending messsages
				if (intervalByMiliSeconds > 0) {
					pending.push(message);
				}
				// ready messages
				else {
					ready.push(message);
				}
			}
		});

		// sort ready list in ascending order
		// earliest to be available at the front
		// ^in the order you were meant to view them?
		ready.sort((messageA, messageB) => {
			return new Date(messageA.availableAt) - new Date(messageB.availableAt);
		});


		// sort pending list in ascending order
		// soonest to be available at the front
		pending.sort((messageA, messageB) => {
			return new Date(messageA.availableAt) - new Date(messageB.availableAt);
		});

		// sort seen list in descending order
		// latest to be sent at the front
		seen.sort((messageA, messageB) => {
			return new Date(messageB.createdAt) - new Date(messageA.createdAt);
		});

		if(ready.length > 0){
			readyOnTop.push(_.concat(ready, pending, seen));
		}
		else if(pending.length > 0){
			pendingOnTop.push(_.concat(pending, seen));
		}
		else{
			seenOnTop.push(seen);
		}
	}

	// sort the on top arrays by availability of first item?
	// sort ready list in descending order
	// most recent to be available at the front
	// 'freshest' on top
	readyOnTop.sort((messageListA, messageListB) => {
		return new Date(messageListB[0].availableAt) - new Date(messageListA[0].availableAt);
	});

	// sort ready list in ascending order
	// soonest to be available at the front
	pendingOnTop.sort((messageListA, messageListB) => {
		return new Date(messageListA[0].availableAt) - new Date(messageListB[0].availableAt);
	});

	// sort ready list in descending order
	// most recent to be sent at the front
	// most recently 'unswirled' message -- not ture if going off createdAt
	seenOnTop.sort((messageListA, messageListB) => {
		return new Date(messageListB[0].createdAt) - new Date(messageListA[0].createdAt);
	});

	console.log('readyOnTop', readyOnTop);
	console.log('pendingOnTop', pendingOnTop);
	console.log('seenOnTop', seenOnTop);


	return _.concat(readyOnTop, pendingOnTop, seenOnTop);
	// let messageAreReady = [];
	// let messageAreWaiting = [];
	// let messageAreArchived = [];

	// // ----------------------------------------------------------------------
	// // separate messages by the 3 sections
	// // ----------------------------------------------------------------------
	// Array.isArray(list) &&
	// 	list.length &&
	// 	list.map(message => {
	// 		if (message.isSeen) {
	// 			// archived messages
	// 			messageAreArchived.push(message);
	// 		} else {
	// 			let intervalByMiliSeconds =
	// 				new Date(message["availableAt"]).getTime() - new Date().getTime();

	// 			if (intervalByMiliSeconds > 0) {
	// 				// waiting messages
	// 				messageAreWaiting.push(message);
	// 			} else {
	// 				// ready messages
	// 				messageAreReady.push(message);
	// 			}
	// 		}
	// 	});
	// // ----------------------------------------------------------------------
	// console.log("messageAreReady", messageAreReady);
	// console.log("messageAreWaiting", messageAreWaiting);
	// console.log("messageAreArchived", messageAreArchived);

	// // ----------------------------------------------------------------------
	// // sort each part by when they are available
	// // ----------------------------------------------------------------------
	// if (messageAreReady.length > 1) {
	// 	messageAreReady = _.reverse(
	// 		_.sortBy(messageAreReady, [
	// 			function(msg) {
	// 				return msg.availableAt;
	// 			}
	// 		])
	// 	);
	// }

	// if (messageAreWaiting.length > 1) {
	// 	messageAreWaiting = _.sortBy(messageAreWaiting, [
	// 		function(msg) {
	// 			return msg.availableAt;
	// 		}
	// 	]);
	// }

	// if (messageAreArchived.length > 1) {
	// 	messageAreArchived = _.reverse(
	// 		_.sortBy(messageAreArchived, [
	// 			function(msg) {
	// 				return msg.availableAt;
	// 			}
	// 		])
	// 	);
	// }
	// // ----------------------------------------------------------------------
	// console.log("SORT messageAreReady", messageAreReady);
	// console.log("SORT messageAreWaiting", messageAreWaiting);
	// console.log("SORT messageAreArchived", messageAreArchived);
	// list = _.concat(messageAreReady, messageAreWaiting, messageAreArchived);

	// return list;
}
