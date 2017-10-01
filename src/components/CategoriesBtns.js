import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export const CategoriesBtns = ({ categories }) => {
  return categories && categories[0] !== '' ? (
    <div>
      {categories.map((category, i) =>
        (
          <Link to={`/${category}`} key={i}>
            <Button size="small" compact secondary>
              {category}
            </Button>
          </Link>
        )
      )}
    </div>
  )
  : null;
};

CategoriesBtns.propTypes = {
  categories: PropTypes.array.isRequired,
};
