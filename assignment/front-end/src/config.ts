// user service
export const USER_SERVICE_URL = import.meta.env.USER_SERVICE_URL || "http://localhost:8000";
export const USER_SERVICE_REGISTER_URL = USER_SERVICE_URL + "/auth/register";
export const USER_SERVICE_LOGIN_URL = USER_SERVICE_URL + "/auth/login";

// question service
export const QUESTION_SERVICE_URL = import.meta.env.QUESTION_SERVICE_URL || "http://localhost:8080";
export const QUESTION_SERVICE_GET_QUESTION_URL = QUESTION_SERVICE_URL + "/questions";
