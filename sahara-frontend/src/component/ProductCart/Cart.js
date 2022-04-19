import { Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import './Cart.css'
import { deleteFromCart, userAddToCart } from "../../actions/cartAction";
import { useNavigate } from "react-router-dom"
import { Button, Container, Row, Table } from 'react-bootstrap';

const Cart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { cartItems } = useSelector((state) => state.cart)

    const addCount = (id, inStock, quantity) => {
        const update = quantity + 1;
        if (inStock <= update) return;

        dispatch(userAddToCart(id, update))
    };

    const decreaseCount = (id, quantity) => {
        const update = quantity - 1;
        if (1 > update) return;

        dispatch(userAddToCart(id, update))
    };

    const removeItem = (id) => {

        dispatch(deleteFromCart(id));
    }

    const checkout = () => {
        navigate("/login?redirect=shipping")
        navigate(0)
    }
    return (
        <Fragment>

            <Container>
                <div className="customCart-1">


                    <p className="customTitleCart-1-1">My Cart</p>
                    {cartItems.length > 0 ?
                        <Row >
                            <Table>
                                <thead>
                                    <tr>
                                        <th className="customTitleUserOrder-1" >Name </th>
                                        <th className="customTitleUserOrder-1">Price</th>
                                        <th className="customTitleUserOrder-1" >Quantity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map((cart) => (
                                        <tr key={cart.product}>
                                            <th className="customTitleOrderList-1">{cart.name}</th>
                                            <th className="customTitleOrderList-1">{cart.price}</th>
                                            <th>
                                                <div className="customInput-1">
                                                    <button className="customButton-1-1" onClick={() => addCount(cart.product, cart.inStock, cart.quantity)}>+</button>
                                                    <input readOnly type="number" value={cart.quantity} />
                                                    <button className="customButton-1-2" onClick={() => decreaseCount(cart.product, cart.quantity)} >-</button>
                                                </div>
                                            </th>
                                            <th>
                                                <Button className="primary" onClick={() => removeItem(cart.product)}>Remove Item</Button>
                                            </th>
                                        </tr>
                                    ))}

                                </tbody>
                            </Table>
                            <p className="customTitleOrderList-1">
                                {`Total Price :-  $${cartItems.reduce(
                                    (sum, item) => sum + item.quantity * item.price,
                                    0
                                )}`}
                            </p>
                            <Button className="primary" onClick={checkout}>Checkout </Button>

                        </Row>
                        :

                        <div className="customNoProductMessage mt-5 mb-3">
                            <h1>no Items in cart </h1>
                        </div>

                    }

                </div>
            </Container>








        </Fragment>
    )
}


export default Cart;