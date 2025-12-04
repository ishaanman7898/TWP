export interface Product {
  id: string;
  category: string;
  name: string;
  status: string;
  sku: string;
  price: number;
  buyLink: string;
  image?: string;
  groupName: string;
  color?: string;
  hexColor?: string;
}

export const products: Product[] = [
  // Accessories
  { id: "o-sb", category: "Accessories", name: "Shaker Ball", status: "In Store", sku: "O-SB", price: 7.99, buyLink: "https://portal.veinternational.org/buybuttons/us019814/btn/shaker-ball-osb/", image: "/product-images/O-SB.jpg", groupName: "Shaker Ball" },
  { id: "o-an", category: "Accessories", name: "The Anchor (Snack Compartment)", status: "In Store", sku: "O-AN", price: 12.99, buyLink: "https://portal.veinternational.org/buybuttons/us019814/btn/the-anchor-snack-compartment-oan/", image: "/product-images/O-AN.jpg", groupName: "The Anchor" },

  // Wellness (Electrolytes + Supplements)
  { id: "su-el-1", category: "Wellness", name: "Surge IV (Blue Razzberry)", status: "In Store", sku: "SU-EL-1", price: 19.99, buyLink: "https://portal.veinternational.org/buybuttons/us019814/btn/surge-iv-blue-razzberry-suel1/", image: "/product-images/SU-EL-1.jpg", groupName: "Surge IV", color: "Blue Razzberry", hexColor: "#0000FF" },
  { id: "su-el-2", category: "Wellness", name: "Surge IV (Fruit Punch)", status: "In Store", sku: "SU-EL-2", price: 19.99, buyLink: "https://portal.veinternational.org/buybuttons/us019814/btn/surge-iv-fruit-punch-suel2/", image: "/product-images/SU-EL-2.jpg", groupName: "Surge IV", color: "Fruit Punch", hexColor: "#FF4500" },
  { id: "su-el-3", category: "Wellness", name: "Surge IV (Lemonade)", status: "In Store", sku: "SU-EL-3", price: 19.99, buyLink: "https://portal.veinternational.org/buybuttons/us019814/btn/surge-iv-lemonade-suel3/", image: "/product-images/SU-EL-3.jpg", groupName: "Surge IV", color: "Lemonade", hexColor: "#FFFF00" },
  { id: "su-el-4", category: "Wellness", name: "Surge IV (Pina Colada)", status: "In Store", sku: "SU-EL-4", price: 19.99, buyLink: "https://portal.veinternational.org/buybuttons/us019814/btn/surge-iv-pina-colada-suel4/", image: "/product-images/SU-EL-4.jpg", groupName: "Surge IV", color: "Pina Colada", hexColor: "#F0E68C" },
  { id: "su-el-5", category: "Wellness", name: "Surge IV (Strawberry)", status: "In Store", sku: "SU-EL-5", price: 19.99, buyLink: "https://portal.veinternational.org/buybuttons/us019814/btn/surge-iv-strawberry-suel5/", image: "/product-images/SU-EL-5.jpg", groupName: "Surge IV", color: "Strawberry", hexColor: "#FF69B4" },
  { id: "su-el-6", category: "Wellness", name: "Surge IV (Tropical Vibes)", status: "In Store", sku: "SU-EL-6", price: 19.99, buyLink: "https://portal.veinternational.org/buybuttons/us019814/btn/surge-iv-tropical-punch-suel6/", image: "/product-images/SU-EL-6.jpg", groupName: "Surge IV", color: "Tropical Vibes", hexColor: "#FF7F50" },
  { id: "su-el-7", category: "Wellness", name: "Surge IV (Cucumber Lime)", status: "In Store", sku: "SU-EL-7", price: 19.99, buyLink: "https://portal.veinternational.org/buybuttons/us019814/btn/surge-iv-cucumber-lime-suel7/", image: "/product-images/SU-EL-7.jpg", groupName: "Surge IV", color: "Cucumber Lime", hexColor: "#90EE90" },
  { id: "su-el-8", category: "Wellness", name: "Surge IV (Apple Cider)", status: "In Store", sku: "SU-EL-8", price: 19.99, buyLink: "https://portal.veinternational.org/buybuttons/us019814/btn/surge-iv-apple-cider-suel8/", image: "/product-images/SU-EL-8.jpg", groupName: "Surge IV", color: "Apple Cider", hexColor: "#D2691E" },

  // Peak Protein
  { id: "su-pr-1", category: "Wellness", name: "Peak Protein (Chocolate)", status: "In Store", sku: "SU-PR-1", price: 34.99, buyLink: "https://portal.veinternational.org/buybuttons/us019814/btn/peak-powder-chocolate-supr1/", image: "/product-images/SU-PR-1.jpg", groupName: "Peak Protein", color: "Chocolate", hexColor: "#3E2723" },
  { id: "su-pr-2", category: "Wellness", name: "Peak Protein (Vanilla)", status: "In Store", sku: "SU-PR-2", price: 34.99, buyLink: "https://portal.veinternational.org/buybuttons/us019814/btn/peak-powder-vanilla-supr2/", image: "/product-images/SU-PR-2.jpg", groupName: "Peak Protein", color: "Vanilla", hexColor: "#F3E5AB" },

  // Water Bottles - Glacier
  { id: "bo-41", category: "Water Bottles", name: "The Glacier (Black) w. Ice Cap", status: "In Store", sku: "BO-41", price: 75.00, buyLink: "https://portal.veinternational.org/buybuttons/us019814/btn/the-glacier-black-w-ice-cap-bo41/", image: "/product-images/BO-41.jpg", groupName: "The Glacier", color: "Black", hexColor: "#000000" },
  { id: "bo-42", category: "Water Bottles", name: "The Glacier (Brown) w. Ice Cap", status: "In Store", sku: "BO-42", price: 75.00, buyLink: "https://portal.veinternational.org/buybuttons/us019814/btn/the-glacier-brown-w-ice-cap-bo42/", image: "/product-images/BO-42.jpg", groupName: "The Glacier", color: "Brown", hexColor: "#8B4513" },
  { id: "bo-43", category: "Water Bottles", name: "The Glacier (Frost Blue) w. Ice Cap", status: "In Store", sku: "BO-43", price: 75.00, buyLink: "https://portal.veinternational.org/buybuttons/us019814/btn/the-glacier-frost-blue-w-ice-cap-bo43/", image: "/product-images/BO-43.jpg", groupName: "The Glacier", color: "Frost Blue", hexColor: "#87CEEB" },
  { id: "bo-44", category: "Water Bottles", name: "The Glacier (Maroon) w. Ice Cap", status: "In Store", sku: "BO-44", price: 75.00, buyLink: "https://portal.veinternational.org/buybuttons/us019814/btn/the-glacier-maroon-w-ice-cap-bo44/", image: "/product-images/BO-44.jpg", groupName: "The Glacier", color: "Maroon", hexColor: "#800000" },
  { id: "bo-45", category: "Water Bottles", name: "The Glacier (Orange) w. Ice Cap", status: "In Store", sku: "BO-45", price: 75.00, buyLink: "https://portal.veinternational.org/buybuttons/us019814/btn/the-glacier-orange-w-ice-cap-bo45/", image: "/product-images/BO-45.jpg", groupName: "The Glacier", color: "Orange", hexColor: "#FFA500" },
  { id: "bo-46", category: "Water Bottles", name: "The Glacier (White) w. Ice Cap", status: "In Store", sku: "BO-46", price: 75.00, buyLink: "https://portal.veinternational.org/buybuttons/us019814/btn/the-glacier-white-w-ice-cap-bo46/", image: "/product-images/BO-46.jpg", groupName: "The Glacier", color: "White", hexColor: "#FFFFFF" },

  // Water Bottles - Iceberg
  { id: "bo-31", category: "Water Bottles", name: "The Iceberg (Black) w. Ice Cap", status: "In Store", sku: "BO-31", price: 60.00, buyLink: "https://portal.veinternational.org/buybuttons/us019814/btn/the-iceberg-black-w-ice-cap-bo31/", image: "/product-images/BO-31.jpg", groupName: "The Iceberg", color: "Black", hexColor: "#000000" },
  { id: "bo-32", category: "Water Bottles", name: "The Iceberg (Brown) w. Ice Cap", status: "In Store", sku: "BO-32", price: 60.00, buyLink: "https://portal.veinternational.org/buybuttons/us019814/btn/the-iceberg-brown-w-ice-cap-bo32/", image: "/product-images/BO-32.jpg", groupName: "The Iceberg", color: "Brown", hexColor: "#8B4513" },
  { id: "bo-33", category: "Water Bottles", name: "The Iceberg (Frost Blue) w. Ice Cap", status: "In Store", sku: "BO-33", price: 60.00, buyLink: "https://portal.veinternational.org/buybuttons/us019814/btn/the-iceberg-frost-blue-w-ice-cap-bo33/", image: "/product-images/BO-33.jpg", groupName: "The Iceberg", color: "Frost Blue", hexColor: "#87CEEB" },
  { id: "bo-34", category: "Water Bottles", name: "The Iceberg (Maroon) w. Ice Cap", status: "In Store", sku: "BO-34", price: 60.00, buyLink: "https://portal.veinternational.org/buybuttons/us019814/btn/the-iceberg-maroon-w-ice-cap-bo34/", image: "/product-images/BO-34.jpg", groupName: "The Iceberg", color: "Maroon", hexColor: "#800000" },
  { id: "bo-35", category: "Water Bottles", name: "The Iceberg (Orange) w. Ice Cap", status: "In Store", sku: "BO-35", price: 60.00, buyLink: "https://portal.veinternational.org/buybuttons/us019814/btn/the-iceberg-orange-w-ice-cap-bo35/", image: "/product-images/BO-35.jpg", groupName: "The Iceberg", color: "Orange", hexColor: "#FFA500" },
  { id: "bo-36", category: "Water Bottles", name: "The Iceberg (White) w. Ice Cap", status: "In Store", sku: "BO-36", price: 60.00, buyLink: "https://portal.veinternational.org/buybuttons/us019814/btn/the-iceberg-white-w-ice-cap-bo36/", image: "/product-images/BO-36.jpg", groupName: "The Iceberg", color: "White", hexColor: "#FFFFFF" },

  // Bundles
  { id: "se-f-1", category: "Bundles", name: "Alo x Thrive Bundle", status: "In Store", sku: "SE-F-1", price: 499.99, buyLink: "https://portal.veinternational.org/buybuttons/us019814/btn/alo-x-thrive-bundle-sef1/", image: "/product-images/SE-F-1.jpg", groupName: "Alo x Thrive Bundle" },
  { id: "se-f-3", category: "Bundles", name: "Fall Bundle", status: "In Store", sku: "SE-F-3", price: 399.99, buyLink: "https://portal.veinternational.org/buybuttons/us019814/btn/fall-bundle-sef3/", image: "/product-images/SE-F-3.jpg", groupName: "Fall Bundle" },

  // Peak Protein - Pumpkin Spice now in Wellness
  { id: "su-pr-3", category: "Wellness", name: "Peak Protein (Pumpkin Spice)", status: "In Store", sku: "SU-PR-3", price: 34.99, buyLink: "https://portal.veinternational.org/buybuttons/us019814/btn/peak-protein-pumpkin-spice-supr3/", image: "/product-images/SU-PR-3.jpg", groupName: "Peak Protein", color: "Pumpkin Spice", hexColor: "#D2691E" },
];

export const categories = ["All", "Wellness", "Water Bottles", "Bundles", "Accessories"];
