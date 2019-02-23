import React, { Component } from 'react';
import './Form.css';
import firebase from 'firebase';
import Message from './Message';


export default class Form extends Component {
  constructor(props) {
    super(props);
    let date = Date.now();
    this.state = {
      displayName: '',
      message: '',
      photoUrl: '',
      date: date,
      email: '',
      uid:'',
      list: [],
    };

    this.messageRef = firebase.database().ref().child('/Messenger');
    this.listenMessages();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.user) {
      this.setState({
        'displayName': nextProps.user.displayName,
        'email'   : nextProps.user.email,
        'photoUrl': nextProps.user.photoURL,
        'date'    : nextProps.user.date,
        'uid'     : nextProps.user.uid
      });
    }
  }

  handleChange(event) {
    this.setState({message: event.target.value});
  }

  handleSend() {
    if (this.state.message) {
      var newItem = {
        displayName: this.state.displayName,
        message:     this.state.message,
        photoUrl:    this.state.photoUrl,
        email:       this.state.email,
        uid:         this.state.uid,
      }

      this.messageRef.push(newItem);
      this.setState({ message: '' });
    }
  }

  handleKeyPress(event) {
    if (event.key !== 'Enter') return;
    this.handleSend();
  }

  listenMessages() {
    this.messageRef
      .limitToLast(10)
      .on('value', message => {
        this.setState({
          list: Object.values(message.val()),
        });
      });
  }

  render() {
    return (
      <div className="form">
        { !this.state.user ? (
        <div>
        <div className="form__message">
          { this.state.list.map((item, index) =>
            <Message key={index} message={item} />
          )}
        </div>
        <div className="form__row">
          <input
            className="form__input"
            type="text"
            placeholder="Type message"
            value={this.state.message}
            onChange={this.handleChange.bind(this)}
            onKeyPress={this.handleKeyPress.bind(this)}
          />
          <button
            className="form__button"
            onClick={this.handleSend.bind(this)}
          >
            send
          </button>
        </div>
        </div>
      ) : (
        <h2>Debe iniciar sesión</h2>
      )}
      </div>
    );
  }
}