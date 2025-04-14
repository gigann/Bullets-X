import { render, screen, fireEvent } from "@testing-library/react";
import Profile from "./Profile";

test("Renders Profile if logged in, nothing otherwise", () => {
  if (localStorage.getItem('loggedIn') === null) {
    render(null);
  }
  else {
    render(<Profile />);
  }
});