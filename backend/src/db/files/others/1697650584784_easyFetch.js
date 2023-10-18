import config from "../config.json";

const { server_connection_error_message } = config.app;

export const easyFetch = async (url, headers, method, body) => {
  try {
    const options = {
      method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        ...headers,
      },
      body: JSON.stringify(body),
    };
    if (!method) {
      delete options.method;
    }
    if (!body) {
      delete options.body;
    }
    const response = await fetch(url, options);
    return response;
  } catch (e) {
    return { json: () => ({ error: server_connection_error_message }) };
  }
};
