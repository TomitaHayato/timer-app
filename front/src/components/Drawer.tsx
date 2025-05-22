import React from "react";

type Props = {
  children: React.ReactNode,
  btnText: string,
}

export default function Drawer({ children, btnText,}: Props) {

  return (
    <>
      <div className="drawer">
        <input id={btnText} type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label htmlFor={btnText} className="btn btn-primary drawer-button">{btnText}</label>
        </div>
        <div className="drawer-side">
          <label htmlFor={btnText} aria-label="close sidebar" className="drawer-overlay"></label>
          <div className="h-8/12 bg-gray-600 w-80 p-4 z-20 overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </>
  )
}
