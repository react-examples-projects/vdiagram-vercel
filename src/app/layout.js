import { Inter } from "next/font/google";
import Providers from "./components/Providers";
import "./styles/globals.scss";
import "@xyflow/react/dist/style.css";
import "rc-slider/assets/index.css";
import "loaders.css/src/animations/ball-pulse-sync.scss";
import "react-loading-skeleton/dist/skeleton.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "VDiagram - Create diagrams with AI",
  description: "Create diagrams with AI using Next.js and GPT-4",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Providers>
        <body className={inter.className}>{children}</body>
      </Providers>
    </html>
  );
}
