import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';



function Front_page(props) {
    const [is_auth, set_is_auth] = useState('none')
    const [show_page, set_show_page] = useState(false)
    const [workspaces, set_workspaces] = useState([])

    fetch(process.env.REACT_APP_API_URL+"/users/verify_user", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: localStorage.getItem('user_data')
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




    useEffect(() => {
        fetch(process.env.REACT_APP_API_URL+"/workspace/my_workspaces", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: localStorage.getItem('user_data')
        }).then((response) => response.json())
        .then(data => {
            console.log(data)
            if(data.result == 'failed'){
                console.log(data)
            }else if(data.result == 'success'){
                set_workspaces(data.message.workspaces)
                console.log(data.message.workspaces)
            }
        })
    }, [])

    if(is_auth == 'redirect'){
        return <Navigate replace to="/login" />
    }
    if(is_auth == 'auth' && show_page) return(
        <div id=''>


            <nav id='front_nav'>
                nav here idk style
            </nav>




            <div id="front_div1">
                <div className='front_workspace_div'>
                    here list of worskpaces with owner nme
                    {workspaces.map(ele => <div>{ ele.name }</div> )}
                </div>
                , owned workspaces,
                join workspace with lnik
                create new workspce 
            </div>



            <div id="front_div2"> buncha useless garbage here </div>


            <div id="front_footer">fotter here</div>
        </div>
    )
    return <div id='loader_parent'><div className="loader"></div>
    {show_page ? 'yes' : 'no'}
    </div>
}







export default Front_page;