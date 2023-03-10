export const machineRoutes = ['/api/cron'];

export const publicRoutes = ['/login', '/signup', '/forgot-password', '/'];

export function routeStartsWithAnyOf(route: string, routes: string[]) {
	return routes.some((r) => route.startsWith(r));
}
