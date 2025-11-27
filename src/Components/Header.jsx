import { Search, CirclePlus, Bell, User } from "lucide-react";
function Header() {
  return (
    <>
      <header className=" px-5 shadow-md">
        <nav className="flex justify-between items-center py-3">
          <h1 className="text-[18px] border-blue-600 border-b-2">Plans</h1>
          <div className="flex justify-between gap-5 px-2 items-center">
            <div className="relative w-full max-w-sm">
              <Search
                className="absolute left-2 top-1/2 -translate-y-1/2 text-[#1C1F25]"
                width={20}
              />
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-9 pr-3 py-2 border rounded-2xl focus:outline-none"
              />
            </div>
            <div>
              <CirclePlus />
            </div>
            <div>
              <Bell />
            </div>
            <div>
              <User />
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
export default Header;
