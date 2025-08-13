import { afterEach, describe, expect, test, vi } from "vitest";
import Header from "./Header";
import { cleanup, screen } from "@testing-library/react";
import { renderWithProvider, renderWithProviderLoggedIn } from "../../../utils/test/testingLibraryCustom";
import userEvent from "@testing-library/user-event"
import { LoginFormBtn } from "./LoginFormBtn";

// axios処理をMock化
const fetchMock = vi.hoisted(() => vi.fn());
vi.mock("../../../utils/fetch/fetchWithTokenRefresh", () => {
  return {
    fetchWithTokenRefresh: fetchMock,
  }
})

describe('Headerコンポーネント', () => {
  afterEach(() => {
    cleanup(); // コンポーネントのアンマウント
    fetchMock.mockClear();
  });

  test('認証後のUI表示が正常', () => {
    // ユーザーをセッティング
    renderWithProviderLoggedIn(<Header />);

    const profileBtn = screen.queryByTestId('profile-modal-btn');
    const logoutBtn = screen.queryByTestId('logout-btn');
    const loginFormBtn = screen.queryByTestId('login-form-modal-btn');

    expect(profileBtn).toBeInTheDocument();
    expect(logoutBtn).toBeInTheDocument();
    expect(loginFormBtn).not.toBeInTheDocument();
  });

  test('認証前のUI表示が正常', () => {
    renderWithProvider(<Header />);
    const profileBtn = screen.queryByTestId('profile-modal-btn');
    const logoutBtn = screen.queryByTestId('logout-btn');
    const loginFormBtn = screen.queryByTestId('login-form-modal-btn');

    expect(profileBtn).not.toBeInTheDocument();
    expect(logoutBtn).not.toBeInTheDocument();
    expect(loginFormBtn).toBeInTheDocument();
  });

  // 
  test.todo('集中ボタンが正常に動作');

  test("ログアウトできる", async() => {
    renderWithProviderLoggedIn(<Header />);
    const user = userEvent.setup();
    await user.click(screen.getByText('ログアウト'));

    // 認証前のHeaderが表示される
    const profileBtn = screen.queryByTestId('profile-modal-btn');
    const logoutBtn = screen.queryByTestId('logout-btn');
    const loginFormBtn = screen.queryByTestId('login-form-modal-btn');

    expect(profileBtn).not.toBeInTheDocument();
    expect(logoutBtn).not.toBeInTheDocument();
    expect(loginFormBtn).toBeInTheDocument();
  });

  test('', async() => {});

  test('ボタン押下でLogin/Signupフォームが表示される', async() => {
    renderWithProvider(<LoginFormBtn btnClass=""/>);
    // ボタン押下前は表示されない
    expect(screen.queryByTestId("login-form")).not.toBeVisible();
    expect(screen.queryByTestId("signup-form")).not.toBeVisible();
    // ボタン押下後、表示される
    const user = userEvent.setup();
    await user.click(screen.getByTestId("login-form-modal-btn"))
    expect(screen.queryByTestId("login-form")).toBeVisible();
    expect(screen.queryByTestId("signup-form")).toBeVisible();
  });
});

