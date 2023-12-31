import React from "react";
import { create } from "react-test-renderer";
import Paginator from "./Paginator.ts";

describe("Paginator component tests", () => {
  test("is pages count is more then 10 button Next should be present ", () => {
    const component = create(
      <Paginator totalItemsCount={11} pageSize={1} portionSize={10} />
    );
    const root = component.root;
    let spans = root.findAllByType("span");
    expect(spans.length).toBe(10);
  });
  test("is pages count is more then 10 button Next should be present ", () => {
    const component = create(
      <Paginator totalItemsCount={11} pageSize={1} portionSize={10} />
    );
    const root = component.root;
    let button = root.findAllByType("button");
    expect(button.length).toBe(1);
  });
});
