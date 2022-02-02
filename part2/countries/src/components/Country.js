// <h1>{countryname}</h1>
// <p>capital {capital}</p>
// <p>population {population}</p>
// <h2>Spoken languages</h2>
// <Language>列表
// <img>

import { LanguageList } from "./Language"
import Weather from "./Weather"

// <Weather/>
export const CountryList = ({ countries }) => {
    return (
        <>
            {countries.map(country => <p key={country.name.common}>{country.name.common}</p>)}
        </>
    )
}
export const Country = ({ country }) => {
    return (
        <>
            <h1>{country.name.common}</h1>
            <p>capital {country.capital[0]}</p>
            <p>population {country.population}</p>
            <h2>Spoken languages</h2>
            <LanguageList languages={Object.values(country.languages)} />
            <img src={country.flags.png} alt="flag" width="150px" />
            <Weather capital={country.capital[0]} />
        </>
    )
}
