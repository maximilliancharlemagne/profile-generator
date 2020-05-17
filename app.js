//Prompt the user

const { prompt } = require('inquirer')

let nameQuestion = {
  type = 'input'
  name = 'name'
  message = 'What is your name? (Firstname (MI) Lastname)'
}

let idQuestion = {
  type = 'input'
  name = 'id'
  message = 'What is your employee ID?'
}

let emailQuestion = {
  type = 'input'
  name = 'email'
  message = 'What is your company email?'
}