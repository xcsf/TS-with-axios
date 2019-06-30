var User = /** @class */ (function () {
    function User(firstName, lastName) {
        this.fullName = firstName + ' ' + lastName;
        this.firstName = firstName;
        this.lastName = lastName;
    }
    return User;
}());
function greeter(person) {
    return 'Hello ' + person.firstName + ' ' + person.lastName;
}
var obj = { firstName: "aaa", lastName: "bbb" };
var user = new User(obj.firstName, obj.lastName);
console.log(greeter(user));
