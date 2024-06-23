import { getAllMessage } from '@/api/messages';
import { useChatContext } from '@/context/useChatContext';
import { useUserContext } from '@/context/useUserContext';
import { getTime } from '@/utils/convertDate';
import { useEffect, useState } from 'react';

export const UserChat: React.FC<{
	username: string;
	id: string;
	isUserSelected: boolean;
}> = ({ username, isUserSelected, id }) => {
	const { setCurrentSelectedUser } = useChatContext();
	const { userID } = useUserContext();
	const [lastMsg, setLastMsg] = useState<string | undefined>();
	const [lastMsgDate, setLastMsgDate] = useState<string | undefined>();

	useEffect(() => {
		getAllMessage({ from: userID as string, to: id }).then((res) => {
			const { lastMsg, lastMsgSendDate } = res;

			if (lastMsg && lastMsgSendDate) {
				setLastMsg(lastMsg);
				setLastMsgDate(getTime(lastMsgSendDate));
			}
		});
	}, [id, userID]);

	return (
		<div
			className={`${isUserSelected ? 'bg-slate-800' : 'bg-white hover:bg-gray-200'} w-full py-1 px-2 cursor-pointer rounded-md h-14`}
			onClick={() => {
				setCurrentSelectedUser({ id, username });
			}}
		>
			<div className="overflow-x-hidden">
				<div className="flex justify-between items-center">
					<p
						className={`${isUserSelected ? 'text-white' : 'text-black'} text-lg font-bold truncate`}
					>
						{username}
					</p>
					<p
						className={`${isUserSelected ? 'text-gray-200' : 'text-gray-500'} text-sm`}
					>
						{lastMsgDate}
					</p>
				</div>
				<p
					className={`${isUserSelected ? 'text-gray-200' : 'text-gray-500'} text-sm truncate max-w-52`}
				>
					{lastMsg}
				</p>
			</div>
			<div></div>
		</div>
	);
};
