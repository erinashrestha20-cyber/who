const subjects = ["html/CSS/JS","Python","Database","Nepal Parichaya","SSCC","PD","Networking"]
console.log(`I read ${subjects[0]}`) /// here space is given after read
console.log(`I read ${subjects[1]}`)
console.log(`I read ${subjects[2]}`)
console.log(`I read ${subjects[3]}`)

/// How to write in loop
for (i = 0; i<subjects.length; i++){  ///in first approach we need to write index for all subject
                                         /// but in second approach we just need to run it after adding subjects
    console.log(`I read ${subjects[i]}`)  /// semi-colon is very important
}

let j = 0;
while(j<subjects.length){
    console.log(`I read ${subjects[j]}`)
    j++
}

let k = 0;
for(;k<subjects.length;){
    console.log(subjects[k]) ///shows all the name of subjecy
    k++
}
 
