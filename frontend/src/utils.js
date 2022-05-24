// making the request link split up and extracting useful information from it

import rating from "./components/ratings";

export const parseRequestUrl = () => {
        const address = document.location.hash.slice(1).split('?')[0];
        const queryString =
            document.location.hash.slice(1).split('?').length === 2 ?
            document.location.hash.slice(1).split('?')[1] :
            '';

        const url = address.toLowerCase() || '/';
        const r = url.split('/');
        const q = queryString.split('=');
        return {
            resource: r[1],
            id: r[2],
            verb: r[3],
            name: q[0],
            value: q[1],
            // displaying the list of products which is passed as parameter
            show: products => `
        <ul class="products">
        ${products.map(
            (product) => `
            <li>
                <div class="product">
                    <a href="/#/product/${product._id}">
                        <img src="${product.image}" alt="${product.name}">
                    </a>
                    <div class="productName">
                        <a href="/#/product/${product._id}">
                            ${product.name}
                        </a>
                    </div>
                    <div class="productRating">
                        ${rating.render({
                            value: product.rating, 
                            text: `${product.numReviews} reviews`}
                            )}
                    </div>
                    <div class="productBrand">
                        ${product.brand}
                    </div>
                    <div class="productPrice">
                        Rs. ${product.price}
                    </div>
                </div>
            </li>
            `,
        ).join('\n')}
        `,
    };
};
export const rerender = async(component) => {
    document.querySelector('#main-container').innerHTML = await component.render();
    await component.after_render();
};