import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Form, Comment } from 'semantic-ui-react';
import { newComment } from '../actions/commentActions';

class CommentForm extends Component {
  static PropTypes = {
    body: PropTypes.string,
    parentId: PropTypes.string,
  };

  state = {
    body: this.props.body || '',
  };

  onFieldChange = (e, r) => {
    const { name, value } = r;
    this.setState({ [name]: value });
  }

  onSubmit = (e, r) => {
    e.preventDefault();
    const { body } = this.state;
    const { parentId, currentUserName } = this.props;
    this.props.newComment({
      timestamp: Date.now(),
      body,
      author: currentUserName,
      parentId,
    });
  }

  render() {
    const { currentUserAvatar } = this.props;

    return (
    <Comment>
      <Comment.Avatar src={ currentUserAvatar } />
      <Comment.Content>
        <Comment.Text>
          <Form onSubmit={this.onSubmit}>
            <Form.TextArea
              required
              name="body"
              onChange={ this.onFieldChange }
              label="Your comment:"
              placeholder="Comment something interesting..."
              value={ this.state.body }
            />
            <Form.Group>
              <Button type="submit" content="Submit" />
            </Form.Group>
          </Form>
        </Comment.Text>
      </Comment.Content>
    </Comment>
    );
  }
}

const mapStateToProps = ({ comments, users, posts }) => ({
  parentId: posts.post.id,
  currentUserName: users.currentUserName,
  currentUserAvatar: users.currentUserAvatar,
});

export default connect(
  mapStateToProps,
  { newComment }
)(CommentForm);