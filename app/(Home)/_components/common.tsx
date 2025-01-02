import type { content } from "@/drizzle/schema";
import type { InferSelectModel } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";

export function ContentCard({
  movie,
}: {
  movie: InferSelectModel<typeof content>;
}) {
  return (
    <Link
      href={`watch/${movie.imdbId}`}
      className="bg-gray-800 block relative rounded-lg overflow-hidden shadow-md big-on-hover"
    >
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
    </Link>
  );
}
