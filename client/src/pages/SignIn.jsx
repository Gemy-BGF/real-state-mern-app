import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignIn() {
	const navigate = useNavigate();
	const [formdata, setFormData] = useState({});
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	const handleInputChange = (e) => {
		setFormData({ ...formdata, [e.target.id]: e.target.value });
	};
	console.log(formdata);
	const handleFormSubmit = async (e) => {
		e.preventDefault();
		try {
			setLoading(true);
			const res = await fetch("http://localhost:3000/api/auth/signin", {
				credentials: "include",
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formdata),
			});
			const data = await res.json();
			if (data.success === false) {
				setLoading(false);
				setError(data.message);
				return;
			}
			setLoading(false);
			setError(null);
			navigate("/");
		} catch (error) {
			setLoading(false);
			setError(error.message);
		}
	};
	return (
		<div className='p-3 max-w-lg mx-auto'>
			<h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
			<form
				onSubmit={handleFormSubmit}
				className='flex flex-col gap-4 '>
				<input
					type='email'
					placeholder='email'
					className='p-3 border rounded-lg'
					id='email'
					onChange={handleInputChange}
				/>
				<input
					type='password'
					placeholder='password'
					className='p-3 border rounded-lg'
					id='password'
					onChange={handleInputChange}
				/>
				<button
					disabled={loading}
					className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 font-semibold disabled:opacity-80'>
					{loading ? "Loading" : "Sign In"}
				</button>
			</form>
			<div className='flex gap-2 mt-5 text-lg'>
				<p>{"Don't have an account?"}</p>
				<Link to={"/sign-up"}>
					<span className='text-blue-700'>Sign up</span>
				</Link>
			</div>
			{error && <p className='text-red-500 mt-5'>{error}</p>}
		</div>
	);
}
