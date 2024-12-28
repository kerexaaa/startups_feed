import type { Metadata } from "next";
import "@/globals.css";
import ModalProvider from "@/providers/ModalProvider";
import { MyAuthModalContextProvider } from "@/hooks/useAuthModal";
import { ProvidersContextProvider } from "@/hooks/useProviders";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { Work_Sans } from "next/font/google";
import "easymde/dist/easymde.min.css";
import Header from "@/components/Header";
import { Flip, ToastContainer } from "react-toastify";
import { MyEditProfileModalContextProvider } from "@/hooks/useEditProfileModal";

const worksans = Work_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Directory Posts App",
  description: "An app for creating and sharing interesting posts about life.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <SessionProvider session={session}>
        <ProvidersContextProvider>
          <MyAuthModalContextProvider>
            <MyEditProfileModalContextProvider>
              <ModalProvider />
              <body className={worksans.className}>
                <Header />
                {children}
                <ToastContainer
                  transition={Flip}
                  autoClose={1500}
                  position="top-center"
                  pauseOnHover={false}
                />
              </body>
            </MyEditProfileModalContextProvider>
          </MyAuthModalContextProvider>
        </ProvidersContextProvider>
      </SessionProvider>
    </html>
  );
}
