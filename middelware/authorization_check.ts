import { USER_ROLES } from "../config/enums";

type IsAuthorizedProps = {
  uri_path: string;
  role: number;
  employeeRole: number;
  isAdminAccess: boolean;
  request_method: string;
};

export const isAuthorized = ({
  uri_path,
  role = USER_ROLES.DEFAULT,
  isAdminAccess,
  request_method,
}: IsAuthorizedProps) => {
  if (uri_path.includes("/user")) {
    if (role == USER_ROLES.SUPER_ADMIN) return true;
    return false;
  }

  if (uri_path.includes("/order")) {
    if (request_method == "PUT") {
      if (isAdminAccess || role == USER_ROLES.SUPER_ADMIN) return true;
      return false;
    }
    return true;
  }

  return false;
};
