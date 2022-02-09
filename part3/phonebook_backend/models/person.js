const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:',error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    minlength: [3, 'Name must have atleast 3 characters'],
    required: true
  },
  number: {
    type: String,
    unique: true,
    minlength: [8, 'Name must have atleast 8 characters'],
    validate: {
      validator: v => /(^\d{2}-.\d{5,})|(^\d{3}-.\d{4,})|(\d{8,})/.test(v),
      message: props => `${props.value} is not a valid phone number`
    }
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
personSchema.plugin(uniqueValidator)
module.exports = mongoose.model('Person',personSchema)