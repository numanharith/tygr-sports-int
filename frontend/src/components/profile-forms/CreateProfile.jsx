import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile } from '../../actions/profile'

const CreateProfile = (props) => {
  const [formData, setFormData] = useState({
    height: '',
    weight: '',
    bio: '',
  });

  const { height, weight, bio } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <form className='form'>
        <div className='form-group'>
          <input
            type='number'
            placeholder='Height in cm'
            name='height'
            value={height}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='number'
            placeholder='Weight in kg'
            name='weight'
            value={weight}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Describe yourself'
            name='bio'
            value={bio}
            onChange={(e) => onChange(e)}
          />
        </div>
      </form>
    </Fragment>
  );
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
};


export default connect(null, { createProfile })(CreateProfile);
