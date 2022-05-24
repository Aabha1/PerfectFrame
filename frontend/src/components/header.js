// to load the contents header on the frontend
// also contains the search form

import { parseRequestUrl } from "../utils";

const Header = {
    render: () => {
        const { value } = parseRequestUrl();
        return `
        <div class="brand">
          <a href="https://perfect-frame-face.herokuapp.com/">PERFECT FRAME</a>
        </div>
        <div class="search">
            <form class="searchForm" id="searchForm">
                <input type="text" placeholder="search" name="q" id="q" value="${value || ''}">
                <button class="primary">My type</button>
            </form>
        </div>
        <div>
            <a class="links" href="/#/signin">Sign-In</a>
            <a class="links" href="/#/cart">Cart</a>
        </div>
        `;
    },
    after_render: () => {
        document.querySelector('#searchForm').addEventListener('submit', async(e) => {
            e.preventDefault();
            const searchKeyword = document.querySelector('#q').value;
            document.location.hash = `/?q=${searchKeyword}`;
        });
    },
}
export default Header;