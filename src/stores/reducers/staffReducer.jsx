const intialStaffState = {
    name: "",
    role: "",
    uid: "",
  };
  
  const staffReducer = (state = intialStaffState, action) => {
    switch (action.type) {
      case "STAFF":
        return {
          ...state,
          ...action.payload
        };
      default:
        return state;
    }
  };
  
  export default staffReducer;
  