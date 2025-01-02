import Image from "next/image";
import { Button } from "./ui/button";

export default function Hero() {
  return (
    <section className="py-20 px-4 min-h-[70vh] flex-col bg-gradient-to-r from-blue-600 flex to-indigo-800">
      <div className="mx-auto text-center my-auto h-fit">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Unlimited movies, TV shows, and more
        </h1>
        <p className="text-xl mb-8">Enjoy all variate of movies collections.</p>
        <div className="max-w-2xl mx-auto">
          <form>
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
            >
              Search
            </label>
            <div className="relative">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Icons</title>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search Movie,Genres"
              />
              <button
                type="submit"
                className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="mx-auto w-[100%] h-fit py-[20px] flex justify-center">
        <Button className="px-[50px] scale-[1.2] bg-blue-600">
          Explore Home
        </Button>
      </div>
      <div className="mx-auto h-fit w-[100%] py-[50px] grid gap-[20px] items-center md:grid-cols-2 grid-cols-1 lg:grid-cols-4 max-w-7xl">
        <Image
          src={"/sample1.png"}
          className="opacity-[0.2] transition-all hover:scale-[1.1] mx-auto rounded-[20px] mt-[10px]"
          height={400}
          width={400}
          alt=""
        />
        <Image
          src={"/sample2.png"}
          className="opacity-[0.2]  transition-all hover:scale-[1.1] mx-auto rounded-[20px] mb-[30px]"
          height={400}
          width={400}
          alt=""
        />
        <Image
          src={"/sample3.png"}
          className="opacity-[0.2]  transition-all hover:scale-[1.1] mx-auto rounded-[20px] mt-[50px]"
          height={400}
          width={400}
          alt=""
        />
        <Image
          src={"/sample1.png"}
          className="opacity-[0.2]  transition-all hover:scale-[1.1] mx-auto rounded-[20px]"
          height={400}
          width={400}
          alt=""
        />
      </div>
    </section>
  );
}
