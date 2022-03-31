import { Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import CartCard from './CartCard'
import './Cart.css'
import { deleteFromCart, userAddToCart } from "../../actions/cartAction";

const Cart = () => {

    const dispatch = useDispatch();
    const { cartItems } = useSelector((state) => state.cart)

    const addCount = (id, inStock, count) => {
        const update = count + 1;
        if (inStock <= update) return;

        dispatch(userAddToCart(id, update))
    };

    const decreaseCount = (id, count) => {
        const update = count - 1;
        if (1 > update) return;

        dispatch(userAddToCart(id, update))
    };

    const removeItem=(id)=>{

        dispatch(deleteFromCart(id));
    }
    return (
        <Fragment>

            {cartItems.length > 0 ?

                cartItems.map((cart) => (
                    <div className='customcontainer-card' key={cart.product}>
                        <CartCard product={cart} />
                        <div className="customInput">
                            <button className="customButton-1-1" onClick={() => addCount(cart.product, cart.inStock, cart.count)}>+</button>
                            <input readOnly type="number" value={cart.count} />
                            <button className="customButton-1-2" onClick={() => decreaseCount(cart.product, cart.count)} >-</button>
                        </div>
                        <button className="primary" onClick={() => removeItem(cart.product)}>Remove Item</button>
                    </div>
                ))


                :


                <h1>no Items in cart </h1>


            }

            <p>{`₹${cartItems.reduce(
                (sum, item) => sum + item.count * item.price,
                0
            )}`}</p>

        </Fragment>
    )
}


export default Cart;