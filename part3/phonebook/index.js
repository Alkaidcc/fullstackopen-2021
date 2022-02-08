const express = require('express');
const app = express();

app.use(express.json())

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

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number
  }
  console.log(person);
  persons = persons.concat(person)
  console.log(persons);

  res.json(person)

})

const PORT = 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})