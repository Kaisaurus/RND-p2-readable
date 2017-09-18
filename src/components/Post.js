import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'semantic-ui-react';
import CategoriesBtns from './CategoriesBtns';
import { Link } from 'react-router-dom';

const Post = ({ author, body, category, timestamp, title, voteScore, admin, id }) => {
  const date = new Date(timestamp).toISOString();
  const formattedDate = date.split('T')[0];
  const formattedTime = date.split('T')[1].split('.')[0];
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
                  <Button content="Edit" />
                  <Button content="Delete" />
                </Button.Group>
              )
              : null
            }
            {
              voteScore
              ? (
                <Button.Group>
                  <Button
                    icon="like outline"
                  />
                  <Button.Or text={voteScore} />
                  <Button
                    icon="dislike outline"
                  />
                </Button.Group>
              )
              : null
            }
          </Button.Group>
        </Card.Header>
        <Card.Meta>
          By { author } on { formattedDate } at { formattedTime }
        </Card.Meta>
        <Card.Description>
          { body }
        </Card.Description>
        <Card.Content extra>
          <CategoriesBtns categories={[category]} />
        </Card.Content>
      </Card.Content>
    </Card>
  );
};

Post.propTypes = {
  author: PropTypes.string,
  body: PropTypes.string.isRequired,
  category: PropTypes.string,
  deleted: PropTypes.bool,
  id: PropTypes.string,
  timestamp: PropTypes.number,
  title: PropTypes.string.isRequired,
  voteScore: PropTypes.number,
  admin: PropTypes.bool,
};

export default Post;
