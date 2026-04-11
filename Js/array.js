const Subjects = ["htmlCSSJs", "Python", "Database", "Nepal parichaya"]



//How to find length of array
console.log({size:Subjects.length})

//I want o/p htmlCssJs, Python, Database, Nepal Parichaya
console.log({toString:Subjects.toString()})

//I want o/p htmlCssJs @Python @Database @Nepal Parichaya
console.log({join:Subjects.join("@")})

//I want to remove last element of array
console.log({oldSubjects:Subjects})
Subjects.pop()
console.log({lastEleRemoved:Subjects})

//I want to remove 1st element of array
Subjects.shift()
console.log({FirstElement:Subjects})

//Add element to end of array
Subjects.push("sscc")
console.log({Subjects})

// add element to start of array
Subjects.unshift("Java")
console.log({Subjects})

//For loop in 
const person = {fname:"Ram", dobYear:2000}
for (let dobYear in person){
    person["age"] = 2026-person[dobYear]
}
console.log({person})

const years = [2000, 2005, 2009]
//for(let year in years) ##mistake
for(let year of years){  /// a single mistake in word can cause huge impact so not in but of 
    console.log({age:2026-year})
}