// I really struggled trying to get this to write out to an html file... private tutor Austin Sanchez is helping me.

const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const fs = require("fs");
const render = require("./render")
const teamArr =[];

const writeFileAsync = fs.writeFile

//const generateHTML = require('./templates/manager.html')  this generates "SyntaxError: Unexpected token '<'"

//setting up prompt to ask for user input, using readme generator as guide.
function addEmp() {
    return  inquirer.prompt([
      { type: "list",
        message: "Would you like to enter a team member?",
        name: "addMember",
        choices: [ "yes", "no"]
      },
    ]).then(function({addMember}){
        if( addMember === "yes"){
          getInfo();
        }else if (addMember === "no") {
          console.log("Ok, goodbye");
          renderHTML();
        }
      
    });
  }

      function getInfo() {
        return  inquirer.prompt([
        { type: "list",
          message: "Please select a role: ",
          name: "role",
          choices: ["Manager", "Engineer", "Intern"]
        },
 
      ]).then(function (data) {    
         
        console.log(data);
        if (data.role === "Manager"){
          inquirer.prompt([
            {
              type: "input",
              message: "Enter manager's name: ",
              name: "name"
            },
            {
              type: "input",
              message: "Enter manager's email: ",
              name: "email"
            },

            {
              type: "input",
              message: "Enter manager's employee id: ",
              name: "id"

            },
            {
              type: "input",
              message: "Enter manager's office phone number: ",
              name: "officeNumber"

            }
          ]).then(function (name, id, email, role, officeNumber){
            Manager = new Manager(name, id, email, role, officeNumber);
            console.log(Manager);
            teamArr.push(Manager);
            addEmp();
            renderHTML();
          });

        }else {
           if(data.role === "Engineer") {
            inquirer.prompt([
              {
                type: "input",
                message: "Enter Engineer's name: ",
                name: "name"
              },
              {
                type: "input",
                message: "Enter Engineer's email: ",
                name: "email"
              },
  
              {
                type: "input",
                message: "Enter Engineer's employee id: ",
                name: "id"
  
              },
              {
                type: "input",
                message: "Enter Engineer's github username: ",
                name: "github"
              }
            ]).then(function (engineerData){
              Engineer = new Engineer(engineerData.name, engineerData.email, engineerData.Id, engineerData.github);
              teamArr.push(newEngineer);
              addEmp();
              renderHTML();
            })


           }else {
             if(data.role === "Intern") {
               inquirer.prompt([
                {
                  type: "input",
                  message: "Enter Intern's name: ",
                  name: "name"
                },
                {
                  type: "input",
                  message: "Enter Intern's email: ",
                  name: "email"
                },
    
                {
                  type: "input",
                  message: "Enter Intern's's employee id: ",
                  name: "id"
    
                },
                {
                  type: "input",
                  message: "Enter Intern's school: ",
                  name: "school"
                }
               ]).then(function (internData){
                Intern = new Intern(internData.name, internData.email, internData.Id, internData.github);
                teamArr.push(newIntern);
                addEmp();
                renderHTML();
               
               })
             }
           }
        }
        



      });
     
    }
//  async function renderHTML(){
//       console.log(teamArr)

async function init() {      //(38-ins-async-await activity)
  try {
      // Ask questions
      const data = await addEmp();
      const generateFile = render(Manager);
      // Write new README.md 
        await writeFileAsync('team.txt', generateFile);
    //    console.log('Successfully wrote to README.md');
    }  catch(err) {
      console.log(err);
   }
}
    

     
 init();