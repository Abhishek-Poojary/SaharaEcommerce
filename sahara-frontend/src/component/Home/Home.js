import { Fragment } from "react";
import './Home.css'
import ProductCard from '../common/ProductCard/ProductCard'



const Home = () => {
    const Product = [{
        name: "Moto g5 s plus",
        price: 31000,
        _id: "hello",
        images: [],
        description: "good is the best in the market"
    }, {
        name: "Moto g5 s plus",
        price: 31000,
        _id: "hello",
        images: [],
        description: "good is the best in the market"
    }, {
        name: "Moto g5 s plus",
        price: 31000,
        _id: "hello",
        images: [],
        description: "good is the best in the market"
    }
    ]


    return (
        <Fragment>
            <div className="customGradient">
                <h1>need to implement , static for now</h1>
            </div>

            <h2 className="customTitle">Deals of the Day</h2>

            <div className="customContainer" id="customContainer">

                {Product && Product.map((product)=>(
                     <ProductCard product={product}  key={product._id}/>
                ))}
               
            </div>



        </Fragment>
    );
}


export default Home;