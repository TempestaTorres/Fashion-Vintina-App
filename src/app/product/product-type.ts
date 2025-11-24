export interface ProductType {
  id: number,
  type: string,
  category: {
    name: string,
    tag: string,
  },
  name: string,
  price: number,
  originalPrice?: number,
  image?: string,
  onSale?: boolean,
  quantity?: number,
}

export const  Products: ProductType[] = [
  {
    id: 79,
    type: 'lingerie-white',
    category: {
      name: 'lingerie',
      tag: 'lingerie',
    },
    name: 'Snow Queen',
    price: 50.00,
    originalPrice: 65.00,
    image: '/assets/images/sensual-woman-beautiful-young-woman-in-lingerie-smiling-while-standing.jpg',
    onSale: true
  },
  {
    id: 85,
    type: 'heart-beat',
    category: {
      name: 'lingerie',
      tag: 'lingerie',
    },
    name: 'Heart Beat',
    price: 75.00,
    image: '/assets/images/sexy-young-lady-in-luxury-lingerie.jpg',
    onSale: false
  },
  {
    id: 90,
    type: 'victoria-line',
    category: {
      name: 'underwear',
      tag: 'underwear',
    },
    name: 'Victoria Line',
    price: 70.00,
    image: '/assets/images/beautiful-seductive-girl-posing-in-black-lingerie.jpg',
    onSale: false
  },
  {
    id: 92,
    type: 'slick-bodysuit',
    category: {
      name: 'bodysuit',
      tag: 'bodysuit',
    },
    name: 'Slick Bodysuit',
    price: 68.00,
    image: '/assets/images/beauty-in-lingerie.jpg',
    onSale: false
  },
  {
    id: 93,
    type: 'cloud-fit',
    category: {
      name: 'underwear',
      tag: 'underwear',
    },
    name: 'Cloud Fit',
    price: 65.00,
    image: '/assets/images/posing-for-a-camera-beautiful-woman-with-slim-body-in-underwear-is-in-the-studio.jpg',
    onSale: false
  },
  {
    id: 94,
    type: 'black-swan',
    category: {
      name: 'lingerie',
      tag: 'lingerie',
    },
    name: 'Black Swan',
    price: 75.00,
    image: '/assets/images/blonde-tender-girl-posing-in-black-lingerie.jpg',
    onSale: false
  },
  {
    id: 95,
    type: 'gray-shade',
    category: {
      name: 'lingerie',
      tag: 'lingerie',
    },
    name: 'Gray Shade',
    price: 75.00,
    image: '/assets/images/beautiful-sensual-girl-posing-in-lace-lingerie-isolated-on-grey.jpg',
    onSale: false
  },
  {
    id: 96,
    type: 'pink-love',
    category: {
      name: 'underwear',
      tag: 'underwear',
    },
    name: 'Pink Love',
    price: 68.00,
    image: '/assets/images/woman-with-beautiful-body.jpg',
    onSale: false
  },
]
