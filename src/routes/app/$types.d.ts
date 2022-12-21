import { ServerLoad } from '@sveltejs/kit';

export type LoadFunc = ServerLoad

export interface AppDashboardData {
    savedSearches: {
        id: string
        name: string
        query: string
        createdAt: Date
        updatedAt: Date
        vinylOnly: boolean
        userId: string
    }[]
}
