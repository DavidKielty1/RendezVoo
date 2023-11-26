/* eslint-disable @next/next/no-img-element */
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";

export const Navbar = () => {
  return (
    <nav className="navbar max-h-12 justify-center bg-gradient-to-r from-slate-100/50 to-white text-slate-600">
      <div className="flex w-10/12 flex-row justify-between">
        <DesktopNavbar />
        <MobileNavbar />
      </div>
    </nav>
  );
};
