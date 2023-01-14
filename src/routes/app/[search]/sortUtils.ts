import type { DashboardSearchResult } from '$lib/types/frontend';

export enum Option {
	HasBuyoutOption,
	LowestPrice,
	HighestPrice,
	NewlyListed,
	EndingSoonest
}

function getNumberFromPrice(price: string): number {
	return Number(price.replace(/[^0-9.-]+/g, ''));
}

export const sortBy = (sortByOption: Option = Option.NewlyListed, searchResults: DashboardSearchResult[]) => {
	const tempResults = searchResults.map((result) => {
		if ((result.currentPrice.match(/yen/g)?.length || 0) > 1) {
			result.buyoutPrice = result.currentPrice.split(' yen')[1] + ' yen'
			result.currentPrice = result.currentPrice.split(' yen')[0] + ' yen'
		}

		return result
	})

	console.log(sortByOption)

	switch (sortByOption) {
		case Option.HasBuyoutOption:
			return tempResults.sort((a, b) => {
				console.log(a.buyoutPrice)
				if (a.buyoutPrice && !b.buyoutPrice) return -1;
				if (!a.buyoutPrice && b.buyoutPrice) return 1;
				return 0;
			});
		case Option.LowestPrice:
			return tempResults.sort((a, b) => getNumberFromPrice(a.currentPrice) - getNumberFromPrice(b.currentPrice));
		case Option.HighestPrice:
			return tempResults.sort((a, b) => getNumberFromPrice(b.currentPrice) - getNumberFromPrice(a.currentPrice));
		case Option.NewlyListed:
			return tempResults.sort((a, b) => b.startDate.getTime() - a.startDate.getTime());
		case Option.EndingSoonest:
			return tempResults.sort((a, b) => b.endDate.getTime() - a.endDate.getTime());
	}
}
