import axios from 'axios';
import { BASE_URL } from '../../../constants';


export const fetchUser = async (access_token, user_id) => {
    const config = {
        headers: {
            'Authorization': `JWT ${access_token}`,
            'Content-Type': 'application/json'
        }
    };

    // make request to get user
    const request = await axios.get(`${BASE_URL}/api/auth/user/${user_id}/`, config);
    return request.data;
}