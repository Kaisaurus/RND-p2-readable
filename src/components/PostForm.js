import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Form } from 'semantic-ui-react';
import { newPost, editPost } from '../actions/postActions';
import Post from './Post';
import { Redirect } from 'react-router';

class NewPost extends Component {
  static PropTypes = {
    categories: PropTypes.string,
    id: PropTypes.string,
    title: PropTypes.string,
    body: PropTypes.string,
    submittedId: PropTypes.string,
  };

  state = {
    showPreview: true,
    title: this.props.title || '',
    body: this.props.body || '',
    category: this.props.category || '',
  };

  togglePreview = (e) => {
    this.setState({ showPreview: !this.state.showPreview });
  };

  onFieldChange = (e, r) => {
    const { name, value } = r;
    this.setState({ [name]: value });
  }

  onSubmit = (e, r) => {
    e.preventDefault();
    const { title, body, category } = this.state;
    const { id } = this.props;
    const post = id
    ? { title, body }
    :{
      timestamp: Date.now(),
      title,
      body,
      author: 'You',
      category,
      owner: 'you',
      deleted: false,
    };
    id
    ?this.props.editPost(id, post)
    :this.props.newPost(post);
  }

  render() {
    const { categories, submittedId, id } = this.props;
    if(submittedId){
      return <Redirect to={`/post/${submittedId}`} />;
    }
    return (
      <div>
        <Form onSubmit={this.onSubmit}>
          <Form.Group>
            <Form.Input
              required
              name="title"
              onChange={this.onFieldChange}
              width={10}
              label="Title"
              placeholder="Title"
              value={this.state.title}
            />
            <Form.Select
              name="category"
              width={6}
              label="Category"
              options={categories}
              placeholder="Category"
              value={this.state.category}
              disabled={!!id}
            />
          </Form.Group>
          <Form.TextArea
            required
            name="body"
            onChange={this.onFieldChange}
            label="Body"
            placeholder="Tell us something interesting..."
            value={this.state.body}
          />
          <Form.Group>
            <Button
              type="submit"
              content="Submit"
            />
            <Button
              onClick={this.togglePreview.bind(this)}
              content="Toggle Preview"
            />
          </Form.Group>
        </Form>


        {
          this.state.showPreview
          ? (
            <Post
              author="You"
              body={this.state.body}
              category={this.state.category}
              timestamp={Date.now()}
              title={this.state.title}
              admin={false}
            />
          )
          : null
        }
      </div>
    );
  }
}


const mapStateToProps = ({ categories, post }) => ({
  submittedId: post.submittedId,
  categories: categories.categories.map((i, k) => ({
    text: i.name,
    value: i.name,
    key: k,
  })),
});

export default connect(
  mapStateToProps,
  { newPost, editPost }
)(NewPost);
