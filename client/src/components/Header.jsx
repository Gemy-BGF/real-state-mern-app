import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
export default function Header() {
	return (
		<header className='bg-slate-300 shadow-md'>
			<div className='flex items-center justify-between max-w-6xl mx-auto p-3 '>
				<Link
					to={"/"}
					className=' font-bold text-sm sm:text-xl flex flex-wrap group'>
					<span className='text-blue-500 group-hover:text-emerald-500 duration-300'>
						Ultra
					</span>
					<span className='text-blue-600 group-hover:text-emerald-600 duration-300'>
						_
					</span>
					<span className='text-blue-700 group-hover:text-emerald-700 duration-300'>
						Instinct
					</span>
				</Link>
				<form className='bg-blue-100 flex p-3 rounded-lg items-center focus-within:inner-border-blue-700 focus-within:inner-border-2 duration-700 focus-within:bg-slate-100	 '>
					<input
						type='text'
						placeholder='Search...'
						className='text-blue-500 placeholder:text-blue-500 bg-transparent outline-none w-24 sm:w-64'
					/>
					<div className=' '>
						{" "}
						<FaSearch className='text-blue-500' />{" "}
					</div>
				</form>
				<ul className='flex gap-4 text-blue-500 font-bold text-md'>
					<Link
						className='hover:text-blue-700 hover:underline duration-700 hidden sm:inline'
						to={"/"}>
						Home
					</Link>
					<Link
						className='hover:text-blue-700 hover:underline duration-700 hidden sm:inline'
						to={"/about"}>
						About
					</Link>
					<Link
						className='hover:text-blue-700 hover:underline duration-700'
						to={"/sign-in"}>
						Sign in
					</Link>
				</ul>
			</div>
		</header>
	);
}
