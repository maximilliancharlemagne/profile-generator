//Require some things

const { prompt } = require('inquirer')
const Employee = require('./lib/Employee.js')
const Intern = require('./lib/Intern.js')
const Manager = require('./lib/Manager.js')
const Engineer = require('./lib/Engineer.js')
const profileGenerator = require('./lib/profileGenerator.js')

//Create some questions for the prompts

let nameQuestion = {
  type: 'input',
  name: 'name',
  message: 'What is your name? (Firstname (MI) Lastname)'
}

let idQuestion = {
  type: 'input',
  name: 'id',
  message: 'What is your employee ID?'
}

let emailQuestion = {
  type: 'input',
  name: 'email',
  message: 'What is your company email?'
}

let roleQuestion = {
  type: 'list',
  name: 'role',
  message: 'What is your role at the company?',
  choices: ['Engineer', 'Intern', 'Other']
}

let internQuestion = {
  type: 'input',
  name: 'school',
  message: 'What school do you attend?'
}

let managerQuestion = {
  type: 'input',
  name: 'officeNumber',
  message: 'What is your office phone number?'
}

let engineerQuestion = {
  type: 'input',
  name: 'github',
  message: 'What is your github username?'
}

//Define the team object

myTeam = { company: 'Apple Inc.', manager: {}, employees: [] }

//Prompt for the manager's information

console.log('Please input the information of the team manager to begin.')

prompt([nameQuestion,idQuestion,emailQuestion,managerQuestion])
.then(managerData => {
  let myManager = new Manager(managerData.name,managerData.id,managerData.email,managerData.officeNumber)
  myTeam.manager = myManager
  console.log('Please input the information of the first employee on the team.')
  const nextEmployee = () => {
    prompt([nameQuestion,idQuestion,emailQuestion,roleQuestion])
      .then(data => {
        switch (data.role) {
          case 'Intern':
            prompt(internQuestion)
              .then(internData => {
                let thisPerson = new Intern(data.name, data.id, data.email, internData.school)
                myTeam.employees.push(thisPerson)
                prompt({type: 'confirm', name: 'stop', message: 'Is this the last employee (y/n)?'})
                .then(data => {
                  if (data.stop){
                    console.log('Run completed. All generated employee profiles will be found in the ./output folder.')
                    profileGenerator(myTeam)
                  }
                  else{
                    nextEmployee()
                  }
                })
              })
            break;
          case 'Engineer':
            prompt(engineerQuestion)
              .then(engineerData => {
                let thisPerson = new Engineer(data.name, data.id, data.email, engineerData.github)
                myTeam.employees.push(thisPerson)
                prompt({ type: 'confirm', name: 'stop', message: 'Is this the last employee (y/n)?' })
                  .then(data => {
                    if (data.stop) {
                      console.log('Run completed. All generated employee profiles will be found in the ./output folder.')
                      profileGenerator(myTeam)
                    }
                    else {
                      console.log('Please input the information of the next employee')
                      nextEmployee()
                    }
                  })
              })
            break;

          default:
            let thisPerson = new Employee(data.name, data.id, data.email)
            myTeam.employees.push(thisPerson)
            prompt({ type: 'confirm', name: 'stop', message: 'Is this the last employee (y/n)?' })
              .then(data => {
                if (data.stop) {
                  console.log('Run completed. All generated employee profiles will be found in the ./output folder.')
                  profileGenerator(myTeam)
                }
                else {
                  console.log('Please input the information of the next employee')
                  nextEmployee()
                }
              })
            break;
        }
      })
  }
  nextEmployee()
})