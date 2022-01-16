import { createFormContext } from "..";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";

test("create context", () => {
  const FormContext = createFormContext({
    param: "",
  });

  const Status = () => {
    const { param } = FormContext.useWatch();
    return <div aria-label="result" data-param={param} />;
  };

  const Input = () => {
    return (
      <FormContext.Controller
        name="param"
        render={({ field }) => <input {...field} aria-label="input" />}
      />
    );
  };

  render(
    <FormContext.Provider>
      <Status />
      <Input />
    </FormContext.Provider>
  );

  const input = screen.getByLabelText("input");
  fireEvent.change(input, { target: { value: "test" } });

  const result = screen.getByLabelText("result");

  expect(result.getAttribute("data-param")).toBe("test");
});
