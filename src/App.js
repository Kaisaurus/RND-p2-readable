import React, { Component } from 'react';
import './App.css';
// import * as ReadableAPI from './ReadableAPI';
import { Route } from 'react-router';
import Navigation from './components/Navigation';
import PostsContainer from './containers/PostsContainer';
import PostContainer from './containers/PostContainer';
import PostForm from './components/PostForm';
import { Container } from 'semantic-ui-react';
import AlertContainer from './containers/AlertContainer';

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
          <Route exact path={"/post/:id"} render={
              (props) => (
                <PostContainer {...props} />
              )
            } />
            <Route path={"/post/:id/edit"} render={
              (props) => (
                <PostContainer {...props} edit />
              )
            } />
          <Route path="/new" component={ PostForm } />
        </Container>
        <AlertContainer />
      </div>
    );
  }
}

export default App;
