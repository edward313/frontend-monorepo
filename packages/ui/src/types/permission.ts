import { ERoleGroup } from "@repo/ui/types/role";

export type PermissionGroup = {
	group: ERoleGroup;
	permissions: Permission[];
};

export type Permission = {
	id: string;
	name: string;
	name_vi: string;
	action: string;
	path: string;
	is_default: boolean;
	is_system: boolean;
};

export type RequiredPermission = Pick<Permission, "path" | "action">;
