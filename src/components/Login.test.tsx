import { ionFireEvent } from "@ionic/react-test-utils";
import { screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { UserService } from "../services/FirebaseService";

describe("Login", () => {
  test("validate email", async () => {
    const email = screen.getByTestId("email"); //is defined by data-testid="email" in element jsx
    expect(email).toBeInTheDocument();

    ionFireEvent.ionChange(email, "test email");

    expect(await screen.findByText("Email not valid!")).toBeInTheDocument();
  });

  test("require all fields to be filled", async () => {
    const button = screen.getByTestId("submit");
    expect(button).toBeInTheDocument();

    ionFireEvent.click(button);

    expect(
      await screen.findByText("Please fill out all required fields!")
    ).toBeInTheDocument();
  });

  test("submit form", async () => {
    const email = screen.getByTestId("email");
    const password = screen.getByTestId("password");
    const button = screen.getByTestId("submit");
    const loginFunction = vi.spyOn(UserService, "login");

    //fake function implementation
    loginFunction.mockImplementation(
      async (email: string, password: string) => {
        return;
      }
    );

    ionFireEvent.ionChange(email, "test@test.de");
    ionFireEvent.ionChange(password, "123456");

    await waitFor(() => {
      expect(loginFunction).toHaveBeenCalled();
    });

    ionFireEvent.click(button);
  });
});
