import { Fragment, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { deleteProductAdmin } from "../../actions/productAction"
import { REQUEST_DELETE_PRODUCT_ADMIN_RESET } from "../../constants/ProductConstants"
import { getAllProductAdmin } from "../../actions/productAction"
import { Button, Row, Table, Container } from "react-bootstrap"

const ProductPage = () => {
    const { loading, products } = useSelector((state) => state.products)
    const { loading: deleteload, status } = useSelector((state) => state.deleteProduct)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        if (status) {
            navigate('/admin/dashboard')
            dispatch({ type: REQUEST_DELETE_PRODUCT_ADMIN_RESET })
        }
        dispatch(getAllProductAdmin())
    }, [dispatch, navigate, status])

    const deleteProduct = (id) => {
        dispatch(deleteProductAdmin(id))
    }

    const updateProduct = (id) => {
        navigate(`/admin/product/${id}`);
    }

    const addProduct = () => {
        navigate("/admin/product/new");
    }
    return (
        <Fragment>

            <Container>
                <div className="customCart-1">
                    <p className="customTitleProfile-1-3">Product DashBoard</p>

                    {loading === false && products.length > 0 ?
                        (<Row >
                            <Table>
                                <thead>
                                    <tr>
                                        <th className="customTitleUserOrder-1" >Product Name </th>
                                        <th className="customTitleUserOrder-1">Price</th>
                                        <th className="customTitleUserOrder-1" >Update Product</th>
                                        <th className="customTitleUserOrder-1" >Delete Product</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products && products.map((product) => (
                                        <tr key={product._id}>
                                            <th className="customTitleOrderList-1">{product.name}</th>
                                            <th className="customTitleOrderList-1">${product.price}</th>

                                            <th>
                                                <Button className="primary" onClick={() => updateProduct(product._id)}>Update</Button>
                                            </th>
                                            <th>
                                                <Button className="primary" onClick={() => deleteProduct(product._id)}>Delete</Button>
                                            </th>
                                        </tr>
                                    ))
                                    }

                                </tbody>
                            </Table>

                        </Row>)

                        :
                        (
                            <div className="customNoProductMessage mt-5 mb-3">
                                <h1>no Products </h1>
                            </div>)

                    }
                    <th>
                        <Button className="primary" onClick={() => addProduct()}>Add Product</Button>
                    </th>





                </div>
            </Container>
        </Fragment >
    )
}

export default ProductPage