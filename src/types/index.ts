export type NasaData = {
  data: {
    nasa_id: string
    title: string
    description: string
    secondary_creator: string
    date_created: string
    keywords: string[]
  }[]
  links: {
    href: string
  }[]
}
