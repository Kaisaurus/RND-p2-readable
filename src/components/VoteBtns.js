import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';

class VoteBtns extends Component {
  static PropTypes = {
    voteScore: PropTypes.number,
    onVoteDown: PropTypes.func,
    onVoteUp: PropTypes.func,
  }

  render() {
    const { onVoteDown, onVoteUp, voteScore } = this.props;

    return (
      <Button.Group>
      <Button
        onClick={ onVoteUp }
        icon="like outline"
      />
      <Button.Or text={ voteScore } />
        <Button
          onClick={ onVoteDown }
          icon="dislike outline"
        />
      </Button.Group>
    )
  }
}

export default VoteBtns;