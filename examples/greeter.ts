class User {
    fullName: string
    firstName: string
    lastName: string
    constructor(firstName: string, lastName: string) {
        this.fullName = firstName + ' ' + lastName
        this.firstName = firstName
        this.lastName = lastName
    }
}

interface Person {
    firstName: string,
    lastName: string
}

function greeter(person: Person) {
    return 'Hello ' + person.firstName + ' ' + person.lastName;
}

let obj = { firstName: "aaa", lastName: "bbb" }
let user = new User(obj.firstName, obj.lastName)

console.log(greeter(user))