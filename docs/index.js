/* let url = location.search;
let queryParameters = new URLSearchParams(url);

let queryArray = ["fullname", "username", "pword", "confirm-pword", "phone-number", "email-address", "status"];
/* 
for (let i = 0; i < 6; i++) {	
	console.log(queryParameters.get(queryArray[i]), `: ${queryArray[i]}`);
	localStorage.setItem(queryArray[i], queryParameters.get(queryArray[i]));
} */

let submitButton = document.getElementById("submitbutton");
let loginButton = document.getElementById("login");
let spanElement = document.getElementById("user_id");
let hamburgerUl = document.getElementById("hamburger_ul");
let hamburgerButton = document.getElementById("hamburger_button");
let toggleSwitchLarge = document.getElementById("checkme_large");
let toggleSwitchMobile = document.getElementById("checkme_mobile");
let htmlElement = document.getElementsByTagName("html");
let userSvg = document.getElementById("user_svg");
let webPage = window.location.href;

if (submitButton !== null)
{
	submitButton.addEventListener("click", function (e) {
		let queryArray = ["fullname", "username", "pword", "confirm_pword", "phone_number", "email_address", "status"];
		let formInputs = document.querySelectorAll("input");
		let feedback = document.getElementById("feedback");

		let j = 1;

		for (let i = 0; i < queryArray.length; i++) 
		{	
			j += 1;

			if (formInputs[j].validity.valueMissing === false)
			{
				localStorage.setItem(queryArray[i], formInputs[j].value);
			}
		}

		if (formInputs[4].value !== formInputs[5].value) 
		{
			feedback.textContent = "Passwords don't match!";
			feedback.removeAttribute("class");
			e.preventDefault();
		}
		else
		{
			feedback.setAttribute("class", "feedback");
		} 
	});
}

if (loginButton !== null)
{
    loginButton.addEventListener("click", function (e) {
        let formInputs = document.querySelectorAll("input");
        let storedPassword = localStorage.getItem("pword");
        let storedEmail = localStorage.getItem("email_address");

		if (formInputs[2].validity.valueMissing === false && formInputs[3].validity.valueMissing === false)
		{
			if (storedEmail === formInputs[2].value && storedPassword === formInputs[3].value)
			{
				location.href = "./dashboard.html";
			}
			else
			{
				feedback.textContent = "Invalid Email or Password!";
			}

			e.preventDefault();
		}
    });
}

function setUsername() {
	let username = localStorage.getItem("username");
	return username;
}

if (spanElement !== null)
{
	spanElement.textContent = setUsername();
}

let objectData =
{
	vegetables: [{name: "ugu", amount: "$100"}, {name: "green", amount: "$200"}],
	fruits: [{name: "mango", amount: "$200"}, {name: "orange", amount: "$400"}]
};

let dashboardData =
{
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
}

if (dashboardData.storeJSONButton !== null)
{
	dashboardData.storeJSONButton.addEventListener("click", function () {
		let objectDataStringified = JSON.stringify(objectData);
		localStorage.setItem("json", objectDataStringified);
		dashboardData.feedBackParagraph.textContent = "JSON data storage was successful!";
		dashboardData.displayListData.setAttribute("class", "hide");
	});
}

if (dashboardData.retrieveJSONButton !== null)
{
	dashboardData.retrieveJSONButton.addEventListener("click", function () {
		let parsedJSON = JSON.parse(localStorage.getItem("json"));

		let strData1 = "";
		let strData2 = "";

		for (let i = 0; i < 2; i++)
		{
			strData1 += `<li> ${parsedJSON.vegetables[i].name}: ${parsedJSON.vegetables[i].amount} </li>`;
			strData2 += `<li> ${parsedJSON.fruits[i].name}: ${parsedJSON.fruits[i].amount} </li>`;
		}
		
		dashboardData.feedBackParagraph.textContent = "JSON data retrieval and display was successful! See the data items below.";
		dashboardData.displayListData.innerHTML = strData1 + strData2;
		dashboardData.displayListData.removeAttribute("class");
	});
}

if (dashboardData.chngeYourUnameButton !== null)
{
	dashboardData.chngeYourUnameButton.addEventListener("click", function () {
		dashboardData.chngeYourUnameArtDisplay.removeAttribute("class");
	});
}

if (dashboardData.chngeYourUnameSubmitButton !== null)
{
	dashboardData.chngeYourUnameSubmitButton.addEventListener("click", function () {
		if (dashboardData.chngeYourUnameInput.validity.valueMissing === false)
		{
			localStorage.setItem("username", dashboardData.chngeYourUnameInput.value);
			location.href = "./dashboard.html";
		}
		else
		{
			dashboardData.returnSubmitMsg.textContent = "The input field can't be empty.";
			//dashboardData.returnSubmitMsg.scrollIntoView(true);
		}
		});
}

if (webPage.includes("dashboard"))
{
	let timeObjectArg =
	{
		dateStyle: "short",
		timeStyle: "short"
	}

	let DateAndTimeFormat = new Date();
	let timeInHrs = DateAndTimeFormat.getHours();
	let fDateAndTime = DateAndTimeFormat.toLocaleString("en-NG", timeObjectArg);
	
	if (timeInHrs >= 0 && timeInHrs < 12)
	{
		dashboardData.timeInsert.innerHTML = `Good Morning <span>${setUsername()}</span>!<br><hr>${fDateAndTime}`;
	}
	else if (timeInHrs >= 12 && timeInHrs < 16)
	{
		dashboardData.timeInsert.innerHTML = `Good Afternoon <span>${setUsername()}</span>!<br><hr>${fDateAndTime}`;
	}
	else if (timeInHrs >= 16 && timeInHrs <= 23)
	{
		dashboardData.timeInsert.innerHTML = `Good Evening <span>${setUsername()}</span>!<br><hr>${fDateAndTime}`;
	}
}

if (hamburgerButton !== null)
{
	hamburgerButton.addEventListener("click", function() {
		hamburgerUl.classList.toggle("toggle");
	});
}


if (toggleSwitchMobile !== null) 
{
	toggleSwitchMobile.addEventListener("click", function() {

		if (localStorage.getItem("displayModeMobile") === "dark_mode") {
			localStorage.setItem("displayModeMobile", "change_display");
		}
		else 
		{
			localStorage.setItem("displayModeMobile", "dark_mode");
		}

		if (localStorage.getItem("displayModeMobile") === "change_display")
		{
			htmlElement[0].setAttribute("class", localStorage.getItem("displayModeMobile"));
		
			let hamburgerImgSrc = hamburgerButton.getAttribute("src");
		
				if (hamburgerImgSrc === "./svg/hamburger.svg") 
				{
					hamburgerButton.setAttribute("src", "./svg/hamburger_dark.svg");
					
					const spanBackground = document.getElementById("span_id_mobile");
					spanBackground.setAttribute("class", "span_dark_bkd");
				}
				else
				{
					hamburgerButton.setAttribute("src", "./svg/hamburger.svg");

					const spanBackground = document.getElementById("span_id_mobile");
					spanBackground.setAttribute("class", "span_light_bkd");
				}
		}
		else 
		{
			htmlElement[0].removeAttribute("class");
			let hamburgerImgSrc = hamburgerButton.getAttribute("src");
		
				if (hamburgerImgSrc === "./svg/hamburger.svg") 
				{
					hamburgerButton.setAttribute("src", "./svg/hamburger_dark.svg");

					const spanBackground = document.getElementById("span_id_mobile");
					spanBackground.setAttribute("class",  "span_dark_bkd");
				}
				else
				{
					hamburgerButton.setAttribute("src", "./svg/hamburger.svg");

					const spanBackground = document.getElementById("span_id_mobile");
					spanBackground.setAttribute("class", "span_light_bkd");
				}
		}

	});
}

if (window.innerWidth <= 850)
{
	if (localStorage.getItem("displayModeMobile") === "change_display")
	{
		htmlElement[0].setAttribute("class", localStorage.getItem("displayModeMobile"));

			let hamburgerImgSrc = hamburgerButton.getAttribute("src");

			if (hamburgerImgSrc === "./svg/hamburger.svg") 
			{
				hamburgerButton.setAttribute("src", "./svg/hamburger_dark.svg");

				const spanBackground = document.getElementById("span_id_mobile");
				spanBackground.setAttribute("class",  "span_dark_bkd");
			}
			else
			{
				hamburgerButton.setAttribute("src", "./svg/hamburger.svg");

				const spanBackground = document.getElementById("span_id_mobile");
				spanBackground.setAttribute("class", "span_light_bkd");
			}
	}
	else 
	{
		const spanBackground = document.getElementById("span_id_mobile");
		spanBackground.setAttribute("class", "span_light_bkd");
	}
}

if (toggleSwitchLarge !== null) 
{
	toggleSwitchLarge.addEventListener("click", function() {

		if (localStorage.getItem("displayModeLarge") === "dark_mode") {
			localStorage.setItem("displayModeLarge", "change_display");
		}
		else 
		{
			localStorage.setItem("displayModeLarge", "dark_mode");
		}

		if (localStorage.getItem("displayModeLarge") === "change_display")
		{
			htmlElement[0].setAttribute("class", localStorage.getItem("displayModeLarge"));
		
			let userImgSrc = userSvg.getAttribute("src");
		
				if (userImgSrc === "./svg/user.svg") 
				{
					userSvg.setAttribute("src", "./svg/user_dark.svg");
					
					const spanBackground = document.getElementById("span_id_large");
					spanBackground.setAttribute("class",  "span_dark_bkd");
				}
				else
				{
					userSvg.setAttribute("src", "./svg/user.svg");

					const spanBackground = document.getElementById("span_id_large");
					spanBackground.setAttribute("class",  "span_light_bkd");
				}
		}
		else 
		{
			htmlElement[0].removeAttribute("class");
			let userImgSrc = userSvg.getAttribute("src");
		
				if (userImgSrc === "./svg/user.svg") 
				{
					userSvg.setAttribute("src", "./svg/user_dark.svg");

					const spanBackground = document.getElementById("span_id_large");
					spanBackground.setAttribute("class",  "span_dark_bkd");
				}
				else
				{
					userSvg.setAttribute("src", "./svg/user.svg");

					const spanBackground = document.getElementById("span_id_large");
					spanBackground.setAttribute("class",  "span_light_bkd");
				}
		}

	});
}


if (window.innerWidth > 850)
{
	if (localStorage.getItem("displayModeLarge") === "change_display")
	{
		htmlElement[0].setAttribute("class", localStorage.getItem("displayModeLarge"));

			let userImgSrc = userSvg.getAttribute("src");

			if (userImgSrc === "./svg/user.svg") 
			{
				userSvg.setAttribute("src", "./svg/user_dark.svg");

				const spanBackground = document.getElementById("span_id_large");
				spanBackground.setAttribute("class",  "span_dark_bkd");
			}
			else
			{
				userSvg.setAttribute("src", "./svg/user.svg");

				const spanBackground = document.getElementById("span_id_large");
				spanBackground.setAttribute("class",  "span_light_bkd");
			}
	}
	else
	{
		const spanBackground = document.getElementById("span_id_large");
		spanBackground.setAttribute("class",  "span_light_bkd");
	}
}
