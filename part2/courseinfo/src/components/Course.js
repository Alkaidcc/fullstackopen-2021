const Header = ({name}) => {
    return (
        <h2>{name}</h2>
    )
}

const Content = ({content}) => {
    return (
        <>
            {content.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />)}
        </>
    )
}

const Part = ({name,exercises}) => <p>{name} {exercises}</p>

const Total = ({parts}) => {
    const num = parts.reduce((acc,part) => acc + part.exercises,0)
    return (
        <b>Total of {num} exercises</b>
    )
}
const Course = (props) => {
    const { course } = props

    return (
        <>
            <Header name={course.name} />
            <Content content={course.parts}/>
            <Total parts={course.parts}/>
        </>
    )
}
export default Course