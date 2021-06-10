import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import UserRow from '../../components/user/UserRow';

const AllUsersPage = () => {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/auth/allusers');
      setUsers(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Username</th>
          <th>Height (in cm)</th>
          <th>Weight (in kg)</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user._id}><UserRow user={user} /></tr>
        ))}
      </tbody>
    </Table>
  );
};

export default AllUsersPage;
