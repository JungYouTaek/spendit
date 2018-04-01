import React, { Component } from 'react';
import 'styles/css/Datepicker.css';

class Datepicker extends Component {
  render() {
    return (
      <div className="datepicker">
        <p>From</p>
        <div className="datepicker__wrapper">
          <input id="from-date" className="datepicker__input" type="date" name="selected_date" onChange={this.props.handleFromDate}/>
          <span className="datepicker__btn">
            <button type="button">
              <i className="fas fa-calendar-alt fa-lg"></i>
            </button>
          </span>
        </div>
        <p>To</p>
        <div className="datepicker__wrapper">
          <input id="to-date" className="datepicker__input" type="date" name="selected_date" disabled onChange={this.props.handleToDate}/>
          <span id="to-date__btn" className="datepicker__btn datepicker__btn--disalbed">
            <button type="button">
              <i className="fas fa-calendar-alt fa-lg"></i>
            </button>
          </span>
        </div>
        <button id="alert" className="alert" onClick={this.props.handleAlert}>적용</button>
      </div>
    );
  }
}

export default Datepicker;