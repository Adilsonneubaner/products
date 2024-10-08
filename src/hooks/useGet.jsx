import { useState, useEffect, useContext } from "react"
import { DataContext } from "../context/DataContext"

export const useGet = (url) => {
    const [loading, setLoading] = useState(false)

    const [data, setData] = useState()

    // Recebe atualização de valor somente quando há algum envio para a api
    const {callGet} = useContext(DataContext)
    
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try{
                const res = await fetch(url)
                const json = await res.json()
                setData(json)
            }catch(error){
                console.log(error)
            }
            setLoading(false)
        }
        fetchData()
    }, [url, callGet])
   return {data,loading}
}