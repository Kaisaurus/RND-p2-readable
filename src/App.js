import React, { Component } from 'react';
import './App.css';
// import * as ReadableAPI from './ReadableAPI';
import { Route } from 'react-router';
import Navigation from './components/Navigation';
import PostsContainer from './containers/PostsContainer';
import PostContainer from './containers/PostContainer';
import NewPost from './components/NewPost';
import { Container } from 'semantic-ui-react';


class App extends Component {
  componentDidMount() {
    // ReadableAPI.getPosts().then(data => console.log(data, 'a'));
  }

  render() {
//      <Route exact path="/:postId" render={ PostContainer } />
    return (
      <div className="App">
        <Navigation />
        <Container text textAlign="left">
          <Route exact path="/" component={ PostsContainer } />
          <Route path={"/post/:id"} render={
              (props) => (
                <PostContainer {...props} {...this.props} />
              )
            } />
          <Route path="/new" component={ NewPost } />
        </Container>
      </div>
    );
  }
}

export default App;
