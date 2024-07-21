import React from 'react';
import { Card } from 'react-bootstrap';

const User = ({ user, onUserSelect }) => (
  <Card bg="light" border="primary" style={{ width: '18rem' }} onClick={()=> {console.log("user pressed: ", user); onUserSelect(user)}} >
    <Card.Body>
      <Card.Title> Name : {user.name}</Card.Title>
      <Card.Text> Email : {user.email}</Card.Text>
    </Card.Body>
  </Card>
);

export default User;