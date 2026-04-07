export type Role = {
	id: string;
	name: string; // Đây là code role
	role_name: string; // Đây là name role
	is_system: boolean;
	created_at?: string;
	updated_at?: string;
};

export type RoleForm = Omit<Role, "id" | "is_system" | "name">;
export enum ERoleGroup {
	TENANT = "tenant",
	USER = "user",
	ROLE = "role",
	PERMISSION = "permission",
	ROLE_PERMISSIONS = "role-permissions",
	DEVICE = "device",
	CUSTOMER = "customer",
	WS = "ws",
	JOB = "job",
	PROMOTIONS = "promotions",
	ADDRESS = "address",
	COMPLAINT = "complaint",
	UPLOAD = "upload",
	GET_TENANT_BY_CODE = "getTenantByCode",
	DASHBOARD = "dashboard",
	MOBILE = "mobile",
	NOTIFICATIONS = "notifications",
	UPSERT_FCM = "upsert-fcm",
	POINT = "point",
	SETTINGS = "settings",
	CUSTOMER_CARE = "customer-care",
}
