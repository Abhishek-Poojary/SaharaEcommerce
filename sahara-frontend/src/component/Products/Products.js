import { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../common/ProductCard/ProductCard";
import { getAllProducts } from "../../actions/productAction";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import { Slider } from "@material-ui/core"
import './Products.css'



const Products = () => {

    const { keyword } = useParams();
    const dispatch = useDispatch();
    const [price, setPrice] = useState([0, 70000]);
    const [currentPage, setCurrentPage] = useState(1);

    const { products, error, productsCount, limitNumberOfPages } = useSelector(state => state.products);

    useEffect(() => {
        dispatch(getAllProducts(keyword, currentPage, price));
    }, [dispatch, keyword, currentPage, price])

    const changePrice = (event, p) => {
        setPrice(p);
    }
    const setCurrentpageNo = (e) => {
        setCurrentPage(e);
    }
    return (
        <Fragment>
            <div className="customContainer" id="customContainer">

                {products && products.map((product) => (
                    <ProductCard product={product} key={product._id} />
                ))}

            </div>
            <div className="customMenu">
                <h5>Price</h5>
                <Slider
                    value={price}
                    onChange={changePrice}
                    valueLabelDisplay="auto"
                    color="secondary"
                    min={0}
                    max={70000}
                />


            </div>

            {limitNumberOfPages < productsCount && (<div className="customPagination"> <Pagination
                activePage={currentPage}
                itemsCountPerPage={limitNumberOfPages}
                totalItemsCount={productsCount}
                onChange={setCurrentpageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive" //implement 
            />
            </div>
            )}

        </Fragment>
    )
}

export default Products;