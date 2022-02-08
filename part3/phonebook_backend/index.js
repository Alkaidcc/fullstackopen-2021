const express = require('express');
const morgan = require('morgan')
const cors = require('cors')
const app = express();

app.use(express.json())
app.use(express.static('build'))
morgan.token('post', request => {
  if (request.method == 'POST'){
    return JSON.stringify(request.body)
  }else{
    return ''
  }
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post'))
app.use(cors())
let persons = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]

const generateId = () => {
  return Math.round(Math.random() * Number.MAX_SAFE_INTEGER)
}

app.get('/info', (req, res) => {
  const content = `<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`
  res.send(content)
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id
  const person = persons.find(person => person.id === Number(id))
  if (person) {
    res.json(person)
  } else {
    res.status(404).send("Person not found")
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id
  const person = persons.find(person => person.id === Number(id))
  if (person) {
    persons = persons.filter(person => person.id !== Number(id))
    res.status(204).end()
  } else {
    res.status(404).send("Note not found")
  }
})

app.post('/api/persons', (req, res) => {
  const body = req.body

  if (body.name == undefined || body.number == undefined) {
    return res.status(400).json({ error: 'name or number missing' })
  }
  if (persons.find(person => person.name === body.name)) {
    return res.status(400).json({error: "The name is already in the phonebook"})
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number
  }
  persons = persons.concat(person)
  res.json(person)

})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})