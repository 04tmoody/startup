async function login(event) {
    event.preventDefault();
    loginOrCreate(`/api/auth/login`,"");
}

async function create(event) {
    event.preventDefault();
    loginOrCreate(`/api/auth/create`,"2");
}

async function loginOrCreate(endpoint,num="") {
    const username = document.querySelector('#username'+num)?.value;
    const password = document.querySelector('#password'+num)?.value;
    const response = await fetch(endpoint, {
        method: 'post',
        body: JSON.stringify({ name: username, password: password }),
        headers: {
        'Content-type': 'application/json; charset=UTF-8',
        },
});

if (response.ok) {
    localStorage.setItem("username", username);
    useHistory().push('/index.html');
} else {
    document.querySelector("#error"+num).style.display="block";
}
}

function logout() {
    localStorage.removeItem('userName');
    fetch(`/api/auth/logout`, {
      method: 'delete',
    }).then(() => (window.location.href = '/'));
}

function logoutClick(event) {
    localStorage.clear();
    fetch(`/api/auth/logout`, {
        method: 'delete',
    }).then(() => (window.location.href = '/'));
}

async function getUser(name) {
    // See if we have a user with the given email.
    const response = await fetch(`/api/user/${name}`);
    if (response.status === 200) {
      return response.json();
    }
    return null;
}