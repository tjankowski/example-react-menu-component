import {
  MENU_SELECT_ITEM,
  MENU_CANCEL,
  MENU_LOAD_ITEMS_SUCCESS,
} from "../actions";

export const REQUEST_STATUS = {
  LOADING: "LOADING",
  SUCCESS: "SUCCESS",
  FAILED: "FAILED",
};

export const INITIAL_STATE = {
  items: [],
  itemsStatus: REQUEST_STATUS.SUCCESS,
  selectedItem: "",
};

export default function reducer(state, action) {
  switch (action.type) {
    case MENU_SELECT_ITEM:
      return {
        ...state,
        selectedItem: action.payload,
      };
    case MENU_CANCEL:
      return {
        ...state,
        selectedItem: INITIAL_STATE.selectedItem,
      };
    case MENU_LOAD_ITEMS_SUCCESS:
      return {
        ...state,
        items: action.payload,
      };
    default:
      return state;
  }
}
