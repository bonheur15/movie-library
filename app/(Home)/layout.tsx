import { ThemeToggle } from "@/components/ThemeToggle";
import { HomeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="w-[100%] flex md:flex-row flex-col dark:bg-[#10141e] bg-gray-200">
        <div className="md:w-[100px] h-[100px] md:h-[100vh] pl-[15px] md:pr-[7px] p-[15px] py-[15px] md:relative fixed bottom-0 left-0 right-0 z-[999] ">
          <div className="h-[100%] relative dark:bg-[#212c49] shadow-md  w-fit mx-auto rounded-[10px] md:bg-white bg-[#e7e7e7] flex">
            <div className="absolute top-0 left-0 right-0 hidden text-blue-300 md:flex justify-center items-center h-fit w-fit p-[20px]">
              <Link href={"/home"}>
                <Image
                  src={"/bingo.png"}
                  className="rounded-[5px] "
                  width={200}
                  height={200}
                  alt=""
                />
              </Link>
            </div>
            <div className="md:h-fit h-[100%] w-fit mx-auto md:px-[10px] px-[20px] grid grid-cols-2 md:grid-cols-1 gap-[20px] my-auto ">
              <div className="w-fit h-fit p-[10px] m-auto rounded-[10px] bg-[#0000001f] dark:bg-[#ffffff1f]">
                <Link href={"/home"}>
                  <HomeIcon />
                </Link>
              </div>

              <div className="w-fit h-fit p-[10px] m-auto rounded-[10px] bg-[#0000001f] dark:bg-[#ffffff1f]">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
        <div className="md:w-[calc(100vw_-_100px)] h-[calc(100vh_-_100px)] md:pl-[10px] p-[20px] pr-[20px] py-[20px]">
          <div className="w-[100%] h-[100px] relative flex justify-center items-center ">
            <div className=" text-blue-300 md:hidden flex justify-center items-center h-fit w-fit p-[20px]">
              <Link href={"/home"}>
                <Image
                  src={"/bingo.png"}
                  className="rounded-[5px] w-[60px] h-[60px]"
                  width={200}
                  height={200}
                  alt=""
                />
              </Link>
            </div>
            <div className="w-[100%] h-fit  p-[10px]">
              <div className="w-full">
                <form action="/search">
                  <div className="relative">
                    <input
                      type="text"
                      name="query"
                      placeholder="Search here..."
                      className="w-full p-4 pl-12 text-lg bg-white border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:focus:ring-blue-400 dark:focus:border-blue-400"
                    />
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <title>cool</title>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 16l4-4-4-4m5 8h7"
                        />
                      </svg>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="w-[100%] h-[100%] dark:bg-[#161d2f] rounded-[10px] bg-gray-50 shadow-sm">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
