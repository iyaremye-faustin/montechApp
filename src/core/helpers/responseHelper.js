const handleResponse = async (res, code, message, data, status) =>
  res
    .status(code)
    .json({ status: status, code: code, data: { message, data } });

const handleErrorResponse = async (res, code, message, errors, status) =>
  res
    .status(code)
    .json({ status: status, code: code, error: { message, errors } });

export { handleResponse, handleErrorResponse };
