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
          <Route exact path="/new" component={ PostForm } />
          <Route exact path={"/:category"} render={
              (props) => <PostsContainer category={props.match.params.category} {...props} />
            }
          />
          <Route exact path={"/:category/:id"} render={
              (props) => <PostContainer
                id={props.match.params.id}
                category={props.match.params.category}
                comments
              />
            }
          />
          <Route exact path={"/:category/:id/edit"} render={
              (props) => <PostContainer
                id={props.match.params.id}
                category={props.match.params.category}
                edit
              />
            }
          />
        </Container>
        <AlertContainer />
      </div>
    );
  }
}

export default App;
