




function Rich_text_input() {
    const calcHeight = (value) => {
        let numberOfLineBreaks = (value.match(/\n/g) || []).length;
        // min-height + lines x line-height + padding + border
        let newHeight = 20 + numberOfLineBreaks * 20 + 12 + 2;
        return newHeight;
      }
    const textarea_size = (e) => {
        e.target.style.height = calcHeight(e.target.value) + "px";
    }



    return(
        <div id='rich_text_input'>
            <div id='rich_text_input_content'>
                <div id='rich_text_top_icon_bar'></div>
                <textarea onKeyUp={textarea_size} name="" id="rich_text_field" cols="30" rows="10"></textarea>
                <div id='rich_text_bottom_icon_bar'></div>
            </div>
        </div>
    )
}







export default Rich_text_input;