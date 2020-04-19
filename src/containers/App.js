import React, { useEffect, useReducer } from "react";
import TopMenu from "../components/TopMenu";
import reducer, { INITIAL_STATE } from "../store/reducer";
import {
  MENU_LOAD_ITEMS_SUCCESS,
  MENU_SELECT_ITEM,
  MENU_CANCEL,
  actionCreator,
  payloadActionCreator,
} from "../actions";
import { fetchData } from "../api";

function App() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  useEffect(() => {
    fetchData()
      .then((data) => {
        dispatch(payloadActionCreator(MENU_LOAD_ITEMS_SUCCESS, data));
      })
      .catch((error) => {
        console.log("Catched error ",error);
        console.log("Continue with previous values.");
      });
  }, []);
  return (
    <>
      <header>
        <TopMenu
          items={state.items}
          seletedItem={state.selectedItem}
          onItemSelect={(id) =>
            dispatch(payloadActionCreator(MENU_SELECT_ITEM, id))
          }
          onCancel={() => dispatch(actionCreator(MENU_CANCEL))}
        />
      </header>
      <main className="main"></main>
    </>
  );
}

export default App;
