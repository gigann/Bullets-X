import { render, screen, fireEvent } from "@testing-library/react";
import SubordinatesBullets from "./SubordinatesBullets";

test("Renders SubordinatesBullets if logged in, nothing otherwise", () => {
  if (localStorage.getItem('loggedIn') === null) {
    render(null);
  }
  else {
    render(<SubordinatesBullets />);
  }
});