let adviceNumber = document.getElementById("advice-number");
let button = document.querySelector(".button");
let adviceBox = document.querySelector(".content__box");

let url = "https://api.adviceslip.com/advice";

let getAdvice = async () => {
   try {
      const res = await fetch(url , {cache: "no-cache"});
      const data = await res.json();
      return data
   } catch (err) {
      console.log(err);
   }
}






const onLoadAdvice = async () => {
   const data = await getAdvice();
   const nextAdvice = await getAdvice();
   adviceBox.innerHTML += `<p data-number="${data.slip.id}" class="content__text active">${data.slip.advice}</p>`
   adviceBox.innerHTML += `<p data-number="${nextAdvice.slip.id}" class="content__text next">${nextAdvice.slip.advice}</p>`
   adviceNumber.textContent = `#${data.slip.id}`
}
const changeHandler = async () => {
   const newAdvice = await getAdvice();
   const adviceText = Array.from(document.querySelectorAll(".content__text"));
   adviceText[0].classList.replace("active", "disable");
   adviceText[1].classList.replace("next", "active");
   adviceNumber.textContent = `#${adviceText[1].dataset.number}`
   adviceText[0].addEventListener("transitionend", ()=> {
      adviceBox.removeChild(adviceText[0]);
      adviceBox.innerHTML += `<p data-number="${newAdvice.slip.id}" class="content__text next">${newAdvice.slip.advice}</p>`
   })


}


button.addEventListener("click", changeHandler);
window.addEventListener("DOMContentLoaded", onLoadAdvice);













