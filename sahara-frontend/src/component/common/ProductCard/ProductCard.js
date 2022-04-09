
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap';
import "./ProductCard.css"

const ProductCard = ({product}) => {

    return (
        <Link className="customLink" to={`/product/${product._id}`}>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={product.images[0].url} alt="image" className="customImage-1" />
                <Card.Body>
                    <Card.Title className="customCardTitle">{product.name}</Card.Title>
                    <Card.Text>
                        {product.inStock >0 ? "Currently In Stock" :" Out Of Stock"}
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