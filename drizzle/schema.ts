import { mysqlTable, mysqlSchema, AnyMySqlColumn, primaryKey, int, varchar, mysqlEnum, text, decimal, date, index, foreignKey, unique } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"

export const content = mysqlTable("content", {
	id: int().autoincrement().notNull(),
	imdbId: varchar("imdb_id", { length: 20 }).notNull(),
	title: varchar({ length: 255 }).notNull(),
	contentType: mysqlEnum("content_type", ['movie','series']).notNull(),
	year: int(),
	plot: text(),
	tmdbPosterPath: text("tmdb_poster_path"),
	tmdbBackdropPath: text("tmdb_backdrop_path"),
	imdbRating: decimal("imdb_rating", { precision: 3, scale: 1 }),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	releaseDate: date("release_date", { mode: 'string' }),
	runtime: int(),
	status: varchar({ length: 50 }),
},
(table) => [
	primaryKey({ columns: [table.id], name: "content_id"}),
]);

export const contentGenres = mysqlTable("content_genres", {
	contentId: int("content_id").notNull().references(() => content.id),
	genreId: int("genre_id").notNull().references(() => genres.id),
},
(table) => [
	index("genre_id").on(table.genreId),
	primaryKey({ columns: [table.contentId, table.genreId], name: "content_genres_content_id_genre_id"}),
]);

export const contentKeywords = mysqlTable("content_keywords", {
	contentId: int("content_id").notNull().references(() => content.id),
	keywordId: int("keyword_id").notNull().references(() => keywords.id),
},
(table) => [
	index("keyword_id").on(table.keywordId),
	primaryKey({ columns: [table.contentId, table.keywordId], name: "content_keywords_content_id_keyword_id"}),
]);

export const contentPeople = mysqlTable("content_people", {
	contentId: int("content_id").notNull().references(() => content.id),
	personId: int("person_id").notNull().references(() => people.id),
	job: varchar({ length: 100 }).notNull(),
},
(table) => [
	index("person_id").on(table.personId),
	primaryKey({ columns: [table.contentId, table.personId, table.job], name: "content_people_content_id_person_id_job"}),
]);

export const contentProductionCompanies = mysqlTable("content_production_companies", {
	contentId: int("content_id").notNull().references(() => content.id),
	companyId: int("company_id").notNull().references(() => productionCompanies.id),
},
(table) => [
	index("company_id").on(table.companyId),
	primaryKey({ columns: [table.contentId, table.companyId], name: "content_production_companies_content_id_company_id"}),
]);

export const episodes = mysqlTable("episodes", {
	id: int().autoincrement().notNull(),
	seasonId: int("season_id").notNull().references(() => seasons.id),
	episodeNumber: int("episode_number").notNull(),
	title: varchar({ length: 255 }),
	plot: text(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	releaseDate: date("release_date", { mode: 'string' }),
	runtime: int(),
},
(table) => [
	index("season_id").on(table.seasonId),
	primaryKey({ columns: [table.id], name: "episodes_id"}),
]);

export const genres = mysqlTable("genres", {
	id: int().autoincrement().notNull(),
	name: varchar({ length: 100 }).notNull(),
},
(table) => [
	primaryKey({ columns: [table.id], name: "genres_id"}),
	unique("name").on(table.name),
]);

export const keywords = mysqlTable("keywords", {
	id: int().autoincrement().notNull(),
	name: varchar({ length: 255 }).notNull(),
},
(table) => [
	primaryKey({ columns: [table.id], name: "keywords_id"}),
	unique("name").on(table.name),
]);

export const people = mysqlTable("people", {
	id: int().autoincrement().notNull(),
	name: varchar({ length: 255 }).notNull(),
	department: varchar({ length: 100 }),
},
(table) => [
	primaryKey({ columns: [table.id], name: "people_id"}),
]);

export const productionCompanies = mysqlTable("production_companies", {
	id: int().autoincrement().notNull(),
	name: varchar({ length: 255 }).notNull(),
	originCountry: varchar("origin_country", { length: 50 }),
},
(table) => [
	primaryKey({ columns: [table.id], name: "production_companies_id"}),
]);

export const seasons = mysqlTable("seasons", {
	id: int().autoincrement().notNull(),
	contentId: int("content_id").notNull().references(() => content.id),
	seasonNumber: int("season_number").notNull(),
	title: varchar({ length: 255 }),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	releaseDate: date("release_date", { mode: 'string' }),
},
(table) => [
	index("content_id").on(table.contentId),
	primaryKey({ columns: [table.id], name: "seasons_id"}),
]);
