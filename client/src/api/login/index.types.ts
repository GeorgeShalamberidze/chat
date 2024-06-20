export type User = {
	username: string;
};

export interface UserResponse extends User {
	result: boolean;
	message: string;
	token: string;
}
