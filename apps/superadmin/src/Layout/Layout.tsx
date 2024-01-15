import "./Layout.scss";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export const Layout = ({ children }: { children: JSX.Element }) => {
  return (
    <>
      <Sidebar />

      <main className="bg-[#F6F9F8] min-h-screen w-full lg:w-[75%] lg:ml-auto min-w-[calc(100%-300px)]">
        <Navbar />

        <div className="">{children}</div>
      </main>
    </>
  );
};
