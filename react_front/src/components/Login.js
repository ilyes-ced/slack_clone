import { useState, useRef } from 'react'

function Login() {

	const email = useRef(null);
	const password = useRef(null);
    const [data, set_data] = useState('rr')
    const submi_login = (e) => {
		e.preventDefault()
        fetch(process.env.REACT_APP_API_URL+"/users/login", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({email: email.current.value, password: password.current.value})
        })
            .then(response => response.json())
            .then(data => set_data(data.email))
    }
	
    return(
        <div class="container">
	<div class="screen">
		<div class="screen__content">
			<form class="login">
				<div class="login__field">
					<i class="login__icon fas fa-user"></i>
					<input ref={email} type="text" class="login__input" placeholder="User name / Email"/>
				</div>
				<div class="login__field">
					<i class="login__icon fas fa-lock"></i>
					<input ref={password} type="password" class="login__input" placeholder="Password"/>
				</div>
				<button onClick={submi_login} class="button login__submit">
					<span class="button__text">Log In Now</span>
					<i class="button__icon fas fa-chevron-right"></i>
				</button>				
			</form>
			<div class="social-login">
				<h3>log in via</h3>
				<div class="social-icons">
					<a href="#" class="social-login__icon fab fa-instagram"></a>
					<a href="#" class="social-login__icon fab fa-facebook"></a>
					<a href="#" class="social-login__icon fab fa-twitter"></a>
				</div>
			</div>
		</div>
		<div class="screen__background">
			<span class="screen__background__shape screen__background__shape4"></span>
			<span class="screen__background__shape screen__background__shape3"></span>		
			<span class="screen__background__shape screen__background__shape2"></span>
			<span class="screen__background__shape screen__background__shape1"></span>
		</div>		
	</div>
</div>
    )
}







export default Login;