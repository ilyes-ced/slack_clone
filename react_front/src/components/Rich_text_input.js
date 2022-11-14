




function Rich_text_input() {
    const calcHeight = (value) => {
        let numberOfLineBreaks = (value.match(/\n/g) || []).length;
        let newHeight = 20 + numberOfLineBreaks * 20 + 12 + 2;
        if(newHeight < 300) return newHeight;
      }
    const textarea_size = (e) => {
        e.target.style.height = calcHeight(e.target.value) + "px";
    }



    return(
        <div id='rich_text_input'>
            <div id='rich_text_input_content'>
                <div id='rich_text_top_icon_bar'>
                    icons here
                </div>
                <textarea onKeyUp={textarea_size} name="" id="rich_text_field" cols="30" rows="10"></textarea>
                <div id='rich_text_bottom_icon_bar'>
                    icons here
                </div>
            </div>
        </div>
    )
}







export default Rich_text_input;