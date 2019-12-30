import types from "../actions/todoActions";

const initialState = {
  items: [],
  editFlag: false,
  deleteFlag: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.CLICK_CREATE: {
      return {
        ...state,
        items: [...state.items, action.data]
      };
    }
    case types.START_EDITING: {
      return {
        ...state,
        editFlag: action.data
      };
    }
    case types.EDIT_ITEM: {
      return {
        ...state,
        items: action.data
      };
    }
    case types.CLICK_EDIT: {
      return {
        ...state,
        items: action.data
      };
    }
    case types.DELETE_ITEM: {
      return {
        ...state,
        items: action.data
      };
    }
    case types.START_DELETING: {
      return {
        ...state,
        deleteFlag: action.data
      };
    }
    case types.COMPLETE_TODO: {
      return {
        ...state,
        items: action.data
      };
    }
  }
  return state;
};
