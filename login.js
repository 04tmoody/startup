function login(event) {
    event.preventDefault();

    const name = document.querySelector("#username").value;
    const pass = document.querySelector("#password").value;
    console.log(name+" "+pass);
    //localStorage.setItem("username", nameEl.value);
    window.location.href = "index.html";
}