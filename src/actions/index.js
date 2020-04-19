export const MENU_SELECT_ITEM = "MENU_SELECT_ITEM";
export const MENU_CANCEL = "MENU_CANCEL";
export const MENU_LOAD_ITEMS_SUCCESS = "MENU_LOAD_ITEMS_SUCCESS";
export const MENU_OPEN = "MENU_OPEN";

export function actionCreator(type) {
  return {
    type,
  };
}

export function payloadActionCreator(type, payload) {
  return {
    type,
    payload,
  };
}
