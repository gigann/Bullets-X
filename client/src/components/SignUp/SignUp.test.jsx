import { render, screen, fireEvent } from "@testing-library/react";
import SignUp from "./SignUp";
import { BrowserRouter } from "react-router-dom";

test("Renders SignUp", () => {
  render(
    <BrowserRouter>
      <SignUp />
    </BrowserRouter>
  );
});