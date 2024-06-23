import "./globals.css";
import Navbar from "../components/header/Navbar";
import Footer from "../components/footer/Footer";
import { Poppins } from "next/font/google";
import { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import { getLoginUserDetails, logout } from "@/actions/authAction/authActions";

export const metadata: Metadata = {
  title: "WonderGo",
  description: "The best travel agency",
};

const poppins = Poppins({ subsets: ["latin"], weight: "400" });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  async function getUsers() {
    try {
      const response = await getLoginUserDetails();
      const users = response?.data?.data; // Use optional chaining to handle potential missing properties
      return users;
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  }

  const users = await getUsers();

  const logoutUser = async () => {
    "use server";
    return await logout();
  };
  // console.log("users::: ", users);

  return (
    <html lang="en">
      <body className={poppins.className}>
        <Navbar users={users} />
        <main className="main-container">{children}</main>
        <Footer />
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
