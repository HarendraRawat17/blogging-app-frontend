export const apiHandler = async(apiCall) => {
  try {
    const res = await apiCall();

    return {
      success: true,
      data: res.data,
    };
  } catch (error) {
    return {
      success: false,
      message:
      error?.response?.data?.message ||
      error.message ||
      "something went wrong",
    };
  }
};