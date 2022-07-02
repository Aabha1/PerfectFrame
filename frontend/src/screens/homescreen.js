/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable space-before-function-paren */
/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import { apiurl } from '../config';
import { parseRequestUrl } from '../utils';

const { show } = parseRequestUrl();

// import { parseRequestUrl } from '../utils';

const HomeScreen = {
    after_render: async () => '',
    render: async () => {
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
        const { value } = parseRequestUrl();
        console.log(value);
        if (value) {

            const searching = product => {

                if (product.category === value) {
                    console.log("found search");
                    return product;
                }
                return null;
            }
            const newProducts = products.filter(searching);
            let innerdata;
            if (newProducts.length === 0) {
                innerdata = `<div class="notFound">
                                        Sorry! We can not regonise your age or gender.
                                        <a href='/#/'>Please continue shopping!!</a>
                                    </div>`
            } else
                innerdata = show(newProducts);
            return innerdata;
        }
        /*
        const { value } = parseRequestUrl();
        const products = await getProduct({ sreachKeyword: value });
        if (products.error) {
            return `<div class="error">${products.error}</div>`
        } */
        return show(products);
    },
};
export default HomeScreen;