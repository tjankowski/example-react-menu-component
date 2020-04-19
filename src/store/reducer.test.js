import { generateRandomString } from "../test/testUtils";
import reducer, { INITIAL_STATE, REQUEST_STATUS } from "./reducer";
import {
  MENU_SELECT_ITEM,
  MENU_CANCEL,
  MENU_LOAD_ITEMS_SUCCESS,
  actionCreator,
  payloadActionCreator,
} from "../actions";

const initialState = {
  items: [],
  itemsStatus: REQUEST_STATUS.SUCCESS,
  selectedItem: "",
};

test("should have proper initial state", () => {
  expect(INITIAL_STATE).toStrictEqual(initialState);
});

test("should return same state for unkonow action", () => {
    const result = reducer(INITIAL_STATE, actionCreator("UNKNOWN_ACTION"));
    expect(result).toStrictEqual(initialState);
  });

test("should return empty string for selected item after closing menu", () => {
  const result = reducer(INITIAL_STATE, actionCreator(MENU_CANCEL));
  expect(result.selectedItem).toBe("");
  expect(result).toStrictEqual(initialState);
});

test("should reset selected item after closing menu", () => {
  const state = {
    ...INITIAL_STATE,
    selectedItem: generateRandomString(6),
  };
  const result = reducer(state, actionCreator(MENU_CANCEL));
  expect(result.selectedItem).toBe("");
  expect(result).toStrictEqual(initialState);
});

test("should store item after selecting item", () => {
  const item = generateRandomString(6);
  const result = reducer(
    INITIAL_STATE,
    payloadActionCreator(MENU_SELECT_ITEM, item)
  );
  const state = {
    ...INITIAL_STATE,
    selectedItem: item,
  };
  expect(result.selectedItem).toBe(item);
  expect(result).toStrictEqual(state);
});

test("should store items after successful loading", () => {
  const items = [generateRandomString(), generateRandomString()];
  const result = reducer(
    INITIAL_STATE,
    payloadActionCreator(MENU_LOAD_ITEMS_SUCCESS, items)
  );
  const state = {
    ...INITIAL_STATE,
    items
  };
  expect(result.items).toStrictEqual(items);
  expect(result).toStrictEqual(state);
});
