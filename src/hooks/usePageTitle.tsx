import { useEffect } from "react"


function usePageTitle(pageTitle: string = 'Stu-Assist') {

    useEffect(() => {
        document.title = pageTitle === 'Stu-Assist' ? 'Stu-Assist' : `Stu-Assist | ${pageTitle}`
    }, [pageTitle])

}

export default usePageTitle