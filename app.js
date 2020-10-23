

const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const fs = require("fs");
const teamArr =[];
const html = `<!DOCTYPE html>
<html lang="en">

<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="ie=edge">
<link rel="stylesheet" type="text/css" href="style.css">
<title>My Team</title>
<body>
<nav class="navbar navbar-light bg-warning text-lg-center">
  <span class="navbar-brand mb-0 h1 text-lg-center">MY TEAM</span>
</nav>
    {Placeholder}
    <script src="https://kit.fontawesome.com/71a24ccb38.js" crossorigin="anonymous"></script>
</body>
</html>`;


addEmp();

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
          generateHTML();
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
 
      ]).then(function (answers) {    
         
        console.log(answers);
        if (answers.role === "Manager"){
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
          ]).then(answers => addManager(answers));
         

        }else {
           if(answers.role === "Engineer") {
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
            ]).then(answers => addEngineer(answers));

           }else {
             if(answers.role === "Intern") {
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
               ]).then(answers => addIntern(answers));
               
               
             }
           }
        }
        



      });
     
    }

    function addManager(answers) {
      
      const manager = `
      <div class="card employee-card">
    <div class="card-header">
        <h2 class="card-title">${answers.name}</h2>
        <h3 class="card-title"><i class="fas fa-mug-hot mr-2"></i>Manager</h3>
    </div>
    <div class="card-body">
        <ul class="list-group">
            <li class="list-group-item">ID: ${answers.id}</li>
            <li class="list-group-item">Email: <a href="mailto:{{ email }}">${answers.email}</a></li>
            <li class="list-group-item">Office number:${answers.officeNumber}</li>
        </ul>
    </div>
</div>`
      teamArr.push(manager)
      addEmp();
    }

function addEngineer(answers) {
  const engineer = `
  <div class="card employee-card">
  <div class="card-header">
      <h2 class="card-title">${answers.name}</h2>
      <h3 class="card-title"><i class="fas fa-glasses mr-2"></i>Engineer</h3>
  </div>
  <div class="card-body">
      <ul class="list-group">
          <li class="list-group-item">ID:${answers.id}</li>
          <li class="list-group-item">Email: <a href="mailto:{{ email }}">${answers.email}</a></li>
          <li class="list-group-item">GitHub: <a href="https://github.com/{{ github }}" target="_blank" rel="noopener noreferrer">${answers.github}</a></li>
      </ul>
  </div>
</div>`
      teamArr.push(engineer)
      addEmp();

}
    

function addIntern(answers) {
 const intern = `<div class="card employee-card">
 <div class="card-header">
     <h2 class="card-title">${answers.name}</h2>
     <h3 class="card-title"><i class="fas fa-user-graduate mr-2"></i>Intern</h3>
 </div>
 <div class="card-body">
     <ul class="list-group">
         <li class="list-group-item">ID:${answers.id}</li>
         <li class="list-group-item">Email: <a href="mailto:{{ email }}">${answers.email}</a></li>
         <li class="list-group-item">School:${answers.school}</li>
     </ul>
 </div>
</div>`
   teamArr.push(intern)
   addEmp();

}
     
 function generateHTML(answers) {
   const team = teamArr.join("")
   const teamHTML = html.replace("{Placeholder}", team)
   fs.writeFile("./output/team.html", teamHTML, (err) => {
     if (err) throw err;
     console.log("team html created");
   })
 };