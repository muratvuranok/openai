/**
 * Login request type
 */
export interface LoginModel {
  username: string;
  password: string;
}

export interface LoginState {
  result: {
    status: "idle" | "loading" | "succeeded" | "failed";
    statusCode: number;
    message: string;
    token: string;
  };
}
