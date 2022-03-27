import { Fragment, useEffect } from "react";
import { useSelector ,useDispatch } from "react-redux";
import ProductCard from "../common/ProductCard/ProductCard";
import { getAllProducts } from "../../actions/productAction";

const Products = () => {
    const dispatch=useDispatch();
    const {products,error,productsCount}=useSelector(state=>state.products);
    useEffect(()=>{
        dispatch(getAllProducts());
    },[dispatch])

    return (
        <Fragment>
            <div className="customContainer" id="customContainer">

                {products && products.map((product) => (
                    <ProductCard product={product} key={product._id} />
                ))}

            </div>
        </Fragment>
    )
}

export default Products;