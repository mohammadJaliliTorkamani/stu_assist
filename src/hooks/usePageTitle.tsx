import { useEffect } from "react"


function usePageTitle(pageTitle: string = 'Stu-Assist') {

    useEffect(() => {
        document.title = pageTitle === 'Stu-Assist' || pageTitle === null || pageTitle.trim() === '' ? 'Stu-Assist' : `Stu-Assist | ${pageTitle}`
    }, [pageTitle])

}

export default usePageTitle