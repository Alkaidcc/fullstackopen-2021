const PersonForm = ({addPerson,newName,newNumber,setNewName,setNewNumber}) => {
    return (
      <form>
          <div>
            name: <input value={newName} onChange={setNewName} />
          </div>
          <div>
            number: <input value={newNumber} onChange={setNewNumber} />
          </div>
          <div>
            <button type="submit" onClick={addPerson}>add</button>
          </div>
      </form>
    )
}
export default PersonForm