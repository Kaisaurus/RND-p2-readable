import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/postActions';
import Post from '../components/Post';
import { Loader, Button, Icon } from 'semantic-ui-react';

class PostsContainer extends Component {
  static propTypes = {
    posts: PropTypes.array,
    fetching: PropTypes.bool,
    fetchPosts: PropTypes.func.isRequired,
    category: PropTypes.string,
  }

  state = {
    sortType: 'timestamp',
    asc: false,
  };

  componentWillMount() {
    const { category } = this.props;
    this.props.fetchPosts(category);
  }

  componentWillReceiveProps(nextProps) {
    const { category } = this.props;
    if (nextProps.category !== category) {
      // fetch new posts if category has changed
      this.props.fetchPosts(nextProps.category);
    }
  }

  generatePosts(posts){
    const { sortType, asc } = this.state;
    const sortedPosts = posts
      .filter(p => !p.deleted)
      .sort((a, b) => {
        const order = asc ? 1 : -1;
        if(a[sortType] < b[sortType]){
          return -1 * order
        }
        return 1 * order
      })
    return sortedPosts.map(p => <Post key={p.id} admin {...p} />);
  }

  sortBy(type) {
    const { sortType, asc } = this.state;
    const order = (sortType === type && !asc);
    this.setState({
      sortType: type,
      asc: order,
    });
  }

  generateSortIcon(type) {
    const { sortType, asc } = this.state;
    return sortType === type
      ? asc
        ? <Icon name="sort numeric ascending" />
        : <Icon name="sort numeric descending" />
      : '';
  }

  generateSortBtns() {
    return (
      <div>
        Sort:
        <Button.Group>
          <Button onClick={ this.sortBy.bind(this, 'timestamp') }>
            { this.generateSortIcon('timestamp') }
            Date
          </Button>
          <Button onClick={ this.sortBy.bind(this, 'voteScore') }>
            { this.generateSortIcon('voteScore') }
            Score
          </Button>
        </Button.Group>
      </div>
    );
  }

  render() {
    const { category ,posts, fetching } = this.props;
    return category !== 'new'
      ? fetching
        ? <Loader> Loading Posts... </Loader>
        : <div>
            { this.generateSortBtns() }
            { this.generatePosts(posts) }
          </div>
      : null;
  }
}

const mapStateToProps = ({ posts }) => ({
  posts: posts.posts.map(i => i),
  fetching: posts.fetching,
});

export default connect(
  mapStateToProps,
  { fetchPosts }
)(PostsContainer);
