import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactAlert from 'react-alert';

class AlertContainer extends Component {
  static propTypes = {
    alertMsg: PropTypes.string,
    alertType: PropTypes.string,
  }

  componentWillMount() {
    const { alertMsg } = this.props;

    if(alertMsg){
      this.showAlert(alertMsg);
    }
  }

  showAlert = (msg) => {
    const { alertType } = this.props;

    this.msg.show(msg, {
      type: alertType,
    });
  }

  render() {
    const alertOptions = {
      offset: 14,
      position: 'bottom left',
      theme: 'dark',
      time: 5000,
      transition: 'fade',
    }
    // const { alertMsg } = this.props;

    return (
      <ReactAlert
        ref={a => { this.msg = a; } } {...alertOptions}
      />
    );
  }
}

const mapStateToProps = ({ alert }) => ({
  alertMsg: alert.alertMsg,
  alertType: alert.alertMsg,
});

export default connect(
  mapStateToProps
)(AlertContainer);
