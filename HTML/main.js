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

  document.getElementById("calendar__date").textContent =
    ("" + (m + 1)).length === 1 ? `${y}.0${m + 1}` : `${y}.${m + 1}`;

  for (let i = 0; i < 6; i++) {
    text += "<tr>";
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < theDay) {
        text += `<td class="calendar__current--not" data-title="${i}${j}">${beforeNum}</td>`;
        beforeNum++;
      } else if (i === 0 && theDay === 0) {
        text += `<td class="calendar__current--not" data-title="${i}${j}">${beforeNum -
          7}</td>`;
        beforeNum++;
      } else if (currentNum > lastDate) {
        text += `<td class="calendar__current--not" data-title="${i}${j}">${nextNum}</td>`;
        nextNum++;
      } else {
        text += `<td class="calendar__currnet" data-title="${i}${j}">${currentNum}</td>`;
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
};
calendar();

