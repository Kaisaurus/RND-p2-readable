import React from 'react';
import { Link } from 'react-router-dom';
import CategoriesContainer from '../containers/CategoriesContainer';
import { Dropdown, Container, Icon, Menu } from 'semantic-ui-react';


const Navigation = () => (
  <Menu style={{
    background: '#f7f7f7',
    border: 'none',
    borderRadius: 0,
    boxShadow: 'none',
    transition: 'box-shadow 0.5s ease, padding 0.5s ease',
  }}
>
    <Container text>
      <Link to="/">
        <Menu.Item>
          <Icon name="idea" size="large" />
        </Menu.Item>
        <Menu.Item header>React ND P2</Menu.Item>
      </Link>
      <Link to="/new">
        <Menu.Item>
          New Post
        </Menu.Item>
      </Link>
      <Menu.Menu position="right">
        <Dropdown text="Categories" pointing className="link item">
          <Dropdown.Menu>
            <CategoriesContainer />
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Menu>
    </Container>
  </Menu>
);

export default Navigation;
