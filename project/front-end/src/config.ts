// user service
export const USER_SERVICE_URL = import.meta.env.USER_SERVICE_URL || "http://localhost:8000";
export const USER_SERVICE_REGISTER_URL = USER_SERVICE_URL + "/auth/register";
export const USER_SERVICE_LOGIN_URL = USER_SERVICE_URL + "/auth/login";

// room service
export const ROOM_SERVICE_URL = import.meta.env.ROOM_SERVICE_URL || "http://localhost:8888";
export const EXEC_CODE_URL = ROOM_SERVICE_URL + "/rooms/code";

// question service
export const QUESTION_SERVICE_URL = import.meta.env.QUESTION_SERVICE_URL || "http://localhost:8080";
export const QUESTION_SERVICE_GET_QUESTION_URL = QUESTION_SERVICE_URL + "/questions";

// history service
export const HISTORY_SERVICE_URL = import.meta.env.HISTORY_SERVICE_URL || "http://localhost:8500";

// matching service
export const MATCHING_SERVICE_URL = import.meta.env.MATCHING_SERVICE_URL || "http://localhost:8001";
