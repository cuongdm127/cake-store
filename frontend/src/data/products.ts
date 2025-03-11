export type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
};

export const products: Product[] = [
    {
        id: 1,
        name: "Chocolate Fudge Cake",
        description: "Rich and moist chocolate cake topped with fudge frosting.",
        price: 20,
        image: "https://static.vecteezy.com/system/resources/thumbnails/053/190/619/small/gourmet-berry-chocolate-cake-on-elegant-table-setting-free-photo.jpg",
    },
    {
        id: 2,
        name: "Strawberry Shortcake",
        description: "Fluffy cake layered with fresh strawberries and whipped cream.",
        price: 18,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQynJ0YZfnTBokj3ENuMe1E9HkAq2-ZIuD_Zg&s",
    },
    {
        id: 3,
        name: "Cheesecake Delight",
        description: "Classic cheesecake with a graham cracker crust.",
        price: 22,
        image: "https://static.vecteezy.com/system/resources/thumbnails/053/190/619/small/gourmet-berry-chocolate-cake-on-elegant-table-setting-free-photo.jpg",
    },
    {
        id: 4,
        name: "Matcha Green Tea Cake",
        description: "Light sponge cake infused with matcha and cream filling.",
        price: 19,
        image: "https://static.vecteezy.com/system/resources/thumbnails/053/190/619/small/gourmet-berry-chocolate-cake-on-elegant-table-setting-free-photo.jpg",
    },
];
