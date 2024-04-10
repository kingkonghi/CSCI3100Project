import React, { useState, useEffect } from 'react';
import { Button, Table, Form, Container, Nav } from 'react-bootstrap';
import axios from 'axios';

const Admin = () => {
    const [view, setView] = useState('users');
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [userForm, setUserForm] = useState({ id: 'New', username: '', password: '', phoneNo: '', email: '', accountType: '', profilePhoto: '', address: '' });
    const [productForm, setProductForm] = useState({ id: 'New', itemName: '', itemPrice: '', itemQuantity: '', itemDescription: '', itemCategory: '', itemImage: '', itemStatus: '' });

    const token = 'Token b09782e294306013522c0610bbbe5e601e021b3b';

    useEffect(() => {
        fetchUsers();
        fetchProducts();
    }, []);

    const fetchUsers = async () => {
        const response = await axios.get('http://127.0.0.1:8000/Admin/user/display/', { headers: { Authorization: token } });
        console.log(response.data);
        setUsers(response.data);
    };

    const fetchProducts = async () => {
        const response = await axios.get('http://127.0.0.1:8000/Admin/item/display/', { headers: { Authorization: token } });
        setProducts(response.data);
    };

    const handleUserChange = (e) => {
        setUserForm({ ...userForm, [e.target.name]: e.target.value });
    };

    const handleProductChange = (e) => {
        setProductForm({ ...productForm, [e.target.name]: e.target.value });
    };

    // Reset forms
    const resetUserForm = () => setUserForm({ id: 'New', username: '', password: '', phoneNo: '', email: '', accountType: '', profilePhoto: '', address: '' });
    const resetProductForm = () => setProductForm({ id: 'New', itemName: '', itemPrice: '', itemQuantity: '', itemDescription: '', itemCategory: '', itemImage: '', itemStatus: '' });

    // Submit forms
    const submitUserForm = async (e) => {
        e.preventDefault();
        const url = userForm.id === 'New' ? 'http://127.0.0.1:8000/Admin/user/add/' : `http://127.0.0.1:8000/Admin/user/edit/${userForm.id}/`;
        await axios.post(url, userForm, { headers: { Authorization: token } });
        fetchUsers();
        resetUserForm();
    };

    const submitProductForm = async (e) => {
        e.preventDefault();
        const url = productForm.id === 'New' ? 'http://127.0.0.1:8000/Admin/item/add/' : `http://127.0.0.1:8000/Admin/item/edit/${productForm.id}/`;
        const data = {
            "name": productForm.itemName,
            "description": productForm.itemDescription,
            "category": productForm.itemCategory,
            "image": productForm.itemImage,
            "price": productForm.itemPrice,
            "quantity": productForm.itemQuantity,
            "status": productForm.itemStatus
        }
        console.log(data);
        await axios.post(url, data, { headers: { Authorization: token } });
        fetchProducts();
        resetProductForm();
    };

    // Delete functions
    const deleteUser = async (userId) => {
        console.log(userId);
        await axios.delete(`http://127.0.0.1:8000/Admin/user/delete/${userId}/`, { headers: { Authorization: token } });
        fetchUsers();
        resetUserForm();
    };

    const deleteProduct = async (productId) => {
        console.log(productId);
        await axios.delete(`http://127.0.0.1:8000/Admin/item/delete/${productId}/`, { headers: { Authorization: token } });
        fetchProducts();
        resetProductForm();
    };

    // Selection functions
    const selectUser = (userId) => {
        const user = users.find(user => user.user_id === userId);
        setUserForm({ ...user, id: user.user_id });
    };

    const selectProduct = (productId) => {
        const product = products.find(product => product.itemID === productId);
        setProductForm({ ...product, id: product.itemID });
    };
    

 
    return (
        <Container>
            <Nav variant="tabs" defaultActiveKey="users" className="my-3">
                <Nav.Item>
                    <Nav.Link eventKey="users" onClick={() => setView('users')}>Users</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="products" onClick={() => setView('products')}>Products</Nav.Link>
                </Nav.Item>
            </Nav>
    
            {view === 'users' ? (
                <>
                    User ID: {userForm.id}
                    <Form className="my-3">
                        <Form.Group controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                name="username"
                                placeholder="Enter username"
                                value={userForm.username}
                                onChange={handleUserChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={userForm.password}
                                onChange={handleUserChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formPhoneNo">
                            <Form.Label>Phone No.</Form.Label>
                            <Form.Control
                                type="text"
                                name="phoneNo"
                                placeholder="Phone No."
                                value={userForm.phoneNo}
                                onChange={handleUserChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                placeholder="Enter email"
                                value={userForm.email}
                                onChange={handleUserChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formAccountType">
                            <Form.Label>Account Type</Form.Label>
                            <Form.Control
                                type="number"
                                name="accountType"
                                placeholder="Account Type"
                                value={userForm.accountType}
                                onChange={handleUserChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formProfilePhoto">
                            <Form.Label>Profile Photo</Form.Label>
                            <Form.Control
                                type="text"
                                name="profilePhoto"
                                placeholder="Profile Photo URL"
                                value={userForm.profilePhoto}
                                onChange={handleUserChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formAddress">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                name="address"
                                placeholder="Address"
                                value={userForm.address}
                                onChange={handleUserChange}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" onClick={submitUserForm}>
                            {userForm.id === "New" ? 'Add User' : 'Update User'}
                        </Button>
                        {' '}
                        <Button variant="secondary" onClick={resetUserForm}>
                            Reset
                        </Button>
                    </Form>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Username</th>
                                <th>Password</th>
                                <th>Phone</th>
                                <th>Email</th>
                                <th>Account Type</th>
                                <th>Profile Photo</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.user_id}>
                                    <td>{user.user_id}</td>
                                    <td>{user.username}</td>
                                    <td>{user.password}</td>
                                    <td>{user.phoneNo}</td>
                                    <td>{user.email}</td>
                                    <td>{user.accountType}</td>
                                    <td>{user.profilePhoto}</td>
                                    <td>{user.address}</td>
                                    <td>
                                        <Button variant="primary" onClick={() => selectUser(user.user_id)}>Edit</Button>{' '}
                                        <Button variant="danger" onClick={() => deleteUser(user.user_id)}>Delete</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </>
            ) : (
                <>
                    Product ID: {productForm.id}
                    <Form className="my-3">
                        <Form.Group controlId="formProductName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="itemName"
                                placeholder="Enter product name"
                                value={productForm.itemName}
                                onChange={handleProductChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formProductPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                name="itemPrice"
                                placeholder="Price"
                                value={productForm.itemPrice}
                                onChange={handleProductChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formProductStock">
                            <Form.Label>Stock</Form.Label>
                            <Form.Control
                                type="number"
                                name="itemQuantity"
                                placeholder="Stock quantity"
                                value={productForm.itemQuantity}
                                onChange={handleProductChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formProductDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="itemDescription"
                                placeholder="Product description"
                                value={productForm.itemDescription}
                                onChange={handleProductChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formProductCategory">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                type="text"
                                name="itemCategory"
                                placeholder="Category"
                                value={productForm.itemCategory}
                                onChange={handleProductChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formProductImage">
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type="text"
                                name="itemImage"
                                placeholder="Image URL"
                                value={productForm.itemImage}
                                onChange={handleProductChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formProductStatus">
                            <Form.Label>Status</Form.Label>
                            <Form.Control
                                type="number"
                                name="itemStatus"
                                placeholder="Status"
                                value={productForm.itemStatus}
                                onChange={handleProductChange}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" onClick={submitProductForm}>
                            {productForm.id === "New" ? 'Add Product' : 'Update Product'}
                        </Button>
                        {' '}
                        <Button variant="secondary" onClick={resetProductForm}>
                            Reset
                        </Button>
                    </Form>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Stock</th>
                                <th>Description</th>
                                <th>Category</th>
                                <th>Image</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product.itemID}>
                                    <td>{product.itemID}</td>
                                    <td>{product.itemName}</td>
                                    <td>{product.itemPrice}</td>
                                    <td>{product.itemQuantity}</td>
                                    <td>{product.itemDescription}</td>
                                    <td>{product.itemCategory}</td>
                                    <td>{product.itemImage}</td>
                                    <td>{product.itemStatus}</td>
                                    <td>
                                        <Button variant="primary" onClick={() => selectProduct(product.itemID)}>Edit</Button>{' '}
                                        <Button variant="danger" onClick={() => deleteProduct(product.itemID)}>Delete</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </>
            )}
        </Container>
    );
    
    
};

export default Admin;
