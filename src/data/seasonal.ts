export type SeasonalProduct = {
  id: number
  name: string
  price: number
  description: string
  image?: string
}

export type SeasonalContent = {
  badge: string
  title: string
  description: string
  background: string
  accent: string
  ctaLabel?: string
  ctaHref?: string
  products?: Array<SeasonalProduct>
}

export function getSeasonalContent(): SeasonalContent | null {
  const month = new Date().getMonth()

  if (month === 10) {
    return {
      badge: 'November Special',
      title: 'Thanksgiving Sourdough Feast',
      description:
        'Warm the table with artisan loaves, savory sides, and sweet treats made for sharing.',
      background: 'linear-gradient(135deg, #FFF4E0 0%, #FFD9A0 100%)',
      accent: '#B25C1A',
      ctaLabel: 'Preorder Thanksgiving Loaves',
      ctaHref: '/seasonal',
      products: [
        {
          id: 101,
          name: 'Cranberry Walnut Celebration Loaf',
          price: 18,
          description:
            'Studded with tart cranberries, toasted walnuts, and orange zest for the holiday table.',
        },
        {
          id: 102,
          name: 'Savory Herb Stuffing Bread',
          price: 14,
          description:
            'Sage, thyme, and rosemary sourdough perfect for homemade stuffing or sandwiches.',
        },
        {
          id: 103,
          name: 'Pumpkin Maple Twist Rolls',
          price: 20,
          description:
            'Soft sourdough rolls layered with pumpkin puree and maple glaze.',
        },
      ],
    }
  }

  if (month === 11) {
    return {
      badge: 'Holiday Cheer',
      title: 'Christmas Comfort Bakes',
      description:
        'Celebrate the season with festive sourdough, spiced rolls, and gift-ready goodies.',
      background: 'linear-gradient(135deg, #F0FFF2 0%, #D4F5DD 100%)',
      accent: '#2C7A41',
      ctaLabel: 'Reserve Christmas Treats',
      ctaHref: '/seasonal',
      products: [
        {
          id: 111,
          name: 'Peppermint Cocoa Babka',
          price: 22,
          description:
            'Rich sourdough babka marbled with dark chocolate and crushed peppermint.',
        },
        {
          id: 112,
          name: 'Gingerbread Spice Loaf',
          price: 16,
          description:
            'Molasses-sweetened sourdough with holiday spice blend and orange glaze.',
        },
        {
          id: 113,
          name: 'Eggnog Brioche Braid',
          price: 24,
          description:
            'Buttery brioche infused with eggnog custard and dusted with nutmeg.',
        },
      ],
    }
  }

  if (month === 1) {
    return {
      badge: 'Sweet February',
      title: 'Valentine Sourdough Love',
      description:
        'Share heart-warming breads, chocolate-kissed loaves, and treats for every valentine.',
      background: 'linear-gradient(135deg, #FFE4EC 0%, #FFB6C9 100%)',
      accent: '#D63F68',
      ctaLabel: 'Order Valentine Treats',
      ctaHref: '/seasonal',
      products: [
        {
          id: 121,
          name: 'Strawberry Champagne Sourdough',
          price: 20,
          description:
            'Rosé-infused crumb with strawberries and a sparkle sugar crust.',
        },
        {
          id: 122,
          name: 'Dark Chocolate Raspberry Hearts',
          price: 18,
          description:
            'Heart-shaped rolls filled with raspberry compote and dark chocolate ganache.',
        },
        {
          id: 123,
          name: 'Rose Petal Honey Loaf',
          price: 19,
          description:
            'Delicate sourdough sweetened with local honey and edible rose petals.',
        },
      ],
    }
  }

  if (month === 2) {
    return {
      badge: 'March Magic',
      title: "St. Patrick's Day Specials",
      description:
        'From green-inspired loaves to stout-infused breads, add lucky flavor to your celebrations.',
      background: 'linear-gradient(135deg, #E3FBE3 0%, #B6EFB6 100%)',
      accent: '#2F8F2F',
      ctaLabel: 'Book a St. Patrick Order',
      ctaHref: '/seasonal',
      products: [
        {
          id: 131,
          name: 'Irish Cheddar & Chive Boule',
          price: 17,
          description:
            'Sharp Irish cheddar pockets with fresh garden chives throughout.',
        },
        {
          id: 132,
          name: 'Guinness Cocoa Loaf',
          price: 18,
          description:
            'Stout-enriched sourdough with cocoa nibs and toasted barley flakes.',
        },
        {
          id: 133,
          name: 'Emerald Herb Focaccia',
          price: 15,
          description:
            'Soft focaccia topped with basil, parsley, and sea salt shamrock motifs.',
        },
      ],
    }
  }

  if (month === 3) {
    return {
      badge: 'April Fresh',
      title: 'Easter Brunch Favorites',
      description:
        'Bright, fluffy loaves and sweet rolls ready to anchor your springtime gatherings.',
      background: 'linear-gradient(135deg, #E9F3FF 0%, #D9E7FF 100%)',
      accent: '#5F7AD2',
      ctaLabel: 'Plan Your Easter Basket',
      ctaHref: '/seasonal',
      products: [
        {
          id: 141,
          name: 'Lemon Lavender Morning Loaf',
          price: 18,
          description:
            'Sunrise-bright sourdough scented with lemon zest and culinary lavender.',
        },
        {
          id: 142,
          name: 'Carrot Cake Swirl Rolls',
          price: 19,
          description:
            'Cinnamon rolls folded with carrots, walnuts, and cream cheese drizzle.',
        },
        {
          id: 143,
          name: 'Vanilla Bean Hot Cross Buns',
          price: 16,
          description:
            'Classic buns enriched with vanilla bean and golden raisins.',
        },
      ],
    }
  }

  if (month >= 4 && month <= 7) {
    return {
      badge: 'Summer Sunshine',
      title: 'Summertime Sourdoughs',
      description:
        'Light, bright flavors packed with seasonal fruits and herbs for every picnic table.',
      background: 'linear-gradient(135deg, #FFF4CE 0%, #FFD76F 100%)',
      accent: '#DF8D00',
      ctaLabel: 'Pick Your Summer Favorite',
      ctaHref: '/seasonal',
      products: [
        {
          id: 151,
          name: 'Peach Basil Picnic Loaf',
          price: 18,
          description:
            'Juicy peaches, fresh basil, and a hint of sea salt for warm evenings.',
        },
        {
          id: 152,
          name: 'Fire-Roasted Tomato Focaccia',
          price: 16,
          description:
            'Charred tomato slices, garlic oil, and smoked sea salt on airy focaccia.',
        },
        {
          id: 153,
          name: 'Berry Lemonade Sourdough',
          price: 17,
          description:
            'Blueberry, strawberry, and lemon zest blend in a refreshing loaf.',
        },
      ],
    }
  }

  return null
}
