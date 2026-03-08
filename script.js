function openTab(tabId) {
    const contents = document.querySelectorAll('.content');
    contents.forEach(content => content.classList.remove('active'));

    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => btn.classList.remove('active'));

    document.getElementById(tabId).classList.add('active');

    event.currentTarget.classList.add('active');
}

let localStorVal = localStorage.getItem('usersList');

let usersList = [];

if (localStorVal) {
    usersList = JSON.parse(localStorVal);
};

function userRegistration() {
    let userName = document.getElementById('registrationusername').value;
    let userEmail = document.getElementById('registrationuseremail').value;
    let userPassword = document.getElementById('registrationuserpassword').value;

    for (let i = 0; i < usersList.length; i++) {
        if (usersList[i].Email == userEmail) {
            alert('Already Registration Account on this Email');
            return;
        };
        if (usersList[i].Password == userPassword) {
            alert('Already Registration Account on this Password');
            return;
        };
    };

    if (userEmail === "") {
        alert("Email address required.");
        return;
    } else if (userEmail.slice(-4) != ".com") {
        alert("Email address Invalid.");
        return;
    };

    let strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;

    if (userPassword === "") {
        alert("Password required.");
        return;
    } else if (strongPasswordRegex.test(userPassword)) {

        usersObj = {
            Name: userName,
            Email: userEmail,
            Password: userPassword
        };

        usersList.push(usersObj);

        let converUserToStr = JSON.stringify(usersList);

        localStorage.setItem('userList', converUserToStr);
    } else {
        document.getElementById('strongpasswordregex').innerText = 'Weak Password, Try again to Strong Password For Registration! ex. Password must contains minimum 8 to maximize 15 characters, at least one uppercase letter, one lowercase letter, one number, and one special character';
        return;
    };

    alert('Registration generated successfully');
};

function userLogin() {
    let userEmail = document.getElementById('loginuseremail').value;
    let userPassword = document.getElementById('loginuserpassword').value;

    let currentUser = false;

    for (let i = 0; i < usersList.length; i++) {
        if (usersList[i].Email == userEmail) {
            currentUser = usersList[i];
            break;
        };
    };

    if (currentUser) {

        if (currentUser.Password == userPassword) {
            window.location.pathname = '/SMIT-Student-Portal-Login-Registration-using-Localstorage/Dashboard.html'
        } else {
            alert('Password Did Not Matched')
        };

    } else {
        alert('Account Not Registration with this email');
    };

};
