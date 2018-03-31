// calender handling

let check = 0,
  start = "",
  end = "",
  len = localStorage.length;
const calendar = (
  year = new Date().getFullYear(),
  month = new Date().getMonth()
) => {
  let date = new Date(),
    y = year,
    m = month,
    d = date.getDate(),
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
        text += `<td class="calendar__currnet" data-title="${displayDate.slice(0,4)
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
  if (start && end) {
    for (let i = 0; i <= 5; i++) {
      for (let j = 0; j <= 6; j++) {
        let title = document.getElementById("calendar__num").children[i]
          .children[j].dataset.title;
        if (+start.dataset.title === +title || +end.dataset.title === +title) {
          document.getElementById("calendar__num")
            .children[i].children[j].classList.add("checked");
        } else if ( +start.dataset.title < +title && +end.dataset.title > +title ) {
          document.getElementById("calendar__num")
            .children[i].children[j].classList.add("period");
        }
      }
    }
  } else if (start) {
    for (let i = 0; i <= 5; i++) {
      for (let j = 0; j <= 6; j++) {
        let title = document.getElementById("calendar__num").children[i]
          .children[j].dataset.title;
        if (+start.dataset.title === +title) {
          document.getElementById("calendar__num")
            .children[i].children[j].classList.add("checked");
        }
      }
    }
  }

  child.addEventListener("click", e => {
    if (check === 0) {
      check = 1;
      for (let i = 0; i <= 5; i++) {
        for (let j = 0; j <= 6; j++) {
          document.getElementById("calendar__num")
            .children[i].children[j].classList.remove("period", "checked");
        }
      }
      e.target.classList.add("checked");
      document.getElementById("from-date").value = `${e.target.dataset.title.slice(0,4)
      }-${e.target.dataset.title.slice(4, 6)}-${e.target.dataset.title.slice(6)}`;
      document.getElementById("to-date").value = "";
      start = e.target, end = "";
      if (document.getElementById("to-date").disabled) {
        document.getElementsByClassName("datepicker__btn--disalbed")[0]
          .classList.remove("datepicker__btn--disalbed");
        document.getElementById("to-date").disabled = false;
      }
    } else {
      if (+start.dataset.title <= +e.target.dataset.title) {
        check = 0;
        e.target.classList.add("checked");
        document.getElementById("to-date").value = `${e.target.dataset.title.slice(0,4)
        }-${e.target.dataset.title.slice(4, 6)}-${e.target.dataset.title.slice(6)}`;
        end = e.target;
        if (document.getElementById("to-date").disabled) {
          document.getElementsByClassName("datepicker__btn--disalbed")[0]
            .classList.remove("datepicker__btn--disalbed");
          document.getElementById("to-date").disabled = false;
        }
      } else {
        start.classList.remove("checked");
        e.target.classList.add("checked");
        start = e.target;
        document.getElementById("from-date").value = `${e.target.dataset.title.slice(0,4)
        }-${e.target.dataset.title.slice(4, 6)}-${e.target.dataset.title.slice(6)}`;
        if (document.getElementById("to-date").disabled) {
          document.getElementsByClassName("datepicker__btn--disalbed")[0]
            .classList.add("datepicker__btn--disalbed");
          document.getElementById("to-date").disabled = true;
        }
      }
    }
  });

  document.getElementById("calendar__num").addEventListener("mouseover", e => {
    if (check) {
      for (let i = 0; i <= 5; i++) {
        for (let j = 0; j <= 6; j++) {
          let title = document.getElementById("calendar__num").children[i]
            .children[j].dataset.title;
          if ( +start.dataset.title < +title && +e.target.dataset.title >= +title ) {
            document.getElementById("calendar__num")
              .children[i].children[j].classList.add("period");
          }
        }
      }
    }
  });

  document.getElementById("calendar__num").addEventListener("mouseout", e => {
    if (check) {
      for (let i = 0; i <= 5; i++) {
        for (let j = 0; j <= 6; j++) {
          document.getElementById("calendar__num")
            .children[i].children[j].classList.remove("period");
        }
      }
    }
  });
};
calendar();

document.getElementById("calendar__before").addEventListener("click", () => {
  const year =
    document.getElementById("calendar__date").textContent.slice(5) === "01"
      ? document.getElementById("calendar__date").textContent.slice(0, 4) - 1
      : document.getElementById("calendar__date").textContent.slice(0, 4);
  const month =
    document.getElementById("calendar__date").textContent.slice(5) === "01"
      ? 11
      : document.getElementById("calendar__date").textContent.slice(5) - 2;
  calendar(year, month);
});

document.getElementById("calendar__after").addEventListener("click", () => {
  const year =
    document.getElementById("calendar__date").textContent.slice(5) === "12"
      ? +document.getElementById("calendar__date").textContent.slice(0, 4) + 1
      : +document.getElementById("calendar__date").textContent.slice(0, 4);
  const month =
    document.getElementById("calendar__date").textContent.slice(5) === "12"
      ? 0
      : +document.getElementById("calendar__date").textContent.slice(5);
  calendar(year, month);
});

// input box handling

document.getElementById("from-date").addEventListener("change", e => {
  calendar(+e.target.value.slice(0, 4), +e.target.value.slice(5, 7) - 1);
  document.getElementById("from-date")
    .setAttribute("data-title", e.target.value.replace(/-/g, ""));
  document.getElementById("to-date").value = "";
  check = 1, start = e.target, end = "";
  for (let i = 0; i <= 5; i++) {
    for (let j = 0; j <= 6; j++) {
      document.getElementById("calendar__num")
        .children[i].children[j].classList.remove("period", "checked");
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
});

document.getElementById("to-date").addEventListener("change", e => {
  check = 0;
  document.getElementById("to-date")
    .setAttribute("data-title", e.target.value.replace(/-/g, ""));
  if ( +document.getElementById("to-date").dataset.title < +start.dataset.title ) {
    alert("기준일 이후의 날짜를 입력해주세요");
    calendar( +start.dataset.title.slice(0, 4), +start.dataset.title.slice(4, 6) - 1 );
    document.getElementById("to-date").value = "";
    for (let i = 0; i <= 5; i++) {
      for (let j = 0; j <= 6; j++) {
        document.getElementById("calendar__num")
          .children[i].children[j].classList.remove("period", "checked");
        let title = document.getElementById("calendar__num").children[i]
          .children[j].dataset.title;
        if (+start.dataset.title === +title) {
          document.getElementById("calendar__num")
            .children[i].children[j].classList.add("checked");
        }
      }
    }
  } else {
    calendar(+e.target.value.slice(0, 4), +e.target.value.slice(5, 7) - 1);
    check = 0, end = e.target;
    for (let i = 0; i <= 5; i++) {
      for (let j = 0; j <= 6; j++) {
        document.getElementById("calendar__num")
          .children[i].children[j].classList.remove("period", "checked");
        let title = document.getElementById("calendar__num").children[i]
          .children[j].dataset.title;
        if (+start.dataset.title < +title && +end.dataset.title > +title) {
          document.getElementById("calendar__num")
            .children[i].children[j].classList.add("period");
        } else if ( +end.dataset.title === +title || +start.dataset.title === +title ) {
          document.getElementById("calendar__num")
            .children[i].children[j].classList.add("checked");
        }
      }
    }
  }
});

// button handling

document.getElementById("alert").addEventListener("click", () => {
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
    alert(data);
    start = "", end = "";
    len = localStorage.length;
    localStorage.setItem(len, data);
    if (document.getElementById("breakdown").firstChild) {
      let breakdown = document.createElement("p"), text = "";
      text += `- ${localStorage.getItem(len)}`;
      breakdown.innerHTML = text;
      document.getElementById("breakdown").firstChild.appendChild(breakdown);
    } else {
      let breakdown = document.createElement("div"), text = "";
      text += `<p>- ${localStorage.getItem(len)}</p>`;
      breakdown.innerHTML = text;
      document.getElementById("breakdown").appendChild(breakdown);
    }

    document.getElementById("from-date").value = "";
    document.getElementById("to-date").value = "";
    document.getElementById("to-date").disabled = true;
    document.getElementById("to-date__btn")
      .classList.add("datepicker__btn--disalbed");
    calendar();
  } else {
    alert("조회할 날짜를 올바르게 입력해주세요");
  }
});

// breakdown handling

if (localStorage.length) {
  let breakdown = document.createElement("div"), text = "";
  for (let i = 0; i < localStorage.length; i++) {
    text += `<p>- ${localStorage.getItem(i)}</p>`;
  }
  breakdown.innerHTML = text;
  document.getElementById("breakdown").appendChild(breakdown);
}

document.getElementById("breakdown__reset").addEventListener("click", () => {
  localStorage.clear();
  len = 0;
  document.getElementById("breakdown")
    .removeChild(document.getElementById("breakdown").firstChild);
});
