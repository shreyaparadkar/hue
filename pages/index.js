import Head from "next/head";
import Footer from "../components/Footer";
import Meta from "../components/Meta";
import Palette from "../components/Palette";
import Titlebar from "../components/Titlebar";
import UploadImage from "../components/UploadImage";

export default function Home() {
  return (
    <div>
      <div className="min-h-screen py-4 px-6 md:px-24 pb-16 lg:pb-0 bg-white text-black dark:bg-gray-900 dark:text-white">
        <Meta />
        <Titlebar />
        <div className="grid lg:grid-cols-2 justify-center items-center mt-16 mb-16 lg:mb-auto lg:divide-x divide-sky-600">
          <UploadImage />
          <Palette />
        </div>
      </div>
      <Footer />
    </div>
  );
}
