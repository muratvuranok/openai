export const requestInterceptor = (config: any) => config;
export const requestErrorInterceptor = (error: any) => Promise.reject(error);
export const responseInterceptor = (response: any) => response;

export const responseErrorInterceptor = (error: any) => {
  const { response } = error;

  if (response && response.status === 401) {
    window.location.href = '/login';
  } else if (response && response.data.error) {
    const { message, code, details } = response.data.error;
    const errorTitle = message ? message : "Application Error";
    const errorCode = code ? code : "Error Code";
    const errorDetails = details ? details : "Unknown Error";

    console.log({
      title: errorTitle,
      content: errorDetails,
      code: errorCode,
    });
  } else {
    console.log({ content: "Unknown Error" });
  }

  return Promise.reject(error);
};
