import axios from 'axios'

import { ResponseSearchSuccess } from '../interfaces'

export const BaseURL = 'https://api.github.com'

export enum Endpoints {
  searchUsers = '/search/users',
}

export enum OrderOption {
  desc = 'desc',
  asc = 'asc',
}

export const TotalPerPage = 100

export class ApiService {
  public static requester = axios.create({
    baseURL: BaseURL,
  })

  public static searchUsers(query: string) {
    return ApiService.requester.get<ResponseSearchSuccess>(
      Endpoints.searchUsers,
      {
        params: {
          q: query,
          per_page: TotalPerPage,
          order: OrderOption.desc,
        },
      }
    )
  }
}
