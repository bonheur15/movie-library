import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div>
        <>
          {/* component */}
          <div>
            <div className="h-screen flex justify-center items-center bg-cover bg-center bg-[linear-gradient(111deg,_#00092b,_#000000c4)]">
              <div className="space-y-5 px-[20px] ">
                <div>
                  <Image
                    width={300}
                    height={300}
                    alt=""
                    src={"/bingo.png"}
                    className="rounded-[20px]"
                  />
                </div>
                <p className="text-white font-bold md:text-5xl text-2xl flex flex-col items-center">
                  <span className="text-center">
                    Bingo Movies
                    <br />
                  </span>
                </p>

                <p className="text-white text-lg flex flex-col items-center">
                  Enjoy all variate of genres
                </p>
                <div className="flex flex-row items-center justify-center w-[100%]">
                  <form className="w-[100%]" action={"search"}>
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
                        name="query"
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
                <div className="mx-auto w-[100%] h-fit py-[20px] flex justify-center">
                  <Link href={"/home"} prefetch={false}>
                    <Button className="px-[50px] scale-[1.2] bg-blue-600">
                      Explore Home
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            <hr />
          </div>
        </>
      </div>
    </>
  );
}
