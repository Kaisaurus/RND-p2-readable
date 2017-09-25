import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/postActions';
import Post from '../components/Post';
import { Loader } from 'semantic-ui-react';

class PostsContainer extends Component {
  static propTypes = {
    posts: PropTypes.array,
    fetching: PropTypes.bool,
    fetchPosts: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.fetchPosts();
  }

  generatePosts(posts){
    return posts
      .filter(p => !p.deleted)
      .map(p => <Post key={p.id} admin {...p} />);
  }

  render() {
    const { posts, fetching } = this.props;
    return fetching
      ? <Loader> Loading Posts... </Loader>
      : <div>{ this.generatePosts(posts) }</div>
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
