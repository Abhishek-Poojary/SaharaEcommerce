import { Fragment, useState ,useEffect} from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { Form, Button, Image } from 'react-bootstrap'
import { createProductAdmin } from "../../actions/productAction"
import {REQUEST_CREATE_PRODUCT_ADMIN_RESET}  from "../../constants/ProductConstants"
const ProductCreate = () => {
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
    const navigate =useNavigate();
    const { loading, status, error, product } = useSelector((state) => state.createProduct)


    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [inStock, setInStock] = useState(0);
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);


    useEffect(() => {

        if (status) {
            navigate("/admin/dashboard");
            dispatch({ type: REQUEST_CREATE_PRODUCT_ADMIN_RESET });
        }
    }, [dispatch, navigate, status]);



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

        dispatch(createProductAdmin(myForm))
    }


    const setProductImages = (e) => {
        const files = Array.from(e.target.files);

        setImages([]);
        setImagesPreview([]);

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((old) => [...old, reader.result]);
                    setImages((old) => [...old, reader.result]);
                }
            };

            reader.readAsDataURL(file);
        });
    };


    return (
        <Fragment>
            <div className="customContainer-2">
                <h3>Create Product</h3>
                <Form className="customForm" onSubmit={submitData} >

                    <Form.Group className="mb-3" >
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Product Name" onChange={(e) => setName(e.target.value)} required />

                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>price</Form.Label>
                        <Form.Control type="number" placeholder="price" onChange={(e) => setPrice(e.target.value)} required />
                    </Form.Group>


                    <Form.Group className="mb-3" >
                        <Form.Label>description</Form.Label>
                        <Form.Control type="text" placeholder="Enter description" onChange={(e) => setDescription(e.target.value)} required />

                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>category</Form.Label>
                        <Form.Select aria-label="Default select example" onChange={(e) => setCategory(e.target.value)}>

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
                        <Form.Control type="text" placeholder="Enter inStock" onChange={(e) => setInStock(e.target.value)} required />

                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Images</Form.Label>
                        <Form.Control type="file" placeholder="category" onChange={setProductImages} multiple required />
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Images preview</Form.Label>
                        {imagesPreview.map((image, index) => (
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

export default ProductCreate