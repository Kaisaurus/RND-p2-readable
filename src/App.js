import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router';
import Navigation from './components/Navigation';
import PostsContainer from './containers/PostsContainer';
import PostContainer from './containers/PostContainer';
import PostForm from './components/PostForm';
import { Container } from 'semantic-ui-react';
import AlertContainer from './containers/AlertContainer';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Navigation />
        <Container text textAlign="left">
          <Route exact path="/" component={ PostsContainer } />
          <Route exact path={"/post/:id"} render={
              (props) => {
                return (
                <PostContainer {...props} comments admin />
              )}
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
