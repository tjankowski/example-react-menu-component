import React, { useRef } from "react";
import cx from "classnames";
import icon from "./menu.svg";

function isItemSelected(selected, id) {
  return selected.includes(id);
}

function viewId(id, prefix = "item") {
  return `${prefix}-${id}`;
}

function bem(prefix, className, modifier) {
  if (modifier) {
    return `${prefix}__${className}_${modifier}`;
  }
  return `${prefix}__${className}`;
}

export const POSITION = {
  fixed: "fixed",
  static: "static",
  relative: "relative",
  absolute: "absolute",
  sticky: "sticky",
  undefined: null,
};

function TopMenu({
  items = [],
  seletedItem = "",
  className = "navigation",
  position = POSITION.fixed,
  onItemSelect,
  onCancel,
}) {
  const menuElement = useRef(null);
  if (menuElement.current && seletedItem.length > 0) {
    menuElement.current.focus();
  }

  const renderChildItems = (items = [], parentId = "", level = 0, isVisible) => {
    const menuClass = cx(bem(className, "child-menu"), {
      [bem(className, "child-menu", "hidden")]: !isVisible,
      [bem(className, "child-menu", "first")]: level < 2,
      [bem(className, "child-menu", "other")]: level > 1,
    });
    return items.length > 0 ? (
      <ul key={`menu-${parentId}`} className={menuClass}>
        {items.map((item) => {
          const id = viewId(item.id, parentId);
          const itemClass = cx(
            bem(className, "item"),
            {
              [bem(className, "item", "selected")]: isItemSelected(
                seletedItem,
                id
              ),
            }
          );
          return (
            <li className={itemClass} key={id}>
              <span onClick={() => onItemSelect(id)}>{item.name}</span>
              {renderChildItems(
                item.subItems,
                id,
                level + 1,
                isItemSelected(seletedItem, id)
              )}
            </li>
          );
        })}
      </ul>
    ) : null;
  };

  const menuClass = cx(bem(className, "menu"), {
    [bem(className, "menu", "visible")]: seletedItem.length > 0,
  });
  const navigationStyle = {
    position,
  };
  return (
    <nav role="navigation" className={className} style={navigationStyle}>
      <ul
        ref={menuElement}
        className={menuClass}
        tabIndex="0"
        onBlur={onCancel}
      >
        {items.map((item) => {
          const id = viewId(item.id);
          const itemClass = cx(
            bem(className, "item"),
            bem(className, "item", "horizontal"),
            {
              [bem(className, "item", "selected")]: isItemSelected(
                seletedItem,
                id
              ),
            }
          );
          return (
            <li
              key={id}
              className={itemClass}
              selected={isItemSelected(seletedItem, id)}
            >
              <span onClick={() => onItemSelect(id)}>{item.name}</span>
              {renderChildItems(
                item.subItems,
                id,
                1,
                isItemSelected(seletedItem, id)
              )}
            </li>
          );
        })}
      </ul>
      <button
        className={bem(className, "handler")}
        onClick={() => {
          menuElement.current.focus();
        }}
      >
        <img src={icon} alt="Menu" />
      </button>
    </nav>
  );
}

export default TopMenu;
