"use strict";var check=0,start="",end="",len=localStorage.length,calendar=function(){var a=0<arguments.length&&void 0!==arguments[0]?arguments[0]:new Date().getFullYear(),b=1<arguments.length&&void 0!==arguments[1]?arguments[1]:new Date().getMonth(),c=a,d=b,f=new Date(c,d,1),g=f.getDay(),h=[31,28,31,30,31,30,31,31,30,31,30,31];(0==c%4&&0!=c%100||0==c%400)&&(h[1]=29);var k=h[d],l=1,n=1,o=0===d?h[11]-g+1:h[d-1]-g+1,p="",q=1===(""+(d+1)).length?c+".0"+(d+1):c+"."+(d+1);document.getElementById("calendar__date").textContent=q;for(var r=0;5>=r;r++){p+="<tr>";for(var s=0;6>=s;s++)0===r&&s<g?(p+="<td class=\"calendar__current--not\" data-title=\""+("01"===q.slice(5)?""+(q.slice(0,4)-1):q.slice(0,4))+("01"===q.slice(5)?"12":1===(""+(+q.slice(5)-1)).length?"0"+(+q.slice(5)-1):+q.slice(5)-1)+o+"\">"+o+"</td>",o++):0===r&&0===g?(p+="<td class=\"calendar__current--not\" data-title=\""+("01"===q.slice(5)?""+(q.slice(0,4)-1):q.slice(0,4))+("01"===q.slice(5)?"12":1===(""+(+q.slice(5)-1)).length?"0"+(+q.slice(5)-1):+q.slice(5)-1)+(o-7)+"\">"+(o-7)+"</td>",o++):l>k?(p+="<td class=\"calendar__current--not\" data-title=\""+("12"===q.slice(5)?""+(+q.slice(0,4)+1):q.slice(0,4))+("12"===q.slice(5)?"01":1===(""+(+q.slice(5)+1)).length?"0"+(+q.slice(5)+1):+q.slice(5)+1)+(1===(""+n).length?"0"+n:n)+"\">"+n+"</td>",n++):(p+="<td data-title=\""+q.slice(0,4)+q.slice(5)+(1===(""+l).length?"0"+l:l)+"\">"+l+"</td>",l++);p+="</tr>"}var t=document.createElement("tbody");if(t.setAttribute("id","calendar__num"),t.innerHTML=p,2===document.getElementById("calendar__table").children.length&&document.getElementById("calendar__table").removeChild(document.getElementById("calendar__table").lastChild),document.getElementById("calendar__table").appendChild(t),start&&end)for(var u=0;5>=u;u++)for(var w,v=0;6>=v;v++)w=document.getElementById("calendar__num").children[u].children[v].dataset.title,+start.dataset.title==+w||+end.dataset.title==+w?document.getElementById("calendar__num").children[u].children[v].classList.add("checked"):+start.dataset.title<+w&&+end.dataset.title>+w&&document.getElementById("calendar__num").children[u].children[v].classList.add("calendar__period");else if(start)for(var x=0;5>=x;x++)for(var A,z=0;6>=z;z++)A=document.getElementById("calendar__num").children[x].children[z].dataset.title,+start.dataset.title==+A&&document.getElementById("calendar__num").children[x].children[z].classList.add("checked");t.addEventListener("click",function(B){if("TD"===B.target.tagName)if(0==check){check=1;for(var C=0;5>=C;C++)for(var D=0;6>=D;D++)document.getElementById("calendar__num").children[C].children[D].classList.remove("calendar__period","checked");B.target.classList.add("checked"),document.getElementById("from-date").value=B.target.dataset.title.slice(0,4)+"-"+B.target.dataset.title.slice(4,6)+"-"+B.target.dataset.title.slice(6),document.getElementById("to-date").value="",start=B.target,end="",document.getElementById("to-date").disabled&&(document.getElementsByClassName("datepicker__btn--disalbed")[0].classList.remove("datepicker__btn--disalbed"),document.getElementById("to-date").disabled=!1)}else+start.dataset.title<=+B.target.dataset.title?(check=0,B.target.classList.add("checked"),document.getElementById("to-date").value=B.target.dataset.title.slice(0,4)+"-"+B.target.dataset.title.slice(4,6)+"-"+B.target.dataset.title.slice(6),end=B.target,document.getElementById("to-date").disabled&&(document.getElementsByClassName("datepicker__btn--disalbed")[0].classList.remove("datepicker__btn--disalbed"),document.getElementById("to-date").disabled=!1)):(start.classList.remove("checked"),B.target.classList.add("checked"),start=B.target,document.getElementById("from-date").value=B.target.dataset.title.slice(0,4)+"-"+B.target.dataset.title.slice(4,6)+"-"+B.target.dataset.title.slice(6),document.getElementById("to-date").disabled&&(document.getElementsByClassName("datepicker__btn--disalbed")[0].classList.add("datepicker__btn--disalbed"),document.getElementById("to-date").disabled=!0))}),document.getElementById("calendar__num").addEventListener("mouseover",function(B){if(check)for(var C=0;5>=C;C++)for(var E,D=0;6>=D;D++)E=document.getElementById("calendar__num").children[C].children[D].dataset.title,+start.dataset.title<+E&&+B.target.dataset.title>=+E&&document.getElementById("calendar__num").children[C].children[D].classList.add("calendar__period")}),document.getElementById("calendar__num").addEventListener("mouseout",function(){if(check)for(var C=0;5>=C;C++)for(var D=0;6>=D;D++)document.getElementById("calendar__num").children[C].children[D].classList.remove("calendar__period")})};if(calendar(),document.getElementById("calendar__before").addEventListener("click",function(){var a="01"===document.getElementById("calendar__date").textContent.slice(5)?document.getElementById("calendar__date").textContent.slice(0,4)-1:document.getElementById("calendar__date").textContent.slice(0,4),b="01"===document.getElementById("calendar__date").textContent.slice(5)?11:document.getElementById("calendar__date").textContent.slice(5)-2;calendar(a,b)}),document.getElementById("calendar__after").addEventListener("click",function(){var a="12"===document.getElementById("calendar__date").textContent.slice(5)?+document.getElementById("calendar__date").textContent.slice(0,4)+1:+document.getElementById("calendar__date").textContent.slice(0,4),b="12"===document.getElementById("calendar__date").textContent.slice(5)?0:+document.getElementById("calendar__date").textContent.slice(5);calendar(a,b)}),document.getElementById("from-date").addEventListener("change",function(a){calendar(+a.target.value.slice(0,4),+a.target.value.slice(5,7)-1),document.getElementById("from-date").setAttribute("data-title",a.target.value.replace(/-/g,"")),document.getElementById("to-date").value="",check=1,start=a.target,end="";for(var b=0;5>=b;b++)for(var c=0;6>=c;c++)document.getElementById("calendar__num").children[b].children[c].classList.remove("calendar__period","checked"),a.target.dataset.title===document.getElementById("calendar__num").children[b].children[c].dataset.title&&document.getElementById("calendar__num").children[b].children[c].classList.add("checked");document.getElementById("to-date").disabled&&(document.getElementsByClassName("datepicker__btn--disalbed")[0].classList.remove("datepicker__btn--disalbed"),document.getElementById("to-date").disabled=!1)}),document.getElementById("to-date").addEventListener("change",function(a){if(check=0,document.getElementById("to-date").setAttribute("data-title",a.target.value.replace(/-/g,"")),+document.getElementById("to-date").dataset.title<+start.dataset.title){alert("\uAE30\uC900\uC77C \uC774\uD6C4\uC758 \uB0A0\uC9DC\uB97C \uC785\uB825\uD574\uC8FC\uC138\uC694"),calendar(+start.dataset.title.slice(0,4),+start.dataset.title.slice(4,6)-1),document.getElementById("to-date").value="";for(var b=0;5>=b;b++)for(var c=0;6>=c;c++){document.getElementById("calendar__num").children[b].children[c].classList.remove("calendar__period","checked");var d=document.getElementById("calendar__num").children[b].children[c].dataset.title;+start.dataset.title==+d&&document.getElementById("calendar__num").children[b].children[c].classList.add("checked")}}else{calendar(+a.target.value.slice(0,4),+a.target.value.slice(5,7)-1),check=0,end=a.target;for(var f=0;5>=f;f++)for(var g=0;6>=g;g++){document.getElementById("calendar__num").children[f].children[g].classList.remove("calendar__period","checked");var h=document.getElementById("calendar__num").children[f].children[g].dataset.title;+start.dataset.title<+h&&+end.dataset.title>+h?document.getElementById("calendar__num").children[f].children[g].classList.add("calendar__period"):(+end.dataset.title==+h||+start.dataset.title==+h)&&document.getElementById("calendar__num").children[f].children[g].classList.add("checked")}}}),document.getElementById("alert").addEventListener("click",function(){var a=document.getElementById("from-date").value,b=document.getElementById("to-date").value;if(a&&b){var c=a.replace("-","\uB144 ").replace("-","\uC6D4 ")+"\uC77C ~ "+b.replace("-","\uB144 ").replace("-","\uC6D4 ")+"\uC77C (\uCD1D "+((new Date(+b.slice(0,4),+b.slice(5,7)-1,+b.slice(8))-new Date(+a.slice(0,4),+a.slice(5,7)-1,+a.slice(8)))/1e3/60/60/24+1)+"\uC77C)";if(alert(c),start="",end="",len=localStorage.length,localStorage.setItem(len,c),document.getElementById("breakdown").firstChild){var d=document.createElement("p"),f="";f+="- "+localStorage.getItem(len),d.innerHTML=f,document.getElementById("breakdown").firstChild.appendChild(d)}else{var g=document.createElement("div"),h="";h+="<p>- "+localStorage.getItem(len)+"</p>",g.innerHTML=h,document.getElementById("breakdown").appendChild(g)}document.getElementById("from-date").value="",document.getElementById("to-date").value="",document.getElementById("to-date").disabled=!0,document.getElementById("to-date__btn").classList.add("datepicker__btn--disalbed"),calendar()}else alert("\uC870\uD68C\uD560 \uB0A0\uC9DC\uB97C \uC62C\uBC14\uB974\uAC8C \uC785\uB825\uD574\uC8FC\uC138\uC694")}),localStorage.length){for(var breakdown=document.createElement("div"),i=0;i<localStorage.length;i++)"<p>- "+localStorage.getItem(i)+"</p>";breakdown.innerHTML=text,document.getElementById("breakdown").appendChild(breakdown)}document.getElementById("breakdown__reset").addEventListener("click",function(){localStorage.clear(),len=0,document.getElementById("breakdown").removeChild(document.getElementById("breakdown").firstChild)});