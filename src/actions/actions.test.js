import { actionCreator, payloadActionCreator } from ".";
import { generateRandomString } from "../test/testUtils";

test("should create action", () => {
  const type = generateRandomString(10);
  const action = actionCreator(type);
  expect(action).toStrictEqual({
    type
  });
});

test("should create action with payload", () => {
    const type = generateRandomString(10);
    const payload = generateRandomString(10);
    const action = payloadActionCreator(type, payload);
    expect(action).toStrictEqual({
      type,
      payload
    });
  });
