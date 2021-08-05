// console.log("I am Drowning");
// fetch("http://puzzle.mead.io/puzzle").then((response) => {
//   response.json().then((data) => console.log(data));
// // });
// fetch("http://localhost:5000/weather?address=dhanbad").then((response) => {
//   response.json().then((data) => {
//     if (data.error) {
//       console.log(data.error);
//     } else {
//       console.log(data.location);
//       console.log(data.Forcast);
//     }
//   });
// });

const weatherForm = document.querySelector("form");
const inputBox = document.querySelector("input");
const message1 = document.querySelector("#message1");
const message2 = document.querySelector("#message2");
weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = inputBox.value; //value is an attribute of input element
  message1.textContent = "loading...."; //before fetch and inside event listener cause need to show after submission
  message2.textContent = "";

  fetch("http://localhost:5000/weather?address=" + location).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          //console.log(data.error);
          message1.textContent = data.error;
        } else {
          message1.textContent = data.location;
          message2.textContent = data.Forcast;
        }
      });
    }
  );
  console.log(location);
});
