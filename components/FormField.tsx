interface FormFieldProps {
	name: string;
	placeholder: string;
	label: string;
	value: string;
	handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const FormField = ({
	name,
	placeholder,
	label,
	value,
	handleChange,
}: FormFieldProps) => {
	return (
		<div>
			<label
				htmlFor={name}
				className='block text-sm font-medium text-gray-900 mb-2'>
				{label}
			</label>
			<textarea
				required
				id={name}
				name={name}
				placeholder={placeholder}
				rows={3}
				value={value}
				onChange={handleChange}
				className='bg-gray-50 border border-gray-300 text-gray-900 text-sm md:text-base rounded-lg focus:ring-indigo-500 focus:ring-2 focus:border-indigo-500 outline-none block w-full p-3'
			/>
		</div>
	);
};

export default FormField;
