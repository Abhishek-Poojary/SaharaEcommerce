
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap';
import "./ProductCard.css"

const ProductCard = ({product}) => {

    return (
        <Link className="customLink" to={`/product/${product._id}`}>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="https://res.cloudinary.com/dbunwmh8z/image/upload/v1648531024/samples/ecommerce/accessories-bag.jpg" />
                <Card.Body>
                    <Card.Title className="customLink">{product.name}</Card.Title>
                    <Card.Text>
                        {product.description}
                    </Card.Text>
                    <Card.Text>
                        ${product.price}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Link>
    )
}


export default ProductCard;