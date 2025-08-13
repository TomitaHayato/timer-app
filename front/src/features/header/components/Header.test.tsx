import { afterEach, describe, expect, test, vi } from "vitest";
import Header from "./Header";
import { cleanup, screen } from "@testing-library/react";
import { renderWithProvider, renderWithProviderLoggedIn } from "../../../utils/test/testingLibraryCustom";

// 子コンポーネントのMock化
vi.mock('./PrifileIconBtn', () => {
  return { ProfileIconBtn: () => <div data-testid="profile-button-icon"></div> }
});
vi.mock('./LoginFormBtn.tsx', () => {
  return { LoginFormBtn: () => <div data-testid="login-form-button"></div> }
});
vi.mock('./LogoutBtn.tsx', () => {
  return { LogoutBtn: () => <div data-testid="logout-button"></div> }
})

describe('Headerコンポーネント', () => {
  afterEach(() => {
    cleanup(); // コンポーネントのアンマウント
  });

  test('認証後のUI表示が正常', () => {
    // ユーザーをセッティング
    renderWithProviderLoggedIn(<Header />);

    const profileBtn = screen.queryByTestId('profile-button-icon');
    const logoutBtn = screen.queryByTestId('logout-button');
    const loginFormBtn = screen.queryByTestId('login-form-button');

    expect(profileBtn).toBeInTheDocument();
    expect(logoutBtn).toBeInTheDocument();
    expect(loginFormBtn).not.toBeInTheDocument();
  });

  test('認証前のUI表示が正常', () => {
    renderWithProvider(<Header />);
    const profileBtn = screen.queryByTestId('profile-button-icon');
    const logoutBtn = screen.queryByTestId('logout-button');
    const loginFormBtn = screen.queryByTestId('login-form-button');

    expect(profileBtn).not.toBeInTheDocument();
    expect(logoutBtn).not.toBeInTheDocument();
    expect(loginFormBtn).toBeInTheDocument();
  });

  // 
  test.todo('集中ボタンが正常に動作');
});

