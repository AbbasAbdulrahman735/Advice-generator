let button = document.querySelector("button");
let advice = document.querySelector(".advice");
let adviceN = document.querySelector("#advice-number");
if (localStorage.getItem("advice")) {
  let items = JSON.parse(localStorage.getItem("advice"));
  adviceNum = items.num;
  advice.innerText = items.advice;
  adviceN.innerText = items.num;
} else {
  var adviceNum = 0;
  getAdvice();
}
function getAdvice() {
  let request = new XMLHttpRequest();
  request.open(
    "GET",
    "https://api.adviceslip.com/advice?_=" + new Date().getTime()
  );
  request.send();
  request.onreadystatechange = function () {
    if (request.readyState == 4 && request.status == 200) {
      let response = JSON.parse(request.response);
      let adviceAPI = response.slip.advice;
      if ('"' + adviceAPI + '"' == advice.innerText) {
        getAdvice();
      } else {
        adviceNum += 1;
        advice.innerText = '"' + adviceAPI + '"';
        adviceN.innerText = adviceNum;
        saveAdvice(adviceAPI);
      }
    }
  };
}

button.addEventListener("click", getAdvice);
function saveAdvice(adviceAPI) {
  let local = {
    num: adviceNum,
    advice: adviceAPI,
  };
  localStorage.setItem("advice", JSON.stringify(local));
}
