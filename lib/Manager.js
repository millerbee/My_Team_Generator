// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Manager extends Employee {
    constructor (name, id, email, officeNumber) {
        super (name, id, email);
        this.officeNumber = officeNumber;
    }
    getTitle() {
        return "Manager";
    }
}

module.exports = Manager;


//my contructor didn't work, using example from 10-OOP, 20/21 Subclasses
// function Manager {
// constructor(name, id, email, officeNumber) {
//     this.name = name;
//     this.Id =Id;
//     this.email= email;
//     this.officeNumber = officeNumber;

// }  try 10-oop/04 weather

// }