import { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { BsSearch } from "react-icons/bs";

function Front_page(props) {
    const nav = useNavigate()
    const [is_auth, set_is_auth] = useState('none')
    const [show_page, set_show_page] = useState(false)
    const [workspaces, set_workspaces] = useState([])
    const [show_input, set_show_input] = useState(false)

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


    const change_workspace = (element) => {
        localStorage.setItem('active_workspace', element)
        nav('/')
    }

    useEffect(() => {
        fetch(process.env.REACT_APP_API_URL+"/workspace/my_workspaces", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: localStorage.getItem('user_data')
        }).then((response) => response.json())
        .then(data => {
            console.log(data)
            if(data.result == 'failed'){

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
        <div id='front_page'>


            <nav id='front_nav'>
                <div>
                    <div> <img src="/logo192.png" alt="" /> </div>
                    <div>random</div>
                    <div>random</div>
                    <div>random</div>
                    <div>random</div>
                    <div>random</div>
                </div>
                <div>
                    <div>
                        <input placeholder='Search . . .' type="text" style={show_input ? {width: "100%", border: "1px solid white", padding: '10px' } : {width: "0px", border: 'none', padding: '0px' } }  />
                        <BsSearch onClick={() => { set_show_input(!show_input) }} />
                    </div>
                    <div>Create workspace</div>
                    <div>Join workspace</div>
                </div>
            </nav>


            
            <div id="front_div1">
                <div id='front_title1' >
                    Launch a workspace
                </div>
                {workspaces.map(ele => 
                    <div className='front_workspace_div'>
                        <div> 
                            <div> workspaces of : {ele.owner_email}  </div>
                            <div> {ele.members_count} members </div> 
                        </div>
                        <div> 
                            <div>
                                <div>
                                    <img src='/img.png' />
                                </div>
                                {ele.name}
                            </div>
                            <div><button onClick={() => {change_workspace(ele.id)}}> launch workspace </button></div>
                        </div>
                    </div>
                )}
                <div id='front_title2' >
                    Launch a workspace
                </div>
                <div>
                    <div className='front_workspace_div'>
                         <div> 
                             <div> workspaces of :   </div>
                             <div>  members </div> 
                         </div>
                         <div> 
                             <div>
                                 <div>
                                     <img src='/img.png' />
                                 </div>
                                 ff
                             </div>
                             <div><button > launch workspace </button></div>
                         </div>
                    </div>
                </div>
                
            </div>

            {/*
            <div id="front_div2"> buncha useless garbage here </div>
            <div id="front_footer">fotter here</div>
            */}
        </div>
    )
    return <div id='loader_parent'><div className="loader"></div>
    {show_page ? 'yes' : 'no'}
    </div>
}







export default Front_page;