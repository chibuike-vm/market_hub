/* let url = location.search;
let queryParameters = new URLSearchParams(url);

let queryArray = ["fullname", "username", "pword", "confirm-pword", "phone-number", "email-address", "status"];
/* 
for (let i = 0; i < 6; i++) {	
	console.log(queryParameters.get(queryArray[i]), `: ${queryArray[i]}`);
	localStorage.setItem(queryArray[i], queryParameters.get(queryArray[i]));
} */

let appData = {
    submitButton: document.getElementById("submitbutton"),
    loginButton: document.getElementById("login"),
    spanElement: document.getElementById("user_id"),
    hamburgerUl: document.getElementById("hamburger_ul"),
    htmlElement: document.getElementsByTagName("html"),
    queryArray: [
        "fullname",
        "username",
        "pword",
        "confirm_pword",
        "phone_number",
        "email_address",
        "status",
    ],
    formInputs: document.querySelectorAll("input"),
    webPage: window.location.href,
};

let dashboardData = {
    storeJSONButton: document.getElementById("store_json"),
    retrieveJSONButton: document.getElementById("retrieve_json"),
    displayListData: document.getElementById("display_msg"),
    feedBackParagraph: document.getElementById("feed_back_msg"),
    chngeYourUnameButton: document.getElementById("button_id"),
    chngeYourUnameArtDisplay: document.getElementById("article_display"),
    chngeYourUnameInput: document.getElementById("username_id"),
    chngeYourUnameSubmitButton: document.getElementById("submit_id"),
    returnSubmitMsg: document.getElementById("return_info"),
    timeInsert: document.getElementById("time_insert"),
};

function registerUser(eventObject, feedback) {
    feedback = document.getElementById("feedback");

    for (let i = 0; i < appData.queryArray.length; i++) {
        if (appData.formInputs[i].validity.valueMissing === false) {
            localStorage.setItem(
                appData.queryArray[i],
                appData.formInputs[i].value
            );
        }
    }

    if (appData.formInputs[2].value !== appData.formInputs[3].value) {
        feedback.textContent = "Passwords don't match!";
        feedback.removeAttribute("class");
        eventObject.preventDefault();
    } else {
        feedback.setAttribute("class", "feedback");
    }
}

if (appData.submitButton !== null) {
    appData.submitButton.addEventListener("click", registerUser);
}

function loginUser(eventObject, storedPassword, storedEmail) {
    storedPassword = localStorage.getItem("pword");
    storedEmail = localStorage.getItem("email_address");

    if (
        appData.formInputs[0].validity.valueMissing === false &&
        appData.formInputs[1].validity.valueMissing === false
    ) {
        if (
            storedEmail === appData.formInputs[0].value &&
            storedPassword === appData.formInputs[1].value
        ) {
            location.href = "./dashboard.html";
        } else {
            feedback.textContent = "Invalid Email or Password!";
        }

        eventObject.preventDefault();
    }
}

if (appData.loginButton !== null) {
    appData.loginButton.addEventListener("click", loginUser);
}

function setUsername() {
    let username = localStorage.getItem("username");
    return username;
}

if (appData.spanElement !== null) {
    appData.spanElement.textContent = setUsername();
}

if (dashboardData.storeJSONButton !== null) {
	let objectData = {
		vegetables: [
			{ name: "ugu", amount: "$100" },
			{ name: "green", amount: "$200" },
		],
		fruits: [
			{ name: "mango", amount: "$200" },
			{ name: "orange", amount: "$400" },
		],
	};

    dashboardData.storeJSONButton.addEventListener("click", function () {
        let objectDataStringified = JSON.stringify(objectData);
        localStorage.setItem("json", objectDataStringified);
        dashboardData.feedBackParagraph.textContent = "JSON data storage was successful!";
        dashboardData.displayListData.setAttribute("class", "hide");
    });
}

if (dashboardData.retrieveJSONButton !== null) {
    dashboardData.retrieveJSONButton.addEventListener("click", function () {
        let parsedJSON = JSON.parse(localStorage.getItem("json"));

        let strData1 = "";
        let strData2 = "";

        for (let i = 0; i < 2; i++) {
            strData1 += `<li> ${parsedJSON.vegetables[i].name}: ${parsedJSON.vegetables[i].amount} </li>`;
            strData2 += `<li> ${parsedJSON.fruits[i].name}: ${parsedJSON.fruits[i].amount} </li>`;
        }

        dashboardData.feedBackParagraph.textContent = "JSON data retrieval and display was successful! See the data items below.";
        dashboardData.displayListData.innerHTML = strData1 + strData2;
        dashboardData.displayListData.removeAttribute("class");
    });
}

if (dashboardData.chngeYourUnameButton !== null) {
    dashboardData.chngeYourUnameButton.addEventListener("click", function () {
        dashboardData.chngeYourUnameArtDisplay.removeAttribute("class");
    });
}

if (dashboardData.chngeYourUnameSubmitButton !== null) {
    dashboardData.chngeYourUnameSubmitButton.addEventListener("click", function () {
			if (dashboardData.chngeYourUnameInput.validity.valueMissing === false) {
				localStorage.setItem( "username", dashboardData.chngeYourUnameInput.value);
				location.href = "./dashboard.html";
			} else {
				dashboardData.returnSubmitMsg.textContent = "The input field can't be empty.";
				//dashboardData.returnSubmitMsg.scrollIntoView(true);
			}
        }
    );
}

if (appData.webPage.includes("dashboard")) {
    let timeObjectArg = {
        dateStyle: "short",
        timeStyle: "short",
    };

    let DateAndTimeFormat = new Date();
    let timeInHrs = DateAndTimeFormat.getHours();
    let fDateAndTime = DateAndTimeFormat.toLocaleString("en-NG", timeObjectArg);

    if (timeInHrs >= 0 && timeInHrs < 12) {
        dashboardData.timeInsert.innerHTML = `Good Morning <span>${setUsername()}</span>!<br><hr>${fDateAndTime}`;
    } else if (timeInHrs >= 12 && timeInHrs < 16) {
        dashboardData.timeInsert.innerHTML = `Good Afternoon <span>${setUsername()}</span>!<br><hr>${fDateAndTime}`;
    } else if (timeInHrs >= 16 && timeInHrs <= 23) {
        dashboardData.timeInsert.innerHTML = `Good Evening <span>${setUsername()}</span>!<br><hr>${fDateAndTime}`;
    }
}

function toggleClass() {
	const hambugerParent = document.getElementById("hamburger_parent");
    const fadeClassReps = document.querySelectorAll(".fade");
    const headerExtension = document.querySelector(".header_extension");

	hambugerParent.addEventListener("click", function () {
		hambugerParent.classList.toggle("display");
    	appData.hamburgerUl.classList.toggle("toggle");

        if (fadeClassReps !== null) {
            fadeClassReps.forEach(function (eachClassRep) {
                eachClassRep.classList.toggle("fade_out");
            });
        }

        if (headerExtension !== null) {
            headerExtension.classList.toggle("visibility");
        }
	});
}

function toggleDisplayMode() {
	const container = document.getElementsByTagName("html")[0];
	const inner = document.getElementById("child_mobile");

    inner.addEventListener("click", function () {
        if (container.classList.contains("change_display") === true) {
            localStorage.setItem("darkmode","change_display");
			container.classList.remove("change_display");
        } else {
            container.classList.add("change_display");
            localStorage.removeItem("darkmode");
        }
    });

    if (localStorage.getItem("darkmode") === "change_display") {
        container.classList.remove("change_display");
    } else {
		container.classList.add("change_display");
    }
}

toggleClass();
toggleDisplayMode();
