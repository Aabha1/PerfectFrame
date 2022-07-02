/* eslint-disable import/no-extraneous-dependencies */
import CartScreen from "./screens/cartscreen";
import Error404Screen from "./screens/Error404screen";
import HomeScreen from "./screens/homescreen";
import ProductScreen from "./screens/productscreen";
import { parseRequestUrl } from "./utils";
import Header from './components/header'
import SigninScreen from "./screens/signinscreen";

const main = document.querySelector("#main-container");

const routes = {
    '/': HomeScreen,
    '/product/:id': ProductScreen,
    '/cart/:id': CartScreen,
    '/cart': CartScreen,
    '/signin': SigninScreen,
};
const router = async () => {
    const header = document.querySelector('#header-container');
    header.innerHTML = Header.render();
    Header.after_render();

    const request = parseRequestUrl();
    const parseUrl = (request.resource ? `/${request.resource}` : '/') +
        (request.id ? '/:id' : '') +
        (request.verb ? `${request.verb}` : '');

    const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen;

    main.innerHTML = await screen.render();
    await screen.after_render();

};
window.addEventListener("load", router);
window.addEventListener("hashchange", router);