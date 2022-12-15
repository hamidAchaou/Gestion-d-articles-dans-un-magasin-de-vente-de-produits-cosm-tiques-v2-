"use strict";
// ======================-- Declaration --===================================
let titele = document.getElementById(`name`);
let marque = document.getElementById(`marque`);
let price = document.getElementById(`price`);
let date = document.getElementById(`date`);
let type = document.getElementById("typ-pro");
let promotion = document.querySelector("form").elements.namedItem("promotion");
let count = document.getElementById(`count`);
let create = document.getElementById(`create`);
let details = document.getElementById("infosdetailes");
let divDetails = document.getElementById("details");
// message error
let resultName = document.getElementById("resultName");
let resultMarque = document.getElementById("resultMarque");
let resultPrix = document.getElementById("resultPrix");
let resultdate = document.getElementById("resultdate");
let resulttyp = document.getElementById("resultTyp");
let regNam = /^[a-z\s]{2,15}$/i;
let msgArr = [];

var arr = [];
let mode = "createPro";
let tmp;

// Class OOP
class Article {
  constructor(titele, marque, price, date, type, promotion) {
    this.titele = titele;
    this.marque = marque;
    this.price = price;
    this.date = date;
    this.type = type;
    this.promotion = promotion;
  }
  modelinfo() {
    return `
    <p>Nom: ${titele.value}</p>
    <p>marque: ${marque.value}</p> 
    <p>price: ${price.value} DH</p>
    <p>date: ${date.value}</p> 
    <p>type: ${type.value}</p> 
    <p>promotion: ${promotion.value}</p>
`;
  }
}
// Clear Inpt
function clearInput() {
  document.getElementById("name").value = "";
  document.getElementById("marque").value = "";
  document.getElementById("price").value = "";
  document.getElementById("date").value = "";
  // document.getElementById('typ-pro').value = "";
  document.getElementById("count").value = "";
}

// function modale create
function modaldetails(obj) {
  divDetails.innerHTML = obj.modelinfo();
  details.style.display = "block";
}
// Create Product in submit
create.addEventListener("click", (e) => {
  e.preventDefault();

  msgArr.length = 0;
  validInp()
  // create Object Product
  let productOne = new Article(
    titele.value,
    marque.value,
    price.value,
    date.value,
    type.value,
    promotion.value
  );
// Validation and create one element or more and adding an element after modifying it
  if (msgArr.length === 4) {
    let titelMg =document.getElementById("titelMg");
    titelMg.style.display = "block"
    let titelAdd =document.getElementById("titelAdd");
    titelAdd.style.display = "block"
    if (mode === "createPro") {
      if (count.value > 1) {
        for (let i = 0; i < count.value; i++) {
          arr.push(productOne);
        }
        modaldetails(productOne);
        clearInput();
      } else {
        arr.push(productOne);
        modaldetails(productOne);
        clearInput();
      }
    } else {
      arr[tmp] = productOne;
      modaldetails(productOne);
      mode = "createPro";
      create.innerHTML = "create";
      count.style.display = "block";
    clearInput();
    }
  } else {
    let titelMg =document.getElementById("titelMg");
    titelMg.style.display = "none"
    let titelAdd =document.getElementById("titelAdd");
    titelAdd.style.display = "none"

    scroll({
      top: 0,
    });
  }
  // sort element
  arr.sort((a, b) => a.titele.localeCompare(b.titele));
  // append in Locale storage
  localStorage.setItem("product", JSON.stringify(arr));
  showData();
});

// <!-- button model create -->
function hidedetails() {
  details.style.display = "none";
}
// <!-- function Create Product -->

function showData() {
  let table = "";
  for (let i = 0; i < arr.length; i++) {
    table += `
        <tr>
            <th>${i}</th>
            <th>${arr[i].titele}</th>
            <th>${arr[i].marque}</th>
            <th>${arr[i].price} DH</th>
            <th>${arr[i].date}</th>
            <th>${arr[i].type}</th>
            <th>${arr[i].promotion}</th>
            <th id="delet"><button id="btn-edit" onclick="update(${i})">EDIT</button></th>
            <th id="edit"><button id="btn-delet" onclick="deletProduct(${i})">DELETE</button></th>
        </tr>
            `;
  }
  document.getElementById("tbody").innerHTML = table;
  let btnDelet = document.getElementById("delet-All");
  if (arr.length > 0) {
    btnDelet.innerHTML = `
            <button onclick="deletAll()">delet All (${arr.length})</button>
            `;
  } else {
    btnDelet.innerHTML = "";
  }
}
// <!-- Show localStorage in array and sort product -->
if (localStorage.product != null) {
  arr = JSON.parse(localStorage.product);
  arr.sort((a, b) => a.titele.localeCompare(b.titele));
}
showData();

// <!-- delet Product-->
function deletProduct(i) {
  let confirmation = document.getElementById("confirmation");
  confirmation.style.display = "block";
  let deletePro = document.getElementById("deletePro");
  deletePro.onclick = function () {
    arr.splice(i, 1);
    localStorage.product = JSON.stringify(arr);
    showData();
    confirmation.style.display = "none";
  };
}
let cancel = document.getElementById("cancel");
cancel.onclick = function () {
  confirmation.style.display = "none";
};

// <!-- delet All-->
function deletAll() {
  let confirmation = document.getElementById("confirmation");
  confirmation.style.display = "block";
  let deletePro = document.getElementById("deletePro");
  deletePro.onclick = function () {
    arr.splice(0);
    localStorage.clear();
    showData();
    confirmation.style.display = "none";
  };
}
// <!-- Updit Prouduct-->
function update(i) {
  titele.value = arr[i].titele;
  marque.value = arr[i].marque;
  price.value = arr[i].price;
  date.value = arr[i].date;
  type.value = arr[i].type;
  count.style.display = "none";
  create.innerHTML = "update";
  mode = "updatePro";
  tmp = i;
  scroll({
    top: 0,
  });
}
// function validation input
function validInp() {
    // Validation Name
    if (regNam.test(titele.value) === false) {
      resultName.innerHTML = "seules les lettres sont autorisees";
      resultName.style.color = "red";
      titele.style.border = "1px solid red";
    } else {
      titele.style.border = "none";
      resultName.innerHTML = "";
      msgArr.push(true);
    }
    // Validation marque
    if (regNam.test(marque.value) === false) {
      resultMarque.innerHTML = "seules les lettres sont autorisees";
      resultMarque.style.color = "red";
      marque.style.border = "1px solid red";
    } else {
      marque.style.border = "none";
      resultMarque.innerHTML = "";
      msgArr.push(true);
    }
    // Validation price
    if (price.value === "") {
      resultPrix.innerHTML = "seules les lettres sont autorisees";
      resultMarque.style.border = "red";
      price.style.border = "1px solid red";
    } else {
      price.style.border = "none";
      resultPrix.innerHTML = "";
      msgArr.push(true);
    }
    // Validation date
    if (date.value === "") {
      resultdate.innerHTML = "seules les lettres sont autorisees";
      resultdate.style.color = "red";
      date.style.color = "red";
      date.style.border = "1px solid red";
    } else {
      date.style.border = "none";
      date.style.color = "#fff";
      resultdate.innerHTML = "";
      msgArr.push(true);
    }
}