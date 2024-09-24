import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';

const useAuth = () => {
 
  const tokenVilidity = (router) => {
    const token = sessionStorage.getItem('token');
 
    if (!token) {
      router?.push('/login');
    } else {
      console.log('User is logged in');
      router?.push('/dashboard');       
    }
  }
  useEffect(() => {
    tokenVilidity();
  }, []);

  const logout = (router) => {

    sessionStorage.removeItem('token');
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Logout Successfully!",
      showConfirmButton: false,
      timer: 1500
    });
    router?.push('/login');
  };

const getJwtToken = () => {
    try {
        const token = sessionStorage.getItem('userToken');
        console.log('====================================');
        console.log(token);
        console.log('====================================');
        if (!token) {
            throw new Error('No token found');
        }
        return token;
    } catch (error) {
        console.error('Error retrieving JWT token:', error);
        
        return null;
    }
};

const tokenExpire = () =>{

}
  
  return { logout, tokenVilidity, getJwtToken };

};

export default useAuth;
