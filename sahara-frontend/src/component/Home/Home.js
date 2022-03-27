import { Fragment, useEffect } from "react";
import './Home.css'
import ProductCard from '../common/ProductCard/ProductCard'
import { getAllProducts } from "../../actions/productAction";
import {useSelector,useDispatch} from 'react-redux'

const Home = () => {
    const dispatch=useDispatch();
    const {error,products,productsCount}=useSelector((state)=>state.products)
    useEffect(()=>{
        dispatch(getAllProducts());
    },[])
  


    return (
        <Fragment>
            <div className="customGradient">
                <h1>need to implement , static for now</h1>
            </div>

            <h2 className="customTitle">Deals of the Day</h2>

            <div className="customContainer" id="customContainer">

                {products && products.map((product)=>(
                     <ProductCard product={product}  key={product._id}/>
                ))}
               
            </div>



        </Fragment>
    );
}


export default Home;