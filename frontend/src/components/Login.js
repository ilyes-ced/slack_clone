import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import '../login.css'


function Login() {
	const nav = useNavigate()
	const email = useRef(null);
	const password = useRef(null);
    const [data, set_data] = useState('rr')
	
    const submi_login = (e) => {
		e.preventDefault()
        fetch(process.env.REACT_APP_API_URL+"/users/login", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({email: email.current.value, password: password.current.value})
        }).then((response) => {
				if(response.status == 200){
					return response.json()
				}else if(response.status == 401){
					return response.json()
				}
			}).then(data => {
				console.log(data)
				if(data.result == 'success'){
					localStorage.setItem('user_data', JSON.stringify(data.message))
					nav('/')
				}
			})
    }
	
    return(
		<div id='login_main_container' >
			<div className="container" id="container">
				<div className="form-container sign-up-container">
					<form   >
						<h1>Create Account</h1>
						<div className="social-container">
							<a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
							<a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
							<a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
						</div>
						<span>or use your email for registration</span>
						<input type="text" placeholder="Name" />
						<input type="email" placeholder="Email" />
						<input type="password" placeholder="Password" />
						<button>Sign Up</button>
					</form>
				</div>
				<div className="form-container sign-in-container">
					<form onSubmit={submi_login}>
						<h1>Sign in</h1>
						<div className="social-container">
							<a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
							<a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
							<a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
						</div>
						<span>or use your account</span>
						<input type="email" placeholder="Email" ref={email} className="" />
						<input type="password" placeholder="Password" ref={password} className="" />
						<a href="#">Forgot your password?</a>
						<button>Sign In</button>
					</form>
				</div>
				<div className="overlay-container">
					<div className="overlay">
						<div className="overlay-panel overlay-left">
							<h1>Welcome Back!</h1>
							<p>To keep connected with us please login with your personal info</p>
							<button className="ghost" id="signIn">Sign In</button>
						</div>
						<div className="overlay-panel overlay-right">
							<h1>Hello, Friend!</h1>
							<p>Enter your personal details and start journey with us</p>
							<button className="ghost" id="signUp">Sign Up</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
		{/* 

        <div className="container">
			<div className="screen">
				<div className="screen__content">
					<form className="login">
						<p style={{color: "black"}}>{data}</p>
						<div className="login__field">
							<i className="login__icon fas fa-user"></i>
							<input ref={email} type="text" className="login__input" placeholder="User name / Email"/>
						</div>
						<div className="login__field">
							<i className="login__icon fas fa-lock"></i>
							<input ref={password} type="password" className="login__input" placeholder="Password"/>
						</div>
						<button onClick={submi_login} className="button login__submit">
							<span className="button__text">Log In Now</span>
							<i className="button__icon fas fa-chevron-right"></i>
						</button>				
					</form>
					<div className="social-login">
						<h3>log in via</h3>
						<div className="social-icons">
							<a href="#" className="social-login__icon fab fa-instagram"></a>
							<a href="#" className="social-login__icon fab fa-facebook"></a>
							<a href="#" className="social-login__icon fab fa-twitter"></a>
						</div>
					</div>
				</div>
				<div className="screen__background">
					<span className="screen__background__shape screen__background__shape4"></span>
					<span className="screen__background__shape screen__background__shape3"></span>		
					<span className="screen__background__shape screen__background__shape2"></span>
					<span className="screen__background__shape screen__background__shape1"></span>
				</div>		
			</div>
		</div>*/}
    
}







export default Login