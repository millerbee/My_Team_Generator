// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Intern  {
    constructor (name, id, email, school) {
        this.name = name;
        this.id = id;
        this.email = email;
        this.school= school;
  }

    getTitle() {
        return "Intern";
    }
    getSchool() {
        return this.school;
    }
}

module.exports = Intern;