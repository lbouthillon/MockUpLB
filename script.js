function fact(n) {
  if (n == 0) {
    return 1;
  } else {
    return n * fact(n - 1);
  }
}

function applique(f, tab) {
  return tab.map(f);
}

console.log(fact(6));

console.log(applique(fact, [1, 2, 3, 4, 5, 6]));

console.log(applique(function(n) { return (n + 1); }, [1, 2, 3, 4, 5, 6]));

var serverAdress = "http://localhost:8080";

fetch(serverAdress+"/msg/getAll")
  .then(function(response) {
    return response.json();
  }).then(function(liste) {
    update(liste);
    return 0;
  })


function convertMsgToHtml(text, id) {
  newItem = document.createElement("li")
  newItem.classList.add('msg');
  newItem.classList.add('neonborder');
  newItem.id = 'msg' + id;
  newItem.textContent = text;
  deleteButton = document.createElement("button")
  deleteButton.textContent = "Supprimer";
  deleteButton.onclick = () => delMsg(id);
  newItem.appendChild(deleteButton);
  return newItem;
}

function update(msg) {
  var liste = document.getElementById("msgs");
  liste.innerHTML = "";
  newListe = applique(convertMsgToHtml, msg);
  newListe.forEach
    (function(elem) { liste.appendChild(elem) })
}

function sendMsg(msg) {
  fetch(serverAdress+"/msg/post/" + msg)
    .then(function(response) {
      return response.json();

    })
    .then(function(data) {
      fetch(serverAdress+"/msg/getAll")
        .then(function(response) {
          return response.json();
        }).then(function(liste) {
          update(liste);
          return 0;
        })
      return 0;
    })
}

function delMsg(id) {
  fetch(serverAdress+"/msg/del/" + id)
    .then(function(response) {
      return response.json();
    }).then(function(data) {
      fetch(serverAdress+"/msg/getAll")
        .then(function(response) {
          return response.json();
        }).then(function(liste) {
          update(liste);
          return 0;
        })
      return 0;
    })
}

function sendServerAdress(adr) {
  serverAdress = adr;
  fetch(serverAdress+"/msg/getAll")
  .then(function(response) {
    return response.json();
  }).then(function(liste) {
    update(liste);
    return 0;
  })
}

