import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCategories } from '../actions/categoryActions';
import CategoriesBtns from '../components/CategoriesBtns';

class CategoriesContainer extends Component {
  static propTypes = {
    categories: PropTypes.array,
    fetching: PropTypes.bool,
    fetchCategories: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.fetchCategories();
  }

  render() {
    const { categories } = this.props;

    return (
      <div>
        <CategoriesBtns categories={categories} />
      </div>
    );
  }
}

const mapStateToProps = ({ categories }) => ({
  categories: categories.categories.map(i => i.name),
  fetching: categories.fetching,
});

export default connect(
  mapStateToProps,
  { fetchCategories }
)(CategoriesContainer);
