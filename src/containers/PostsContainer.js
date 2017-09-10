import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/postActions';
import PostsList from '../components/PostsList';

class PostsContainer extends Component {
  static propTypes = {
    posts: PropTypes.array,
    fetching: PropTypes.bool,
    fetchPosts: PropTypes.func.isRequired,
    dimmerActive: PropTypes.bool,
  }

  componentWillMount() {
    this.props.fetchPosts();
  }

  render() {
    const { posts } = this.props;
    return (
      <PostsList posts={posts} />
    );
  }
}

const mapStateToProps = ({ posts }) => ({
  posts: posts.posts.map(i => i),
  fetching: posts.fetching,
});

export default connect(
  mapStateToProps,
  { fetchPosts }
)(PostsContainer);
