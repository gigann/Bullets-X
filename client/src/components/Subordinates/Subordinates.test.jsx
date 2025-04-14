import { render, screen, fireEvent } from "@testing-library/react";
import Subordinates from "./Subordinates";

test("Renders Subordinates if logged in, nothing otherwise", () => {
  if (localStorage.getItem('loggedIn') === null) {
    render(null);
  }
  else {
    render(<Subordinates />);
  }
});