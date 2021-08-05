const weatherForm = document.querySelector("form");
const inputBox = document.querySelector("input");
const message1 = document.querySelector("#message1");
const message2 = document.querySelector("#message2");
weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = inputBox.value; //value is an attribute of input element
  message1.textContent = "loading...."; //before fetch and inside event listener cause need to show after submission
  message2.textContent = "";

  fetch("/weather?address=" + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        //console.log(data.error);
        message1.textContent = data.error;
      } else {
        message1.textContent = data.location;
        message2.textContent = data.Forcast;
      }
    });
  });
  console.log(location);
});
