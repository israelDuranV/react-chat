import React, {Component} from 'react';
import './Message.css';

export default class Message extends Component {
  render() {
    return (
      <div className="message">
      <img src={this.props.message.photoUrl} alt="" width="30px"/>
                <span className="message__author">
                    {this.props.message.displayName}:
                </span>
        {this.props.message.message}
      </div>
    )
  }
}