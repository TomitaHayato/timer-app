import { render } from "@testing-library/react"
import { Provider } from 'react-redux'
import { setupStore, type RootState } from "../../reduxStore/store"
import { loggedInSessionState } from "./dammyData/dammyState"

type Props = {
  children: React.ReactNode
}

export const renderWithProvider = (ui: React.ReactNode, preloadedState?: Partial<RootState>): void => {
  const store = setupStore(preloadedState);
  const ProviderWrapper = ({ children }: Props) => <Provider store={store}>{ children }</Provider>

  render(ui, { wrapper: ProviderWrapper });
}

// ログインユーザーの情報をstoreに追加 + ログイン状態でレンダリング
export const renderWithProviderLoggedIn = (ui: React.ReactNode, preloadedState?: Partial<RootState>): void => {
  const store = setupStore({
    session: loggedInSessionState(),
    ...preloadedState,
  });
  const ProviderWrapper = ({ children }: Props) => <Provider store={store}>{ children }</Provider>

  render(ui, { wrapper: ProviderWrapper });
}
