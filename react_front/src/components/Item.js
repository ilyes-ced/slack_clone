import React, { useState } from "react"


function Item(props) {
    const [visible, set_visible] = useState(true)
    const remove_element = () => {
        console.log('remove')
        set_visible((visible) => !visible);
    }
    return(
        <nav id="item" onClick={remove_element}>
            zefzef
            {props.option}
        </nav>
    )
}







export default Item;