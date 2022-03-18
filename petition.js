let json = {
	checkErrorsMode: "onValueChanged",
	showQuestionNumbers: "off",
	completedHtml: "You have signed the petition!",
	completeText: "Sign Petition",
	"elements": [
		{
			type: "html",
			name: "genericInfo",
			html: `
			<h1 style="text-align: center;">Petition to Stop Class Rank</h1>
			<p style="text-align: center;">Eliminate class rank from WCPSS transcripts with interim measures for the class of 2023. <a href="#petitionText">View Full Text</a>. For more information about class rank, please visit <a target="_blank" href="https://www.stopclassrank.com">stopclassrank.com</a>. `
		},
		{
			name: "name",
			type: "text",
			title: "Name: ",
			placeHolder: "Please enter your name...",
			isRequired: true,
			autoComplete: "name"
		},
		{
			name: "email",
			type: "text",
			title: "Email: ",
			placeHolder: "Please enter your email...",
			isRequired: true,
			inputType: "email",
			autoComplete: "email"
		},
	]
};


Survey.StylesManager.applyTheme("modern");

window.survey = new Survey.Model(json);

ReactDOM.render(
	React.createElement(SurveyReact.Survey, {model: survey})
	, document.getElementById("surveyElement"));


let storageKey = "logKey"
let logKey = Math.random() * 2**53
try {
	if (localStorage.getItem(storageKey)) {
		logKey = localStorage.getItem(storageKey)
	}
}
catch (e) {console.error(e)}

survey.onComplete.add(function (sender) {
	submitSurveyData()
	localStorage.setItem(storageKey, logKey)
});


async function getCurrentStats() {
	let API_KEY = "AIzaSyD-MaLfNzz1BiUvdKKfowXbmW_v8E-9xSc" //From rivers.run
	let request = await fetch("https://www.googleapis.com/drive/v3/files/1y1WgeN7vmhfTSD3G2vqOsFjDNPiDGAtjcHL-vyEibC0/export?mimeType=text/csv&key=" + API_KEY, {cache: "no-store"})
	let text = await request.text()

	let csv = Papa.parse(text);
	let data = csv.data

	let header = data.shift()
	let logKeyIndex = header.indexOf("logKey")

	let usersSigned = data.length //Number of users that have signed.
	let userHasSigned = data.some((item) => {
		return item[logKeyIndex] == logKey
	})

	return {usersSigned, userHasSigned}
}

getCurrentStats().then(function(stats) {
	let petitionInfoDiv = document.getElementById("petitionInfo")

	if (stats.userHasSigned) {
		survey.getQuestionByName("genericInfo").html += `<p style="color: red; text-align: center;">Please sign this petition only once. Duplicate signatures will be removed. </p>`
	}

	let bigNumber = document.createElement("div")
	bigNumber.className = "bigNumber"
	bigNumber.innerHTML = stats.usersSigned
	petitionInfoDiv.appendChild(bigNumber)

	let peopleHaveSigned = document.createElement("h2")
	peopleHaveSigned.className = "peopleHaveSigned"
	peopleHaveSigned.innerHTML = `People Have Signed This Petition!`
	petitionInfoDiv.appendChild(peopleHaveSigned)
})

function submitSurveyData() {
	let {name = "", email = ""} = survey.data

	let encodedLogKey = encodeURIComponent(logKey) //Locally bound to not overwrite.
	name = encodeURIComponent(name)
	email = encodeURIComponent(email)

	let logKeyURL = `https://docs.google.com/forms/d/e/1FAIpQLSc3KgPWxrCv-mpuibq8UeG8d1rNMe0eWlFqPN3ZGr9sruzoUA/formResponse?entry.913971055=${encodedLogKey}&submit=Submit`

	let dataFormURL = `https://docs.google.com/forms/d/e/1FAIpQLScZ7qtDBFzSwqGLUPwKjXw1N_H3UX--jDETenBSdR6RYKqALw/formResponse?entry.476670027=${encodedLogKey}&entry.131294692=${name}&entry.1336935614=${email}&submit=Submit`

	fetch(logKeyURL, {mode: "no-cors"})
	fetch(dataFormURL, {mode: "no-cors"})
}
