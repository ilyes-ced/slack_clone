import React, { useState } from "react"
import Item from './Item'





function Main_container() {

    
    const [data, set_data] = useState([]);
    const [items, set_items] = useState(['ff', 'fffghhh', 'frehre']);
    const fetchData =  () => {
        return fetch("https://jsonplaceholder.typicode.com/users")
            .then((response) => response.json())
            .then((data) => set_data(data));
    }
    fetchData()
    const keykey = (e)=>{
        if (e.key === 'Enter') {
            items.push(e.target.value)
            e.target.value = ""
            console.log(items)
        }
    }
    const changed = () => {
    }
    const submit_clicked = (e) => {
        e.preventDefault()
    }
    return(
        <div id='main_container'>
            <form action="">
                <input type="text" onChange={changed} onKeyPress={keykey} />
                <button onClick={submit_clicked}>
                    submit
                </button>
            </form>
            <ul>
                {items.map((element, index) => (<li>{items[index]}</li>))}
                ____________________________________________________

                {data && data.length > 0 && data.map((element, index) => (
                    <Item option={element.name} />
                ))}
            </ul>
        </div>
    )
}







export default Main_container;