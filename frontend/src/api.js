import axios from 'axios';
import { apiurl } from "./config"

export const getProduct = async(id) => {
    try {
        /* let queryString = '?';
        if (searchKeyword)
            queryString += `searchKeyword=${searchKeyword}&`;
         */
        const response = await axios({
            url: `${apiurl}/api/products/${id}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.statusText !== 'OK') {
            throw new Error(response.data.message);
        }
        return response.data;
    } catch (err) {
        console.log(err);
        return { error: err.response.data.message || err.message };
    }
}