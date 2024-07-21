import React, { useState, useEffect } from 'react';
import User from './User';
import axios from 'axios';
import { Spinner, Row, Col } from 'react-bootstrap';

const UsersList = ({onUserSelect}) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get('http://localhost:3000/api/users');
        setUsers(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {isLoading && (
        <Row className="justify-content-md-center">
          <Col xs lg="2">
            <Spinner animation="border" variant="primary" />
          </Col>
        </Row>
      )}
      {error && <p className="text-danger">Error: {error}</p>}
      {!isLoading && users.length > 0 && (
        <Row xs={1} md={3} className="g-4">
          {users.map((user) => (
            <Col key={user._id} style={{width:"fit-content"}}>
              <User user={user} onUserSelect = {onUserSelect}/>
            </Col>
          ))}
        </Row>
      )}
      {!isLoading && users.length === 0 && <p>No users found.</p>}
    </div>
  );
};

export default UsersList;