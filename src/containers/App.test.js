import React from "react";
import { render, waitForElement } from "@testing-library/react";
import App from "./App";
import DATA from "../test/data";

beforeEach(() => {
  jest.restoreAllMocks();
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(DATA),
    })
  );
});

test("should render main element", async () => {
  const { container } = render(<App />);
  const elements = await waitForElement(() =>
    container.getElementsByClassName("main")
  );
  expect(elements.length).toBe(1);
});

test("should render empty navigation when api returns error", async () => {
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.reject({
      status: 401,
    })
  );
  const { getByRole } = render(<App />);
  const navElement = await waitForElement(() => getByRole("navigation"));
  expect(navElement).toBeInTheDocument();
  expect(navElement.getElementsByTagName("ul")[0].childNodes.length).toBe(0);
});

test("should render empty navigation when api returns invalid json", async () => {
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.reject("Parsing error"),
    })
  );
  const { getByRole } = render(<App />);
  const navElement = await waitForElement(() => getByRole("navigation"));
  expect(navElement).toBeInTheDocument();
  expect(navElement.getElementsByTagName("ul")[0].childNodes.length).toBe(0);
});

test("should render navigation when api returns data", async () => {
  const { getByRole } = render(<App />);
  const navElement = await waitForElement(() => getByRole("navigation"));
  expect(navElement).toBeInTheDocument();
  expect(navElement.getElementsByTagName("ul")[0].childNodes.length).toBe(4);
});
