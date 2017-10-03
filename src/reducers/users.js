import avatarImg from '../img/ee.jpg';

const defaultState = {
  currentUserName: 'Test user',
  currentUserAvatar: avatarImg,
};

const users = (state = defaultState, action) => {
  switch (action.type) {
  default:
    return state;
  }
};

export default users;
