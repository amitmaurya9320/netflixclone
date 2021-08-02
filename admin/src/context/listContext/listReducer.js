const ListReducer = (state, action) => {
  switch (action.type) {
    case "GET_LISTS_START":
      return {
        lists: [],
        isFeatching: true,
        error: false,
      };
    case "GET_LISTS_SUCCESS":
      return {
        lists: action.payload,
        isFeatching: false,
        error: false,
      };
    case "GET_LISTS_FAILURE":
      return {
        lists: [],
        isFeatching: false,
        error: true,
      };

    case "DELETE_LIST_START":
      return {
        ...state,
        isFeatching: true,
        error: false,
      };
    case "DELETE_LIST_SUCCESS":
      return {
        lists: state.lists.filter((list) => list._id !== action.payload),
        isFeatching: false,
        error: false,
      };
    case "DELETE_LIST_FAILURE":
      return {
        ...state,
        isFeatching: false,
        error: true,
      };

    case "CREATE_LIST_START":
      return {
        ...state,
        isFeatching: true,
        error: false,
      };
    case "CREATE_LIST_SUCCESS":
      return {
        lists: [...state.lists, action.payload],
        isFeatching: false,
        error: false,
      };
    case "CREATE_LIST_FAILURE":
      return {
        ...state,
        isFeatching: false,
        error: true,
      };

    case "UPDATE_LIST_START":
      return {
        ...state,
        isFeatching: true,
        error: false,
      };
    case "UPDATE_LIST_SUCCESS":
      return {
        lists: state.lists.map(
          (list) => list._id === action.payload._id && action.payload
        ),
        isFeatching: false,
        error: false,
      };
    case "UPDATE_LIST_FAILURE":
      return {
        ...state,
        isFeatching: false,
        error: true,
      };
    default:
      return state;
  }
};

export default ListReducer;
