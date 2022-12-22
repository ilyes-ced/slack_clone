import { useEffect, useState, useRef, createElement, useInsertionEffect } from 'react'
import {BsTypeBold, BsTypeItalic, BsTypeStrikethrough, BsLink45Deg, BsListUl, BsListOl, BsFillChatLeftQuoteFill, BsBraces, BsCodeSquare, BsChevronDown} from "react-icons/bs";



function Rich_text_input(props) {
    const text_input = useRef(null)
    const [first_focus, set_first_focus] = useState(true)
    const [show_add_link, set_show_add_link] = useState(false)
    const link_text = useRef(null)
    const link_url = useRef(null)
    const [editor_bold, set_editor_bold] = useState(true)
    const [editor_italic, set_editor_italic] = useState(true)
    const [editor_line, set_editor_line] = useState(true)
    const [editor_link, set_editor_link] = useState(true)
    const [editor_list, set_editor_list] = useState(true)
    const [editor_list_n, set_editor_list_n] = useState(true)
    const [editor_quote, set_editor_quote] = useState(true)
    const [editor_code, set_editor_code] = useState(true)
    const [editor_code_b, set_editor_code_b] = useState(true)
    const enable_disable_all = (value) => {
        set_editor_bold(value)
        set_editor_italic(value)
        set_editor_line(value)
        set_editor_link(value)
        set_editor_list(value)
        set_editor_list_n(value)
        set_editor_quote(value)
        set_editor_code(value)
        set_editor_code_b(value)
    }

    var last_cur
    const hide_show_modal = (e) => {
        if(e.currentTarget == e.target)
        set_show_add_link(!show_add_link)
    }
    useEffect(() => {        
        const handleClickOutside = (event) => {
            if (document.getElementById('rich_text_input_content') && !document.getElementById('rich_text_input_content').contains(event.target)) {
                enable_disable_all(true)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [/*text_input*/])


    function setCursor(ele) {
        var tag = ele
        var setpos = document.createRange()
        var set = window.getSelection()
        setpos.setStart(tag.childNodes[tag.childNodes.length-1], tag.childNodes[tag.childNodes.length-1].length)
        setpos.collapse(true)
        set.removeAllRanges()
        set.addRange(setpos)
        tag.focus();
    }
    const icon_click = (e) => {
        e.target.parentElement.style.backgroundColor = (e.target.parentElement.style.backgroundColor  == '#8544ef' ) ? '' : '#8544ef'
        var sel, range, html
        //alert(e.target.parentElement.id)
        switch (e.target.parentElement.id) {
            case 'bold':
                html = '<strong> </strong>'
                break
            case 'italic':
                html = '<i> </i>'
                break
            case 'line_over':
                html = '<s> </s>'
                break
            case 'list':
                html = '<ul><li> </li></ul>'
                break
            case 'numbered_list':
                html = '<ol><li> </li></ol>'
                break
            case 'link':
                set_show_add_link(true)
                break
            case 'quote':
                html = '<div class="quote"> </div>'
                break
            default:
                
        }
        if (window.getSelection && e.target.parentElement.id != "link") {
            sel = window.getSelection()
            if (sel.getRangeAt && sel.rangeCount) {
                range = sel.getRangeAt(0)
                range.deleteContents()
                var el = document.createElement("div")
                el.innerHTML = html
                var frag = document.createDocumentFragment(), node, lastNode
                while ( (node = el.firstChild) ) {
                    lastNode = frag.appendChild(node)
                }
                range.insertNode(frag)
                if (lastNode) {
                    range = range.cloneRange()
                    range.setStartAfter(lastNode)
                    range.collapse(true)
                    sel.removeAllRanges()
                    sel.addRange(range)
                    setCursor(lastNode)
                    last_cur = lastNode
                    console.log(last_cur)
                }
            }
        } else if (document.selection && document.selection.type != "Control") {
            // IE < 9
            document.selection.createRange().pasteHTML(html);
        }
        
    }
    const submit_text = () => {
        console.log(text_input.current.innerHTML)
        props.socket.emit('sent_message', {value: text_input.current.innerHTML, channel: props.current_channel, channel_type: props.current_channel_type })
        text_input.current.innerHTML = '<div></div>'
    }
    const input_focus = () => {
        enable_disable_all(false)
        if(first_focus){
            var tag = document.getElementById("rich_text_field")
            var setpos = document.createRange()
            var set = window.getSelection()
            setpos.setStart(tag.childNodes[0], 1)
            setpos.collapse(true)
            set.removeAllRanges()
            set.addRange(setpos)
            tag.focus()
            set_first_focus(false)
        }
    }
    const create_link = () => {
        var link = '<a href="'+link_url.current.value+'">'+link_text.currentvalue+'</a>'
        var sel, range, html

        if(last_cur){
            console.log(link_text.current.value, link_url.current.value)
            last_cur.innerHTML += '<a href="'+link_url.current.value+'">'+link_text.current.value+'</a>'
        }else{
            document.getElementById('rich_text_field').firstElementChild.innerHTML += '<a href="'+link_url.current.value+'">'+link_text.current.value+'</a>'
        }
    }
    const inputed = (e) => {
        e.preventDefault()
        var sel, range
        sel = window.getSelection()
        if (sel.getRangeAt && sel.rangeCount) {
            range = sel.getRangeAt(0)
            range.deleteContents()
            var el = document.createElement("div")
            el.innerHTML = "<br/>"
            var frag = document.createDocumentFragment(), node, lastNode
            while ( (node = el.firstChild) ) {
                lastNode = frag.appendChild(node)
            }
            range.insertNode(frag)
            console.log(lastNode.parentElement.tagName)
            if(lastNode.parentElement.tagName == "LI"){
                //simulate enter click here or rollback on prevent default
            }else if(lastNode){
                range = range.cloneRange()
                range.setStartAfter(lastNode)
                range.collapse(true)
                sel.removeAllRanges()
                sel.addRange(range)
                setCursor(lastNode)
                last_cur = lastNode
            }
        }
    }
    return(
        <div id='rich_text_input'>
            { show_add_link ? 
                <div className='modal link_modal' onClick={hide_show_modal} > 
                    <div id="add_link_modal">
                        <div>
                            <input ref={link_text} type="text" />
                        </div>
                        <div>
                            <input ref={link_url} type="text" />
                        </div>
                        <div>
                            <button onClick={create_link} >submit</button>
                        </div>
                    </div>
                    
                </div>
            : '' }
            <div id='rich_text_input_content'>
                <div id='rich_text_top_icon_bar'>
                    <button disabled={editor_bold} onClick={icon_click} className='text_icons' id='bold' >              <BsTypeBold/>               </button>
                    <button disabled={editor_italic} onClick={icon_click} className='text_icons' id='italic' >          <BsTypeItalic/>             </button>
                    <button disabled={editor_line} onClick={icon_click} className='text_icons' id='line_over' >         <BsTypeStrikethrough/>      </button>
                    <button disabled={editor_link} onClick={icon_click} className='text_icons' id='link' >              <BsLink45Deg/>              </button>
                    <button disabled={editor_list} onClick={icon_click} className='text_icons' id='list' >              <BsListUl/>                 </button>
                    <button disabled={editor_list_n} onClick={icon_click} className='text_icons' id='numbered_list' >   <BsListOl/>                 </button>
                    <button disabled={editor_quote} onClick={icon_click} className='text_icons' id='quote' >            <BsFillChatLeftQuoteFill/>  </button>
                    <button disabled={editor_code} onClick={icon_click} className='text_icons' id='code' >              <BsBraces/>                 </button>
                    <button disabled={editor_code_b} onClick={icon_click} className='text_icons' id='code_block' >      <BsCodeSquare/>             </button>
                </div>

                
                <div ref={text_input} contenteditable="true" id='rich_text_field' onFocus={ input_focus } onKeyDown={(e) => { if(e.key == 'Enter') inputed() }}  >
                    <div></div>
                </div>
                
                <div id='rich_text_bottom_icon_bar'>
                    icons here
                    <div id='submit_text' >
                        <div onClick={submit_text} >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send-fill" viewBox="0 0 16 16">
                                <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"/>
                            </svg>
                        </div>
                        <div></div>
                        <div>
                            <BsChevronDown/>
                        </div>
                    </div>
                </div>


                
            </div>
        </div>
    )
}







export default Rich_text_input;