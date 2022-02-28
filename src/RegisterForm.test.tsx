import { screen, fireEvent, act, waitFor } from "@testing-library/react";
import { render } from "./test-utils";
import RegisterForm from "./RegisterForm";

it("Render form", () => {
  const mockSave = jest.fn();
  render(<RegisterForm saveData={mockSave} />);

  expect(screen.getByText(/Register/i)).toBeInTheDocument();
  expect(screen.getByTestId("firstName")).toBeInTheDocument();
  expect(screen.getByTestId("lastName")).toBeInTheDocument();
  expect(screen.getByTestId("phone")).toBeInTheDocument();
  expect(screen.getByTestId("country")).toBeInTheDocument();
  expect(mockSave).not.toBeCalled();
});

it("Validate first name input", async () => {
  const mockSave = jest.fn();
  render(<RegisterForm saveData={mockSave} />);

  act(() => {
    fireEvent.submit(screen.getByTestId("registerForm"));
  });

  await waitFor(() => {
    expect(screen.getByTestId("firstNameGroup")).toHaveTextContent(
      "This is required"
    );
    expect(mockSave).not.toBeCalled();
  });
});
