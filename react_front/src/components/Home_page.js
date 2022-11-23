import App_bar from './App_bar'
import Side_bar from './Side_bar'
import Main_container from './Main_container'
import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react'




import { socket } from '../events/socket'



function Home_page() {

 // change to none for real authentication

    const [show_page, set_show_page] = useState(false)
    const [show_page2, set_show_page2] = useState(false)
    const [workspace, set_workspace] = useState({})
    const [channels, set_channels] = useState([])
    const [is_auth, set_is_auth] = useState("none")
    useEffect(() => {
        fetch(process.env.REACT_APP_API_URL+"/users/verify_user", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: localStorage.getItem('user_data')
        }).then((response) => response.json())
        .then(data => {
            if(data.result == 'failed'){
                set_is_auth('redirect')
            }else if(data.result == 'success'){
                set_is_auth('auth')
                set_show_page(true)
            }
        })
        
        
        socket.on('room_message', (data) => {
            alert(data);
        })

        
        fetch(process.env.REACT_APP_API_URL+"/workspace?data="+localStorage.getItem('user_data'), {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }).then((response) => response.json())
            .then(data => {
                if(data.result == 'failed'){
                    
                }else if(data.result == 'success'){
                    console.log(data.message.channels)
                    set_workspace(data.message.workspace)
                    set_channels(data.message.channels)
                    set_show_page2(true)
                }
            })
    


    }, [])




    if(is_auth == 'redirect'){
        return <Navigate replace to="/login" />
    }
    if(is_auth == 'auth' && show_page && show_page2) return(
        <>
            <App_bar/>
            <div id="main_window">
                <Side_bar workspace={workspace} channels={channels} />
                <Main_container workspace={workspace} channels={channels} />
            </div>
        </>
    )
    return <div id='loader_parent'><div class="loader"></div> </div>
}



export default Home_page;