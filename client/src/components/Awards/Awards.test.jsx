import { render, screen, fireEvent } from "@testing-library/react";
import Awards from "./Awards";

test("Renders Awards if logged in, nothing otherwise", () => {
  if (localStorage.getItem('loggedIn') === null) {
    render(null);
  }
  else {
    render(<Awards />);
  }
});