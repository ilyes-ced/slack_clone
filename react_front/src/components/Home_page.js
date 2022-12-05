import App_bar from './App_bar'
import Side_bar from './Side_bar'
import Main_container from './Main_container'
import { json, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react'







function Home_page(props) {

 // change to none for real authentication
    const info = JSON.parse(localStorage.getItem('user_data'))

    const [show_page, set_show_page] = useState(false)
    const [show_page2, set_show_page2] = useState(false)
    const [show_page3, set_show_page3] = useState(false)
    const [workspace, set_workspace] = useState({})
    const [all_workspaces, set_all_workspaces] = useState({})
    const [channels, set_channels] = useState([])
    const [users_channels, set_users_channels] = useState([])
    const [is_auth, set_is_auth] = useState("none")
    useEffect(() => {
        fetch(process.env.REACT_APP_API_URL+"/users/verify_user", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(info)
        }).then((response) => response.json())
        .then(data => {
            console.log(data)
            if(data.result == 'failed'){
                set_is_auth('redirect')
            }else if(data.result == 'success'){
                set_is_auth('auth')
                set_show_page(true)
            }
        })
                
        fetch(process.env.REACT_APP_API_URL+"/channel/users_channels?data="+JSON.stringify(info), {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }).then((response) => response.json())
            .then(data => {
                if(data.result == 'failed'){

                }else if(data.result == 'success'){
                    console.log(data.message)
                    set_users_channels(data.message)
                    set_show_page3(true)
                }
        })


        localStorage.getItem('active_workspace') ? info.active_workspace = localStorage.getItem('active_workspace') : console.log('dont exist')
        fetch(process.env.REACT_APP_API_URL+"/workspace?data="+JSON.stringify(info), {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }).then((response) => response.json())
            .then(data => {
                console.log(JSON.stringify(data))
                if(data.result !== 'success'){
                    console.log(data)
                }else if(data.result == 'success'){
                    console.log(data.message.channels)
                    set_workspace(data.message.workspace)
                    set_channels(data.message.channels)
                    set_all_workspaces(data.message.all_workspaces)
                    set_show_page2(true)
                }
        })
    



    }, [])




    if(is_auth == 'redirect'){
        return <Navigate replace to="/login" />
    }
    if(is_auth == 'auth' && show_page && show_page2 && show_page3) return(
        <>
            <App_bar/>
            <div id="main_window">
                <Side_bar workspace={workspace} channels={channels} set_channels={set_channels} users_channels={users_channels} all_workspaces={all_workspaces} />
                <Main_container socket={props.socket} workspace={workspace} channels={channels} users_channels={users_channels} />
            </div>
        </>
    )
    return <div id='loader_parent'><div className="loader"></div>
    {show_page ? 'yes' : 'no'}
    {show_page2 ? 'yes' : ' //no workspace redirect to find or create workspace //' }
    {show_page3 ? 'yes' : 'no'}
    </div>
}



export default Home_page;