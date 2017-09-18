import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/postActions';
import PostsList from '../components/PostsList';
import { Dimmer, Loader } from 'semantic-ui-react';

class PostsContainer extends Component {
  static propTypes = {
    posts: PropTypes.array,
    fetching: PropTypes.bool,
    fetchPosts: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.fetchPosts();
  }

  render() {
    const { posts, fetching } = this.props;
    return (
        <Dimmer.Dimmable>
          <Dimmer active={ fetching }>
            <Loader>
              Loading Posts...
            </Loader>
          </Dimmer>
          <PostsList posts={ posts } />
        </Dimmer.Dimmable>
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
