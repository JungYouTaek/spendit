import React, { Component } from 'react';
import 'styles/css/Calendar.css';

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.beforeCalendar = this.beforeCalendar.bind(this);
    this.afterCalendar = this.afterCalendar.bind(this);
  }

  componentDidMount() {
    this.props.handleCalendar();
  }

  beforeCalendar() {
    const year =
      document.getElementById("calendar__date").textContent.slice(5) === "01"
        ? document.getElementById("calendar__date").textContent.slice(0, 4) - 1
        : document.getElementById("calendar__date").textContent.slice(0, 4);
    const month =
      document.getElementById("calendar__date").textContent.slice(5) === "01"
        ? 11
        : document.getElementById("calendar__date").textContent.slice(5) - 2;
    this.props.handleCalendar(year, month);
  }

  afterCalendar() {
    const year =
      document.getElementById("calendar__date").textContent.slice(5) === "12"
        ? +document.getElementById("calendar__date").textContent.slice(0, 4) + 1
        : +document.getElementById("calendar__date").textContent.slice(0, 4);
    const month =
      document.getElementById("calendar__date").textContent.slice(5) === "12"
        ? 0
        : +document.getElementById("calendar__date").textContent.slice(5);
    this.props.handleCalendar(year, month);
  }

  render() {
    return (
      <div className="calendar">
        <table id="calendar__table" className="calendar__table">
          <thead>
            <tr className="calendar__date">
              <th id="calendar__before" className="calendar__date--move" onClick={this.beforeCalendar}>◀</th>
              <th id="calendar__date" colSpan="5"></th>
              <th id="calendar__after" className="calendar__date--move" onClick={this.afterCalendar}>▶</th>
            </tr>
            <tr className="calendar__day">
              <th>Sun</th>
              <th>Mon</th>
              <th>Tue</th>
              <th>Wed</th>
              <th>Thu</th>
              <th>Fri</th>
              <th>Sat</th>
            </tr>
          </thead>
        </table>
      </div>
    );
  }
}

export default Calendar;