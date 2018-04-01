"use strict";

// calender handling

var check = 0,
    start = "",
    end = "",
    len = window.localStorage.length;
var calendar = function calendar() {
  var year = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date().getFullYear();
  var month = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Date().getMonth();

  var y = year,
      m = month,
      theDate = new Date(y, m, 1),
      theDay = theDate.getDay();
  var monthDate = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (y % 4 === 0 && y % 100 !== 0 || y % 400 === 0) monthDate[1] = 29;
  var lastDate = monthDate[m],
      currentNum = 1,
      nextNum = 1,
      beforeNum = m === 0 ? monthDate[11] - theDay + 1 : monthDate[m - 1] - theDay + 1,
      text = "",
      displayDate = ("" + (m + 1)).length === 1 ? y + ".0" + (m + 1) : y + "." + (m + 1);
  document.getElementById("calendar__date").textContent = displayDate;
  for (var i = 0; i <= 5; i++) {
    text += "<tr>";
    for (var j = 0; j <= 6; j++) {
      if (i === 0 && j < theDay) {
        text += "<td class=\"calendar__current--not\" data-title=\"" + (displayDate.slice(5) === "01" ? "" + (displayDate.slice(0, 4) - 1) : displayDate.slice(0, 4)) + (displayDate.slice(5) === "01" ? "12" : ("" + (+displayDate.slice(5) - 1)).length === 1 ? "0" + (+displayDate.slice(5) - 1) : +displayDate.slice(5) - 1) + beforeNum + "\">" + beforeNum + "</td>";
        beforeNum++;
      } else if (i === 0 && theDay === 0) {
        text += "<td class=\"calendar__current--not\" data-title=\"" + (displayDate.slice(5) === "01" ? "" + (displayDate.slice(0, 4) - 1) : displayDate.slice(0, 4)) + (displayDate.slice(5) === "01" ? "12" : ("" + (+displayDate.slice(5) - 1)).length === 1 ? "0" + (+displayDate.slice(5) - 1) : +displayDate.slice(5) - 1) + (beforeNum - 7) + "\">" + (beforeNum - 7) + "</td>";
        beforeNum++;
      } else if (currentNum > lastDate) {
        text += "<td class=\"calendar__current--not\" data-title=\"" + (displayDate.slice(5) === "12" ? "" + (+displayDate.slice(0, 4) + 1) : displayDate.slice(0, 4)) + (displayDate.slice(5) === "12" ? "01" : ("" + (+displayDate.slice(5) + 1)).length === 1 ? "0" + (+displayDate.slice(5) + 1) : +displayDate.slice(5) + 1) + (("" + nextNum).length === 1 ? "0" + nextNum : nextNum) + "\">" + nextNum + "</td>";
        nextNum++;
      } else {
        text += "<td data-title=\"" + displayDate.slice(0, 4) + displayDate.slice(5) + (("" + currentNum).length === 1 ? "0" + currentNum : currentNum) + "\">" + currentNum + "</td>";
        currentNum++;
      }
    }
    text += "</tr>";
  }

  var child = document.createElement("tbody");
  child.setAttribute("id", "calendar__num");
  child.innerHTML = text;
  if (document.getElementById("calendar__table").children.length === 2) {
    document.getElementById("calendar__table").removeChild(document.getElementById("calendar__table").lastChild);
  }
  document.getElementById("calendar__table").appendChild(child);
  if (start && end) {
    for (var _i = 0; _i <= 5; _i++) {
      for (var _j = 0; _j <= 6; _j++) {
        var title = document.getElementById("calendar__num").children[_i].children[_j].dataset.title;
        if (+start.dataset.title === +title || +end.dataset.title === +title) {
          document.getElementById("calendar__num").children[_i].children[_j].classList.add("checked");
        } else if (+start.dataset.title < +title && +end.dataset.title > +title) {
          document.getElementById("calendar__num").children[_i].children[_j].classList.add("calendar__period");
        }
      }
    }
  } else if (start) {
    for (var _i2 = 0; _i2 <= 5; _i2++) {
      for (var _j2 = 0; _j2 <= 6; _j2++) {
        var _title = document.getElementById("calendar__num").children[_i2].children[_j2].dataset.title;
        if (+start.dataset.title === +_title) {
          document.getElementById("calendar__num").children[_i2].children[_j2].classList.add("checked");
        }
      }
    }
  }

  child.addEventListener("click", function (e) {
    if (e.target.tagName === 'TD') {
      if (check === 0) {
        check = 1;
        for (var _i3 = 0; _i3 <= 5; _i3++) {
          for (var _j3 = 0; _j3 <= 6; _j3++) {
            document.getElementById("calendar__num").children[_i3].children[_j3].classList.remove("calendar__period", "checked");
          }
        }
        e.target.classList.add("checked");
        document.getElementById("from-date").value = e.target.dataset.title.slice(0, 4) + "-" + e.target.dataset.title.slice(4, 6) + "-" + e.target.dataset.title.slice(6);
        document.getElementById("to-date").value = "";
        start = e.target, end = "";
        if (document.getElementById("to-date").disabled) {
          document.getElementsByClassName("datepicker__btn--disalbed")[0].classList.remove("datepicker__btn--disalbed");
          document.getElementById("to-date").disabled = false;
        }
      } else {
        if (+start.dataset.title <= +e.target.dataset.title) {
          check = 0;
          e.target.classList.add("checked");
          document.getElementById("to-date").value = e.target.dataset.title.slice(0, 4) + "-" + e.target.dataset.title.slice(4, 6) + "-" + e.target.dataset.title.slice(6);
          end = e.target;
          if (document.getElementById("to-date").disabled) {
            document.getElementsByClassName("datepicker__btn--disalbed")[0].classList.remove("datepicker__btn--disalbed");
            document.getElementById("to-date").disabled = false;
          }
        } else {
          start.classList.remove("checked");
          e.target.classList.add("checked");
          start = e.target;
          document.getElementById("from-date").value = e.target.dataset.title.slice(0, 4) + "-" + e.target.dataset.title.slice(4, 6) + "-" + e.target.dataset.title.slice(6);
          if (document.getElementById("to-date").disabled) {
            document.getElementsByClassName("datepicker__btn--disalbed")[0].classList.add("datepicker__btn--disalbed");
            document.getElementById("to-date").disabled = true;
          }
        }
      }
    }
  });

  document.getElementById("calendar__num").addEventListener("mouseover", function (e) {
    if (check) {
      for (var _i4 = 0; _i4 <= 5; _i4++) {
        for (var _j4 = 0; _j4 <= 6; _j4++) {
          var _title2 = document.getElementById("calendar__num").children[_i4].children[_j4].dataset.title;
          if (+start.dataset.title < +_title2 && +e.target.dataset.title >= +_title2) {
            document.getElementById("calendar__num").children[_i4].children[_j4].classList.add("calendar__period");
          }
        }
      }
    }
  });

  document.getElementById("calendar__num").addEventListener("mouseout", function (e) {
    if (check) {
      for (var _i5 = 0; _i5 <= 5; _i5++) {
        for (var _j5 = 0; _j5 <= 6; _j5++) {
          document.getElementById("calendar__num").children[_i5].children[_j5].classList.remove("calendar__period");
        }
      }
    }
  });
};
calendar();

document.getElementById("calendar__before").addEventListener("click", function () {
  var year = document.getElementById("calendar__date").textContent.slice(5) === "01" ? document.getElementById("calendar__date").textContent.slice(0, 4) - 1 : document.getElementById("calendar__date").textContent.slice(0, 4);
  var month = document.getElementById("calendar__date").textContent.slice(5) === "01" ? 11 : document.getElementById("calendar__date").textContent.slice(5) - 2;
  calendar(year, month);
});

document.getElementById("calendar__after").addEventListener("click", function () {
  var year = document.getElementById("calendar__date").textContent.slice(5) === "12" ? +document.getElementById("calendar__date").textContent.slice(0, 4) + 1 : +document.getElementById("calendar__date").textContent.slice(0, 4);
  var month = document.getElementById("calendar__date").textContent.slice(5) === "12" ? 0 : +document.getElementById("calendar__date").textContent.slice(5);
  calendar(year, month);
});

// input box handling

document.getElementById("from-date").addEventListener("change", function (e) {
  calendar(+e.target.value.slice(0, 4), +e.target.value.slice(5, 7) - 1);
  document.getElementById("from-date").setAttribute("data-title", e.target.value.replace(/-/g, ""));
  document.getElementById("to-date").value = "";
  check = 1, start = e.target, end = "";
  for (var i = 0; i <= 5; i++) {
    for (var j = 0; j <= 6; j++) {
      document.getElementById("calendar__num").children[i].children[j].classList.remove("calendar__period", "checked");
      if (e.target.dataset.title === document.getElementById("calendar__num").children[i].children[j].dataset.title) {
        document.getElementById("calendar__num").children[i].children[j].classList.add("checked");
      }
    }
  }
  if (document.getElementById("to-date").disabled) {
    document.getElementsByClassName("datepicker__btn--disalbed")[0].classList.remove("datepicker__btn--disalbed");
    document.getElementById("to-date").disabled = false;
  }
});

document.getElementById("to-date").addEventListener("change", function (e) {
  check = 0;
  document.getElementById("to-date").setAttribute("data-title", e.target.value.replace(/-/g, ""));
  if (+document.getElementById("to-date").dataset.title < +start.dataset.title) {
    alert("기준일 이후의 날짜를 입력해주세요");
    calendar(+start.dataset.title.slice(0, 4), +start.dataset.title.slice(4, 6) - 1);
    document.getElementById("to-date").value = "";
    for (var i = 0; i <= 5; i++) {
      for (var j = 0; j <= 6; j++) {
        document.getElementById("calendar__num").children[i].children[j].classList.remove("calendar__period", "checked");
        var title = document.getElementById("calendar__num").children[i].children[j].dataset.title;
        if (+start.dataset.title === +title) {
          document.getElementById("calendar__num").children[i].children[j].classList.add("checked");
        }
      }
    }
  } else {
    calendar(+e.target.value.slice(0, 4), +e.target.value.slice(5, 7) - 1);
    check = 0, end = e.target;
    for (var _i6 = 0; _i6 <= 5; _i6++) {
      for (var _j6 = 0; _j6 <= 6; _j6++) {
        document.getElementById("calendar__num").children[_i6].children[_j6].classList.remove("calendar__period", "checked");
        var _title3 = document.getElementById("calendar__num").children[_i6].children[_j6].dataset.title;
        if (+start.dataset.title < +_title3 && +end.dataset.title > +_title3) {
          document.getElementById("calendar__num").children[_i6].children[_j6].classList.add("calendar__period");
        } else if (+end.dataset.title === +_title3 || +start.dataset.title === +_title3) {
          document.getElementById("calendar__num").children[_i6].children[_j6].classList.add("checked");
        }
      }
    }
  }
});

// button handling

document.getElementById("alert").addEventListener("click", function () {
  var fromDate = document.getElementById("from-date").value,
      toDate = document.getElementById("to-date").value;
  if (fromDate && toDate) {
    var data = fromDate.replace("-", "년 ").replace("-", "월 ") + "\uC77C ~ " + toDate.replace("-", "년 ").replace("-", "월 ") + "\uC77C (\uCD1D " + ((new Date(+toDate.slice(0, 4), +toDate.slice(5, 7) - 1, +toDate.slice(8)) - new Date(+fromDate.slice(0, 4), +fromDate.slice(5, 7) - 1, +fromDate.slice(8))) / 1000 / 60 / 60 / 24 + 1) + "\uC77C)";
    alert(data);
    start = "", end = "";
    len = window.localStorage.length;
    window.localStorage.setItem(len, data);
    if (document.getElementById("breakdown").firstChild) {
      var breakdown = document.createElement("p"),
          text = "";
      text += "- " + window.localStorage.getItem(len);
      breakdown.innerHTML = text;
      document.getElementById("breakdown").firstChild.appendChild(breakdown);
    } else {
      var _breakdown = document.createElement("div"),
          _text = "";
      _text += "<p>- " + window.localStorage.getItem(len) + "</p>";
      _breakdown.innerHTML = _text;
      document.getElementById("breakdown").appendChild(_breakdown);
    }

    document.getElementById("from-date").value = "";
    document.getElementById("to-date").value = "";
    document.getElementById("to-date").disabled = true;
    document.getElementById("to-date__btn").classList.add("datepicker__btn--disalbed");
    calendar();
  } else {
    alert("조회할 날짜를 올바르게 입력해주세요");
  }
});

// breakdown handling

if (window.localStorage.length) {
  var breakdown = document.createElement("div"),
      text = "";
  for (var i = 0; i < window.localStorage.length; i++) {
    text += "<p>- " + window.localStorage.getItem(i) + "</p>";
  }
  breakdown.innerHTML = text;
  document.getElementById("breakdown").appendChild(breakdown);
}

document.getElementById("breakdown__reset").addEventListener("click", function () {
  window.localStorage.clear();
  len = 0;
  document.getElementById("breakdown").removeChild(document.getElementById("breakdown").firstChild);
});