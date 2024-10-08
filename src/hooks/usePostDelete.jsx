import { useEffect, useState, useContext } from "react";
import { DataContext } from "../context/DataContext";

export const usePostDelete = () => {
    const url = 'https://coconut-mewing-success.glitch.me/products'
    const [config, setConfig] = useState()
    const [method, setMethod] = useState()
    const [id, setId] = useState()
    
    // Altera o valor para que aja uma nova requisição GET para atualizar os dados
    const {setCallGet} = useContext(DataContext)


    const httpConfig = (data, method) => {
        if(method === 'POST'){
            setConfig({
                method,
                headers:{
                    "Content-type" : "application/json",
                },
                body: JSON.stringify(data)
            })
            setMethod(method)
        } else if(method === 'DELETE'){
            setConfig({
                method,
                headers:{
                    "Content-type" : "application/json",
                }
            })
            setMethod(method)
            setId(data)
        }
    }

    useEffect(() => {
        const httpResquest = async () => {
            if(method === 'POST'){
                const res = await fetch(url, config)
                const json = await res.json()
                setCallGet(json)
            }else if(method === 'DELETE'){
                const urlDelete = `${url}/${id}`
                const res = await fetch(urlDelete, config)
                const json = await res.json()
                setCallGet(json)
            }
        }
        httpResquest()
    }, [method])

    return {httpConfig}
}