:root {
	--text-color: white;
	--color1: #6715eb;
	--color2: #14101a;
	--color3: #1a1d21;
	--color4: #8544ef;
	--color5: #222529;
	--color6: #313337;
	--color7: rgba(150,150,150,0.7);
	--color8: #503e6d;
}
  
body {
    margin: 0;
    padding: 0;
    color: var(--text-color);
}


#nav_bar{
	padding-right: 10px;
	padding-left: 10px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
	justify-content: space-between;
    width : 100%;
    height: 7vh;
    background-color: var(--color1);
}

#side_bar{
    resize: horizontal;
    width: 300px;
    height: 100%;
    background-color: var(--color2);
    height: 93vh;
    overflow-x: hidden;
	overflow-y: auto;
	border-right: 1px solid red;
}


#main_window{ 
    width: 100%;
    display: flex;
    flex-direction: row;
}

/*
    border: 1px solid #29262f;
    */
#main_container{
    width: 100%;
    height: 93vh;
    background-color: var(--color3);
}




/*********************************************************************************************/


#app_bar_search{
    background-color: var(--color4);
    border: 1px solid var(--color7);
    height: 100%;
	width: 100%;
    border-radius: 5px;
    color: white;
    padding-left: 10px;
}

#app_bar_div1{
	width: 50%;
	height: 60%;
    float: left;
}

#app_bar_div2{
    background-color: red;
    float: right;
}


#rich_text_input{
    height: 150px;
    padding: 20px;
    box-sizing: border-box;
}
#rich_text_input_content{
    height: 100%;
    border: white solid 1px;
    border-radius: 10px;
    background-color: var(--color5);
}


#messages_cntainer{
    height: calc(100% - 150px);
    overflow-y: auto;
}







/*********************************************************************************************/





#workspace_div{
	display: flex;
	align-items: center;
	height: 50px;
	border-bottom: 1px solid var(--color6);
	font-weight: 700;
	font-size: 18px;
}

.side_bar_elements{
	display: flex;
	flex-direction: column;
	align-items: center;
	border-bottom: 1px solid var(--color6);
	padding-top: 15px;
	padding-bottom: 15px;
}
.side_bar_elements:last-child{
	padding-bottom : 0px;
	border : none;
}

.side_bar_sub_elements{
	width: 100%;
	padding-right: 20px;
	padding-left: 20px;
	padding-top: 5px;
	padding-bottom: 5px;
}
.side_bar_sub_elements:hover{
	background-color: var(--color8);
}

#workspace_div:hover {
	background-color: var(--color8);
}

/*********************************************************************************************/



#main_container_title_bar{
	padding-left: 20px;
	padding-right: 20px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 50px;
	border-bottom: 1px solid var(--color6);
	font-weight: 700;
	font-size: 18px;

}
#main_container_title{
	margin-top: 3px;
}
#main_container_options{
	margin-top: 3px;
}























/*********************************************************************************************/



* {
	box-sizing: border-box;
	margin: 0;
	padding: 0;	
	font-family: Raleway, sans-serif;
}

body {
	background: linear-gradient(90deg, #C7C5F4, #776BCC);		
}

.container {
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 100vh;
}

.screen {		
	background: linear-gradient(90deg, #5D54A4, #7C78B8);		
	position: relative;	
	height: 600px;
	width: 360px;	
	box-shadow: 0px 0px 24px #5C5696;
}

.screen__content {
	z-index: 1;
	position: relative;	
	height: 100%;
}

.screen__background {		
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 0;
	-webkit-clip-path: inset(0 0 0 0);
	clip-path: inset(0 0 0 0);	
}

.screen__background__shape {
	transform: rotate(45deg);
	position: absolute;
}

.screen__background__shape1 {
	height: 520px;
	width: 520px;
	background: #FFF;	
	top: -50px;
	right: 120px;	
	border-radius: 0 72px 0 0;
}

.screen__background__shape2 {
	height: 220px;
	width: 220px;
	background: #6C63AC;	
	top: -172px;
	right: 0;	
	border-radius: 32px;
}

.screen__background__shape3 {
	height: 540px;
	width: 190px;
	background: linear-gradient(270deg, #5D54A4, #6A679E);
	top: -24px;
	right: 0;	
	border-radius: 32px;
}

.screen__background__shape4 {
	height: 400px;
	width: 200px;
	background: #7E7BB9;	
	top: 420px;
	right: 50px;	
	border-radius: 60px;
}

.login {
	width: 320px;
	padding: 30px;
	padding-top: 156px;
}

.login__field {
	padding: 20px 0px;	
	position: relative;	
}

.login__icon {
	position: absolute;
	top: 30px;
	color: #7875B5;
}

.login__input {
	border: none;
	border-bottom: 2px solid #D1D1D4;
	background: none;
	padding: 10px;
	padding-left: 24px;
	font-weight: 700;
	width: 75%;
	transition: .2s;
}

.login__input:active,
.login__input:focus,
.login__input:hover {
	outline: none;
	border-bottom-color: #6A679E;
}

.login__submit {
	background: #fff;
	font-size: 14px;
	margin-top: 30px;
	padding: 16px 20px;
	border-radius: 26px;
	border: 1px solid #D4D3E8;
	text-transform: uppercase;
	font-weight: 700;
	display: flex;
	align-items: center;
	width: 100%;
	color: #4C489D;
	box-shadow: 0px 2px 2px #5C5696;
	cursor: pointer;
	transition: .2s;
}

.login__submit:active,
.login__submit:focus,
.login__submit:hover {
	border-color: #6A679E;
	outline: none;
}

.button__icon {
	font-size: 24px;
	margin-left: auto;
	color: #7875B5;
}

.social-login {	
	position: absolute;
	height: 140px;
	width: 160px;
	text-align: center;
	bottom: 0px;
	right: 0px;
	color: #fff;
}

.social-icons {
	display: flex;
	align-items: center;
	justify-content: center;
}

.social-login__icon {
	padding: 20px 10px;
	color: #fff;
	text-decoration: none;	
	text-shadow: 0px 0px 8px #7875B5;
}

.social-login__icon:hover {
	transform: scale(1.5);	
}