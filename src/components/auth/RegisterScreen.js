import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import validator from "validator";
import { useDispatch, useSelector } from "react-redux";
import { setError, unsetError } from "../../redux/actions/ui";
import { startRegisterEmailPassword } from "../../redux/actions/auth";

export const RegisterScreen = () => {
	const dispatch = useDispatch();
	const { errorMsg } = useSelector((state) => state.ui);

	const [values, handleInputChange] = useForm({
		name: "marlon",
		email: "marlon@icloud.com",
		password: "1235678",
		confirmPsw: "1235678",
	});

	const { name, email, password, confirmPsw } = values;

	const handleSubmit = (e) => {
		e.preventDefault();

		if (isFormValid()) {
			console.log(values);
			dispatch(startRegisterEmailPassword(email, password, name));
		}

		return;
	};

	const timer = () => {
		setTimeout(() => {
			dispatch(unsetError());
		}, 3000);
	};

	const isFormValid = () => {
		if (
			name.trim().length < 1 ||
			name.trim().length < 1 ||
			name.trim().length < 1 ||
			name.trim().length < 1
		) {
			console.log("All field are requieres");
			dispatch(setError("All field are requieres"));
			timer();
			return false;
		} else if (!validator.isEmail(email)) {
			console.log("Email incorrect");
			dispatch(setError("Email incorrect"));
			timer();
			return false;
		} else if (password !== confirmPsw) {
			console.log("both password should be the same");
			dispatch(setError("both password should be the same"));
			timer();
			return false;
		} else if (password.length < 6) {
			console.log("password should be a least 6 characters");
			dispatch(setError("password should be a least 6 characters"));
			timer();
			return false;
		} else {
			dispatch(unsetError());
			return true;
		}
	};

	return (
		<div className="animate__animated animate__fadeIn animate__faster">
			<h3 className="auth__title">Register</h3>
			{errorMsg && <div className="auth__alert-error">{errorMsg}</div>}

			<form onSubmit={(e) => handleSubmit(e)}>
				<input
					type="text"
					placeholder="Name"
					name="name"
					className="auth__input"
					autoComplete="off"
					value={name}
					onChange={handleInputChange}
				/>

				<input
					type="text"
					placeholder="Email"
					name="email"
					className="auth__input"
					autoComplete="off"
					value={email}
					onChange={handleInputChange}
				/>

				<input
					type="password"
					placeholder="Password"
					name="password"
					className="auth__input"
					value={password}
					onChange={handleInputChange}
				/>

				<input
					type="password"
					placeholder="Confirm password"
					name="confirmPsw"
					className="auth__input"
					value={confirmPsw}
					onChange={handleInputChange}
				/>

				<button
					type="submit"
					className="btn btn-primary btn-block mb-5"
				>
					Register
				</button>

				<Link to="/auth/login" className="link ">
					<span className="already-registered">
						Already registered?
					</span>
				</Link>
			</form>
		</div>
	);
};
