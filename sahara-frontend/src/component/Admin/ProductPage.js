import { Fragment, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { deleteProductAdmin } from "../../actions/productAction"
import {REQUEST_DELETE_PRODUCT_ADMIN_RESET} from "../../constants/ProductConstants"
import {getAllProductAdmin} from "../../actions/productAction"

const ProductPage =()=>{
    const {loading,products} =useSelector((state)=>state.products)
    const {loading : deleteload,status} =useSelector((state)=>state.deleteProduct)
    const dispatch=useDispatch();
    const navigate=useNavigate();
    useEffect(()=>{
        if(status){
            navigate('/admin/dashboard')
            dispatch({type:REQUEST_DELETE_PRODUCT_ADMIN_RESET})
        }
        dispatch(getAllProductAdmin())
    },[dispatch,navigate,status])

    const deleteProduct=(id)=>{
        dispatch(deleteProductAdmin(id))
    }
    return (
        <Fragment>
            <h1>Add Product</h1>
            <Link to={"/admin/product/new"}>Add</Link>
            {loading === false &&(
                products &&  products.map((product)=>(
                    <div key={product._id}>
                        <h2>{product.name}</h2>
                        <h3>{product.price}</h3>

                        <Link to={`/admin/product/${product._id}`}>Update</Link>

                        <button onClick={()=>deleteProduct(product._id)}>Delete</button>
                    </div>
                ))
            )}
        </Fragment>
    )
}

export default ProductPage