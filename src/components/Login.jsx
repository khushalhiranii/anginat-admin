import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

// image
import loginImg from "../assets/login-img.png";
import google from "../assets/download (1).png";
import facebook from "../assets/download (2).png";

function Login() {
	const [email, setEmail] = useState('demo@example.com');
	const [password, setPassword] = useState('123456');
	const [errors, setErrors] = useState({ email: '', password: '' });
	
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { errorMessage, successMessage } = useSelector(state => state.auth);

	const login = (email, password) => {
		const postData = {
			emailOrUsername: email,
			password: password,
		};
		return axios.post(`https://back-end.anginat.com/api/auth/login`, postData);
	};

	const loginAction = (email, password) => async (dispatch) => {
		try {
			const response = await login(email, password);
			console.log(response);
			localStorage.setItem('accessToken', `Bearer ${response.data.data.accessToken}`);
			navigate('/dashboard');
		} catch (error) {
			console.log(error);
			// Optionally, you could handle login errors here, e.g., dispatching an action to set error message in the store
		}
	};

	const onLogin = (e) => {
		e.preventDefault();
		let error = false;
		const errorObj = { email: '', password: '' };
		
		if (!email) {
			errorObj.email = 'Email is required';
			error = true;
		}
		if (!password) {
			errorObj.password = 'Password is required';
			error = true;
		}

		setErrors(errorObj);
		if (!error) {
			dispatch(loginAction(email, password));
		}
	};

	const handleForgotPassword = () => {
		// navigate('/forgot-password');
	};

	return (
		<div>
			<div className="Section">
				<div className="down">
					<div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100vh", flexDirection: "column", gap: "20px" }} className="down-body">
						<div><img style={{ width: "450px" }} className="login-img" src={loginImg} alt="Login" /></div>
						<div><p style={{ fontSize: "28px", color: "black", fontWeight: "500" }}>Welcome To <br />Spring Learns</p></div>
						<p style={{ fontSize: "16px", textAlign: "center" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
					</div>
				</div>
				
				<div className="upper">
					<div style={{ paddingTop: "80px", paddingBottom: "80px" }} className="signin">
						<div className="card-body">
							<div className="mb-2">
								<p style={{ fontSize: "28px", fontWeight: "700", color: "black" }}>ANGINAT</p>
							</div>
							<h4 style={{ fontSize: "24px", marginTop: "20px", fontWeight: "500" }} className="mb-4">Admin Sign in</h4>
							
							{errorMessage && <div className="text-danger p-1 my-2">{errorMessage}</div>}
							{successMessage && <div className="text-success p-1 my-2">{successMessage}</div>}

							<form onSubmit={onLogin}>
								<div className="input">
									<div className="mb-3">
										<label className="mb-1">Email</label>
										<input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Type Your Email Address" />
										{errors.email && <div className="text-danger fs-12">{errors.email}</div>}
									</div>
									<div className="mb-3">
										<label className="mb-1">Password</label>
										<input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Type Your Password" />
										{errors.password && <div className="text-danger fs-12">{errors.password}</div>}
									</div>
									<p className="password" onClick={handleForgotPassword} style={{ cursor: 'pointer' }}>Forgot Password?</p>
								</div>
								<div className="row d-flex justify-content-between mt-4 mb-2">
									<div className="mb-3">
										<div className="form-check custom-checkbox ms-1">
											<input type="checkbox" className="form-check-input" id="basic_checkbox_1" />
											<label className="form-check-label" htmlFor="basic_checkbox_1">Remember my preference</label>
										</div>
									</div>
								</div>
								<div style={{ marginTop: "20px" }} className="text-center">
									<button type="submit" className="btn btn-primary btn-block">Sign Me In</button>
								</div>
							</form>
						</div>
					</div>

					<div style={{ display: 'flex', flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: "#fff5f4", padding: "20px", height: "240px" }}>
						<p className="sign-title" style={{ fontSize: "15px", textAlign: "center" }}>Or sign in with</p>
						<div className="google-facebook" style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
							<div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
								<img style={{ width: "28px" }} src={google} alt="Google" />
								<p className="sign-text" style={{ marginTop: "15px", color: "black", fontWeight: "500" }}>Sign in using Google</p>
							</div>
							<div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
								<img style={{ width: "28px" }} src={facebook} alt="Facebook" />
								<p className="sign-text" style={{ marginTop: "15px", color: "black", fontWeight: "500" }}>Sign in using Facebook</p>
							</div>
						</div>
						<div className="new-account mt-3">
							<p>New user? <Link to="/select-one" className="text-primary">Create an Account</Link></p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Login;
