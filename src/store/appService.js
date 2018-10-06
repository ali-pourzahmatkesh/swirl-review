import { CONFIG } from "../../config";

const post = (uri, data) => {
	return fetch(`${CONFIG.serverUrl}${uri}`, {
		method: "POST",
		body: JSON.stringify(data),
		headers: new Headers({
			"Content-Type": "application/json"
		})
	})
		.then(res => res.json())
		.catch(error => error)
		.then(response => {
			if (response.result) {
				return response;
			} else {
				throw response;
			}
		});
};

const get = uri => {
	return fetch(`${CONFIG.serverUrl}${uri}`, {
		method: "GET",
		headers: new Headers({
			"Content-Type": "application/json"
		})
	})
		.then(res => res.json())
		.catch(error => error)
		.then(response => {
			if (response.result) {
				return response;
			} else {
				throw response;
			}
		});
};

const getUri = uri => {
	return fetch(uri, {
		method: "GET",
		headers: new Headers({
			"Content-Type": "application/json"
		})
	})
		.then(res => res.json())
		.catch(error => error);
};

const getData = (uri, params) => {
	let esc = encodeURIComponent;
	let query = Object.keys(params)
		.map(k => esc(k) + "=" + esc(params[k]))
		.join("&");
	if (query.length > 0) {
		uri = `${uri}?${query}`;
	}

	// console.log("uri", uri)
	return get(uri);
};

const put = (uri, data) => {
	return fetch(`${CONFIG.serverUrl}${uri}`, {
		method: "PUT",
		body: JSON.stringify(data),
		headers: new Headers({
			"Content-Type": "application/json"
		})
	})
		.then(res => res.json())
		.catch(error => error)
		.then(response => {
			if (response.result) {
				return response;
			} else {
				throw response;
			}
		});
};

const restDelete = (uri, data) => {
	return fetch(`${CONFIG.serverUrl}${uri}`, {
		method: "DELETE",
		body: JSON.stringify(data),
		headers: new Headers({
			"Content-Type": "application/json"
		})
	})
		.then(res => res.json())
		.catch(error => error)
		.then(response => {
			if (response.result) {
				return response;
			} else {
				throw response;
			}
		});
};

export { post, get, getUri, put, getData, restDelete };
