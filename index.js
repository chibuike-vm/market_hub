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

if (submitButton !== null)
{
	submitButton.addEventListener("click", function (e) {
		let queryArray = ["fullname", "username", "pword", "confirm_pword", "phone_number", "email_address", "status"];
		let formInputs = document.querySelectorAll("input");
		let feedback = document.getElementById("feedback");

		for (let i = 0; i < 6; i++) 
		{	
			console.log(`${queryArray[i]}: `, formInputs[i].value);
			localStorage.setItem(queryArray[i], formInputs[i].value);
		}

		if (formInputs[2].value !== formInputs[3].value) 
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

		if (formInputs[0].validity.valueMissing === false && formInputs[1].validity.valueMissing === false)
		{
			if (storedEmail === formInputs[0].value && storedPassword === formInputs[1].value)
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

let spanElement = document.getElementById("user_id");

if (spanElement !== null)
{
	let username = localStorage.getItem("username");
	spanElement.textContent = username;
}