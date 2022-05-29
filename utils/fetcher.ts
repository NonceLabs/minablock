import { request } from 'graphql-request'

export const graphFetcher = (query) => {
  return request('https://graphql.minaexplorer.com/', query)
}

export const httpFetcher = (url: string) => {
  return fetch(url).then((response) => response.json())
}
