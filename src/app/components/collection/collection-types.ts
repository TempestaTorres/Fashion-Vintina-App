export interface ICollectionType {
  name: string,
  image: string,
}

export const Collections: ICollectionType[] = [
  {
    name: 'Underwear',
    image: 'url("/assets/images/middle-aged-woman-in-lingerie-posing-on-the-terrac.jpg")'
  },
  {
    name: 'Lingerie',
    image: 'url("/assets/images/slim-female-body-in-sexy-lingerie-side-view.jpg")'
  },
  {
    name: 'Bodysuits',
    image: 'url("/assets/images/young-female-model-with-dark-hair-and-lace-underwe.jpg")'
  }
]
