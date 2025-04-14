import { render, screen, fireEvent } from "@testing-library/react";
import Bullets from "./Bullets";

test("Renders Bullets if logged in, nothing otherwise", () => {
  if (localStorage.getItem('loggedIn') === null) {
    render(null);
  }
  else {
    render(<Bullets />);
  }
});