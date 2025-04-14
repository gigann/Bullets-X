import { render, screen, fireEvent } from "@testing-library/react";
import WinningBullets from "./WinningBullets";

test("Renders WinningBullets if logged in, nothing otherwise", () => {
  if (localStorage.getItem('loggedIn') === null) {
    render(null);
  }
  else {
    render(<WinningBullets />);
  }
});