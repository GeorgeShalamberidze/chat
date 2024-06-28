import { useChatMessages } from './useChatMessages';

export const ChatMessages: React.FC = () => {
	const { allMessages, bottomChatContainerRef } = useChatMessages();

	return (
		<div className="flex-1 flex-col flex gap-1 overflow-y-scroll pb-4 pt-2 pr-3">
			{allMessages && allMessages.length > 0
				? allMessages.map((msg, i) => {
						const { isFromSelf, uploadUrl, message } = msg;
						return (
							<div
								key={i}
								className={`${isFromSelf ? 'justify-end' : 'justify-start'} flex`}
							>
								<p
									className={`${isFromSelf ? 'font-normal text-base bg-slate-800 text-white' : 'bg-gray-200'} w-fit py-2 px-3 rounded-2xl whitespace-pre-wrap break-words max-w-96`}
								>
									{uploadUrl ? (
										<a
											href={uploadUrl}
											target="_blank"
											className="text-blue-400"
										>
											{uploadUrl}
										</a>
									) : (
										<>{message}</>
									)}
								</p>
							</div>
						);
					})
				: null}
			<div ref={bottomChatContainerRef} />
		</div>
	);
};
