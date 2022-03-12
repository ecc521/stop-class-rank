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


function generateMailto({
	toField,
	ccField,
	subject,
	body,
}) {
	let mailto = `mailto:${toField}?body=${encodeURIComponent(body)}&subject=${encodeURIComponent(subject)}&cc=${ccField.join(",")}`
	return mailto
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


setTimeout(function() {
	//Attempt to enlarge textarea.
	document.getElementById("cke_1_contents").style.height = "80vh"
}, 2000)


	/*


	Dear <ADDRESSEE>,

	//standard opening for students
	My name is <NAME> and I reside at <ADDRESS.  I am currently a <CLASS LEVEL> at <SCHOOL>.

	//Class of 2023 specific
	I am requesting the option to remove class rank from my out-of-state and private universities Common App and Scholarship applications.  My class rank was harmed due to <pandemic grading>, and <receiving lower weighted electives>.  I followed the advice of WCPSS Staff to <take World History (H), <choose electives based on career interests>, <not overload my schedule>, and <keep my numeric grades>.  <As a student with an unweighted 4.0 GPA, following the WCPSS advice had directly harmed me>

	//Class of 2024 and 2025
	I am writing to request that class rank be removed from student transcripts.  I support a two phase approach:
	Class rank is optional for Class of 2023 students when applying for admissions or scholarships at out-of-state universities and private schools.
	Class rank is removed from GS 116-11-10a and GRAD-009 allowing class rank and Latin Honors decisions to be made at the local level starting with the Class of 2024.

	//Class of 2022 specific
	As a senior, I am writing to voice my support for the removal of class rank. I support making this change optional for the Class of 2023 due to the pandemic and fully eliminate class rank as soon as possible thereafter.  <My class rank did not represent MY academic performance at GLHS, nor did it represent my academic performance relative to my peers.><I was required to take courses specifically for GPA>.  <I had to report class rank in Common App and on Scholarship Applications>  <I believe my class rank may have contributed to my not being accepted at<UNIVERSITY> and my not receiving a scholarship from <UNIVERSITY>.

	//general section
	This proposal is consistent with the nationwide trend to remove class rank.  Few, if any, schools of similar competitiveness to <SCHOOL> rank.

	The current class rank system is detrimental to me, and my fellow students.  As the chairman of WCPSS School Board, you are no doubt familiar with Board’s unanimous vote in 2016 to stop naming valedictorians in order to reduce competition and allow students to pick courses for interests and not GPA.  These goals cannot be achieved at <SCHOOL> when a 1 to n class rank remains.

	//optional section for students who did not know about class rank
	// please substitute your own academic vs honors or honors vs AP decisions
	In fact, WCPSS actually made the class rank problem worse.  Students like me, who understood there was no more #1, chose courses of interest (ie <Technology, Engineering and Design (academic) vs <Microsoft Word (H) and Biomedical Technology vs Horticulture>). Following WCPSS advice is jeopardizing both scholarships and admissions to my dream school.  I would have picked courses specifically for GPA had I known.

	//optional section for students who did not use PC19
	Following the advice of school system personnel to keep numeric grades of C or better has also harmed my class rank.  If I had used PC19, my class rank would be higher.  My academic performance is being directly compared and deemed less competitive - worse - because I earned (As/ and kept my numeric grades.

	/*optional section for students who received lower weighted electives 2019-20
	Additionally, I was harmed by course availability at <SCHOOL>.   I received lower weighted alternative electives (ie <Personal Finance vs Speech I (H)>) which directly lowers my class rank potential.  <I did not know there was a class rank, or I would have considered the less interesting but Honors weighted Microsoft Excel.  There were not enough Honors courses of interest to to fill all elective slots with equivalently weighted alternatives.> <As this was GLHS opening year, there were fewer teachers and elective sections available>

	//optional section for students who did not receive AP or Honors courses in Plan A/B/C
	Additionally, I was harmed by course availability at <SCHOOL> caused by the split into Virtual Academy / Plan A/B/C.   I received lower weighted alternative electives (ie <Technology, Engineering and Design vs AP Computer Science Principles>) which directly lowers my class rank potential.  <GLHS offered access to fewer AP sections to Plan A/B/C vs Virtual Academy.  WCPSS forbid GLHS from blending classes Fall semester - resulting in less opportunity for Plan A/B/C students, and lower rank potential.  Freshman in Virtual Academy received AP Computer Science Principles. There were not enough AP courses offered to fill all elective slots with equivalently weighted alternatives.>

	//optional section for students who received lower weighted electives 2021-22
	Additionally, I was harmed by course availability at <SCHOOL>.   I received lower weighted alternative electives (ie <Python Programming vs AP Computer Science>) which directly lowers my class rank potential.  <There were not enough AP courses offered of interest to fill all elective slots with equivalently weighted alternatives.>

	//optional section for students who were not granted rigor changes 2021-22
	Additionally, I was harmed by course availability at <SCHOOL>.   I received lower weighted alternative electives (ie <English III (H) vs AP English Language and Composition>) which directly lowers my class rank potential.  <GLHS chose to cap class rank potential by leaving seats open in AP English because there were more students requesting the rigor change than seats available - advantaging the students who received rigor changes such as American History (H) to AP US History.   (H) There were not enough AP courses offered to fill all elective slots with equivalently weighted alternatives.>

	//optional section for midyear transcript swings
	My academic performance has been consistent throughout my high school career; however, my class rank took a wild swing of <SPOTS> in only one semester.  An accurate rank system would not have this type of dramatic swing - the measurement system is obviously incapable of providing useful comparison data at <SCHOOL>.

	//general section
	As a student from <SCHOOL>, the removal of class rank will provide me the opportunity to be evaluated on my academic performance in high school and for the grades I report to be a direct reflection of the grades I earned in my courses.

	//optional section for midyear transcript swings

	Sincerely,
	<NAME>
	Class of <YEAR>

	Cc: Superintendent Cathy Moore

	*/
