import type { User, SavedSearch, SearchResult } from '@prisma/client';

export type DashboardSearchResult = SearchResult[];
export type DashboardSavedSearch = SavedSearch;
export type DashboardSavedSearches = SavedSearch[];
export type DashboardUser = User;
