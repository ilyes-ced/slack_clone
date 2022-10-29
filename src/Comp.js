function Comp(props) {
    let items = props.list.map(ele => <li className="first">{ele}</li>)
    return(
        <div className='hi'>
            <ul>
                {items}
            </ul>
        </div>
    )
}







export default Comp;