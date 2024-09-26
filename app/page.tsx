import { PlayIcon } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
interface Isimple_error {
  error: string;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isSimpleError(response: any): response is Isimple_error {
  return response && typeof response.error === "string";
}
export default async function Home() {
  let imdbIds: {
    imdb_id: string;
    quality: string;
  }[] = [];
  try {
    const response:
      | Isimple_error
      | {
          imdb_id: string;
          quality: string;
        }[] = await (
      await fetch(
        "https://vidsrc.me/api/m/l/page-" +
          (Math.floor(Math.random() * 1000) + 1)
      )
    ).json();

    if (!isSimpleError(response)) imdbIds = response;

    // imdbIds =
    console.log(imdbIds);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {}

  return (
    <>
      <div className="text-[20px] font-bold w-[100%] py-[10px] text-center">
        Random Movie to watch
      </div>
      <div className="flex justify-center flex-col py-[40px] h-[100vh]">
        <div className="h-fit pb-[80px] px-[40px] gap-[60px] rounded-[20px] bg-gray-100 w-[100%] grid lg:grid-cols-3 max-w-[1800px] md:grid-cols-2 grid-cols-1">
          {imdbIds.length == 0 && <>No movie available try refresh again</>}
          {imdbIds.map((item, i) => {
            if (i > 5) return null;
            return (
              <Suspense key={item.imdb_id} fallback={<p>Loading Movie.</p>}>
                <MovieCard imdb_id={item.imdb_id} quality={item.quality} />
              </Suspense>
            );
          })}
        </div>
      </div>
    </>
  );
}

async function MovieCard({
  imdb_id,
  quality,
}: {
  imdb_id: string;
  quality: string;
}) {
  console.log(quality);
  let movieData: {
    general?: {
      genres?: string[];
      title?: string;
      year?: string;
      plot?: string;
      imdb_rating?: string;
    };
    tmdb?: {
      backdrop_path?: string;
      poster_path?: string;
    };
  } | null = {};
  try {
    movieData = await (
      await fetch("https://vidsrc.me/api/m/" + imdb_id)
    ).json();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_) {
    movieData = null;
  }

  return (
    <>
      {movieData && (
        <div className="py-3 sm:max-w-xl sm:mx-auto">
          <div className="bg-[#efeeee] shadow-xl img-container relative transition-all hover:[box-shadow:inset_4px_-2px_13px_6px_#ffffff7a] border-gray-100 max-h-80	 border sm:rounded-3xl p-8 flex space-x-8">
            <div className="h-48 overflow-visible w-1/2 d relative">
              <img
                className="rounded-3xl shadow-lg"
                src={
                  "https://image.tmdb.org/t/p/original/" +
                  movieData.tmdb?.poster_path
                }
                alt=""
              />
              {/* <img
                className="rounded-3xl shadow-lg image-animate top-0 absolute bottom-0"
                src={
                  "https://image.tmdb.org/t/p/original/" +
                  movieData.tmdb?.poster_path
                }
                alt=""
              /> */}
            </div>
            <div className="flex flex-col w-1/2 space-y-4">
              <div className="flex justify-between items-start">
                <h2 className="text-3xl font-bold">
                  {movieData?.general?.title?.substring(0, 15)}
                </h2>
                <div className="bg-yellow-400 font-bold rounded-xl p-2">
                  {movieData.general?.imdb_rating}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-400">Movie</div>
                <div className="text-lg text-gray-800">
                  {movieData.general?.year}
                </div>
              </div>
              <p className=" text-gray-400 max-h-40 overflow-y-hidden">
                {movieData.general?.plot}
              </p>
              <div className=" text-2xl font-bold w-fit h-fit   grid place-items-center">
                <Link href={"/watch/" + imdb_id}>
                  <div className="cont block">
                    <div className="fas">
                      <PlayIcon size={19} />
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export const dynamic = "force-dynamic";
