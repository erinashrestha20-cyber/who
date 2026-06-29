class Person{
    constructor (name, age, gender, contact){
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.contact = contact;
    }

    greet(){
        console.log(`Hello, I am ${this.age},${this.gender}. My name is ${this.name}.
         My contact number is ${this.contact} `);
    }
}

//Now make object
const person1 = new Person("Alice",12, "Female", 9818055172);
const person2 = new Person("Bob", 23, "Male",9823423498);


console.log(person1.greet());