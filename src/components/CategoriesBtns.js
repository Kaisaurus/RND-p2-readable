import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';

const colors = ['red', 'orange', 'yellow', 'olive', 'green', 'teal', 'blue', 'purple'];
const color = () => colors[Math.floor(Math.random() * (colors.length - 1))];

const CategoriesBtns = ({ categories }) => {
  return categories && categories[0] !== '' ? (
    <div>
      {categories.map((category, i) =>
        (
          <Button size="small" compact key={i} color={color()}>
            {category}
          </Button>
        )
      )}
    </div>
  )
  : null;
};

CategoriesBtns.propTypes = {
  categories: PropTypes.array.isRequired,
};

export default CategoriesBtns;
