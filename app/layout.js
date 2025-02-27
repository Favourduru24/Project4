import { Imperial_Script, Poppins } from "next/font/google";
import "./globals.css";
import Provider from "@/components/shared/Provider";
 

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-poppins'
});

export const metadata = {
  title: "Evently",
  description: "Evently is a platform for event management.",
  icons: {
    icon:'/assets/images/logo.svg'
  }
};

export default function RootLayout({ children}) {
  return (
    <html lang="en">
      <Provider>
      <body
        className={poppins.variable}
      >
        {children}
      </body>
      </Provider>
    </html>
  );
}
 