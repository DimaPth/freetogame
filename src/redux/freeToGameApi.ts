import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IGame, IGames } from '../types/IGames';

const headers = {
  'X-RapidAPI-Key': '597c815aa4msh28d92088334d0eap1a133cjsnace39729c4ac',
  'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
}

export const freeToGameApi = createApi({
  reducerPath: 'freeToGameApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://free-to-play-games-database.p.rapidapi.com/api/'}),
  endpoints: (builder) => ({
    getAllGames: builder.query<IGames[], void>({
      query: () => ({
        url: `games`,
        headers
      })
    }),
    getGamesByPlatform: builder.query<IGames[], string>({
      query: (platform) => ({
        url: `games`,
        params: {
          platform
        },
        headers
      })
    }),
    getGamesByGenre: builder.query<IGames[], string>({
      query: (genre) => ({
        url: `games`,
        params: {
          category: genre,
        },
        headers
      })
    }),
    getSortedGames: builder.query<IGames[], string>({
      query: (sortBy) => ({
        url: `games`,
        params: {
          'sort-by': sortBy,
        },
        headers
      })
    }),
    getMultipleSortedGames: builder.query<IGames[], {platform?: string, genre?: string, sortBy?: string}>({
      query: (args) => {
        const {platform, genre, sortBy} = args;
        return {
          url: `games`,
          params: {
            platform,
            category: genre,
            'sort-by': sortBy,
          },
          headers
        }
      }
    }),
    getFilteredGames: builder.query<IGames[], {tag: string, platform?: string}>({
      query: (args) => {
        const {tag, platform} = args;
        return {
          url: `filter`,
          params: {
            tag,
            platform,
          },
          headers
        }
      }
    }),
    getGameByID: builder.query<IGame, string>({
      query: (id) => ({
        url: `game`,
        params: {
          id
        },
        headers
      })
    }),
  }),
})

export const { 
  useGetAllGamesQuery,
  useGetGamesByPlatformQuery,
  useGetGamesByGenreQuery,
  useGetSortedGamesQuery,
  useGetMultipleSortedGamesQuery,
  useGetFilteredGamesQuery,
  useGetGameByIDQuery, 
} = freeToGameApi;