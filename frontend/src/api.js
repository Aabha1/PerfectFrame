/* eslint-disable import/no-extraneous-dependencies */
// code to create response to product being called individually

import axios from 'axios';
import { apiurl } from "./config"

// getting product according to the id we recieve and solving it accordingly
export const getProduct = async(id) => {
    try {
        /* 
        I was trying to bluid search here but i failed so i commented it out for future reference
        let queryString = '?';
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