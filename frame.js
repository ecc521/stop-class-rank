const contacts = {
	"lmahaffey@wcpss.net": "Ms. Lindsay Mahaffey, Chair WCPSS Board",
	"cqmoore@wcpss.net": "Superintendent Moore, WCPSS",
	"parents@stopclassrank.com": "Test Email",
}

const studentClassOptions = ["2022", "2023", "2024", "2025", "2026", "2027", "2028", "2029"]
const personOptions = ["Parent", "Staff Member", "Student"]


// $IOrWe
// $wasOrWere
// $IOrMy - I or my child/children
// $areOrAmOrIs
// $theirOrMy

let reasonsForClassRank = {
	"I was never informed about class rank": "$IOrWe $wasOrWere never informed about class rank",
	"I understood class rank had been replaced with Latin Honors": "$IOrWe understood class rank had been replaced with Latin Honors",
	"I was led to believe class rank did not matter": "$IOrWe $wasOrWere led to believe class rank did not matter",
	"Advice to not use PC19 (Classes of 2022 and 2023 Only)": "$IOrMy did not use PC19 due to the advice from the school and $areOrAmOrIs ranked below students who used PC19 to raise their weighted GPA",
	"Primary courses selections were not received": "$IOrMy did not receive their primary course selections",
	"Rejected Schedule Changes": "$IOrMy had schedule changes requests declined",
	"Advice to not take AP courses freshman year": "$IOrMy did not take AP courses freshman year because of the advice from the school",
	"Advice to take fewer APs for a balanced schedule": "$IOrMy took fewer APs to provide a balanced schedule based on advice from the school",
	"Taking fewer APs due to extracurriculars": "$IOrMy took fewer APs in order to participate in extracurricular activities, important for college admissions and scholarship as well as health and happiness",
	"Selecting interesting courses": "$IOrMy selected courses based on $theirOrMy interests and not GPA",
	"Selecting courses for career goals": "$IOrMy selected courses based on $theirOrMy career goals and not GPA",
	"Not placing out of introductory language courses": "$IOrMy did not place out of introductory language courses, resulting in two required academic electives that students ranked ahead were not all required to take",
}


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
			visibleIf: "{personType} != 'Staff Member'",
			type: "checkbox",
			title: "Have any of the following have negatively impacted you/your childrens' class rank?",
			colCount: 1,
			choices: Object.keys(reasonsForClassRank)
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
	let childTerm = children.length > 1 ? "children" : "child"

	let mostRecentClass;
	function updateForClass(nextClass) {
		if (!mostRecentClass) {mostRecentClass = nextClass}
		if (nextClass < mostRecentClass) {mostRecentClass = nextClass}
	}

	let replacements = {
		"$IOrWe": typeOfPerson === "parent" ? "We" : "I",
		"$wasOrWere": typeOfPerson === "parent" ? "were" : "was", //I was, we were
		"$IOrMy": typeOfPerson === "parent" ? `My ${childTerm}` : "I",
		"$areOrAmOrIs": typeOfPerson === "parent" ? (children.length > 1 ? "are" : "is") : "am",
		"$theirOrMy": typeOfPerson === "parent" ? "their" : "my",
	}

	if (typeOfPerson === "parent") {
		message += `parent with `
		for (let i=0;i<children.length;i++) {
			let child = children[i]
			message += ` a ${classTranslations[child.class]} at ${child.school}`
			updateForClass(child.class)

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
		updateForClass(data.class)
	}
	else {
		message += `${typeOfPerson} at ${school}. `
	}


	//Flags:
	// mostRecentClass

	let meOrMy = typeOfPerson === "parent" ? `my ${childTerm}&#39;s` : "me"
	let themOrUs = typeOfPerson === "student" ? "us":"them"

	message += `<br><br>`
	message += `I am requesting that WCPSS eliminate class rank from transcripts. `
	message += `In the event that such a change is not possible in time for the Class of ${mostRecentClass ?? "2023"}, I am requesting that WCPSS provide ${themOrUs} the option to withhold class rank for out of state colleges, scholarship programs, and private universities. `

	message += `<br><br>`

	message += `WCPSS runs some of the best and most competitive schools in the country. `
	message += `Removing class rank will allow ${meOrMy} accomplishments to shine through and to compete fairly against students from other districts and states. `
	message += `Providing the option to remove class rank aligns with the goals of the Boards unanimous vote in 2016 to stop naming valedictorians in order to reduce competition and allow students to pick courses for interests and not GPA. `
	message += `Additionally, this action is entirely in the hands of WCPSS - while a removal of Class Rank in all instances may require action by either the State Board or the General Assembly, there is no state law requiring class rank to be sent to non-UNC system colleges or programs, and WCPSS's goals cannot be achieved as long as a 1 to n class rank remains. `

	message += `<br><br>`

	message += `The removal of class rank is imperative because the competition for class rank is not just unhealthy - the competition for class rank is fundamentally unfair. `
	message += `The class rank for WCPSS is not an accurate measurement of academic performance, and similarly competitive high schools across the country no longer rank. `
	message += `Class Rank places ${themOrUs} at a serious disadvantage, and disqualifies ${themOrUs} from both admissions and scholarship opportunities. `

	if (data.reasons?.length && typeOfPerson != "staff member") {
		message += `<br><br>Producing a rank for ${typeOfPerson === "parent" ? `my ${childTerm}`: "me"} is unfair because: `
		for (let i=0;i<data.reasons.length;i++) {
			let reason = data.reasons[i]
			let translatedReason = reasonsForClassRank[reason]
			if (!translatedReason) {
				console.warn("Can't translate", reason, reasonsForClassRank)
				continue
			}
			for (let replacement in replacements) {
				translatedReason = translatedReason.replaceAll(replacement, replacements[replacement])
			}
			message += `<br> - ${translatedReason}`
		}
	}


	//Add stuff about overcompetitveness

	message += `Class Rank is harmful and we request that it be removed. Let the students of WCPSS be evaluated on their academic performance in high school, not on a metric disconnected from the grades they earned in their classes. `

	message += `<br><br>`

	message += `I appreciate the time and effort the school board puts into providing the best possible education for our children, and look forward to hearing from you on this matter. If you would like to discuss this request further, please contact me. `

	message +=`<br><br>Thank you for your time, service, and consideration.
<br><br>Sincerely,
<br>${name}
<br>${data.personType} ${typeOfPerson === "student" ? school : ""}${typeOfPerson === "parent" ? (children.length > 1 ? `of WCPSS students` : `of a WCPSS student`) : ""}
<br>${typeOfPerson === "student" ? `Class of ${data.class}` : ""}
`

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
	document.getElementById("cke_1_contents").style.height = "1000px"
}, 2000)
