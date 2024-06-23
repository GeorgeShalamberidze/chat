export const SelectedChatUser: React.FC<{ username: string | undefined }> = ({
	username,
}) => {
	return (
		<>
			<div className="flex items-center justify-center gap-2 mb-3">
				<p className="flex">Chatting with </p>
				<span className="font-bold text-3xl">{username}</span>
			</div>
			<div className="w-full h-[2px] bg-gray-200 mb-2"></div>
		</>
	);
};
