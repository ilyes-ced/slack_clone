import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';


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
		</div>
    )
}







export default Login