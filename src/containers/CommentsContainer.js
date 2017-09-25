import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchComments } from '../actions/commentActions';
import Comments from '../components/Comments';
import { Loader } from 'semantic-ui-react';

class CommentsContainer extends Component {
  static propTypes = {
    comments: PropTypes.array,
    fetching: PropTypes.bool,
    fetchComments: PropTypes.func.isRequired,
    postId: PropTypes.string.isRequired,
  }

  componentWillMount() {
    const { postId } = this.props;
    this.props.fetchComments(postId);
  }

  render() {
    const { comments, fetching } = this.props;
    return fetching
      ? <Loader> Loading Comments... </Loader>
      : <Comments comments={ comments } />;
  }
}

const mapStateToProps = ({ comments }) => ({
  comments: comments.comments.map(i => i),
  fetching: comments.fetching,
});

export default connect(
  mapStateToProps,
  { fetchComments }
)(CommentsContainer);
