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
    //   case "LOGOUT":
    //     return {
    //       ...state,
    //       name: null,
    // role: null,
    // uid: null,
    //     };
      default:
        return state;
    }
  };
  
  export default staffReducer;
  