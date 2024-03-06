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

document.querySelector("#logout").addEventListener('click', function(event) {
    localStorage.clear();
    window.location.href = window.location.href;
});

function updatePage() {
    const user = localStorage.getItem("username");
    if (user) {
        document.querySelector("#login").style.display="none";
        document.querySelector("#logout").style.display="block";
    } else {
        document.querySelector("#logout").style.display="none";
        document.querySelector("#login").style.display="block";
    }
}

updatePage();