const Language = ({ language }) => <li>{language}</li>

export const LanguageList = ({ languages }) => {
    return (
        <>
            {languages.map(language => <Language key={language} language={language} />)}
        </>
    )
}
