import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'semantic-ui-react';
import CategoriesBtns from './CategoriesBtns';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { vote } from '../actions/postActions';
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
    voteScore: PropTypes.number,
    admin: PropTypes.bool,
    vote: PropTypes.func,
    comments: PropTypes.bool
  };

  onVoteUp(e, r) {
    e.preventDefault();
    this.props.vote(this.props.id, 'upVote');
  }

  onVoteDown(e, r) {
    e.preventDefault();
    this.props.vote(this.props.id, 'downVote');
  }

  render() {
    const { comments, error, author, body, category, timestamp, title, voteScore, admin, id } = this.props;
    if(error){
      return <Redirect to='/' />;
    }
    const formattedTimeStamp = formatTimeStamp(timestamp);
    const commentsTag = comments
      ? <Card.Content>
          <CommentsContainer postId={ id }  />
        </Card.Content>
      : '' ;
    return (
      <Card fluid className="post">
        <Card.Content>
          <Card.Header>
            <Link to={`/post/${id}`}>
              { title }
            </Link>
            <Button.Group floated="right">
              {
                admin
                ? (
                  <Button.Group>
                    <Link to={`/post/${id}/edit`}>
                      <Button content="Edit" />
                    </Link>

                    <Button content="Delete" />
                  </Button.Group>
                )
                : null
              }
              {
                comments
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
                : null
              }
            </Button.Group>
          </Card.Header>
          <Card.Meta>
            By { author } on { formattedTimeStamp.date } at { formattedTimeStamp.time }
          </Card.Meta>
          <Card.Description>
            { body }
          </Card.Description>
          <Card.Content extra>
            <CategoriesBtns categories={[category]} />
          </Card.Content>
        </Card.Content>
        { commentsTag }
      </Card>
    );
  }
}

const mapStateToProps = ({ posts }) => ({
  error: posts.error,
});

export default connect(
  mapStateToProps,
  { vote }
)(Post);