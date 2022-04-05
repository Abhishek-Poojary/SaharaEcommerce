import { Fragment, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getProductDetails } from "../../actions/productAction";
import { updateProductAdmin } from "../../actions/productAction";
import {REQUEST_UPDATE_PRODUCT_ADMIN_RESET}  from "../../constants/ProductConstants"
import { Form, Button, Image } from 'react-bootstrap'

const ProductUpdate = () => {
    const categories = [
        "Laptop",
        "Footwear",
        "Bottom",
        "Tops",
        "Attire",
        "Camera",
        "SmartPhones",
    ];

    const dispatch = useDispatch();
    const { error: productError, product } = useSelector((state) => state.product)

    const { status, updated, error, loading } = useSelector((state) => state.updateProduct)
    const { id } = useParams();
    const navigate=useNavigate();
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [inStock, setInStock] = useState(0);
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    const [prevImages, setPrevImages] = useState([]);

    useEffect(() => {
        if (product && product._id !== id) {
            dispatch(getProductDetails(id));
        } else {
            setName(product.name);
            setDescription(product.description);
            setPrice(product.price);
            setCategory(product.category);
            setInStock(product.inStock);
            setPrevImages(product.images);
        }

        if(status){
            navigate('/admin/dashboard')
            dispatch({type:REQUEST_UPDATE_PRODUCT_ADMIN_RESET})
        }

    }, [dispatch, product]);

    const submitData = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("price", price);
        myForm.set("description", description);
        myForm.set("category", category);
        myForm.set("inStock", inStock);

        images.forEach((image) => {
            myForm.append("images", image);
        });

        dispatch(updateProductAdmin(id,myForm))
    }

    const setProductImages = (e) => {
        const files = Array.from(e.target.files);

        setImages([]);
        setImagesPreview([]);
        setPrevImages([]);

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImages((old) => [...old, reader.result]);
                    setImagesPreview((old) => [...old, reader.result]);

                }
            }
            reader.readAsDataURL(file);
        });


    }



    return (
        <Fragment>
            <div className="customContainer-2">
                <h3>Update Product</h3>
                <Form className="customForm" onSubmit={submitData} >

                    <Form.Group className="mb-3" >
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Product Name" value={name} onChange={(e) => setName(e.target.value)} required />

                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>price</Form.Label>
                        <Form.Control type="number" placeholder="price" value={price}  onChange={(e) => setPrice(e.target.value)} required />
                    </Form.Group>


                    <Form.Group className="mb-3" >
                        <Form.Label>description</Form.Label>
                        <Form.Control type="text" placeholder="Enter description"  value={description}  onChange={(e) => setDescription(e.target.value)} required />

                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>category</Form.Label>
                        <Form.Select aria-label="Default select example" value={category}  onChange={(e) => setCategory(e.target.value)}>

                            {categories &&
                                categories.map((item) => (
                                    <option key={item} value={item}>
                                        {item}
                                    </option>
                                ))}
                        </Form.Select>
                    </Form.Group>


                    <Form.Group className="mb-3" >
                        <Form.Label>inStock</Form.Label>
                        <Form.Control type="text" placeholder="Enter inStock" value={inStock}  onChange={(e) => setInStock(e.target.value)} required />

                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Images</Form.Label>
                        <Form.Control type="file" placeholder="category" onChange={setProductImages} multiple required />
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>current Image preview </Form.Label>
                        {prevImages && prevImages.map((image, index) => (
                            <Image key={index} src={image.url} alt="Product Preview" width={"30%"} />
                        ))}
                    </Form.Group>


                    <Form.Group className="mb-3" >
                        <Form.Label>added Images preview</Form.Label>
                        {imagesPreview &&  imagesPreview.map((image, index) => (
                            <Image key={index} src={image} alt="Product Preview" width={"30%"} />
                        ))}
                    </Form.Group>

                    <Button variant="primary" type="submit" >
                        Submit
                    </Button>
                </Form>
            </div>
        </Fragment>
    )
}


export default ProductUpdate