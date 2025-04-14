import { render, screen, fireEvent } from "@testing-library/react";
import Upcoming from "./Upcoming";

test("Renders Upcoming if logged in, nothing otherwise", () => {
  if (localStorage.getItem('loggedIn') === null) {
    render(null);
  }
  else {
    render(<Upcoming />);
  }
});