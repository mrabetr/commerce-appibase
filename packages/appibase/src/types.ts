export type AppibaseVariation = {
  id: string
  name: string
  options?: AppibaseVariationOption[]
}

export type AppibaseVariationOption = {
  id: string
  name: string
  variation_name?: string
  variation?: AppibaseVariation
}

export type PriceList = {
  id: number
  name: string
  description?: string
  currency: string
  tax_incl: boolean
}

export type Amount = {
  cents: number
  float: number
  formatted: string
}

export type AppibasePrices = {
  data: AppibasePrice[]
}

export type AppibasePrice = {
  id: number
  currency: string
  amount: Amount
  original_amount: Amount
  price_list?: PriceList
  product?: AppibaseProduct
}

export type StockLocation = {
  id: number
  name: string
  description?: string
}

export type StockItem = {
  id: number
  quantity: number
  reserved: number
  available: number
  stock_location?: StockLocation
  product?: AppibaseProduct
}

export type AppibaseVariations = {
  data: AppibaseVariation[]
}

export type AppibaseProduct = {
  id: string
  name: string
  description: string
  slug: string
  sku: string
  category: string
  vendor: string
  tags: string[]
  image_urls: string[]
  is_parent: boolean
  active: boolean
  livemode: boolean
  parent?: AppibaseProduct
  children?: AppibaseProduct[]
  variations?: AppibaseVariations
  variation_options?: AppibaseVariationOption[]
  prices: AppibasePrices
  stock_items?: StockItem[]
}

export type AppibaseCollection = {
  id: number
  name: string
  description: string
  slug: string
  image_url: string
  is_parent: boolean
  active: boolean
  livemode: boolean
  parent?: AppibaseCollection
  children?: AppibaseCollection[]
  products?: AppibaseProduct[]
}