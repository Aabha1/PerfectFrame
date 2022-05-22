/* eslint-disable import/no-extraneous-dependencies */
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

const routes = {
    '/': HomeScreen,
    '/product/:id': ProductScreen,
    '/cart/:id': CartScreen,
    '/cart': CartScreen,
    '/signin': SigninScreen,
};
const router = async() => {
    const header = document.querySelector('#header-container');
    header.innerHTML = Header.render();
    Header.after_render();

    const request = parseRequestUrl();
    const parseUrl = (request.resource ? `/${request.resource}` : '/') +
        (request.id ? '/:id' : '') +
        (request.verb ? `${request.verb}` : '');

    const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen;

    console.log("rendering");
    main.innerHTML = await screen.render();
    await screen.after_render();

    const response = await axios({
        url: `${apiurl}/api/products`,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const products = response.data;
    const { show } = parseRequestUrl();
    document.querySelector("#searchForm").addEventListener('submit', (e) => {
        e.preventDefault();
        console.log("inside submit");
        const searching = product => {
            const { value } = parseRequestUrl();
            if (product.category === value) {
                console.log("found search");
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