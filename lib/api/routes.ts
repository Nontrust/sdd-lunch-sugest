export const API = {
  RESTAURANTS: "/api/restaurants",
  RECOMMEND: "/api/recommend",
  HISTORY: "/api/history",
  restaurant: (id: string) => `/api/restaurants/${id}`,
  menus: (restaurantId: string) => `/api/restaurants/${restaurantId}/menus`,
  menu: (restaurantId: string, menuId: string) =>
    `/api/restaurants/${restaurantId}/menus/${menuId}`,
};
