import MobileDropDown from "./MobileDropDown";

export default function Header() {
  return(
    <>
      <div className="navbar bg-ghost shadow-none">
        <div className="navbar-start">
          <MobileDropDown />
          <a className="btn btn-ghost text-xl">Timer</a>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li><a>Item 1</a></li>
            <li>
              <details>
                <summary>Parent</summary>
                <ul className="p-2">
                  <li><a>Submenu 1</a></li>
                  <li><a>Submenu 2</a></li>
                </ul>
              </details>
            </li>
            <li><a>Item 3</a></li>
          </ul>
        </div>

        <div className="navbar-end">
          <a className="btn btn-outline">Todo一覧</a>
        </div>
      </div>
    </>
  )
}
