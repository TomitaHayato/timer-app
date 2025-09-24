import { describe, test, expect, afterEach } from 'vitest'
import { cleanup, render } from "@testing-library/react"
import { Title } from "./Title"


describe("Title component", () => {
  afterEach(() => {
    cleanup();
  });

  test("正常に呼び出される", () => {
    expect(() => {
      render(<Title text="Page title" />)
    }).not.toThrowError()
  })

  test("複数レンダリングでエラー", () => {
    expect(() => {
      render(
        <>
          <Title text="Title 1" />
          <Title text="Title 2" />
        </>
      )
    }).toThrowError("Titleコンポーネントが重複しています: Title 2")
  })

  test("アンマウント後はレンダリング可能", () => {
    const { unmount } = render(<Title text="Title 1" />);
    unmount();

    expect(() => {
      render(<Title text="Title 2" />)
    }).not.toThrowError()
  })
})
