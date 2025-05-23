
import {createContext, useState, useContext, useEffect} from "react"

const JobContext = createContext()

export const useJobContext = () => useContext(JobContext)

export const JobProvider = ({children}) => {
    const [filterTags, setFilterTags] = useState([])

    
    useEffect(() => {
        const storedFilter = localStorage.getItem("filterTags")
        if (storedFilter) setFilterTags(JSON.parse(storedFilter))
    }, [])
  

    useEffect(() => {
        localStorage.setItem('filterTags', JSON.stringify(filterTags))
    }, [filterTags])


    

    const addToFilterTags = (tag) => {
        setFilterTags(prev => [...prev, tag])
    }


    const clearTags = () => {
        setFilterTags([])
    }

    const removeFromFilterTags = (tag) => {
        setFilterTags(prev => prev.filter(item => item !== tag))
    }

    const isFilter = (tag) => {
        return filterTags.some(item => item === tag)
    }

    const value = {
        filterTags,
        addToFilterTags,
        removeFromFilterTags,
        isFilter,
        clearTags
    }

    return <JobContext.Provider value={value}>
        {children}
    </JobContext.Provider>
}
