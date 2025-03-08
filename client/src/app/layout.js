"use client";
import ScrollToTop from "@/components/common/ScrollTop";
import store from "@/redux/store";
import Aos from "aos";
import "aos/dist/aos.css";
import { DM_Sans, Poppins } from "next/font/google";
import "rc-slider/assets/index.css";
import { useEffect } from "react";
import { Provider } from "react-redux";
import "../../node_modules/react-modal-video/scss/modal-video.scss";
import "../../public/scss/main.scss";
import Wrapper from "./layout-wrapper/wrapper";

if (typeof window !== "undefined") {
  import("bootstrap");
}

// DM_Sans font
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--body-font-family",
});

// Poppins font
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--title-font-family",
});

export default function RootLayout({ children }) {
  useEffect(() => {
    Aos.init({
      duration: 1200,
      once: true,
    });
  }, []);

  return (
    <html lang="en">
      <body
        className={`body  ${poppins.variable} ${dmSans.variable}`}
        cz-shortcut-listen="false"
      >
        <Provider store={store}>
          <div className="wrapper ovh">
            <Wrapper>{children}</Wrapper>
          </div>
        </Provider>
        <ScrollToTop />
      </body>
    </html>
  );
}
