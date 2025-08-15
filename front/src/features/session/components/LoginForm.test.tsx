import { afterEach, describe, expect, test, vi } from "vitest";
import userEvent from "@testing-library/user-event"
import { screen } from "@testing-library/dom";
import { cleanup } from "@testing-library/react";
import { renderWithProvider } from "../../../utils/test/testingLibraryCustom";
import { LoginForm } from "./LoginForm";
import type { SessionState } from "../types/session";
import { userDataFromAPI } from "../../../utils/test/dammyData/dammyState";

// axiosのMock化
const fetchMock = vi.hoisted(() => vi.fn());
vi.mock('../../../utils/axios', () => {
  return {
    clientCredentials: { post: fetchMock }
  }
})

const loadingSessionState: SessionState = {
  user: null,
  isAuthenticated: false,
  loading: true,
  error: null,
}

describe("LoginForm.tsx", () => {
  afterEach(() => {
    cleanup();
  });

  describe("フォームのUI表示", () => {
    test("必須バリデーションが機能している", async() => {
      const user = userEvent.setup();
      renderWithProvider(<LoginForm />, {});
      // 未入力のままフォームを送信
      await user.click(screen.getByText("ログイン"));

      expect(screen.getByText("！メールアドレスを入力してください")).toBeInTheDocument();
      expect(screen.getByText("！パスワードを入力してください")).toBeInTheDocument();
    });

    test("APIの認証中はLoading用のUIが表示", () => {
      // loading = trueの状態でレンダリング
      renderWithProvider(<LoginForm />, {
        preloadedState: { session: loadingSessionState }
      });

      expect(screen.queryByTestId('login-btn')).not.toBeInTheDocument();
      expect(screen.queryByTestId('loading-btn')).toBeInTheDocument();
    });

    test("パスワードリセットフォームを開ける", async() => {
      const user = userEvent.setup();
      renderWithProvider(<LoginForm />, {});

      expect(screen.queryByTestId("password-reset-request-form")).not.toBeVisible(); // 初期状態では表示されていない

      await user.click(screen.getByText("パスワードをお忘れの方"));
      expect(screen.queryByTestId("password-reset-request-form")).toBeVisible();
    });
  })

  describe("onSubmitのテスト", () => {
    test("loading = trueの時、fetch処理が実行されない", async() => {
      // const user = userEvent.setup();
      // renderWithProvider(<LoginForm />, {
      //   preloadedState: { session: loadingSessionState }
      // });

      // TODO: ボタンがないからonSubmitできない...
    });

    test("認証成功後、フォームの値がresetされる", async() => {
      // fetchでUserDataが返されるように指定
      fetchMock.mockResolvedValueOnce({data: {userdata: userDataFromAPI()}});
      const user = userEvent.setup();
      renderWithProvider(<LoginForm />, {});

      await user.type(screen.getByTestId("login-email-input"), "example@email.com");
      await user.type(screen.getByTestId("login-password-input"), "passwordForTest");
      await user.click(screen.getByText("ログイン"));

      expect(screen.queryByText("example@email.com")).not.toBeInTheDocument();
      expect(screen.queryByText("passwordForTest")).not.toBeInTheDocument();
      expect(screen.queryByText("ログインに失敗しました")).not.toBeInTheDocument();
    });

    test("認証失敗時にエラーメッセージが表示される", async() => {
      fetchMock.mockRejectedValueOnce(new Error("Unexpected error"));
      const user = userEvent.setup();
      renderWithProvider(<LoginForm />, {});

      await user.type(screen.getByTestId("login-email-input"), "example@email.com");
      await user.type(screen.getByTestId("login-password-input"), "passwordForTest");
      await user.click(screen.getByText("ログイン"));

      expect(screen.queryByText("ログインに失敗しました")).toBeInTheDocument();
    });
  })
})
