import React from 'react';
import PropTypes from 'prop-types';
import Post from './Post';

const PostsList = ({ posts }) => (
  <div>
    {posts.filter(p => !p.deleted).map(post =>
      <Post
        key={post.id}
        admin
        {...post}
      />
    )}
  </div>
);

PostsList.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default PostsList;
