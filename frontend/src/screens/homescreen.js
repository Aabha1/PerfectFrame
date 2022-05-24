/* eslint-disable import/no-extraneous-dependencies */
// home screen html and loading data from backend

import axios from 'axios';
import { apiurl } from '../config';
import { parseRequestUrl } from '../utils';

const HomeScreen = {
    // created for some future work
    after_render: async() => '',
    // rendering data from data.js from backend
    render: async() => {
        const response = await axios({
            url: `${apiurl}/api/products`,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response || response.statusText !== 'OK') {
            return `<div>Error in getting data</div>`;
        }
        const products = response.data;
        /*
        const { value } = parseRequestUrl();
        const products = await getProduct({ sreachKeyword: value });
        if (products.error) {
            return `<div class="error">${products.error}</div>`
        } */
        const { show } = parseRequestUrl();
        return show(products);
    },
};
export default HomeScreen;