const defaultContact = "lmahaffey@wcpss.net"

const contacts = {
	//https://www.wcpss.net/Page/5472

	"lmahaffey@wcpss.net": {
		cc: [
			"hscott@wcpss.net",
			"mjohnsonhostler@wcpss.net",
			"rcash@wcpss.net",
			"twaters2@wcpss.net",
			"jmartin4@wcpss.net",
			"ckushner@wcpss.net",
			"jheagarty@wcpss.net",
			"kcarter3@wcpss.net",
			"cqmoore@wcpss.net",
		],
		title: "Wake County School Board",
		style: "WCPSS"
	},

	// "hscott@wcpss.net": {name: "Ms. Heather Scott", title: "WCPSS Board (District 1)", style: "WCPSS"},
	// "mjohnsonhostler@wcpss.net": {name: "Ms. Monika Johnson-Hostler", title: "WCPSS Board (District 2)", style: "WCPSS"},
	// "rcash@wcpss.net": {name: "Ms. Roxie Cash", title: "WCPSS Board (District 3)", style: "WCPSS"},
	// "twaters2@wcpss.net": {name: "Ms. Tara Waters", title: "WCPSS Board (District 4)", style: "WCPSS"},
	// "jmartin4@wcpss.net": {name: "Dr. Jim Martin", title: "WCPSS Board (District 5)", style: "WCPSS"},
	// "ckushner@wcpss.net": {name: "Mrs. Christine Kushner", title: "WCPSS Board (District 6)", style: "WCPSS"},
	// "jheagarty@wcpss.net": {name: "Vice-Chairman Chris Heagarty", title: "WCPSS Board (District 7)", style: "WCPSS"},
	// "lmahaffey@wcpss.net": {name: "Chairwoman Lindsay Mahaffey", title: "WCPSS Board (District 8)", style: "WCPSS"},
	// "kcarter3@wcpss.net": {name: "Ms. Karen Carter", title: "WCPSS Board (District 9)", style: "WCPSS"},

	//"cqmoore@wcpss.net": {name: "Superintendent Cathy Moore", title: "WCPSS Superintendent", style: "WCPSS"},

	"amy.white@dpi.nc.gov": {
		cc: [
			//"mark.robinson@dpi.nc.gov", //LT Gov
			//"dale.folwell@dpi.nc.gov", //Treasurer
			"eric.davis@dpi.nc.gov",
			"alan.duncan@dpi.nc.gov",
			"olivia.oxendine@dpi.nc.gov",
			"reginald.kenan@dpi.nc.gov",
			"James.Ford@dpi.nc.gov",
			"Jill.Camnitz@dpi.nc.gov",
			"Donna.Tipton-Rogers@dpi.nc.gov",
			"JWendell.Hall@dpi.nc.gov",
			"catherine.truitt@dpi.nc.gov",
		],
		title: "North Carolina Board of Education",
		style: "NC"
	},

	// "amy.white@dpi.nc.gov": {name: "Ms. Amy White", title: "North Carolina Board of Education", style: "NC"},
	// "Catherine.Truitt@dpi.nc.gov": {name: "Superintendent Catherine Truitt", title: "North Carolina Superintendent", style: "NC"},
}

const subjects = [
	"An EXACT numeric rank - during a pandemic?",
	"Pandemic relief from Class Rank",
	{value: "Help our kids compete with other states - stop class rank", visibleIf: "{personType} notempty  and {personType} != 'Student'"},
	{value: "Help us compete with students from other states - stop class rank", visibleIf: "{personType} notempty  and {personType} == 'Student'"},
	{value: "Class rank is harming student opportunities", visibleIf: "{personType} notempty  and {personType} != 'Student'"},
	{value: "Class rank is harming our opportunities", visibleIf: "{personType} notempty  and {personType} == 'Student'"},
	{value: "Class rank is costing us scholarship money", visibleIf: "{personType} notempty  and {personType} != 'Student'"},
	{value: "Class rank is costing me scholarship money", visibleIf: "{personType} notempty  and {personType} == 'Student'"},
	"Latin Honors is a failure - Remove class rank",
	"Remove Class Rank",
	"Latin Honors was the right idea - now eliminate class rank too",
]

let defaultSubject = subjects[Math.floor(Math.random() * subjects.length)]
if (defaultSubject?.value) {defaultSubject = defaultSubject.value}

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
	"Selecting interesting courses": "$IOrMy selected courses based on $theirOrMy interests and not weighted GPA",
	"Selecting courses for career goals": "$IOrMy selected courses based on $theirOrMy career goals and not weighted GPA",
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
			title: "I reside at (recommended)",
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
			type: "html",
			name: "subjectMessage",
			html: `Customizing your message title is recommended - feel free to do this now, using the "Other" option, or before sending. `
		},
		{
			name: "subject",
			type: "dropdown",
			title: "Pick a message title: ",
			hasOther: true,
			choices: subjects,
			defaultValue: defaultSubject,
		},
		{
			type: "html",
			name: "dynamicInfoBoardMeeting",
			html: ``
		},
		{
			type: "html",
			name: "genericInfo",
			html: `Check your WCPSS Board Member <a target="_blank" href="https://www.wcpss.net/Page/5472">here</a>. We recommend contacting your board member and the chair. <br>Green Level is District 8, Panther Creek is District 7, and Green Hope is District 9`
		},
		{
			name: "contact",
			type: "dropdown",
			title: "Who would you like to contact? ",
			isRequired: true,
			choices: Object.keys(contacts).map((contactEmail) => {
				let contact = contacts[contactEmail]
				let obj = {text: contact.title , value: contactEmail}
				if (contact.name) {
					text = `${contact.name} - ${contact.title}`
				}
				return obj
			}),
			defaultValue: defaultContact,
		},
		{
			type: "html",
			name: "dynamicInfo",
			html: ``
		},
		{
            type: "editor",
            name: "editor",
            title: "Custom Template (Auto-Generated)"
        },
	]
};


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

setTimeout(updateSurveyMessage, 0) //Use setTimeout so that any errors don't cause a crash.

ReactDOM.render(
	React.createElement(SurveyReact.Survey, {model: survey})
	, document.getElementById("surveyElement"));

function copyStringToClipboard(str) {
	// Create new element
	var el = document.createElement('textarea');
	// Set value (string to be copied)
	el.value = str;
	// Set non-editable to avoid focus and move outside of view
	el.setAttribute('readonly', '');
	el.style = {position: 'absolute', left: '-9999px'};
	document.body.appendChild(el);
	// Select text inside element
	el.select();
	// Copy text to clipboard
	document.execCommand('copy');
	// Remove temporary element
	document.body.removeChild(el);
}

function updateSurveyMessage() {
	let editor = survey.getQuestionByName("editor")
	editor.value = generateMessage()

	survey.getQuestionByName("dynamicInfo").html = `<div id="dynamicContainer"></div>`
	survey.getQuestionByName("dynamicInfoBoardMeeting").html = `<div id="dynamicContainerBoardMeeting"></div>`
	survey.render()

	let container = document.getElementById("dynamicContainer")
	container.innerHTML = ""

	let data = survey.data

	let body = data.editor.split("<br>").join("\n").trim()
	let emailContact = data.contact
	let contact = contacts[emailContact]
	let emailContactName = contact.name || contact.title
	let subject = (data.subject !== "other") ? data.subject : data["subject-Comment"]

	//https://www.wcpss.net/Page/3727
	//Scroll down to see details about public comment periods.
	let dynamicContainerBoardMeeting = document.getElementById("dynamicContainerBoardMeeting")
	let commentBody = generateMessage("comment").split("<br>").join("\n").trim()
	let publicCommentURL = `https://docs.google.com/forms/d/e/1FAIpQLSfIYvTEDN44sultYUofewUqxm3VRwqEh9uD2jjzQ7Fap-pIJA/viewform?ifq&entry.1148243391=${encodeURIComponent(data.name)}&entry.1879963615=${encodeURIComponent(subject)}&entry.211319492=${encodeURIComponent(commentBody)}`
	let publicCommentStopDate = new Date("12:00 3/15/2022")
	if (Date.now() < publicCommentStopDate) {
		dynamicContainerBoardMeeting.innerHTML = `<p style="font-size: 1.5em;font-weight:bold;background: lightyellow;">WCPSS has a Board Meeting on ${(publicCommentStopDate.getMonth() + 1)}/${publicCommentStopDate.getDate()}/${publicCommentStopDate.getFullYear()}. <a target="_blank" href="${publicCommentURL}">Create Board Meeting Comment</a> (Opens in New Tab)</p>`
	}

	container.innerHTML += `<p>Ready to Send? <a href=${generateMailto({
		toField: emailContact,
		ccField: contact.cc,
		subject,
		body,
	})}>Open custom template email to ${emailContactName} in default mail app!</a> (Works on Most Devices)</p>If the compose link above fails, just click "Copy Custom Template", and email <a href="mailto:${emailContact}">${emailContact}</a> `

	let copyButton = document.createElement("button")
	copyButton.innerHTML = "Copy Custom Template"
	copyButton.addEventListener("click", function() {
		copyStringToClipboard(body)
	})
	container.appendChild(copyButton)
}

function generateMessage(style = "email") {
	let data = survey.data

	let name = data.name
	let address = data.address

	let typeOfPerson = data.personType?.toLowerCase()

	let school = data.school

	let message = ""

	let contact = contacts[data.contact]

	if (style === "email") {
		//We'll cut out the first name from the email.
		let contactIntroductionName = contact?.title
		if (contact.name) {
			contactIntroductionName = contact?.name?.split(" ")
			contactIntroductionName = contactIntroductionName?.[0] + " " + contactIntroductionName?.[2]
		}

		message += `Dear ${contactIntroductionName},`
		message += `<br><br>My name is ${name} and I${address?` reside at ${address}. I `:""} am a `
	}
	else {
		message += "As a "
	}

	let children = survey.data.children || []
	let childTerm = children.length > 1 ? "children" : "child"

	let mostRecentClass;
	function updateForClass(nextClass) {
		if (!mostRecentClass) {mostRecentClass = nextClass}
		if (nextClass < mostRecentClass) {mostRecentClass = nextClass}
	}

	let isKnownOvercompetitiveSchool;
	function updateForSchool(nextSchool) {
		nextSchool = nextSchool?.toLowerCase() || ""
		if (nextSchool.includes("green hope") || nextSchool.includes("panther creek") || nextSchool.includes("green level") || nextSchool.includes("enloe")) {
			isKnownOvercompetitiveSchool = true;
		}
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
			updateForSchool(child.school)

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
	}
	else if (typeOfPerson === "student") {
		message += `${classTranslations[data.class]} at ${school}`
		updateForClass(data.class)
		updateForSchool(school)
	}
	else {
		message += `${typeOfPerson} at ${school}`
	}

	if (style === "email") {
		message += ". "
		message += `<br><br>`
	}
	else {
		message += ", "
	}

	//Flags:
	// mostRecentClass

	let meOrMy = typeOfPerson === "parent" ? `my ${childTerm}&#39;s` : "me"
	let themOrUs = typeOfPerson === "student" ? "us":"them"
	let ourOrTheir = typeOfPerson === "student" ? "our":"their"
	let weOrThese = typeOfPerson === "student" ? "We":"These"

	if (contact?.style === "WCPSS") {
		message += `I am requesting that WCPSS eliminate class rank from transcripts. `
		message += `In the event that such a change is not possible in time for the Class of ${mostRecentClass ?? "2023"}, I am requesting that WCPSS provide ${themOrUs} the option to withhold class rank for out of state colleges, scholarship programs, and private universities. `

		message += `<br><br>`

		message += `WCPSS runs some of the best and most competitive schools in the country. `
		message += `Removing class rank will allow ${meOrMy} accomplishments to shine through and to compete fairly against students from other districts and states. `
		message += `Providing the option to remove class rank aligns with the goals of the Boards unanimous vote in 2016 to stop naming valedictorians in order to reduce competition and allow students to pick courses for interests and not weighted GPA. `
		message += `Additionally, this action is entirely in the hands of WCPSS - while a removal of Class Rank in all instances may require action by either the State Board or the General Assembly, there is no state law requiring class rank to be sent to non-UNC system colleges or programs, and WCPSS's goals cannot be achieved as long as a 1 to n class rank remains. `

		message += `<br><br>`

		message += `The removal of class rank is imperative because the competition for class rank is not just unhealthy - the competition for class rank is fundamentally unfair. `
		message += `The class rank for WCPSS is not an accurate measurement of academic performance, and similarly competitive high schools across the country no longer rank. `
		message += `Class Rank places ${themOrUs} at a serious disadvantage, and disqualifies ${themOrUs} from both admissions and scholarship opportunities. `
	}
	else if (contact?.style === "NC") {
		message += `I am requesting that the North Carolina School Board explicitly authorize local school boards to report a Latin Honors based class rank, or eliminate class rank from NC transcripts. In the event that such a change is not possible in time for the Class of ${mostRecentClass ?? "2023"}, I am requesting that North Carolina School Board policy be amended to provide students the option to withhold class rank or report Latin Honors based class rank for out of state colleges, scholarship programs, and private universities.`

		message += `<br><br>`

		message += `As the North Central representative to the State Board of Education, your District encompasses some of the most competitive schools in both North Carolina and the United States as a whole. ${weOrThese} are the students who are most seriously and directly harmed by NC class rank policy.  `

		message += `<br><br>`

		message += `Until the NC School Board updates the class rank policy, the Latin Honors policies of local school boards, such as WCPSS, will never successfully achieve their goals of reducing competition and allowing students to pick courses for interests and not weighted GPA. Eliminating this policy will also mitigate the impacts of the pandemic on NC students' college admissions and scholarship opportunities and allow ${themOrUs} to compete fairly with students from other states who are not encumbered by class rank. `

		message += `<br><br>`

		message += `The requirement for class rank stems from GS 116-11(10a) and is therefore scoped by GS116-143.1(a)(3) to only apply to UNC system schools. The State Board has the authority to redefine GRAD-009 as necessary to mitigate the impacts of the pandemic, such as by redefining class rank to utilize a Latin Honors system. Additionally, there is no law requiring the State Board of Education to print ANY FORM OF CLASS RANK on transcripts sent out of state or to private universities. `

		message += `<br><br>`

		message += `The removal of class rank is imperative because the competition for class rank is not just unhealthy - the competition for class rank is fundamentally unfair. The GRAD009 Emergency Addition approved by the NC State Board of Education allowed students to manipulate their weighted GPAs, while making no provisions for class rank. The class rank at highly competitive high schools in your district is not an accurate measurement of academic performance, and similarly competitive high schools across the country no longer rank. Class Rank places NC students at a serious disadvantage, and disqualifies ${themOrUs} from both admissions and scholarship opportunities. `
	}

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

	if (isKnownOvercompetitiveSchool && style === "email") {
		message += `<br><br>Our WCPSS public high schools - particularly Green Level, Green Hope, Panther Creek, and Enloe - are highly competitive. Far more than half the students are on path to be recognized with WCPSS Latin Honors Summa Cum Laude or Magna Cum Laude recognition, and yet their college applications will be judged on numeric ranks in the bottom 50% rather than their WCPSS Latin Honors recognition. At least 25% of the students at every one of these schools are identified as AIG, far too many for an accurate class ranking. 25+% will never fit in the Top 10%. There are far more than ten "Top 10" quality students. There are too many exceptional students to provide a 1 to n ranking. `
	}

	message += `<br><br>`

	message += `Class Rank is harmful and ${replacements["$IOrWe"]} request that it be removed. Let the students of WCPSS be evaluated on their academic performance in high school, not on a metric disconnected from the grades they earned in their classes. `

	if (style === "email") {
		message += `<br><br>`

		message += `I appreciate the time and effort the school board puts into providing the best possible education for our children, and look forward to hearing from you on this matter. If you would like to discuss this request further, please contact me. `

		message +=`<br><br>Thank you for your time, service, and consideration.`
		message += `<br><br>Sincerely,`
		message += `<br>${name}`
		message += `<br>${data.personType} ${typeOfPerson === "student" ? "at " + school : ""}${typeOfPerson === "parent" ? (children.length > 1 ? `of WCPSS students` : `of a WCPSS student`) : ""}`
		message += `<br>${typeOfPerson === "student" ? `Class of ${data.class}` : ""}`
	}

	return message
}


function generateMailto({
	toField,
	ccField = [],
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
