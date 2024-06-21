export const Search: React.FC = () => {
	return (
		<div className="bg-white w-full flex-1">
			<input
				placeholder="Search users"
				type="text"
				className="rounded-3xl border border-solid border-gray-200 w-full outline-none p-2 pl-3 flex items-center text-sm"
			/>
		</div>
	);
};
