import React, { useState } from "react";
import { Container, Button } from "react-bootstrap";
import UsersList from "./components/UsersList";
import UserForm from "./components/UserForm";

function App() {
  const [selectedUser, setSelectedUser] = useState(null); //user details
  const [contentShown, setContentShown] = useState("userList"); //userList || userDetails || newUserForm

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setContentShown("userDetails");
  };

  return (
    <div>
      <Container className="d-flex justify-content-evenly mt-3">
          <Button variant={contentShown === "userList" ?"info": "outline-info"} onClick={() => setContentShown("userList")}>
            Users List
          </Button>
          <Button variant={contentShown === "newUserForm" ?"info" : "outline-info"} onClick={() => setContentShown("newUserForm")}>
            Create User
          </Button>
      </Container>

      <Container className="d-flex justify-content-evenly mt-3">
        {contentShown === "userList" ? (
          <UsersList onUserSelect={handleUserSelect} />
        ) : contentShown === "newUserForm" ? (
          <UserForm onSubmit={() => setContentShown("userList")} currentUser={null} />
        ) : (
          <UserForm
            currentUser={selectedUser}
            onSubmit={() => setContentShown("userList")}
          />
        )}
      </Container>
    </div>
  );
}

export default App;
