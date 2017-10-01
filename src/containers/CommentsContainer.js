import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchComments } from '../actions/commentActions';
import Comments from '../components/Comments';
import { Loader } from 'semantic-ui-react';

class CommentsContainer extends Component {
  static propTypes = {
    comments: PropTypes.array,
    fetching: PropTypes.bool,
    fetchComments: PropTypes.func.isRequired,
    postId: PropTypes.string.isRequired,
    showCounter: PropTypes.bool,
    postLink: PropTypes.string,
  }

  componentWillMount() {
    const { postId } = this.props;
    this.props.fetchComments(postId);
  }

  render() {
    const { comments, fetching, showCounter, postLink } = this.props;
    return showCounter
      ? <Link to={ postLink }> Show comments ({ comments.length } comments) </Link>
      : fetching
          ? <Loader> Loading Comments... </Loader>
          : <Comments comments={ comments } />;
  }
}

const mapStateToProps = ({ comments }, props) => ({
  comments: comments.comments.filter(c => c.parentId === props.postId).map(c => c),
  fetching: comments.fetching,
});

export default connect(
  mapStateToProps,
  { fetchComments }
)(CommentsContainer);
