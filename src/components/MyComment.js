import React, { Component } from 'react';
import { Comment, Form, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import avatarImg from '../img/ee.jpg';
import { connect } from 'react-redux';
import { formatTimeStamp } from '../utils/formatTimeStamp';
import { deleteComment, editComment, vote } from '../actions/commentActions';
import VoteBtns from './VoteBtns';

class MyComment extends Component {
  static propTypes = {
    id: PropTypes.string,
    timestamp: PropTypes.number,
    body: PropTypes.string,
    author: PropTypes.string,
    voteScore: PropTypes.number,
    parentId: PropTypes.string,
    currentUserName: PropTypes.string,
  }

  state = {
    edit: false,
    body: this.props.body || '',
  };

  onFieldChange = (e, r) => {
    const { name, value } = r;
    this.setState({ [name]: value });
  }

  onDeleteComment() {
    this.props.deleteComment(this.props.id);
  }

  onEditComment() {
    this.setState({ edit: true, body: this.props.body });
  }

  onVoteUp(e, r) {
    e.preventDefault();
    this.props.vote(this.props.id, 'upVote');
  }

  onVoteDown(e, r) {
    e.preventDefault();
    this.props.vote(this.props.id, 'downVote');
  }

  onSubmit = (e, r) => {
    e.preventDefault();
    const { body } = this.state;
    const { id } = this.props;
    this.props.editComment(id, {
      timestamp: Date.now(),
      body,
    });
    this.setState({ edit: false, body: this.props.body })
  }

  generateAdminBtns() {
    const { currentUserName, author } = this.props;
    return currentUserName === author
      ?
        <Comment.Actions>
          <Comment.Action onClick={ this.onEditComment.bind(this) }>Edit</Comment.Action>
          <Comment.Action onClick={ this.onDeleteComment.bind(this) }>Delete</Comment.Action>
        </Comment.Actions>
      : null;
  }

  onCancel() {
    this.setState({ edit: false })
  }

  generateEditForm() {
    return (
    <Form onSubmit={this.onSubmit}>
      <Form.TextArea
        required
        name="body"
        onChange={ this.onFieldChange }
        value={ this.state.body }
      />
      <Form.Group>
        <Button type="submit" content="Submit" />
        <Button onClick={ this.onCancel.bind(this) } content="Cancel" />
      </Form.Group>
    </Form>
    )
  }

  generateBody() {
    const { edit } = this.state;
    const { body } = this.props;
    return edit
    ? this.generateEditForm()
    : <Comment.Content>
        <Comment.Text>{ body }</Comment.Text>
        { this.generateAdminBtns() }
      </Comment.Content>
  }

  render() {
    const { timestamp, author, voteScore } = this.props;
    const formatedTimeStamp = formatTimeStamp(timestamp);
    return (
      <Comment>
        <Comment.Avatar src={ avatarImg } />
        <Comment.Content>
          <Comment.Author as='a'>{ author }</Comment.Author>
          <Comment.Metadata>
            <div>Commented on { formatedTimeStamp.date } at { formatedTimeStamp.time }</div>
          </Comment.Metadata>
        </Comment.Content>
        { this.generateBody() }
        <Comment.Content>
          <VoteBtns
            voteScore={ voteScore }
            onVoteUp={ this.onVoteUp.bind(this) }
            onVoteDown={ this.onVoteDown.bind(this) }
          />
          </Comment.Content>
      </Comment>
    )
  }
}

const mapStateToProps = ({ users }) => ({
  currentUserName: users.currentUserName,
});

export default connect(
  mapStateToProps,
  { deleteComment, editComment, vote }
)(MyComment);