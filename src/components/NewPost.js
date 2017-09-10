import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Form } from 'semantic-ui-react';
import { newPost } from '../actions/postActions';
import Post from './Post';

class NewPost extends Component {
  static PropTypes = {
    categories: PropTypes.string,
  };

  state = {
    showPreview: true,
    title: '',
    body: '',
    category: '',
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
    const post = {
      timestamp: Date.now(),
      title,
      body,
      author: 'You',
      category,
    };
    this.props.newPost(post);
  }

  render() {
    const { categories } = this.props;
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
              onChange={this.onFieldChange}
              width={6}
              label="Category"
              options={categories}
              placeholder="Category"
            />
          </Form.Group>
          <Form.TextArea
            required
            name="body"
            onChange={this.onFieldChange}
            label="Body"
            placeholder="Tell us something interesting..."
          />
          <Form.Group>
            <Form.Button>Submit</Form.Button>
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


const mapStateToProps = ({ categories }) => ({
  categories: categories.categories.map((i, k) => ({
    text: i.name,
    value: i.name,
    key: k,
  })),
});

export default connect(
  mapStateToProps,
  { newPost }
)(NewPost);
