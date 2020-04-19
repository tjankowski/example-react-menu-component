import React from "react";
import { render } from "@testing-library/react";
import TopMenu from "./TopMenu";

test("should render nav element", () => {
  const { container } = render(<TopMenu />);
  const elements = container.getElementsByTagName("nav");
  expect(elements.length).toBe(1);
  expect(elements[0].getElementsByTagName("ul")[0].childNodes.length).toBe(0);
});

test("should render navigation without items", () => {
  const { baseElement } = render(<TopMenu />);
  const elements = baseElement.getElementsByTagName("nav");
  expect(elements[0].getElementsByTagName("ul")[0].childNodes.length).toBe(0);
});

test("should render navigation with items", () => {
  const items = [
    { id: 0, name: "item-0" },
    { id: 1, name: "item-1" },
  ];
  const { baseElement } = render(<TopMenu items={items} />);
  const elements = baseElement.getElementsByTagName("nav");
  expect(elements[0].getElementsByTagName("ul")[0].childNodes.length).toBe(2);
});

test("should render navigation with subItems", () => {
  const items = [
    { id: 0, name: "item-0", subItems: [{ id: 0, name: "item-0" }] },
  ];
  const { container } = render(<TopMenu items={items} />);
  const nav = container.getElementsByTagName("nav");
  const menu = nav[0].getElementsByTagName("ul")[0];
  expect(menu.childNodes.length).toBe(1);
  const childMenu = menu.getElementsByTagName("ul")[0];
  expect(childMenu.childNodes.length).toBe(1);
});

test("should mark selected items", () => {
  const items = [
    { id: 0, name: "item-0", subItems: [{ id: 1, name: "item-1" }] },
  ];
  const { getByText } = render(
    <TopMenu items={items} seletedItem="item-0-1" />
  );
  expect(
    getByText("item-0").parentElement.classList.contains("navigation__item_selected")
  ).toBe(true);
  expect(
    getByText("item-1").parentElement.classList.contains("navigation__item_selected")
  ).toBe(true);
});
