'use client';

interface ToggleProps {
	deletePost: () => void;
	setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

const Toggle = ({ deletePost, setToggle }: ToggleProps) => {
	const handleHide = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		if (e.target !== e.currentTarget) return;

		setToggle(false);
	};

	return (
		<div
			onClick={handleHide}
			className='fixed bg-black/20 w-full h-full z-20 top-0 left-0'>
			<div className='absolute bg-slate-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-12 rounded-lg flex flex-col gap-6 w-full max-w-[90%] md:max-w-xl'>
				<h2 className='text-lg md:text-xl'>
					Are you sure you want to delete this post? 😟
				</h2>
				<h3 className='text-red-500 text-sm'>
					Pressing the button below will delete this post permanently.
				</h3>
				<button
					onClick={deletePost}
					className='bg-red-500 text-slate-100 px-6 py-3 rounded-md max-w-[150px]'>
					Delete
				</button>
			</div>
		</div>
	);
};

export default Toggle;
