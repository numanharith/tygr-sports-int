import axios from 'axios';
import React, { Fragment } from 'react';
import Button from 'react-bootstrap/Button';

const UserRow = ({ user }) => {
  const deleteUser = async (e) => {
    // e.preventDefault();
    try {
      await axios.delete(`/api/auth/delete/${user._id}`)
      // console.log(`/api/auth/delete/${user._id}`)
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Fragment>
      <td>{user.username}</td>
      {user.profile !== undefined && (
        <Fragment>
          <td>{user.profile.height}</td>
          <td>{user.profile.weight}</td>
        </Fragment>
      )}
      {user.profile === undefined && (
        <Fragment>
          <td>-</td>
          <td>-</td>
        </Fragment>
      )}
      <td>
        <form onSubmit={deleteUser}>
          <Button type='submit' variant='danger'>
            Delete
          </Button>
        </form>
      </td>
    </Fragment>
  );
};

export default UserRow;
