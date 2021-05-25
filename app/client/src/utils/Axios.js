import Axios from 'axios';

let base = 'http://localhost:8000';

Axios.interceptors.request.use(
    config => {
        config.headers.Authorization = `Bearer ${localStorage.access}`
      return config;
    },
    error => {
      return Promise.reject(error);
    }
);

Axios.interceptors.response.use(
    (response) => {
      return response;
    },
    function (error) {
        const originalRequest = error.config;
        let refreshToken = localStorage.refresh
    
        if (refreshToken && error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                return Axios
                    .post(`${base}/api/token/refresh/`, { refresh : refreshToken})
                    .then((res) => {
                        if (res.status === 200) {
                        
                            localStorage.setItem("access", res.data.access)
                            localStorage.setItem("refresh", res.data.refresh)

                            return Axios(originalRequest);
                        }
                    });
        }
      return Promise.reject(error);
    }
);

export default Axios;