import { MoonIcon, SunIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";

function Titlebar() {
  const [darkmode, setDarkmode] = useState(false);

  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setDarkmode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark");
  }, [darkmode]);

  return (
    <div className="md:w-full h-24 px-2 md:h-12 flex flex-col-reverse md:flex-row items-start md:justify-between md:items-center md:mt-5">
      <div>
        <p className="text-lg font-bold">Swatches</p>
        <p className="text-sm">Generate custom color palattes from images!</p>
      </div>
      {darkmode ? (
        <SunIcon
          onClick={() => setDarkmode(false)}
          className="w-6 h-6 cursor-pointer self-end md:self-center mb-4 md:mb-0"
        />
      ) : (
        <MoonIcon
          onClick={() => setDarkmode(true)}
          className="w-6 h-6 cursor-pointer self-end md:self-center mb-4 md:mb-0"
        />
      )}
    </div>
  );
}

export default Titlebar;
