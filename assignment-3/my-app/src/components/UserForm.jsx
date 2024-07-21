import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

const UserForm = ({ onSubmit, currentUser }) => {
  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
  
    const data = { name, email };
  
    try {
      if (currentUser?._id) {
        // Update user
        await axios.put(`http://localhost:3000/api/users/${currentUser._id}`, data);
      } else {
        // Create user
        await axios.post('http://localhost:3000/api/users', data);
      }
      onSubmit(); 
    } catch (err) {
      setError(err.message);
    }
  };
  
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Name:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        {currentUser?._id ? 'Update' : 'Create'}
      </Button>
      {error && <p className="text-danger">Error: {error}</p>}
    </Form>
  );
  };
  
  export default UserForm;