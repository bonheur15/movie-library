import { relations } from "drizzle-orm/relations";
import { content, contentGenres, genres, contentKeywords, keywords, contentPeople, people, contentProductionCompanies, productionCompanies, seasons, episodes } from "./schema";

export const contentGenresRelations = relations(contentGenres, ({one}) => ({
	content: one(content, {
		fields: [contentGenres.contentId],
		references: [content.id]
	}),
	genre: one(genres, {
		fields: [contentGenres.genreId],
		references: [genres.id]
	}),
}));

export const contentRelations = relations(content, ({many}) => ({
	contentGenres: many(contentGenres),
	contentKeywords: many(contentKeywords),
	contentPeople: many(contentPeople),
	contentProductionCompanies: many(contentProductionCompanies),
	seasons: many(seasons),
}));

export const genresRelations = relations(genres, ({many}) => ({
	contentGenres: many(contentGenres),
}));

export const contentKeywordsRelations = relations(contentKeywords, ({one}) => ({
	content: one(content, {
		fields: [contentKeywords.contentId],
		references: [content.id]
	}),
	keyword: one(keywords, {
		fields: [contentKeywords.keywordId],
		references: [keywords.id]
	}),
}));

export const keywordsRelations = relations(keywords, ({many}) => ({
	contentKeywords: many(contentKeywords),
}));

export const contentPeopleRelations = relations(contentPeople, ({one}) => ({
	content: one(content, {
		fields: [contentPeople.contentId],
		references: [content.id]
	}),
	person: one(people, {
		fields: [contentPeople.personId],
		references: [people.id]
	}),
}));

export const peopleRelations = relations(people, ({many}) => ({
	contentPeople: many(contentPeople),
}));

export const contentProductionCompaniesRelations = relations(contentProductionCompanies, ({one}) => ({
	content: one(content, {
		fields: [contentProductionCompanies.contentId],
		references: [content.id]
	}),
	productionCompany: one(productionCompanies, {
		fields: [contentProductionCompanies.companyId],
		references: [productionCompanies.id]
	}),
}));

export const productionCompaniesRelations = relations(productionCompanies, ({many}) => ({
	contentProductionCompanies: many(contentProductionCompanies),
}));

export const episodesRelations = relations(episodes, ({one}) => ({
	season: one(seasons, {
		fields: [episodes.seasonId],
		references: [seasons.id]
	}),
}));

export const seasonsRelations = relations(seasons, ({one, many}) => ({
	episodes: many(episodes),
	content: one(content, {
		fields: [seasons.contentId],
		references: [content.id]
	}),
}));