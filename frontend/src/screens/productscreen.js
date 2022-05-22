import { parseRequestUrl } from '../utils';
import Rating from '../components/ratings';
import { getProduct } from '../api'

const ProductScreen = {
        after_render: () => {
            const request = parseRequestUrl();
            document.querySelector("#addButton").addEventListener('click', () => {
                document.location.hash = `/cart/${request.id}`;
            })
        },
        render: async() => {
                const request = parseRequestUrl();
                const product = await getProduct(request.id);
                if (product.error) {
                    return (`<div>${product.error}</div>`)
                }
                return `
        <div class='content'>
          <div class='details'>
            <div class='detailsImage'>
               <img src='${product.image}' alt='${product.name}'>
            </div>
            <div class='detailsInfo'>
              <ul>
                <li>
                  <h1>${product.name}</h1>
                </li>
                <li class='productRating'>
                  ${ Rating.render({
                      value: product.rating,
                      text: `${product.numReviews} reviews`,
                  })}
                </li>
                <li>
                  Price: <strong>Rs.${product.price}</strong>
                </li>
                <li>
                  Description:
                  <div>
                    ${product.description}
                  </div>
                </li>
              </ul>
            </div>
            <div class='detailsAction'>
              <ul>
                <li>
                   Price: Rs.${product.price}
                </li>
                <li>
                  Status:
                    ${
                        product.countInStock > 0
                        ? `<span class='success'> In Stock</span>`
                        : `<span class='error'> Unavailable</span>`
                    }
                </li>
                <li>
                  <button id='addButton' class='fw primary'>Add to Cart</button>
                </li>
              </ul>
            </div>
          </div>
        </div>`;
    },
};
export default ProductScreen;