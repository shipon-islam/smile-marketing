export const getCheckoutStateColor = (state) => {
  if (state.toLowerCase() == "approved") {
    return "text-green-500";
  } else if (state.toLowerCase() == "rejected") {
    return "text-red-500";
  } else {
    return "text-yellow-500";
  }
};
export const getClientStateColor = (state) => {
  if (state.toLowerCase() == "completed") {
    return "text-green-500";
  } else if (state.toLowerCase() == "new") {
    return "text-blue-500";
  } else {
    return "text-yellow-500";
  }
};
export const getInventoryStateColor = (state) => {
  if (state.toLowerCase() == "checked in") {
    return "text-green-500";
  } else {
    return "text-yellow-500";
  }
};
