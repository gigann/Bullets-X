import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "./Navbar";

test("Renders Navbar if logged in, nothing otherwise", () => {
  if (localStorage.getItem('loggedIn') === null) {
    render(null);
  }
  else {
    render(<Navbar />);
  }
});