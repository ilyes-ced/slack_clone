import App_bar from './App_bar'
import Side_bar from './Side_bar'
import Main_container from './Main_container'
import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react'


function Home_page() {


    const [is_auth, set_is_auth] = useState("none")
    useEffect(() => {
        console.log(localStorage.getItem("user_data"))
        fetch(process.env.REACT_APP_API_URL+"/users/verify_user", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: localStorage.getItem('user_data')
        }).then((response) => response.json())
        .then(data => {
            console.log(data)
            if(data.result == 'failed'){
                set_is_auth('redirect')
                console.log(is_auth)
                console.log(data)
            }else if(data.result == 'success'){
                set_is_auth('auth')
                console.log(is_auth)
            }
        })
    }, [])




    if(is_auth == 'redirect'){
        return <Navigate replace to="/login" />
    }
    if(is_auth == 'auth') return(
        <>
            <App_bar/>
            <div id="main_window">
                <Side_bar/>
                <Main_container/>
            </div>
        </>
    )
}



export default Home_page;