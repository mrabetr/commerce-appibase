export type Page = { url: string }
export type GetAllPagesResult = { pages: Page[] }
import type { LocalConfig } from '../index'

export default function getAllPagesOperation() {
  function getAllPages({
    config,
    preview,
  }: {
    url?: string
    config?: Partial<LocalConfig>
    preview?: boolean
  }): Promise<GetAllPagesResult> {
    console.log('GETTING ALL PAGES');

    return Promise.resolve({
      pages: [],
    })
  }
  return getAllPages
}
