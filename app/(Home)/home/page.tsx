import { db } from "@/drizzle";
import { content } from "@/drizzle/schema";
import { and, desc, eq, gte, inArray } from "drizzle-orm";
import Image from "next/image";
import { ContentCard } from "../_components/common";

export default async function Home() {
  return (
    <>
      <div className="w-[100%] h-[100%]  overflow-auto">
        <div className="container mx-auto px-4 py-8 h-[100%]">
          <TrendingGrid />
          <LatestMoviesGrid />
          <LatestSeriesGrid />
          <MoreToWatchGrid />
        </div>
      </div>
    </>
  );
}
async function MoreToWatchGrid() {
  const random_contents = await db
    .select()
    .from(content)
    .limit(20)
    .orderBy(desc(content.releaseDate), desc(content.year))
    .where(
      and(
        inArray(
          content.id,
          Array.from(
            { length: 10 },
            () => Math.floor(Math.random() * (100000 - 10 + 1)) + 10
          )
        ),
        eq(content.status, "Released"),
        gte(content.year, 2012)
      )
    );
  return (
    <>
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Random Selection</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {random_contents.map((movie) => {
            return (
              <div className="rounded-lg overflow-hidden" key={movie.id}>
                <Image
                  height={300}
                  width={300}
                  src={`https://image.tmdb.org/t/p/original${movie.tmdbBackdropPath}`}
                  alt="Squid Game"
                  className="w-full h-[250px] object-cover object-top"
                />
                <div className="pt-[5px] w-[100%]">
                  <p className="text-sm text-gray-400 font-mono">
                    {movie.year} •{" "}
                    {movie.contentType === "movie" ? "Movie" : "Tv Show"} •{" "}
                  </p>
                  <h3 className="text-lg font-semibold">{movie.title}</h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
async function TrendingGrid() {
  const trending_content = await db
    .select()
    .from(content)
    .limit(20)
    .orderBy(desc(content.releaseDate), desc(content.year))
    .where(and(eq(content.status, "Released"), gte(content.imdbRating, "9.6")));
  return (
    <>
      <div>
        <h2 className="text-2xl font-bold mb-4">Trending</h2>
        <div className="flex gap-4 overflow-auto w-[100%]">
          {trending_content.map((movie) => {
            return (
              <div
                key={movie.imdbId}
                className="bg-gray-100 dark:bg-gray-800 min-w-[300px] rounded-lg overflow-hidden shadow-md"
              >
                <Image
                  height={300}
                  width={300}
                  src={`https://image.tmdb.org/t/p/original${movie.tmdbBackdropPath}`}
                  alt="Squid Game"
                  className="w-full h-[400px] object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold ">{movie.title}</h3>
                  <p className="text-sm text-gray-400">
                    {movie.year} •{" "}
                    {movie.contentType === "movie" ? "Movie" : "Tv Show"} •{" "}
                    {movie.imdbRating ?? "---"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
async function LatestMoviesGrid() {
  const latest_movies = await db
    .select()
    .from(content)
    .limit(20)
    .orderBy(desc(content.releaseDate), desc(content.year))
    .where(eq(content.status, "Released"));
  return (
    <>
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Latest Movies </h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {latest_movies.map((movie) => {
            return <ContentCard key={movie.imdbId} movie={movie} />;
          })}
        </div>
      </div>
    </>
  );
}
async function LatestSeriesGrid() {
  const latest_movies = await db
    .select()
    .from(content)
    .limit(20)
    .orderBy(desc(content.releaseDate), desc(content.year))
    .where(
      and(eq(content.contentType, "series"), eq(content.status, "Released"))
    );
  return (
    <>
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Latest Movies </h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {latest_movies.map((movie) => {
            return <ContentCard key={movie.imdbId} movie={movie} />;
          })}
        </div>
      </div>
    </>
  );
}

export const dynamic = "force-dynamic";
