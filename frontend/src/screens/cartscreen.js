/* eslint-disable no-use-before-define */
// creating cart screen frontend and adding actions to the buttons in there

import { getProduct } from "../api";
import { getCartItems, setCartItems } from "../localStorage";
import { parseRequestUrl, rerender } from "../utils";

// when we add something to cart or update the number of product we want
const addToCart = (item, forceUpdate = false) => {
    let cartItems = getCartItems();
    const existItem = cartItems.find(x => x.product === item.product);
    if (existItem) {
        if (forceUpdate) {
            cartItems = cartItems.map((x) => x.product === existItem.product ? item : x);
        }
    } else {
        cartItems = [...cartItems, item];
    }
    setCartItems(cartItems);
    if (forceUpdate) {
        rerender(CartScreen);
    }
};

// to remove something from cart on pressing delete button
const removeFromCart = (id) => {
    setCartItems(getCartItems().filter((x) => x.product !== id));
    if (id === parseRequestUrl().id) {
        document.location.hash = '/cart';
    } else {
        rerender(CartScreen);
    }
};

const CartScreen = {
        // implementing the actions on buttons 
        after_render: () => {
            const qtySelects = document.querySelectorAll('.qtySelect');
            Array.from(qtySelects).forEach((qtySelect) => {
                qtySelect.addEventListener('change', (e) => {
                    const item = getCartItems().find((x) => x.product === qtySelect.id);
                    addToCart({...item, qty: Number(e.target.value) }, true)
                });
            });
            const deleteButtons = document.querySelectorAll('.deleteButton');
            Array.from(deleteButtons).forEach((deleteButton) => {
                deleteButton.addEventListener('click', () => {
                    removeFromCart(deleteButton.id);
                });
            });
            document.querySelector('#checkoutButton').addEventListener('click', () => {
                document.location.hash = '/signin';
            });
        },
        // adding html to the screen for a product added to cart
        render: async() => {
                const request = parseRequestUrl();
                if (request.id) {
                    const product = await getProduct(request.id);
                    addToCart({
                        product: product._id,
                        name: product.name,
                        image: product.image,
                        price: product.price,
                        countInStock: product.countInStock,
                        qty: 1,
                    });
                }
                const cartItems = getCartItems();
                return `
                    <div class="content cart">
                        <div class="cartList">
                            <ul class="cartListContainer">
                               <li>
                                    <h3>Shopping Cart</h3>
                                    <div>Price</div>
                                </li>
                                ${cartItems.length===0?
                                '<div>Cart is empty. <a href="/#/">Go Shopping</a></div>':
                                  cartItems.map(item => `
                                    <li>
                                        <div class="cartImage">
                                           <img src="${item.image}" alt="${item.name}">
                                        </div>
                                        <div class="cartName">
                                           <div>
                                                <a href="/#/product/${item.product}">${item.name}</a>
                                            </div>
                                            <div>
                                                Qty: <select class="qtySelect" name="" id="${item.product}">
                                                     ${[...Array(item.countInStock).keys()].map((x)=>
                                                      item.qty === x+1 ?
                                                      `<option selected value="${x+1}">${x+1}</option>`:
                                                      `<option value="${x+1}">${x+1}</option>`
                                                       )}  
                                                     </select>
                                                <button class="deleteButton" type="button" id="${item.product}">Delete</button>
                                            </div>
                                        </div>
                                        <div class="cartPrice">
                                         Rs.${item.price}
                                        </div>
                                    </li>`).join('\n')
                                }
                            </ul>
                        </div>
                        <div class="cartAction">
                            <h3>Subtotal(${cartItems.reduce((a,c)=> a+c.qty,0)}items) : 
                                Rs.${cartItems.reduce((a,c)=>a+c.price*c.qty,0)}
                            </h3>
                            <button id="checkoutButton" class="primary fw">Proceed to Checkout</button>
                        </div>
                    </div>`;
    },
};
export default CartScreen;