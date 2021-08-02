export const initialState = {
  name: "",
  id: "",
  customers: [],
  payments: [],
  receivements: [],
};

export const UserReducer = (state, action) => {
  switch (action.type) {
    case "setName":
      return { ...state, name: action.payload.name };
    case "setId":
      return { ...state, id: action.payload.id };
    case "setCustomers":
      return { ...state, customers: action.payload.customers };
    case "setPayments":
      return { ...state, payments: action.payload.payments };
    case "setReceivements":
      return { ...state, receivements: action.payload.receivements };
      break;
    default:
      return state;
  }
};
