import { apiEndpoints } from "../../contsants/endPoints";
import axios from 'axios';

export const getAdminProfile = async (bearerToken) => {
    // event.preventDefault();
    console.log('============ bearerToken --->',bearerToken);
    const profileData = await axios.get(apiEndpoints.getProfile, {
        'Authorization': `Bearer  ${bearerToken}`
    })
    console.log('========== profileData ==========================');
    console.log(profileData);
    console.log('====================================');
    return profileData
};


