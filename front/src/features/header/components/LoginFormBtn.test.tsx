import { screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { LoginFormBtn } from "./LoginFormBtn";
import { renderWithProvider } from "../../../utils/test/testingLibraryCustom";
import userEvent from "@testing-library/user-event"

describe('LoginFormBtn.tsx', () => {
  test('ボタン押下でフォームが表示される', async() => {
    renderWithProvider(<LoginFormBtn btnClass=""/>);
    // ボタン押下前は表示されない
    expect(screen.queryByTestId("login-form")).not.toBeVisible();
    expect(screen.queryByTestId("signup-form")).not.toBeVisible();
    // ボタン押下後、表示される
    const user = userEvent.setup();
    await user.click(screen.getByTestId("login-form-modal-button"))
    expect(screen.queryByTestId("login-form")).toBeVisible();
    expect(screen.queryByTestId("signup-form")).toBeVisible();
  });
})
