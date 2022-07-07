import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import {
	loginWithGoogle,
	startLoginEmailPassword,
} from "../../redux/actions/auth";

// Login with email and password
export const LoginScreen = () => {
	const [formValue, handleInputChange] = useForm({
		email: "marlon2324@icloud.com",
		password: "marlon1234",
	});

	// const [userData, setUserData] = useState({});
	const dispatch = useDispatch();
	const loading = useSelector((state) => state.ui.isLoading);
	const { email, password } = formValue;

	// Login with email and password
	const handleLogin = (e) => {
		e.preventDefault();
		dispatch(startLoginEmailPassword(email, password));
	};

	// Login with Google
	const handleGoogleLogin = async () => {
		dispatch(loginWithGoogle());
	};

	return (
		<div className="animate__animated animate__fadeIn animate__faster">
			<h3 className="auth__title">Login</h3>

			<form onSubmit={handleLogin}>
				<input
					type="text"
					placeholder="Email"
					name="email"
					className="auth__input"
					autoComplete="off"
					onChange={handleInputChange}
					value={email}
				/>

				<input
					type="password"
					placeholder="Password"
					name="password"
					className="auth__input"
					onChange={handleInputChange}
					value={password}
				/>

				<button
					type="submit"
					className="btn btn-primary btn-block"
					disabled={loading}
				>
					Login
				</button>

				<div className="auth__social-networks">
					<p>Login with social networks</p>

					<div className="google-btn" onClick={handleGoogleLogin}>
						<div className="google-icon-wrapper">
							<img
								className="google-icon"
								src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
								alt="google button"
							/>
						</div>
						<p className="btn-text">
							<b>Sign in with google</b>
						</p>
					</div>
				</div>

				<Link to="/auth/register" className="link">
					or{" "}
					<span className="new-account">Create a new account!</span>
				</Link>
			</form>
		</div>
	);
};
