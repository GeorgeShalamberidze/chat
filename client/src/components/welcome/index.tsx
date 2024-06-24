import React from 'react';
import { LOCAL_STORAGE_KEYS } from '@/enums/storage.enum';
import { Player } from '@lottiefiles/react-lottie-player';
import Lottie from '@/assets/lottie/robot.json';

export const Welcome: React.FC = () => {
	const username = localStorage.getItem(LOCAL_STORAGE_KEYS.USERNAME);

	return (
		<div className="flex items-center justify-center h-full flex-col">
			<Player
				src={Lottie}
				loop
				autoplay
				style={{
					maxHeight: '300px',
					maxWidth: '300px',
					width: '100%',
					height: '100%',
				}}
			/>
			<div className="flex flex-col items-center justify-items-center">
				<p className="text-4xl">
					welcome <span className="font-bold">{username!}</span>
				</p>
				<p className="text-xl">Select chat to start messaging !</p>
			</div>
		</div>
	);
};
