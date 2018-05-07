import React, { Component } from 'react';
import { Calendar, Datepicker, Breakdown } from './index';
import 'styles/css/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      check: 0,
      start: "",
      end: "",
      len: localStorage.length
    }
    this.handleCalendar = this.handleCalendar.bind(this);
    this.handleFromDate = this.handleFromDate.bind(this);
    this.handleToDate = this.handleToDate.bind(this);
    this.handleAlert = this.handleAlert.bind(this);
    this.resetAlert = this.resetAlert.bind(this);
  }
  
  componentDidMount() {
    if (localStorage.length) {
      let breakdown = document.createElement("div"), text = "";
      for (let i = 0; i < localStorage.length; i++) {
        text += `<p>- ${localStorage.getItem(i)}</p>`;
      }
      breakdown.innerHTML = text;
      document.getElementById("breakdown").appendChild(breakdown);
    }
  }

  handleCalendar (
    year = new Date().getFullYear(),
    month = new Date().getMonth()
  ) {
    let y = year,
      m = month,
      theDate = new Date(y, m, 1),
      theDay = theDate.getDay();
    const monthDate = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if ((y % 4 === 0 && y % 100 !== 0) || y % 400 === 0) monthDate[1] = 29;
    let lastDate = monthDate[m],
      currentNum = 1,
      nextNum = 1,
      beforeNum = m === 0 ? monthDate[11] - theDay + 1 : monthDate[m - 1] - theDay + 1,
      text = "",
      displayDate = ("" + (m + 1)).length === 1 ? `${y}.0${m + 1}` : `${y}.${m + 1}`;
    document.getElementById("calendar__date").textContent = displayDate;
    for (let i = 0; i <= 5; i++) {
      text += "<tr>";
      for (let j = 0; j <= 6; j++) {
        if (i === 0 && j < theDay) {
          text += `<td class="calendar__current--not" data-title="${
            displayDate.slice(5) === "01"
              ? "" + (displayDate.slice(0, 4) - 1)
              : displayDate.slice(0, 4)
          }${
            displayDate.slice(5) === "01"
              ? "12"
              : ("" + (+displayDate.slice(5) - 1)).length === 1
                ? "0" + (+displayDate.slice(5) - 1)
                : +displayDate.slice(5) - 1
          }${beforeNum}">${beforeNum}</td>`;
          beforeNum++;
        } else if (i === 0 && theDay === 0) {
          text += `<td class="calendar__current--not" data-title="${
            displayDate.slice(5) === "01"
              ? "" + (displayDate.slice(0, 4) - 1)
              : displayDate.slice(0, 4)
          }${
            displayDate.slice(5) === "01"
              ? "12"
              : ("" + (+displayDate.slice(5) - 1)).length === 1
                ? "0" + (+displayDate.slice(5) - 1)
                : +displayDate.slice(5) - 1
          }${beforeNum - 7}">${beforeNum - 7}</td>`;
          beforeNum++;
        } else if (currentNum > lastDate) {
          text += `<td class="calendar__current--not" data-title="${
            displayDate.slice(5) === "12"
              ? "" + (+displayDate.slice(0, 4) + 1)
              : displayDate.slice(0, 4)
          }${
            displayDate.slice(5) === "12"
              ? "01"
              : ("" + (+displayDate.slice(5) + 1)).length === 1
                ? "0" + (+displayDate.slice(5) + 1)
                : +displayDate.slice(5) + 1
          }${
            ("" + nextNum).length === 1 ? "0" + nextNum : nextNum
          }">${nextNum}</td>`;
          nextNum++;
        } else {
          text += `<td data-title="${displayDate.slice(0,4)
          }${displayDate.slice(5)}${
            ("" + currentNum).length === 1 ? "0" + currentNum : currentNum
          }">${currentNum}</td>`;
          currentNum++;
        }
      }
      text += "</tr>";
    }

    let child = document.createElement("tbody");
    child.setAttribute("id", "calendar__num");
    child.innerHTML = text;
    if (document.getElementById("calendar__table").children.length === 2) {
      document.getElementById("calendar__table")
        .removeChild(document.getElementById("calendar__table").lastChild);
    }
    document.getElementById("calendar__table").appendChild(child);
    if (this.state.start && this.state.end) {
      for (let i = 0; i <= 5; i++) {
        for (let j = 0; j <= 6; j++) {
          let title = document.getElementById("calendar__num").children[i]
            .children[j].dataset.title;
          if (+this.state.start.dataset.title === +title || +this.state.end.dataset.title === +title) {
            document.getElementById("calendar__num")
              .children[i].children[j].classList.add("checked");
          } else if ( +this.state.start.dataset.title < +title && +this.state.end.dataset.title > +title ) {
            document.getElementById("calendar__num")
              .children[i].children[j].classList.add("calendar__period");
          }
        }
      }
    } else if (this.state.start) {
      for (let i = 0; i <= 5; i++) {
        for (let j = 0; j <= 6; j++) {
          let title = document.getElementById("calendar__num").children[i]
            .children[j].dataset.title;
          if (+this.state.start.dataset.title === +title) {
            document.getElementById("calendar__num")
              .children[i].children[j].classList.add("checked");
          }
        }
      }
    }

    child.addEventListener("click", e => {
      if ( e.target.tagName === 'TD' ) {
        if (this.state.check === 0) {
          this.setState({
            check: 1
          })
          for (let i = 0; i <= 5; i++) {
            for (let j = 0; j <= 6; j++) {
              document.getElementById("calendar__num")
                .children[i].children[j].classList.remove("calendar__period", "checked");
            }
          }
          e.target.classList.add("checked");
          document.getElementById("from-date").value = `${e.target.dataset.title.slice(0,4)
          }-${e.target.dataset.title.slice(4, 6)}-${e.target.dataset.title.slice(6)}`;
          document.getElementById("to-date").value = "";
          this.setState({
            start: e.target,
            end: ''
          })
          if (document.getElementById("to-date").disabled) {
            document.getElementsByClassName("datepicker__btn--disalbed")[0]
              .classList.remove("datepicker__btn--disalbed");
            document.getElementById("to-date").disabled = false;
          }
        } else {
          if (+this.state.start.dataset.title <= +e.target.dataset.title) {
            this.setState({
              check: 0
            })
            e.target.classList.add("checked");
            document.getElementById("to-date").value = `${e.target.dataset.title.slice(0,4)
            }-${e.target.dataset.title.slice(4, 6)}-${e.target.dataset.title.slice(6)}`;
            this.setState({
              end: e.target
            })
            if (document.getElementById("to-date").disabled) {
              document.getElementsByClassName("datepicker__btn--disalbed")[0]
                .classList.remove("datepicker__btn--disalbed");
              document.getElementById("to-date").disabled = false;
            }
          } else {
            this.state.start.classList.remove("checked");
            e.target.classList.add("checked");
            this.setState({
              start: e.target
            })
            document.getElementById("from-date").value = `${e.target.dataset.title.slice(0,4)
              }-${e.target.dataset.title.slice(4, 6)}-${e.target.dataset.title.slice(6)}`;
            if (document.getElementById("to-date").disabled) {
              document.getElementsByClassName("datepicker__btn--disalbed")[0]
                .classList.add("datepicker__btn--disalbed");
              document.getElementById("to-date").disabled = true;
            }
          }
        }
      }
    });

    document.getElementById("calendar__num").addEventListener("mouseover", e => {
      if (this.state.check) {
        for (let i = 0; i <= 5; i++) {
          for (let j = 0; j <= 6; j++) {
            let title = document.getElementById("calendar__num").children[i]
              .children[j].dataset.title;
            if ( +this.state.start.dataset.title < +title && +e.target.dataset.title >= +title ) {
              document.getElementById("calendar__num")
                .children[i].children[j].classList.add("calendar__period");
            }
          }
        }
      }
    });

    document.getElementById("calendar__num").addEventListener("mouseout", e => {
      if (this.state.check) {
        for (let i = 0; i <= 5; i++) {
          for (let j = 0; j <= 6; j++) {
            document.getElementById("calendar__num")
              .children[i].children[j].classList.remove("calendar__period");
          }
        }
      }
    });
  };

  handleFromDate(e) {
    this.forceUpdate(this.handleCalendar(+e.target.value.slice(0, 4), +e.target.value.slice(5, 7) - 1));
    document.getElementById("from-date")
      .setAttribute("data-title", e.target.value.replace(/-/g, ""));
    document.getElementById("to-date").value = "";
    this.setState({
      check: 1,
      start: e.target,
      end: ''
    })
    for (let i = 0; i <= 5; i++) {
      for (let j = 0; j <= 6; j++) {
        document.getElementById("calendar__num")
          .children[i].children[j].classList.remove("calendar__period", "checked");
        if ( e.target.dataset.title ===
          document.getElementById("calendar__num").children[i].children[j].dataset.title ) {
          document.getElementById("calendar__num")
            .children[i].children[j].classList.add("checked");
        }
      }
    }
    if (document.getElementById("to-date").disabled) {
      document.getElementsByClassName("datepicker__btn--disalbed")[0]
        .classList.remove("datepicker__btn--disalbed");
      document.getElementById("to-date").disabled = false;
    }
  }

  handleToDate(e) {
    document.getElementById("to-date")
      .setAttribute("data-title", e.target.value.replace(/-/g, ""));
    if ( +document.getElementById("to-date").dataset.title < +this.state.start.dataset.title ) {
      this.setState({
        check: 0
      })
      alert("기준일 이후의 날짜를 입력해주세요");
      this.handleCalendar( +this.state.start.dataset.title.slice(0, 4), +this.state.start.dataset.title.slice(4, 6) - 1 );
      document.getElementById("to-date").value = "";
      for (let i = 0; i <= 5; i++) {
        for (let j = 0; j <= 6; j++) {
          document.getElementById("calendar__num")
            .children[i].children[j].classList.remove("calendar__period", "checked");
          let title = document.getElementById("calendar__num").children[i]
            .children[j].dataset.title;
          if (+this.state.start.dataset.title === +title) {
            document.getElementById("calendar__num")
              .children[i].children[j].classList.add("checked");
          }
        }
      }
    } else {
      this.forceUpdate(this.handleCalendar(+e.target.value.slice(0, 4), +e.target.value.slice(5, 7) - 1));
      this.setState({
        check: 0,
        end: e.target
      })
      for (let i = 0; i <= 5; i++) {
        for (let j = 0; j <= 6; j++) {
          document.getElementById("calendar__num")
            .children[i].children[j].classList.remove("calendar__period", "checked");
          let title = document.getElementById("calendar__num").children[i]
            .children[j].dataset.title;
          if (+this.state.start.dataset.title < +title && +e.target.dataset.title > +title) {
            document.getElementById("calendar__num")
              .children[i].children[j].classList.add("calendar__period");
          } else if ( +this.state.start.dataset.title === +title || +e.target.dataset.title === +title ) {
            document.getElementById("calendar__num")
              .children[i].children[j].classList.add("checked");
          }
        }
      }
    }
  }

  handleAlert() {
    const fromDate = document.getElementById("from-date").value,
      toDate = document.getElementById("to-date").value;
    if (fromDate && toDate) {
      let data = `${fromDate
        .replace("-", "년 ")
        .replace("-", "월 ")}일 ~ ${toDate
        .replace("-", "년 ")
        .replace("-", "월 ")}일 (총 ${(new Date(
        +toDate.slice(0, 4),
        +toDate.slice(5, 7) - 1,
        +toDate.slice(8)
      ) -
        new Date(
          +fromDate.slice(0, 4),
          +fromDate.slice(5, 7) - 1,
          +fromDate.slice(8)
        )) / 1000 / 60 / 60 / 24 + 1}일)`;
      window.alert(data);
      this.setState({
        start: "",
        end: "",
        len: localStorage.length
      })
      localStorage.setItem(this.state.len, data);
      if (document.getElementById("breakdown").firstChild) {
        let breakdown = document.createElement("p"), text = "";
        text += `- ${localStorage.getItem(this.state.len)}`;
        breakdown.innerHTML = text;
        document.getElementById("breakdown").firstChild.appendChild(breakdown);
      } else {
        let breakdown = document.createElement("div"), text = "";
        text += `<p>- ${localStorage.getItem(this.state.len)}</p>`;
        breakdown.innerHTML = text;
        document.getElementById("breakdown").appendChild(breakdown);
      }
      document.getElementById("from-date").value = "";
      document.getElementById("to-date").value = "";
      document.getElementById("to-date").disabled = true;
      document.getElementById("to-date__btn")
      .classList.add("datepicker__btn--disalbed");
      this.forceUpdate(this.handleCalendar);
    } else {
      window.alert("조회할 날짜를 올바르게 입력해주세요");
    }
  }

  resetAlert() {
    localStorage.clear();
    this.setState({
      len: 0
    })
    document.getElementById("breakdown")
      .removeChild(document.getElementById("breakdown").firstChild);
  }

  render() {
    return (
      <main>
        <h1>JavaScript-calendar</h1>
        <Calendar handleCalendar={this.handleCalendar} />
        <Datepicker
          handleCalendar={this.handleCalendar}
          handleFromDate={this.handleFromDate}
          handleToDate={this.handleToDate}
          handleAlert={this.handleAlert}
        />
        <Breakdown resetAlert={this.resetAlert} />
      </main>
    );
  }
}

export default App;
