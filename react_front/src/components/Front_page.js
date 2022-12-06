import { useEffect } from 'react'



function Front_page(props) {
    useEffect(() => {
        fetch(process.env.REACT_APP_API_URL+"/workspace/my_workspaces", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify("info")
        }).then((response) => response.json())
        .then(data => {
            console.log(data)
            if(data.result == 'failed'){
                console.log(data)
            }else if(data.result == 'success'){
                console.log(data)
            }
        })
    }, [])


    return(
        <div id=''>



            <nav id='front_nav'>
                nav here idk style
            </nav>

            <div id="front_div1">
                here list of worskpaces with owner nme, owned workspaces,
                join workspace with lnik
                create new workspce 
            </div>



            <div id="front_div2"> buncha useless garbage here </div>


            <div id="front_footer">fotter here</div>
        </div>
    )
}







export default Front_page;