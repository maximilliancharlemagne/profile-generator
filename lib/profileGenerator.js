const {writeFile} = require('fs')

const profileGenerator = (teamObject) => {
  let main = [`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Our Team</title>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
</head>
<body>
  <div class="container">
    <div class="row text-center m-3">
      <div class="col">
        <h2>${teamObject.company} Software Development Team</h2>
      </div>
    </div>
    <div class="row" id="cardPlace">
      <div class="col">`,`
      </div>
    </div>
  </div>
  <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
</body>
</html>`]

if(teamObject.manager){
  let managerTemp = `<div class="card" style="width: 18rem; display: inline-block;">
  <div class="card-body">
    <h5 class="card-title">${teamObject.manager.name}</h5>
    <p class="card-text">
    <ul class="list-group">
      <li class="list-group-item">Employee ID: ${teamObject.manager.id}</li>
      <li class="list-group-item">Employee Email: ${teamObject.manager.email}</li>
      <li class="list-group-item">Office Number: ${teamObject.manager.officeNumber}</li>
    </ul>
    </p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>`
  main.splice(1,0,managerTemp)
}

if(teamObject.employees){
  for(let index in teamObject.employees){
    switch (teamObject.employees[index].getRole()) {
      case 'Intern':
        let internTemp = `<div class="card" style="width: 18rem; display: inline-block;">
  <div class="card-body">
    <h5 class="card-title">${teamObject.employees[index].name}</h5>
    <p class="card-text">
    <ul class="list-group">
      <li class="list-group-item">Employee ID: ${teamObject.employees[index].id}</li>
      <li class="list-group-item">Employee Email: ${teamObject.employees[index].email}</li>
      <li class="list-group-item">Employee School: ${teamObject.employees[index].school}</li>
    </ul>
    </p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>`
        main.splice(2,0,internTemp )
        break;

      case 'Engineer':
        let engineerTemp = `<div class="card" style="width: 18rem; display: inline-block;">
  <div class="card-body">
    <h5 class="card-title">${teamObject.employees[index].name}</h5>
    <p class="card-text">
    <ul class="list-group">
      <li class="list-group-item">Employee ID: ${teamObject.employees[index].id}</li>
      <li class="list-group-item">Employee Email: ${teamObject.employees[index].email}</li>
      <li class="list-group-item">Employee Github: ${teamObject.employees[index].github}</li>
    </ul>
    </p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>`
        main.splice(2, 0, engineerTemp)

        break;

      default:
        let otherTemp = `<div class="card" style="width: 18rem; display: inline-block;">
  <div class="card-body">
    <h5 class="card-title">${teamObject.employees[index].name}</h5>
    <p class="card-text">
    <ul class="list-group">
      <li class="list-group-item">Employee ID: ${teamObject.employees[index].id}</li>
      <li class="list-group-item">Employee Email: ${teamObject.employees[index].email}</li>
    </ul>
    </p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>`
        main.splice(2, 0, otherTemp)
        break;
    }
  }
}

if(teamObject.employees && teamObject.manager){
  main = main.join('\n')
  console.log(`Writing to ${teamObject.company}-profiles.html...`)
  writeFile(`./output/${teamObject.company}-profiles.html`,main,err => console.log(err))
}
else{
  console.log('Manager or employees field is empty. Shutting down...')
}

}

module.exports = profileGenerator