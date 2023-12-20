import axios from "axios";

const lecturer = JSON.parse(localStorage.getItem('lecturer'))
let token = "";

if(lecturer){
    token = lecturer.token;
}


const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
};

const axiosInstance = axios.create({
    baseURL: "http://4.247.171.89:4000/api/LecturerRoute",
    headers,
});

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (err) => {
        const errorResponse = err.response;

        if (errorResponse && errorResponse.data && errorResponse.data.message) {
            // If the server returns an error message, include it in the Error object
            throw new Error(errorResponse.data.message);
        } else {
            // If no specific error message from the server, throw the default error
            throw new Error(err);
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
