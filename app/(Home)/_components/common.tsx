import type { content } from "@/drizzle/schema";
import type { InferSelectModel } from "drizzle-orm";
import { PlayIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function ContentCard({
  movie,
  type = "default",
}: {
  movie: InferSelectModel<typeof content>;
  type?: "default" | "trending" | "extra" | "largcard" | "other";
}) {
  const href = `watch/${generateSlug({
    id: movie.id,
    title: movie.title,
    year: movie.year,
  })}`;
  return (
    <>
      <Link href={href}>
        {type === "default" && <DefaultCard movie={movie} />}
        {type === "trending" && <TrendingCard movie={movie} />}
        {type === "extra" && <ExtraCard movie={movie} />}
      </Link>
      {type === "largcard" && <LargeCard movie={movie} href={href} />}
    </>
  );
}

function DefaultCard({ movie }: { movie: InferSelectModel<typeof content> }) {
  return (
    <div className="bg-gray-800 block relative rounded-lg overflow-hidden shadow-md big-on-hover">
      <Image
        height={300}
        width={300}
        src={`https://image.tmdb.org/t/p/original${movie.tmdbBackdropPath}`}
        alt="Squid Game"
        className="w-full h-[250px] object-cover object-top"
      />
      <div className="big-on-hover-div absolute w-[100px] h-fit top-0 right-0  rounded-[10px] m-[10px] ">
        <Image
          height={300}
          width={300}
          src={`https://image.tmdb.org/t/p/original${movie.tmdbPosterPath}`}
          alt=""
          className="w-[70px] md:w-[100px] rounded-[5px] big-on-hover-img border-solid border-[5px] border-white"
        />
      </div>
      <div className="p-4 absolute bottom-0 bg-[linear-gradient(0deg,_black,_transparent)] w-[100%]">
        <h3 className="text-lg font-semibold text-white">{movie.title}</h3>
        <p className="text-sm text-gray-400">
          {movie.year} • {movie.contentType === "movie" ? "Movie" : "Tv Show"} •{" "}
          {movie.imdbRating ?? "---"}
        </p>
      </div>
    </div>
  );
}
function TrendingCard({ movie }: { movie: InferSelectModel<typeof content> }) {
  return (
    <div
      key={movie.imdbId}
      className="bg-gray-100 dark:bg-gray-800 lg:min-w-[500px] min-w-[300px]  rounded-lg overflow-hidden shadow-md"
    >
      <Image
        height={700}
        width={700}
        src={`https://image.tmdb.org/t/p/original${movie.tmdbBackdropPath}`}
        alt="Squid Game"
        className="w-full h-[200px] object-cover object-top"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold truncate ...">{movie.title}</h3>
        <p className="text-sm text-gray-400">
          {movie.year} • {movie.contentType === "movie" ? "Movie" : "Tv Show"} •{" "}
          {movie.imdbRating ?? "---"}
        </p>
      </div>
    </div>
  );
}

function ExtraCard({ movie }: { movie: InferSelectModel<typeof content> }) {
  return (
    <div className="rounded-lg overflow-hidden">
      <Image
        height={300}
        width={300}
        src={`https://image.tmdb.org/t/p/original${movie.tmdbBackdropPath}`}
        alt="Squid Game"
        className="w-full h-[250px] object-cover object-top"
      />
      <div className="pt-[5px] w-[100%]">
        <p className="text-sm text-gray-400 font-mono">
          {movie.year} • {movie.contentType === "movie" ? "Movie" : "Tv Show"} •{" "}
        </p>
        <h3 className="text-lg font-semibold">{movie.title}</h3>
      </div>
    </div>
  );
}
function generateSlug({
  id,
  title,
  year,
}: {
  id: number;
  title: string;
  year: number | null;
}) {
  // const chars = "abcdefghijklmnopqrstuvwxyz";
  // let slug = "";
  // for (let i = 0; i < 8; i++) {
  //   const charIndex = (id + i) % chars.length;
  //   slug += chars[charIndex];
  // }
  return `${id}-${title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")}-${year}`;
}

function LargeCard({
  movie,
  href,
}: {
  movie: InferSelectModel<typeof content>;
  href: string;
}) {
  return (
    <div className="w-[100%] h-fit relative">
      <Image
        src={`https://image.tmdb.org/t/p/original${movie.tmdbBackdropPath}`}
        width={900}
        height={900}
        alt=""
        unoptimized
        className="h-[600px] max-h-[80vh] w-[100%] object-cover object-top rounded-[20px] [filter:blur(2px)_drop-shadow(1px_1px_1px_black)_brightness(0.5)]   md:[filter:blur(2px)_drop-shadow(1px_1px_1px_black)_brightness(0.8)]"
      />
      <div className="absolute md:left-[50px] bottom-[20px] left-[20px]">
        <Image
          src={`https://image.tmdb.org/t/p/original${movie.tmdbPosterPath}`}
          width={300}
          height={300}
          alt=""
          unoptimized
          className="w-[200px] md:w-[300px] rounded-[10px] border-solid border-[5px] border-white"
        />

        <h1 className="text-4xl font-bold text-white shadow-sm py-2">
          {movie.title}
        </h1>
        <p className="text-lg text-white">
          {movie.year} • {movie.contentType === "movie" ? "Movie" : "Tv Show"} •{" "}
          {movie.imdbRating ?? "---"}
        </p>
      </div>
      <div className="absolute max-w-[500px]  top-[20px] md:top-auto md:bottom-[50px] md:right-[50px] right-[20px] gap-[20px] flex flex-col">
        <Link href={href} className="w-fit ml-[auto]">
          <div className="bg-white w-fit rounded-full py-[10px] dark:bg-gray-700 px-[30px] cursor-pointer flex items-center gap-2 shadow-md">
            <PlayIcon />
            Play
          </div>
        </Link>
      </div>
    </div>
  );
}
