import Header from "../header"
import Footer from "../footer"
import { memo, useEffect, useState } from "react"

const Layout = ({ children, settings, countries }) => {
  return (
    <div style={{ overflow: "hidden" }}>
      <Header settings={settings} countries={countries} />
      {children}
      <Footer settings={settings} countries={countries} />
    </div>
  )
}

export default memo(Layout)
