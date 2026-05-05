export type LoginFormValues = {
	username: string;
	password: string;
};

export type LoginFormType = LoginFormValues & {
	grant_type: string;
};
