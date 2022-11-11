import React,{ useState } from 'react'

function Login() {

    const [data, set_data] = useState('rr')
    const clicked = (e) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({email: 'zfzef', password: 'oizfuzgzuo5454'})
        };
        fetch('http://localhost:5000/workspaces', requestOptions)
            .then(response => response.json())
            .then(data => set_data(data.email));
    }
    return(
        <div>
            <p>{data}</p>
            <input type="text" />
            <input type="text" />
            <input type="checkbox" name="" id="" />
            <button onClick={clicked}>login</button>
        </div>
    )
}







export default Login;