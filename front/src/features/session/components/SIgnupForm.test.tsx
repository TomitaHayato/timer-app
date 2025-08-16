import { afterEach, describe, expect, test, vi } from "vitest";
import userEvent from "@testing-library/user-event"
import { screen } from "@testing-library/dom";
import { cleanup } from "@testing-library/react";
import type { SessionState } from "../types/session";
import { renderWithProvider } from "../../../utils/test/testingLibraryCustom";
import { SignupForm } from "./SignupForm";
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

describe("SignupForm.tsx", () => {
  afterEach(() => cleanup());

  describe("フォームのUI", () => {
    describe("バリデーション", () => {
      test("必須", async() => {
        const user = userEvent.setup();
        renderWithProvider(<SignupForm />, {});
        // 未入力のままフォームを送信
        await user.click(screen.getByText("新規登録"));

        expect(screen.getByText("！名前を入力してください")).toBeInTheDocument();
        expect(screen.getByText("！メールアドレスを入力してください")).toBeInTheDocument();
        expect(screen.getByText("！パスワードを入力してください")).toBeInTheDocument();
        expect(screen.getByText("！パスワード確認を入力してください")).toBeInTheDocument();
      });

      test("最低文字数", async() => {
        const user = userEvent.setup();
        renderWithProvider(<SignupForm />, {});

        // パスワードを最低文字数未満で入力し、フォーム送信
        await user.type(screen.getByTestId('signup-password-input'), "a");
        await user.type(screen.getByTestId('signup-password-confirmation-input'), "a");
        await user.click(screen.getByText("新規登録"));

        expect(screen.getByText("！パスワードは4文字以上で設定してください")).toBeInTheDocument();
        expect(screen.getByText("！パスワード確認は4文字以上で入力してください")).toBeInTheDocument();
      });
    });

    test("ロード中はLoading UIが表示", () => {
      renderWithProvider(<SignupForm />, {
        preloadedState: { session: loadingSessionState },
      })
      expect(screen.queryByTestId('loading-btn')).toBeInTheDocument()
      expect(screen.queryByTestId('新規登録')).not.toBeInTheDocument()
    });
  });

  describe("onSubmit", () => {
    test("認証成功時、フォームがリセット", async() => {
      fetchMock.mockResolvedValueOnce({data: {userdata: userDataFromAPI()}});
      const user = userEvent.setup();
      renderWithProvider(<SignupForm/>, {});

      await user.type(screen.getByTestId("signup-name-input"), 'test');
      await user.type(screen.getByTestId("signup-email-input"), 'test@email.com');
      await user.type(screen.getByTestId("signup-password-input"), 'password');
      await user.type(screen.getByTestId("signup-password-confirmation-input"), 'password');
      await user.click(screen.getByText('新規登録'));

      expect(screen.queryByText("サインアップに失敗しました")).not.toBeInTheDocument();
      expect(screen.getByTestId("signup-name-input")).toHaveValue();
      expect(screen.getByTestId("signup-email-input")).toHaveValue();
      expect(screen.getByTestId("signup-password-input")).toHaveValue();
      expect(screen.getByTestId("signup-password-confirmation-input")).toHaveValue();
    });

    test("認証失敗時、エラーがUI表示", async() => {
      fetchMock.mockRejectedValueOnce(new Error());
      const user = userEvent.setup();
      renderWithProvider(<SignupForm/>, {});

      await user.type(screen.getByTestId("signup-name-input"), 'test');
      await user.type(screen.getByTestId("signup-email-input"), 'test@email.com');
      await user.type(screen.getByTestId("signup-password-input"), 'password');
      await user.type(screen.getByTestId("signup-password-confirmation-input"), 'password');
      await user.click(screen.getByText('新規登録'));

      expect(screen.queryByText("サインアップに失敗しました")).toBeInTheDocument();
    });
  });
})
