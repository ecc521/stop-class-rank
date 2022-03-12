const contacts = {
	"lmahaffey@wcpss.net": "Ms. Lindsay Mahaffey, Chair WCPSS Board",
	"cqmoore@wcpss.net": "Superintendent Moore, WCPSS",
	"parents@stopclassrank.com": "Test Email",
}

const studentClassOptions = ["2022", "2023", "2024", "2025", "2026", "2027", "2028", "2029"]
const personOptions = ["Parent", "Staff Member", "Student"]

let reasonsForClassRank = [
	"I was never informed about class rank",
	"I thought class rank had been replaced with Latin Honors",
	"I thought class rank did not matter",
	"Primary courses selections were denied",
	"Advice to not use PC19",
	"Advice to not take AP courses freshman year",
	"Advice to take fewer APs for a balanced schedule",
	"Selecting interesting courses",
	"Selecting courses for career goals",
	"Not placing out of introductory language courses",
	"Excessive Competitiveness of High School",
	"Taking fewer APs due to extracurriculars",
	"Rejected Schedule Changes",
]

let classTranslations = {
	"2022": "Senior",
	"2023": "Junior",
	"2024": "Sophomore",
	"2025": "Freshman",
	"2026": "8th Grader",
	"2027": "7th Grader",
	"2028": "6th Grader",
	"2029": "5th Grader",
}


let json = {
	showNavigationButtons: false,
	checkErrorsMode: "onValueChanged",
	showQuestionNumbers: "off",
	"elements": [
		{
			type: "dropdown",
			name: "personType",
			title: "I am a ",
			isRequired: true,
			colCount: 0,
			hasNone: false,
			choices: personOptions,
		},

		{
			name: "name",
			type: "text",
			title: "My name is: ",
			placeHolder: "Please enter your name...",
			isRequired: true,
			autoComplete: "name"
		},


		{
			name: "address",
			type: "text",
			title: "I reside at",
			placeHolder: "Please enter your address (optional)...",
			autoComplete: "address"
		},

		{
			type: "dropdown",
			name: "class",
			visibleIf: "{personType} == 'Student'",
			title: "I am in the class of ",
			isRequired: true,
			choices: studentClassOptions,
		},
		{
			type: "text",
			visibleIf: "{personType} notempty and {personType} != 'Parent'",
			isRequired: true,
			name: "school",
			title: "My School is: ",
			placeHolder: "Enter School... ",
		},
		{
			type: "matrixdynamic",
			visibleIf: "{personType} == 'Parent'",
			name: "children",
			rowCount: 1,
			minRowCount: 1,
			title: "Affected Children",
			addRowText: "Add Student",
			removeRowText: "Remove Student",
			isRequired: true,
			columns: [
				{
					name: "class",
					title: "Class of",
					isRequired: true,
					choices: studentClassOptions
				},
				{
					cellType: "text",
					isRequired: true,
					name: "school",
					title: "School",
					placeHolder: "Enter School... ",
				},
			]
		},

		{
			name: "reasons",
			type: "checkbox",
			title: "Which of the following have negatively impacted you/your childrens' class rank?",
			colCount: 1,
			choices: reasonsForClassRank
		},

		{
            type: "editor",
            name: "editor",
            title: "Output Message"
        },
	]
};



//Did your mid-year class rank surprise you

Survey.StylesManager.applyTheme("modern");

window.survey = new Survey.Model(json);

//Auto-save survey
const surveySaveKey = "surveyData"
let lastDispatched = -Infinity;

survey.onValueChanged = {fire: function(e) {
	surveyChanged()
	if (e.name !== "editor") {
		updateSurveyMessage()
	}
}}

function saveSurveyToDisk() {
	localStorage.setItem(surveySaveKey, JSON.stringify(survey.data))
}

//This is the biggie - auto-save before unload.
//We adopt a tick-mechanism as backup.
window.addEventListener("beforeunload", saveSurveyToDisk)

function surveyChanged() {
	const dispatchInterval = 5000
	if (Date.now() - lastDispatched > dispatchInterval) {
		lastDispatched = Date.now()
		setTimeout(function() {
			saveSurveyToDisk()
		}, dispatchInterval)
	}
}

try {
	//Not sure when this would error, but wrap just in case.
	let data = localStorage.getItem(surveySaveKey)
	if (data) {
		survey.data = JSON.parse(data)
	}
}
catch (e) {console.error(e)}
//End auto-save survey

updateSurveyMessage()

ReactDOM.render(
	React.createElement(SurveyReact.Survey, {model: survey})
	, document.getElementById("surveyElement"));


function updateSurveyMessage() {
	let editor = survey.getQuestionByName("editor")
	editor.value = generateMessage()
}

function generateMessage() {
	let data = survey.data

	let name = data.name
	let address = data.address

	let typeOfPerson = data.personType?.toLowerCase()

	let school = data.school

	let message = `My name is ${name} and I${address?` reside at ${address}. I `:""} am a `

	let children = survey.data.children || []

	if (typeOfPerson === "parent") {
		message += `parent with `
		for (let i=0;i<children.length;i++) {
			let child = children[i]
			message += ` a ${classTranslations[child.class]} at ${child.school}`
			if (i != children.length - 1 && children.length >= 2) {
				if (children.length > 2) {
					message += ", "
				}
				else if (children.length === 2) {
					message += " "
				}
			}
			if (i == children.length - 2 && children.length > 1) {
				message += "and "
			}
		}
		message += ". "
	}
	else if (typeOfPerson === "student") {
		message += `${classTranslations[data.class]} at ${school}. `
	}
	else {
		message += `${typeOfPerson} at ${school}. `
	}

	if (data.reasons?.length) {
		message += `<br><br>The following problems negatively impacted ${typeOfPerson === "parent" ? `my ${children.length > 1 ? "children's" : "child's"}` : "my"} class rank: `
		for (let i=0;i<data.reasons.length;i++) {
			message += `<br> - ${data.reasons[i]}`
		}
	}

	return message
}


function generateMailto({
	toField,
	ccField,
	subject,
	body,
}) {
	let mailto = `mailto:${toField}?body=${encodeURIComponent(body)}&subject=${encodeURIComponent(subject)}&cc=${ccField.join(",")}`
	return mailto
}


setTimeout(function() {
	//Attempt to enlarge textarea.
	document.getElementById("cke_1_contents").style.height = "700px"
}, 2000)
