import { Country, CountryList } from "./Country"

const Content = ({ countries }) => {
    if (countries.length === 1) {
        return <Country country={countries[0]} />
    }
    if (countries.length > 10) {
        return (
            <p>Too many matches, specify another filter</p>
        )
    }
    if (countries.length < 10 && countries.length > 1) {
        return (
            <CountryList countries={countries} />
        )
    }
    return <></>
}
export default Content