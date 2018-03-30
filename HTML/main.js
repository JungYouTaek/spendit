// Array.prototype.forEach.call(
//   document.getElementsByClassName("datepicker__input"),
//   input => (input.value = new Date().toISOString().slice(0, 10))
// );
let check = 0, start;
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
  if ((y % 4 === 0 && y % 100 !== 0) || y % 400 === 0) {
    monthDate[1] = 29;
  }
  let lastDate = monthDate[m],
    currentNum = 1,
    nextNum = 1,
    beforeNum =
      m === 0 ? monthDate[11] - theDay + 1 : monthDate[m - 1] - theDay + 1,
    text = "";
    displayDate = ("" + (m + 1)).length === 1 ? `${y}.0${m + 1}` : `${y}.${m + 1}`;

  document.getElementById("calendar__date").textContent = displayDate;

  for (let i = 0; i < 6; i++) {
    text += "<tr>";
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < theDay) {
        text += `<td class="calendar__current--not" data-title="${displayDate.slice(5) === '01' ? ''+(displayDate.slice(0,4) - 1) : displayDate.slice(0,4)}${displayDate.slice(5) === '01' ? '12' : displayDate.slice(5)-1}${beforeNum}">${beforeNum}</td>`;
        beforeNum++;
      } else if (i === 0 && theDay === 0) {
        text += `<td class="calendar__current--not" data-title="${displayDate.slice(5) === '01' ? ''+(displayDate.slice(0,4) - 1) : displayDate.slice(0,4)}${displayDate.slice(5) === '01' ? '12' : displayDate.slice(5)-1}${beforeNum - 7}">${beforeNum -
          7}</td>`;
        beforeNum++;
      } else if (currentNum > lastDate) {
        text += `<td class="calendar__current--not" data-title="${displayDate.slice(5) === '12' ? ''+(+displayDate.slice(0,4) + 1) : displayDate.slice(0,4)}${displayDate.slice(5) === '12' ? '01' : (''+(+displayDate.slice(5)+1)).length === 1 ? '0'+(+displayDate.slice(5)+1) : +displayDate.slice(5)+1}${(''+nextNum).length === 1 ? '0'+nextNum : nextNum}">${nextNum}</td>`;
        nextNum++;
      } else {
        text += `<td class="calendar__currnet" data-title="${displayDate.slice(0,4)}${displayDate.slice(5)}${currentNum}">${currentNum}</td>`;
        currentNum++;
      }
    }
    text += "</tr>";
  }

  let child = document.createElement("tbody");
  child.setAttribute("id", "calendar__num");
  child.innerHTML = text;
  if (document.getElementById("calendar__table").children.length === 2) {
    document
      .getElementById("calendar__table")
      .removeChild(document.getElementById("calendar__table").lastChild);
  }
  document.getElementById("calendar__table").appendChild(child);

  child.addEventListener("click", e => {
    if (check === 0) {
      check++;
      for ( let i = 0; i <= 5; i++ ) {
        for ( let j = 0; j <= 6; j++ ) {
          document.getElementById('calendar__num').children[i].children[j].classList.remove('someclass');
          document.getElementById('calendar__num').children[i].children[j].classList.remove('checked')
        }
      }
      e.target.setAttribute("class", "checked");
      const date =
        e.target.textContent.length === 1
          ? "0" + e.target.textContent
          : e.target.textContent;
      document.getElementsByClassName(
        "datepicker__input"
      )[0].value = `${document
        .getElementById("calendar__date")
        .textContent.slice(0, 4)}-${document
        .getElementById("calendar__date")
        .textContent.slice(5)}-${date}`;
      start = e.target.dataset.title;
    } else {
      check--;
      e.target.setAttribute("class", "checked");
      const date =
        e.target.textContent.length === 1
          ? "0" + e.target.textContent
          : e.target.textContent;
      document.getElementsByClassName(
        "datepicker__input"
      )[1].value = `${document
        .getElementById("calendar__date")
        .textContent.slice(0, 4)}-${document
        .getElementById("calendar__date")
        .textContent.slice(5)}-${date}`;
    }
  });

  document.getElementById("calendar__num").addEventListener("mouseover", e => {
    if (check) {
      for (let i = +start[0]; i <= +e.target.dataset.title[0]; i++) {
        for (let j = 0; j <= 6; j++) {
          if (+e.target.dataset.title > +start) {
            if (start[0] === e.target.dataset.title[0]) {
              if (j > +start[1] && j <= +e.target.dataset.title[1]) {
                document
                  .getElementById("calendar__num")
                  .children[i].children[j].classList.add("someclass");
              }
            } else {
              if (
                (i === +start[0] && j > +start[1]) ||
                (i > +start[0] && i < +e.target.dataset.title[0]) ||
                (i === +e.target.dataset.title[0] &&
                  j <= +e.target.dataset.title[1])
              ) {
                document
                  .getElementById("calendar__num")
                  .children[i].children[j].classList.add("someclass");
              }
            }
          }
        }
      }
    }
  });

  document.getElementById("calendar__num").addEventListener("mouseout", e => {
    if ( check ) {
      for ( let i = 0; i <= 5; i++ ) {
        for ( let j = 0; j <= 6; j++ ) {
          document.getElementById('calendar__num').children[i].children[j].classList.remove('someclass')
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
