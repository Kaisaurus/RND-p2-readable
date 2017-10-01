import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPost } from '../actions/postActions';
import Post from '../components/Post';
import PostForm from '../components/PostForm';
import { Loader } from 'semantic-ui-react';

class PostContainer extends Component {
  static propTypes = {
    post: PropTypes.object,
    fetching: PropTypes.bool,
    fetchPost: PropTypes.func.isRequired,
    edit: PropTypes.bool,
    comments: PropTypes.bool,
    admin: PropTypes.bool,
    category: PropTypes.string,
  }

  componentWillMount() {
    this.props.fetchPost(this.props.id);
  }

  generatePostContent() {
    const { post, edit, comments, admin, category } = this.props;
    if(edit) {
      return <PostForm { ...post } />;
    }
    if(category === post.category) {
      return <Post admin={ admin } comments={ comments } { ...post } />;
    }
    return <div>Sorry could't find that post!</div>
  }

  render() {
    const { fetching, post } = this.props;
    // checking for empty post object
    return fetching || Object.keys(post).length < 1
      ? <Loader> Loading Post... </Loader>
      : this.generatePostContent();
  }
}

const mapStateToProps = ({ posts }) => ({
  post: posts.post,
  fetching: posts.fetching,
});

export default connect(
  mapStateToProps,
  { fetchPost }
)(PostContainer);