const Doctor = require('../models/doctor');
const Patient = require('../models/patient');

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '');
};

module.exports = {
  getAll: function (req, res) {
    if (req.query.search) {
      const regex = new RegExp(escapeRegex(req.query.search), 'gi');
      Doctor.find({
        $or: [
          { full_name: regex },
          { city: regex }]
      }, function (err, allDoctors) {
        if (err) {
          console.log(err);
        } else {
          res.render("doctors/index", { doctors: allDoctors });
        }
      });
    } else {
        Doctor.find({}, function (err, allDoctors) {
        if (err) {
          console.log(err);
        } else {
          res.render("doctors/index", { doctors: allDoctors });
        }
      });
    }
  },
  getOne: async (req, res) => {
    const doctor = await Doctor.findById(req.params.id)

    res.render('doctors/update', doctor)
  },
  create: (req, res) => {
    res.render('doctors/create');
  },
  postCreate: async (req, res) => {
    try {
      const doctor = new Doctor(req.body)
      await doctor.save()

      res.redirect('/doctors')
    } catch (error) {
      res.render('doctors/create', {
        ...req.body,
        error: error.message
      })
    }
  },
  postUpdate: async (req, res) => {
    try {
      await Doctor.findByIdAndUpdate(req.params.id, req.body, { runValidators: true })
      res.redirect('/doctors')
    } catch (error) {
      res.render('doctors/update', {
        ...req.body,
        _id: req.params.id,
        error: error.message
      })
    }
  },
  delete: async (req, res) => {
    // TODO: try catch
    await Doctor.findByIdAndRemove(req.params.id)

    res.send({
      error: false,
      message: `Doctor with id #${req.params.id} removed`
    });
  }, patients: async (req, res) => {
    const doctor = await Doctor.findById(req.params.id)
    const patient = await Patient.find()
    res.render("doctors/patients", {
      patients: patient,
      doctors: doctor,
    });
  }
}