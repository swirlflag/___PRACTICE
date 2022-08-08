const items = [
    2,3,4,7,8
]

const routesInfo = [
	{
        path: "/",
        name: "home",
		component: () => import("@/pages/Home.vue"),
	},
];

for (let i = 0; i < items.length; ++i) {
    const number = items[i];
    const itemPage = {
        path: `/item${number}`,
        name: `item-${number}`,
        component: () => import(`@/pages/Item${number}.vue`),
    };
    routesInfo.push(itemPage);
}

export default routesInfo;
