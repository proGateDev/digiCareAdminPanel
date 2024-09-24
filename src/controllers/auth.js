import { devURL } from "../../contsants/endPoints";
import axios from 'axios';
import Swal from 'sweetalert2';



export const handleLogin = (payload,event,router) => {
    event.preventDefault();
    console.log('====================================');
    console.log(payload.email);
    console.log('====================================');

    axios.post(`${devURL}/admin/login`, payload)
    .then((response) => {
        sessionStorage.setItem('userToken', response?.data?.token);
        console.log(response?.data)
        Swal.fire({
            title: "Login Successful!",
            text: response?.data?.message,
            icon: "success"
        });
        router.push('/dashboard');
    })
    .catch((err) => {
        console.log(err,'-------------- err');
        const errorMessage = err.response?.data?.message || 'Login failed. Please check your credentials.';
        Swal.fire({
            title: "Error",
            text: errorMessage,
            icon: "error"
        });
    })
};




