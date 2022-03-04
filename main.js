

const contacts = {
	"lmahaffey@wcpss.net": "Ms. Lindsay Mahaffey, Chair WCPSS Board",
	"cqmoore@wcpss.net": "Superintendent Moore, WCPSS",
	"parents@stopclassrank.com": "Test Email",
}

const personOptions = ["Freshman", "Sophomore", "Junior", "Senior", "Parent", "Student"]


let message = generateMessage({
	sendToEmail: "parents@stopclassrank.com",
	name: "Bob",
	typeOfPerson: personOptions[3],
	//address: "",
	school: "Green Level High School"
})

console.log(message)


function generateMailto({
	toField,
	ccField,
	subject,
	body,
}) {
	let mailto = `mailto:${toField}?body=${encodeURIComponent(body)}&subject=${encodeURIComponent(subject)}&cc=${ccField.join(",")}`
	return mailto
}

console.log(message)

let a = document.createElement("a")
a.href = generateMailto({
	toField: "parents@stopclassrank.com",
	ccField: ["student@stopclassrank.com", "info@stopclassrank.com"],
	subject: "Class Rank Concerns",
	body: message
})
a.innerHTML = "Message"
document.body.appendChild(a)



function generateMessage({
	sendToEmail,
	name,
	address,
	typeOfPerson,
	school,
}) {
	let addressee = contacts[sendToEmail]
	typeOfPerson = typeOfPerson.toLowerCase()

	let message = `Dear ${addressee}

My name is ${name} and I${address?` reside at ${address}. I `:""} am a ${typeOfPerson === "parent" ? " parent of a student":typeOfPerson} at ${school}.
`

	return message
}





















//
//
//
// const template = `
// Dear ${addressee}
//
// My name is and I ${name}${address?` reside at ${address}. I `:""} am currently a ${currentClass} at ${school}.
// `
//




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
