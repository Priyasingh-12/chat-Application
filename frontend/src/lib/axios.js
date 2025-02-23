// import axios from "axios" ;

// export const axiosInstance = axios.create({
//     baseURL: 'http://localhost:5173/api/',
//     timeout: 1000,
//     withCredentials: true,
//   });

//   export const getAll = () => {
//     return api.get(" ") ;
//   }

  import axios from "axios";

  export const axiosInstance = axios.create({
    baseURL: "http://localhost:3001/api/", 
    timeout: 1000,
    // // Update this to match your backend API
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true, // Important for handling cookies
  });
  export const getAll = () => {
    return api.get(" ") ;
  }
