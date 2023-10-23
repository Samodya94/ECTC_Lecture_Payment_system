import axios from "axios";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
const token = Cookies.get('token')

let refresh = localStorage.getItem("refreshToken");

const headers = {
	Accept: "application/json",
	"Content-Type": "application/json",
	"Authorization": `Bearer ${token}`
	// "x-access-token": token,

};

async function requestNewToken() {
	try {
		const data = {
			refreshToken: refresh,
		};
		const res = await axios.post(
			"http://localhost:8000/api/users/renew-access-token",
			data
		);
		return res.data.accessToken;
	} catch (err) {
		console.log(err);
	}
}

const axiosInstance = axios.create({
	BASE_URL: "http://localhost:8000/api",
	headers,
});

axiosInstance.interceptors.request.use(
	async (request) => {
		let currentDate = new Date();
		const decoded = jwt_decode(token);
		if (decoded.exp * 1000 - 1000 < currentDate.getTime()) {
			const newToken = await requestNewToken();
			request.headers["x-access-token"] = newToken;
			localStorage.setItem("token", newToken);
			window.location.reload(true);
			console.log(decoded.exp * 1000 + "---" + currentDate.getTime());
		}
		return request;
	},
	(error) => {
		throw new Error("Something went wrong!");;
	}
);

axiosInstance.interceptors.response.use(
	(response) => {
		return response;
	},
	(err) => {
		if (err.response.status === 400) {
			throw new Error("Bad Request");
		} else if (err.response.status === 401) {
			throw new Error("Unauthorized");
		} else if (err.response.status === 403) {
			throw new Error("Forbidden ");
		} else if (err.response.status === 404) {
			throw new Error("Not Found");
		} else if (err.response.status === 408) {
			throw new Error("Request Timeout");
		} else if (err.response.status === 409) {
			throw new Error("Already exist");
		} else if (err.response.status === 500) {
			throw new Error(" Internal Server Error");
		} else {
			throw new Error(err.message);
		}
	},
);

class Service {
	async post(url, data) {
		let res = null;
		if (data.file) {
			res = await axiosInstance.post(url, data, {
				headers: {
					"Content-Type": "multipart/form-data", // Set the content type to multipart/form-data
				},
			});
		} else {
			res = await axiosInstance.post(url, data);
		}
		return res;
	}

	async get(url, id) {
		if (id) {
			url = `${url}/${id}`;
		}
		const res = await axiosInstance.get(url);
		return res;
	}

	async delete(url, id) {
		if (id) {
			url = `${url}/${id}`;
		}
		const res = await axiosInstance.delete(url);
		return res;
	}

	async put(url, id, data) {
		if (id) {
			url = `${url}/${id}`;
		}
		const res = await axiosInstance.put(url, data);
		return res;
	}
}

export default Service;
