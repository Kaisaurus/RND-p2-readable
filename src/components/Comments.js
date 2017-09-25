import React, { Component } from 'react';
import { Comment, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import MyComment from '../components/MyComment';

class Comments extends Component {
  static propTypes = {
    comments: PropTypes.array,
  }

  generateComments(comments) {
    if(comments.length < 1){
      return <div>No comments have been posted yet...</div>;
    }
    return comments
    .filter(comment => !comment.deleted)
    .map(comment =>
      <MyComment key={ comment.id } {...comment} />
    );
  }

  render() {
    const { comments } = this.props;

    return(
    <Comment.Group>
      <Header as='h3' dividing>Comments</Header>
      { this.generateComments(comments) }
    </Comment.Group>
    )
  }
}

export default Comments;