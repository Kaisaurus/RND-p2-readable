import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPost } from '../actions/postActions';
import Post from '../components/Post';
import PostForm from '../components/PostForm';
import { Dimmer, Loader } from 'semantic-ui-react';

class PostContainer extends Component {
  static propTypes = {
    post: PropTypes.object,
    fetching: PropTypes.bool,
    fetchPost: PropTypes.func.isRequired,
    edit: PropTypes.bool,
  }

  componentWillMount() {
    this.props.fetchPost(this.props.match.params.id);
  }

  render() {
    const { post, fetching, edit } = this.props;
    const postTag = edit
    ? (<PostForm { ...post } />)
    : (<Post admin { ...post } />);
    const content = fetching
    ? ''
    : postTag;
    return (
    <Dimmer.Dimmable>
      <Dimmer active={ fetching }>
        <Loader>
          Loading Post...
        </Loader>
      </Dimmer>
      { content }
    </Dimmer.Dimmable>
    );
  }
}

const mapStateToProps = ({ post }) => ({
  post: post.post,
  fetching: post.fetching,
});

export default connect(
  mapStateToProps,
  { fetchPost }
)(PostContainer);