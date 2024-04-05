import React, { useState } from 'react';
import { Button, Table, Form, Container, Row, Col, Nav } from 'react-bootstrap';

const initialUserData = [
    [1, "kctang09", "12345678", "64861876", "kctang09@gmail.com"],
    [2, "ytcheng05", "12345678", "94651564", "ytcheng05@hotmail.com"],
    [3, "mtyeung49", "12345678", "57445433", "mtyeung49@gmail.com"]
];

const initialProductData = [
    [1, "Table", 20, 5, "Made with the rare oak wood found in India, the finest table that you..."],
    [2, "Washing machine", 2000, 1, "Assist with AI production line, a washing machine for life."]
];

const Admin = () => {
    const [view, setView] = useState('users'); // 'users' or 'products'
    const [users, setUsers] = useState(initialUserData);
    const [products, setProducts] = useState(initialProductData);
    const [userForm, setUserForm] = useState({ id: 'New', username: '', password: '', phone: '', email: '' });
    const [productForm, setProductForm] = useState({ id: 'New', name: '', price: '', stock: '', description: '' });

    const handleUserChange = (e) => {
        setUserForm({ ...userForm, [e.target.name]: e.target.value });
    };

    const handleProductChange = (e) => {
        setProductForm({ ...productForm, [e.target.name]: e.target.value });
    };

    const resetUserForm = () => {
        setUserForm({ id: 'New', username: '', password: '', phone: '', email: '' });
    };

    const resetProductForm = () => {
        setProductForm({ id: 'New', name: '', price: '', stock: '', description: '' });
    };

    const submitUserForm = (e) => {
        e.preventDefault();
        // backend call
        console.log('Submitting User Form:', userForm);
        resetUserForm();
    };

    const submitProductForm = (e) => {
        e.preventDefault();
        // backend call
        console.log('Submitting Product Form:', productForm);
        resetProductForm();
    };


    const deleteUser = (userId) => {
        // backend call
        setUsers(users.filter(user => user[0] !== userId));
        resetUserForm();
    };

    const deleteProduct = (productId) => {
        // backend call
        setProducts(products.filter(product => product[0] !== productId));
        resetProductForm();
    };

    const selectUser = (userId) => {
        const user = users.find(user => user[0] === userId);
        setUserForm({ id: user[0], username: user[1], password: user[2], phone: user[3], email: user[4] });
    };

    const selectProduct = (productId) => {
        const product = products.find(product => product[0] === productId);
        setProductForm({ id: product[0], name: product[1], price: product[2], stock: product[3], description: product[4] });
    };

    return (
        <Container>
            <Nav variant="tabs" defaultActiveKey="users"  className="my-3">
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
                        <Form.Group controlId="formUserName">
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
                        <Form.Group controlId="formPhone">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                type="text"
                                name="phone"
                                placeholder="Phone number"
                                value={userForm.phone}
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
                        <Button variant="primary" onClick={submitUserForm}>
                            {userForm.id == "New" ? 'Add User' : 'Update User'}
                        </Button>
                        <Button variant="secondary" onClick={() => resetUserForm()}>
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
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user[0]}>
                                    <td>{user[0]}</td>
                                    <td>{user[1]}</td>
                                    <td>{user[2]}</td>
                                    <td>{user[3]}</td>
                                    <td>{user[4]}</td>
                                    <td>
                                        <Button variant="primary" onClick={() => selectUser(user[0])}>Edit</Button>{' '}
                                        <Button variant="danger" onClick={() => deleteUser(user[0])}>Delete</Button>
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
                                name="name"
                                placeholder="Enter product name"
                                value={productForm.name}
                                onChange={handleProductChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formProductPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                name="price"
                                placeholder="Price"
                                value={productForm.price}
                                onChange={handleProductChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formProductStock">
                            <Form.Label>Stock</Form.Label>
                            <Form.Control
                                type="number"
                                name="stock"
                                placeholder="Stock quantity"
                                value={productForm.stock}
                                onChange={handleProductChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formProductDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="description"
                                placeholder="Product description"
                                value={productForm.description}
                                onChange={handleProductChange}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" onClick={submitProductForm}>
                            {productForm.id == "New" ? 'Add Product' : 'Update Product'}
                        </Button>
                        <Button variant="secondary" onClick={() => resetProductForm()}>
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
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product[0]}>
                                    <td>{product[0]}</td>
                                    <td>{product[1]}</td>
                                    <td>{product[2]}</td>
                                    <td>{product[3]}</td>
                                    <td>{product[4]}</td>
                                    <td>
                                        <Button variant="primary" onClick={() => selectProduct(product[0])}>Edit</Button>{' '}
                                        <Button variant="danger" onClick={() => deleteProduct(product[0])}>Delete</Button>
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
