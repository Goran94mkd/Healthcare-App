const mongoose = require('mongoose')
const faker = require ('faker')
const Doctor = require ('../models/doctor')

mongoose.connect('mongodb://localhost/healthcareapp', {
  useNewUrlParser: true, useUnifiedTopology: true 
});

for(let i = 0; i < 10; i++){
  const fakeDoctorData = {
    full_name: faker.fake('{{name.firstName}} {{name.lastName}}'),
    licence_number: faker.datatype.number({min: '10000000000'}),
    city: faker.address.city(),
    specialization: faker.name.jobTitle()
  }
  const doctor = new Doctor ({
    _id: new mongoose.Types.ObjectId(),
    ...fakeDoctorData
  })
  doctor.save()
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
}