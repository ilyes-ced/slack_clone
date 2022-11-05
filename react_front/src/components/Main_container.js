import React, { useState } from "react";
function Main_container() {

    
    const [data, set_data] = useState([]);
    const fetchData =  () => {
        return fetch("http://localhost:5000")
            .then((response) => response.json())
            .then((data) => {set_data(data)
            console.log(data)});
    }
    fetchData()
    const keykey = (e)=>{
        if (e.key === 'Enter') {
            console.log('do validate');
        }
    }
    const changed = () => {
        console.log('changed')
    }
    const submit_clicked = (e) => {
        e.preventDefault()
        console.log('submit_clicked')
    }
    return(
        <div id='main_container'>
            <form action="">
                <input type="text" onChange={changed} onKeyPress={keykey} />
                <button onClick={submit_clicked}>
                    submit
                </button>
            </form>
            {data.forEach(element => <li>data.name</li>)}
        </div>
    )
}







export default Main_container;