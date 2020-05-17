class Employee {
  constructor(name,id,email){
    //Set properties
    this.name = name
    this.id = id
    this.email = email

    //Set methods
    this.getName = () => {
      return this.name
    }
    this.getId = () => {
      return this.id
    }
    this.getEmail = () => {
      return this.email
    }
    this.getRole = () => {
      return 'Employee'
    }
  }
}

module.exports = Employee