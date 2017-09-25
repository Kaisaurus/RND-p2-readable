import React, { Component } from 'react';
import { Comment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import avatarImg from '../img/ee.jpg';
import { formatTimeStamp } from '../utils/formatTimeStamp';

class MyComment extends Component {
  static propTypes = {
    id: PropTypes.string,
    timestamp: PropTypes.number,
    body: PropTypes.string,
    author: PropTypes.string,
    parentId: PropTypes.string,
  }

  render() {
    const { timestamp, body, author } = this.props;
    const formatedTimeStamp = formatTimeStamp(timestamp);
    return(
      <Comment>
        <Comment.Avatar src={ avatarImg } />
        <Comment.Content>
          <Comment.Author as='a'>{ author }</Comment.Author>
          <Comment.Metadata>
            <div>Commented on { formatedTimeStamp.date } at { formatedTimeStamp.time }</div>
          </Comment.Metadata>
          <Comment.Text>{ body }</Comment.Text>
          <Comment.Actions>
            <Comment.Action>Reply</Comment.Action>
          </Comment.Actions>
        </Comment.Content>
      </Comment>
    )
  }
}

export default MyComment;
