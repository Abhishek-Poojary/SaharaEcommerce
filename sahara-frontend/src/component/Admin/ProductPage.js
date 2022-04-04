import { Fragment } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
const ProductPage =()=>{
    const {loading,products} =useSelector((state)=>state.products)
    
    if(loading===false)
    console.log(products)
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
                    </div>
                ))
            )}
        </Fragment>
    )
}

export default ProductPage