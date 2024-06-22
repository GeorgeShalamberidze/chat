export type User = {
	username: string;
	id: string;
};

export interface UserResponse extends User {
	result: boolean;
	message: string;
	token: string;
}
