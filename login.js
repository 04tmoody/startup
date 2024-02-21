function login(event) {
    event.preventDefault();

    const name = document.querySelector("#username").value;
    // AUTHENTICATION PLACEHOLDER
    const correctPass = name+"123";
    // ---
    const pass = document.querySelector("#password").value;
    if (pass===correctPass) {
        localStorage.setItem("username", name);
        window.location.href = "index.html";
    } else {
        document.querySelector("#error").style.display="block";
    }
}