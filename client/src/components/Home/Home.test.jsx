import { render, screen, fireEvent } from "@testing-library/react";
import Home from "./Home";

test("Renders Home if logged in, nothing otherwise", () => {
  if (localStorage.getItem('loggedIn') === null) {
    render(null);
  }
  else {
    render(<Home />);
  }
});