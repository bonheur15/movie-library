import { Button } from "@/components/ui/button";
import { db } from "@/drizzle";
import { content, episodes, seasons } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";

{
  /* <Link href={"/"}>
        <div className="absolute p-[10px] w-fit h-fit scale-[0.8] top-[50px] left-[5px] z-[10] rounded-[100%] border-white border-[2px] text-white transition-all hover:bg-white hover:text-black cursor-pointer">
          <ArrowLeft />
        </div>
      </Link>
      https://vidsrc.cc/v2/embed/tv/tt0944947/1/1?autoPlay=false
      <iframe
        title="video player"
        allowFullScreen
        src={`https://vidsrc.cc/v2/embed/movie/${params.imdb_id}`}
       
      /> */
  // biome-ignore lint/complexity/noUselessLoneBlockStatements: <explanation>
}
export default async function page({
  params,
  searchParams,
}: {
  params: { slug?: string };
  searchParams: {
    season?: string;
    episode?: string;
  };
}) {
  const current_content = (
    await db
      .select()
      .from(content)
      .where(eq(content.id, retrieveIdFromSlug({ slug: params.slug ?? "a" })))
  )[0];
  return (
    <div className="relative w-[100%] h-[100%] flex flex-col">
      {current_content.contentType === "series" && (
        <SeriesPlayer
          content_id={current_content.id}
          imdb_id={current_content.imdbId}
          selected={{
            season: Number(searchParams.season ?? 1),
            episode: Number(searchParams.episode ?? 1),
          }}
        />
      )}
      {current_content.contentType === "movie" && (
        <iframe
          title="video player"
          allowFullScreen
          src={`https://vidsrc.cc/v2/embed/movie/${current_content.imdbId}`}
          className="w-[100%] h-[100%] m-0 rounded-[10px]"
        />
      )}
    </div>
  );
}

function SeriesPlayer({
  content_id,
  selected,
  imdb_id,
}: {
  content_id: number;
  selected: {
    season: number;
    episode: number;
  };
  imdb_id: string;
}) {
  return (
    <>
      <iframe
        title="video player"
        allowFullScreen
        src={`https://vidsrc.cc/v2/embed/tv/${imdb_id}/${selected.season}/${selected.episode}?autoPlay=false`}
        className="w-[100%] h-[100%] m-0 rounded-[10px]"
      />
      <SeriesSelector
        content_id={content_id}
        selected={{
          season: selected.season,
          episode: selected.episode,
        }}
      />
    </>
  );
}
type Season = {
  id: number;
  contentId: number;
  seasonNumber: number;
  title: string | null;
  releaseDate: string | null;
};

type Episode = {
  id: number;
  seasonId: number;
  episodeNumber: number;
  title: string | null;
  plot: string | null;
  releaseDate: string | null;
  runtime: number | null;
};

type SeasonWithEpisodes = Season & { episodes: Episode[] };

async function getSeasonsWithEpisodes(
  content_id: number
): Promise<SeasonWithEpisodes[]> {
  const rawData = await db
    .select()
    .from(seasons)
    .where(eq(seasons.contentId, content_id))
    .leftJoin(episodes, eq(episodes.seasonId, seasons.id));

  return Object.values(
    rawData.reduce((acc, { seasons: season, episodes: episode }) => {
      if (!acc[season.id]) acc[season.id] = { ...season, episodes: [] };
      if (episode) acc[season.id].episodes.push(episode);
      return acc;
    }, {} as Record<number, SeasonWithEpisodes>)
  );
}
async function SeriesSelector({
  content_id,
  selected,
}: {
  content_id: number;
  selected: {
    season: number;
    episode: number;
  };
}) {
  const all_seasons = await getSeasonsWithEpisodes(content_id);
  return (
    <div
      id="season-selector"
      className="md:bg-white md:dark:bg-gray-800 p-6 rounded-lg mb-[60px] md:shadow-lg md:max-w-lg md:w-fit w-full md:absolute right-0 top-0 md:m-[20px]"
    >
      <div
        className="flex w-[100%] border-b border-gray-200 dark:border-gray-700 mb-4"
        id="season-tabs"
      >
        {all_seasons.map((s) => {
          if (s.seasonNumber === selected.season) {
            return (
              <Button
                key={s.id}
                className="px-4 py-2 text-blue-600 dark:text-blue-400 border-b-2 border-transparent border-blue-600 dark:border-blue-400 font-medium"
                type="button"
                id="season-1-tab"
              >
                Season {s.seasonNumber}
              </Button>
            );
          }
          return (
            <Link
              key={s.id}
              href={{
                query: {
                  season: s.seasonNumber,
                },
              }}
              className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 border-b-2 border-transparent hover:border-blue-600 dark:hover:border-blue-400 font-medium"
              id="season-1-tab"
            >
              Season {s.seasonNumber}
            </Link>
          );
        })}
      </div>
      <div id="episode-container">
        <div className="grid grid-cols-4 gap-2" id="season-1-episodes">
          {all_seasons
            .filter((s) => s.seasonNumber === selected.season)[0]
            .episodes.sort((a, b) => a.episodeNumber - b.episodeNumber)
            .map((e) => {
              if (e.episodeNumber === selected.episode) {
                return (
                  <Button
                    key={e.id}
                    className="bg-blue-600 dark:bg-blue-500 text-white py-2 px-4 rounded-md text-center"
                    type="button"
                  >
                    Episode {e.episodeNumber}
                  </Button>
                );
              }
              return (
                <Link
                  key={e.id}
                  href={{
                    query: {
                      season: selected.season,
                      episode: e.episodeNumber,
                    },
                  }}
                  className="bg-gray-200 dark:bg-gray-700 hover:bg-blue-600 dark:hover:bg-blue-500 text-gray-800 dark:text-gray-200 hover:text-white py-2 px-4 rounded-md text-center"
                >
                  Episode {e.episodeNumber}
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
}

function retrieveIdFromSlug({ slug }: { slug: string }) {
  const new_slug = slug.split("-")[0];
  // future work
  // const chars = "abcdefghijklmnopqrstuvwxyz";
  // let num = 0;
  // for (let i = 0; i < 8; i++) {
  //   const charIndex = chars.indexOf(new_slug[i]);
  //   if (charIndex === -1) {
  //     throw new Error("Invalid character in word");
  //   }
  //   num += charIndex - i;
  // }
  // return num;
  return Number(new_slug);
}

export const dynamic = "force-dynamic";
