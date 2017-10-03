import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default const EditBtns = ({ id ,onDeletePost }) => (
  <div>
    <Link to={`/post/${id}/edit`}>
      <Button compact content="Edit" attached="right" />
    </Link>
    <Button compact onClick={ onDeletePost.bind(this) } content="Delete" />
  </div>
)

EditBtns.PropTypes = {

}