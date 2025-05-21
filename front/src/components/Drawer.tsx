import React from "react";

type Props = {
  children: React.ReactNode,
  btnText: string,
}

export default function Drawer({ children, btnText,}: Props) {

  return (
    <>
      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label htmlFor="my-drawer" className="btn btn-primary drawer-button">{btnText}</label>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
          {children}
        </div>
      </div>
    </>
  )
}
