import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'semantic-ui-react';
import { CategoriesBtns } from './CategoriesBtns';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { vote, deletePost } from '../actions/postActions';
import { Redirect } from 'react-router';
import CommentsContainer from '../containers/CommentsContainer';
import { formatTimeStamp } from '../utils/formatTimeStamp';

class Post extends Component {
  static propTypes = {
    author: PropTypes.string,
    body: PropTypes.string,
    category: PropTypes.string,
    deleted: PropTypes.bool,
    id: PropTypes.string,
    timestamp: PropTypes.number,
    title: PropTypes.string,
    preview: PropTypes.bool,
    voteScore: PropTypes.number,
    admin: PropTypes.bool,
    comments: PropTypes.bool,
    vote: PropTypes.func,
    deletePost: PropTypes.func,
  };

  onVoteUp(e, r) {
    e.preventDefault();
    this.props.vote(this.props.id, 'upVote');
  }

  onVoteDown(e, r) {
    e.preventDefault();
    this.props.vote(this.props.id, 'downVote');
  }

  onDeletePost() {
    this.props.deletePost(this.props.id);
  }

  generateEditBtns() {
    const { currentUserName, author, id, preview } = this.props;
    return currentUserName === author && !preview
      ? (
        <div>
          <Link to={`/post/${id}/edit`}>
            <Button compact content="Edit" attached="right" />
          </Link>
          <Button compact onClick={ this.onDeletePost.bind(this) } content="Delete" />
        </div>
      )
      : null;
  }

  generateVoteBtns() {
    const { voteScore, preview } = this.props;
    return !preview
    ? (
      <Button.Group>
        <Button
          onClick={ this.onVoteUp.bind(this) }
          icon="like outline"
        />
        <Button.Or text={ voteScore } />
          <Button
            onClick={ this.onVoteDown.bind(this) }
            icon="dislike outline"
          />
      </Button.Group>
      )
    : null;
  }

  generateComments() {
    const { preview, id, category, comments } = this.props;
    return !preview
      ? <CommentsContainer postId={ id } postLink={`/${category}/${id}`} showCounter={ !comments } />
      : null;
  }

  generateTitle() {
    const { category, preview, title, id } = this.props;
    return preview
      ? { title }
      : <Link to={`/${category}/${id}`}>
          { title }
        </Link>;
  }

  render() {
    const { deleted, error, author, body, category, timestamp } = this.props;
    if(error || deleted){
      return <Redirect to='/' />;
    }
    const formattedTimeStamp = timestamp ? formatTimeStamp(timestamp) : '';
    return (
      <Card fluid className="post">
        <Card.Content>
          <Card.Header>
            <Button.Group floated="right">
              { this.generateEditBtns() }
              { this.generateVoteBtns() }
            </Button.Group>
          </Card.Header>
          <Card.Meta>
            By { author } on { formattedTimeStamp.date } at { formattedTimeStamp.time }
          </Card.Meta>
          <Card.Content extra>
            { body }
          </Card.Content>
          <Card.Meta>
            <CategoriesBtns categories={[category]} />
          </Card.Meta>
          <Card.Meta>
            { this.generateComments() }
          </Card.Meta>
        </Card.Content>
      </Card>
    );
  }
}

const mapStateToProps = ({ posts, users }) => ({
  error: posts.error,
  currentUserName: users.currentUserName,
});

export default connect(
  mapStateToProps,
  { vote, deletePost }
)(Post);