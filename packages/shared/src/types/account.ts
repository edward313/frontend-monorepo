import type { BasicResponse } from "./common";

export type GroupDto = {
	id?: number | null;
	name?: string | null;
};

export type Account = BasicResponse & {
	kind: number;
	username: string | null;
	phone: string | null;
	email: string | null;
	fullName: string | null;
	group: GroupDto | null;
	lastLogin: string | null;
	avatarPath: string | null;
	isSuperAdmin: boolean | null;
};
