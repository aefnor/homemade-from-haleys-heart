export type Product = {
  id: number
  name: string
  price: number
  description: string
  image: string
  availableForCheckout?: boolean
}

export const products: Array<Product> = [
  {
    id: 1,
    name: 'Traditional Sourdough Bread',
    price: 12,
    description:
      'Our signature sourdough bread with a perfect crust and fluffy interior',
    image: '/images/TRADITIONAL SOURDOUGH BREAD.webp',
  },
  {
    id: 2,
    name: 'Sourdough Pizza Dough',
    price: 10,
    description: 'Pre-made pizza dough ready to top and bake at home',
    image: '/images/Sourdough Pizza Dough.webp',
  },
  {
    id: 3,
    name: 'Cinnamon Rolls',
    price: 12,
    description: 'Fluffy sourdough cinnamon rolls with cream cheese frosting',
    image: '/images/Cinnamon Rolls.webp',
  },
  {
    id: 4,
    name: 'White Cheddar Everything Bagel',
    price: 15,
    description:
      'Chewy bagels topped with everything seasoning and white cheddar',
    image: '/images/White Cheddar Everything Bagel.webp',
  },
  {
    id: 5,
    name: 'Sourdough Sandwich Bread',
    price: 10,
    description: 'Perfect for sandwiches with a soft, fluffy texture',
    image: '/images/Sourdough Sandwhich Bread.webp',
  },
  {
    id: 6,
    name: 'Sourdough Starter',
    price: 10,
    description: 'Your own portion of our beautiful, healthy starter',
    image: '/images/Sourdough Starter.webp',
  },
  {
    id: 7,
    name: 'Blueberry Lemon Sourdough',
    price: 15,
    description: 'Sweet sourdough with fresh blueberries and lemon zest',
    image: '/images/BlueBerry Lemon Sourdough Bread.webp',
  },
  {
    id: 8,
    name: 'Double Chocolate Sourdough',
    price: 15,
    description: 'Rich chocolate sourdough with chocolate chips',
    image: '/images/Double Chocolate Sourdough Bread.webp',
  },
  {
    id: 9,
    name: 'Jalapeno Cheddar Sourdough',
    price: 15,
    description: 'Spicy jalapenos and sharp cheddar in every bite',
    image: '/images/Jalepeno Cheddar Sourdough Bread.webp',
  },
  {
    id: 10,
    name: 'Rosemary Garlic Sourdough',
    price: 15,
    description: 'Aromatic herbs and roasted garlic throughout',
    image: '/images/Rosemary Garlic Sourdough Bread.webp',
  },
  {
    id: 11,
    name: 'Habanero Swiss Sourdough',
    price: 15,
    description: 'Fiery habanero peppers with melted Swiss cheese',
    image: '/images/Habanero Swiss Sourdough Loaf.webp',
  },
  {
    id: 12,
    name: 'Custom Loaf',
    price: 16,
    description:
      'Create your own custom sourdough with your choice of add-ins',
    image: '/images/Custom Loaf.webp',
    availableForCheckout: false,
  },
  {
    id: 13,
    name: 'Sourdough Croutons',
    price: 5,
    description: 'Crunchy sourdough croutons perfect for salads and soups',
    image: '/images/Sourdough Croutons.jpg',
  },
  {
    id: 14,
    name: 'Sourdough Crispy Crackers',
    price: 5,
    description: 'Light and crispy crackers made from our signature sourdough',
    image: '/images/Sourdough Crispy Crackers.jpg',
  },
  {
    id: 15,
    name: 'Sourdough Muffins',
    price: 10,
    description: '6 count variety pack of fluffy sourdough muffins',
    image: '/images/Sourdough Muffins.jpg',
  },
  {
    id: 16,
    name: 'White Chocolate Espresso',
    price: 15,
    description: 'Rich espresso sourdough swirled with white chocolate',
    image: '/images/White Chocolate Espresso.jpg',
  },
  {
    id: 17,
    name: 'Chocolate Chip Cookies',
    price: 15,
    description: '12 count of chewy sourdough chocolate chip cookies',
    image: '/images/Chocolate Chip Cookies.jpg',
  },
  {
    id: 18,
    name: 'Banana Bread',
    price: 10,
    description: 'Moist and delicious sourdough banana bread',
    image: '/images/Banana Bread.jpg',
  },
  {
    id: 19,
    name: 'Bread Bowls',
    price: 15,
    description: 'Made for soup or other liquids! 4 Pack.',
    image: '/images/Bread Bowls.jpg',
  },
  {
    id: 20,
    name: 'Bagels (Plain)',
    price: 12,
    description: '6 count plain sourdough bagels',
    image: '/images/Bagels Plain.jpg',
  },
  {
    id: 21,
    name: 'Bagels (Variety)',
    price: 12,
    description: '6 count variety pack of sourdough bagels',
    image: '/images/Bagels Variety.jpg',
  },
  {
    id: 22,
    name: 'Pizza Loaf',
    price: 15,
    description: 'Savory sourdough loaded with pizza flavors',
    image: '/images/Pizza Sourdough Loaf.webp',
  },
  {
    id: 23,
    name: 'Cinnamon Sugar Sourdough',
    price: 15,
    description: 'Sweet sourdough dusted with cinnamon and sugar',
    image: '/images/Cinnamon Sugar Sourdough.jpg',
  },
]
