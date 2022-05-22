/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable space-before-function-paren */
/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import { apiurl } from '../config';
import { parseRequestUrl } from '../utils';
// import { parseRequestUrl } from '../utils';


const HomeScreen = {
    after_render: async() => '',
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