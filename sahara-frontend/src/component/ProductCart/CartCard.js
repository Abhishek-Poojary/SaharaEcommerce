import { Card } from 'react-bootstrap';

const CartCard = ({ product }) => {
    return (

        <Card >
           
            <Card.Body>
                <Card.Title className="customLink">{product.name}</Card.Title>
                <Card.Text>
                    ${product.price}
                </Card.Text>

            </Card.Body>
        </Card>

    )
}

export default CartCard