import { db } from "@/drizzle";
import { content } from "@/drizzle/schema";
import { and, desc, eq, like } from "drizzle-orm";
import React from "react";
import { ContentCard } from "../_components/common";

export default function page({
  searchParams,
}: {
  searchParams: {
    query?: string;
  };
}) {
  return (
    <>
      <div className="w-[100%] h-[100%]  overflow-auto">
        <div className="container mx-auto px-4 py-8 h-[100%]">
          <SearchResultsContentGrid query={searchParams.query} />
        </div>
      </div>
    </>
  );
}

async function SearchResultsContentGrid({ query }: { query?: string }) {
  const search_result_contents = await db
    .select()
    .from(content)
    .limit(20)
    .orderBy(desc(content.releaseDate), desc(content.year))
    .where(
      and(
        eq(content.status, "Released"),
        like(content.title, `%${query ?? ""}%`)
      )
    );
  return (
    <>
      <div className="mt-12">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {search_result_contents.map((movie) => {
            return <ContentCard key={movie.imdbId} movie={movie} />;
          })}
        </div>
      </div>
    </>
  );
}
