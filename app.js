function postData(url = "", data = {}) {
  // Значения по умолчанию обозначены знаком *
  return fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, cors, *same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json"
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrer: "no-referrer", // no-referrer, *client
    body: JSON.stringify(data) // тип данных в body должен соответвовать значению заголовка "Content-Type"
  }).then(response => response.json()); // парсит JSON ответ в Javascript объект
}
if (window.localStorage.getItem("Author Name")) {
  document
    .getElementById("app")
    .removeChild(document.getElementById("autofication"));
  document.getElementById("app").style.position = "absolute";
  document.getElementById("app").style.left = "30%";
  document.getElementById("app").style.top = "30px";
  var input = document.createElement("input");
  input.id = "message";
  input.placeholder = "Enter your message...";
  input.className = "form-control";
  input.style.width = "300px";
  input.style.display = "inline-block";
  document.getElementById("app").appendChild(input);
  var button = document.createElement("button");
  button.className = "btn btn-outline-dark";
  button.style.marginLeft = "10px";
  button.style.marginTop = "-5px";
  button.innerText = "Post";
  button.id = "post";
  document.getElementById("app").appendChild(button);
  document.getElementById("post").onclick = e => {
      e.stopPropagation(      )
      e.preventDefault()
    postData("http://localhost:3000/comments", userMessage());
  };
  var darkTheme = document.createElement("input");
  darkTheme.type = "checkbox";
  var p = document.createElement("p");
  p.innerText = "Do the dark theme here ===>";
  document.getElementById("app").appendChild(p);
  p.style.marginLeft = "20px";
  p.style.display = "inline-block";
  darkTheme.style.display = "inline-block";
  darkTheme.style.marginLeft = "15px";
  document.getElementById("app").appendChild(darkTheme)                 ;
  function getMessages ()  {
    var id = 0 
    fetch('http://localhost:3000/comments').then(response => response.json()).then(myJSON => {
    id = myJSON[myJSON.length - 1].id  
    for(var i = 0; i < myJSON.length; i++){
        var div = document.createElement("div")
        div.style.color = "white"
        div.style.backgroundColor = "#3d3d3b"
        div.style.padding = "20px"
        div.style.border = "2px solid #82817f"
        div.style.marginBottom = "15px"
        div.style.borderRadius = "20px"
        div.innerText = `Author :   ${myJSON[i].author}    Message:   ${myJSON[i].message}`
        document.getElementById("app").appendChild(div)
      }
    
    })
    setInterval(fetch(`http://localhost:3000/comments/?start=${id}`).then(response => response.json()).then(myJSON => {
      id = myJSON[myJSON.length - 1].id  
      for(var i = 0; i < myJSON.length; i++){
          var div = document.createElement("div")
          div.style.color = "white"
          div.style.backgroundColor = "#3d3d3b"
          div.style.padding = "20px"
          div.style.border = "2px solid #82817f"
          div.style.marginBottom = "15px"
          div.style.borderRadius = "20px"
          div.innerText = `Author :   ${myJSON[i].author}    Message:   ${myJSON[i].message}`
          document.getElementById("app").appendChild(div)
        }
      
      }), 1000)
  }
  getMessages()
  darkTheme.onclick = () => {
    if (darkTheme.checked) {
      window.localStorage.setItem("Theme Style", "black");
      document.body.style.backgroundColor = "black";
      p.style.color = "white";
      button.className = "btn btn-light";
      var btn = document.createElement("button");
      btn.innerText = "White Theme";
      btn.className = "btn btn-light";
      btn.onclick = () => {
        window.localStorage.removeItem("Theme Style");
        darkTheme.checked = false;
        document.body.removeChild(btn);
        document.body.style.backgroundColor = "white";
        p.style.color = "black";
        button.className = "btn btn-outline-dark";
      };
      document.body.appendChild(btn);
    }
    if (window.localStorage.getItem("Theme Style")) {
      darkTheme.checked = "true";
    }
  };
}

if (!window.localStorage.getItem("Author Name")) {
  document.getElementById("autofication").style.position = "absolute";
  document.getElementById("autofication").style.left = "30%";
  document.getElementById("autofication").style.top = "50%";
  var submitName = document.getElementById("submitName");
  submitName.className += "btn btn-outline-dark";
  submitName.style.marginTop = "-5px";
  submitName.style.height = "35px";
  var input = document.getElementById("name");
  input.className += "form-control";
  input.style.width = "300px";
  input.style.display = "inline-block";
  input.style.marginRight = "20px";
  input.style.marginLeft = "20px";
  input.placeholder = "Enter your name ...    ";
  var darkTheme = document.createElement("input");
  darkTheme.type = "checkbox";
  var p = document.createElement("p");
  p.innerText = "Do the dark theme here ===>";
  document.getElementById("autofication").appendChild(p);
  p.style.marginLeft = "20px";
  p.style.display = "inline-block";
  darkTheme.style.display = "inline-block";
  darkTheme.style.marginLeft = "15px";
  document.getElementById("autofication").appendChild(darkTheme);
  
  darkTheme.onclick = () => {
    if (darkTheme.checked) {
      window.localStorage.setItem("Theme Style", "black");
      document.body.style.backgroundColor = "black";
      p.style.color = "white";
      submitName.className = "btn btn-light";
      var btn = document.createElement("button");
      btn.innerText = "White Theme";
      btn.className = "btn btn-light";
      btn.onclick = () => {
        window.localStorage.removeItem("Theme Style");
        darkTheme.checked = false;
        document.body.removeChild(btn);
        document.body.style.backgroundColor = "white";
        p.style.color = "black";
        submitName.className = "btn btn-outline-dark";
      };
      document.body.appendChild(btn);
    }
    if (window.localStorage.getItem("Theme Style")) {
      darkTheme.checked = "true";
    }
  };
  submitName.onclick = e => {
    e.preventDefault();
    localStorage.setItem("Author Name", document.getElementById("name").value);
    document
      .getElementById("app")
      .removeChild(document.getElementById("autofication"));
    document.getElementById("app").style.position = "absolute";
    document.getElementById("app").style.left = "30%";
    document.getElementById("app").style.top = "30px";
    var input = document.createElement("input");
    input.id = "message";
    input.placeholder = "Enter your message...";
    input.className = "form-control";
    input.style.width = "300px";
    input.style.display = "inline-block";
    document.getElementById("app").appendChild(input);
    var button = document.createElement("button");
    button.className = "btn btn-outline-dark";
    button.style.marginLeft = "10px";
    button.innerText = "Post";
    button.id = "post";
    document.getElementById("app").appendChild(button);
    document.getElementById("post").onclick = e => {
        e.stopPropagation()
        e.preventDefault()
        postData("http://localhost:3000/comments", userMessage());
      };
    var darkTheme = document.createElement("input");
    darkTheme.type = "checkbox";
    var p = document.createElement("p");
    p.id = "p";
    p.innerText = "Do the dark theme here ===>";
    document.getElementById("app").appendChild(p);
    p.style.marginLeft = "20px";
    p.style.display = "inline-block";
    darkTheme.style.display = "inline-block";
    darkTheme.style.marginLeft = "15px";
    document.getElementById("app").appendChild(darkTheme);
    function getMessages ()  {
      var id = 0 
      fetch('http://localhost:3000/comments').then(response => response.json()).then(myJSON => {
      id = myJSON[myJSON.length - 1].id  
      for(var i = 0; i < myJSON.length; i++){
          var div = document.createElement("div")
          div.style.color = "white"
          div.style.backgroundColor = "#3d3d3b"
          div.style.padding = "20px"
          div.style.border = "2px solid #82817f"
          div.style.marginBottom = "15px"
          div.style.borderRadius = "20px"
          div.innerText = `Author :   ${myJSON[i].author}    Message:   ${myJSON[i].message}`
          document.getElementById("app").appendChild(div)
        }
      
      })
      setInterval(fetch(`http://localhost:3000/comments/?start=${id}`).then(response => response.json()).then(myJSON => {
        id = myJSON[myJSON.length - 1].id  
        for(var i = 0; i < myJSON.length; i++){
            var div = document.createElement("div")
            div.style.color = "white"
            div.style.backgroundColor = "#3d3d3b"
            div.style.padding = "20px"
            div.style.border = "2px solid #82817f"
            div.style.marginBottom = "15px"
            div.style.borderRadius = "20px"
            div.innerText = `Author :   ${myJSON[i].author}    Message:   ${myJSON[i].message}`
            document.getElementById("app").appendChild(div)
          }
        
        }), 1000)
    }
    getMessages()
    darkTheme.onclick = () => {
      if (darkTheme.checked) {
        window.localStorage.setItem("Theme Style", "black");
        document.body.style.backgroundColor = "black";
        p.style.color = "white";
        submitName.className = "btn btn-light";
        var btn = document.createElement("button");
        btn.innerText = "White Theme";
        btn.className = "btn btn-light";``
        btn.onclick = () => {
          window.localStorage.removeItem("Theme Style");
          darkTheme.checked = false;
          document.body.removeChild(btn);
          document.body.style.backgroundColor = "white";
          p.style.color = "black";
          button.className = "btn btn-outline-white";
        };
        document.body.appendChild(btn);
      }
    };
    if (window.localStorage.getItem("Theme Style")) {
      darkTheme.checked = "true";
    } else {
      window.localStorage.removeItem("Theme Style");
      darkTheme.checked = false;
      document.body.removeChild(btn);
      document.body.style.backgroundColor = "white";
      p.style.color = "black";
      submitName.className = "btn btn-outline-dark";
    }
  };
}
function userMessage() {
  var data = {};
  data["author"] = localStorage.getItem("Author Name");
  data["time"] = Date.now();
  data["message"] = document.getElementById("message").value;
  return data;
}

if (window.localStorage.getItem("Theme Style")) {
  darkTheme.checked = "true";
}
if (darkTheme.checked) {
  window.localStorage.setItem("Theme Style", "black");
  document.body.style.backgroundColor = "black";
  p.style.color = "white";
  
  document.getElementById("post").className = "btn btn-light";

  var btn = document.createElement("button");
  btn.innerText = "White Theme";
  btn.className = "btn btn-light";
  btn.onclick = () => {
    window.localStorage.removeItem("Theme Style");
    darkTheme.checked = false;
    document.body.removeChild(btn);
    document.body.style.backgroundColor = "white";
    p.style.color = "black";
    submitName.className = "btn btn-outline-dark";
  };
  document.body.appendChild(btn);
if (window.localStorage.getItem("Theme Style")) {
  darkTheme.checked = "true";
} else {
  window.localStorage.removeItem("Theme Style");
  darkTheme.checked = false;
  document.body.removeChild(btn);
  document.body.style.backgroundColor = "white";
  p.style.color = "black";
  submitName.className = "btn btn-outline-dark";
}
}
