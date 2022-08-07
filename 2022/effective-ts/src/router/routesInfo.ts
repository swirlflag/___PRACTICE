const routesInfo = [
	{
        path: "/",
        name: "home",
		component: () => import("@/pages/Home.vue"),
	},
	{
        path: "/item1",
        name: "item-1",
		component: () => import("@/pages/Item1.vue"),
    },
    {
        path: "/item2",
        name: "item-2",
		component: () => import("@/pages/Item2.vue"),
	},
];

export default routesInfo;
