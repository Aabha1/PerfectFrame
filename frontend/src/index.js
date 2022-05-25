/* eslint-disable import/no-extraneous-dependencies */
// most crucial file, all rendering after loading a window or on a hashchange takes place here
// all other js files are called here

import axios from "axios";
import CartScreen from "./screens/cartscreen";
import Error404Screen from "./screens/Error404screen";
import HomeScreen from "./screens/homescreen";
import ProductScreen from "./screens/productscreen";
import { parseRequestUrl } from "./utils";
import Header from './components/header'
import SigninScreen from "./screens/signinscreen";
import { apiurl } from "./config";

const main = document.querySelector("#main-container");

// getting the resquest which is made and rendering same screen which is asked
const routes = {
    '/': HomeScreen,
    '/product/:id': ProductScreen,
    '/cart/:id': CartScreen,
    '/cart': CartScreen,
    '/signin': SigninScreen,
};
const router = async() => {
    // rendering header
    const header = document.querySelector('#header-container');
    header.innerHTML = Header.render();
    Header.after_render();

    // rendering the main body of website
    const request = parseRequestUrl();
    const parseUrl = (request.resource ? `/${request.resource}` : '/') +
        (request.id ? '/:id' : '') +
        (request.verb ? `${request.verb}` : '');

    const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen;

    // displaying the main body of website
    main.innerHTML = await screen.render();
    await screen.after_render();

    // implimenting search bar and searching according to age and gender
    const response = await axios({
        url: `${apiurl}/api/products`,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    // for searching bar we load products and sort them
    const products = response.data;
    const { show } = parseRequestUrl();
    document.querySelector("#searchForm").addEventListener('submit', (e) => {
        e.preventDefault();
        console.log("inside submit");
        const searching = product => {
            const { value } = parseRequestUrl();
            if (product.category === value) {
                return product;
            }
            if (product.description.indexOf(value) !== -1) {
                return product;
            }
            return null;
        }
        const newProducts = products.filter(searching);

        if (newProducts.length === 0) {
            main.innerHTML = `<div class="notFound">
                                Sorry! We can not regonise your age or gender.
                                <a href='/#/'>Please continue shopping!!</a>
                            </div>`
        } else
            main.innerHTML = show(newProducts);
    });

};
window.addEventListener("load", router);
window.addEventListener("hashchange", router);