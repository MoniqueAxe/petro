
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Pump} from "../../types";
import { UUID } from "crypto";

export type PumpsResponse = Pump[]

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL}),
  tagTypes: ['Pump'],
  endpoints: (build) => ({
    getPumps: build.query<PumpsResponse, void>({
      query: () => `pumps`,
      providesTags: (result) => 
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Pump' as const, id })),
              { type: 'Pump', id: 'LIST' },
            ]
          : [{ type: 'Pump', id: 'LIST' }],
    }),
    addPump: build.mutation<Pump, Partial<Pump>>({
      query: (body) => ({
        url: `pumps`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Pump', id: 'LIST' }],
    }),
    getPump: build.query<Pump, UUID>({
      query: (id) => `pumps/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Pump', id }],
    }),
    updatePump: build.mutation<void, Pick<Pump, 'id'> & Partial<Pump>>({
      query: ({ ...patch }) => ({
        url: `pumps`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Pump', id }],
    }),
    deletePump: build.mutation<{ success: boolean; id: UUID }, UUID>({
      query(id) {
        return {
          url: `pumps/${id}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: (_result, _error, id) => [{ type: 'Pump', id }],
    }),
  }),
})

export const {
  useGetPumpQuery,
  useGetPumpsQuery,
  useAddPumpMutation,
  useUpdatePumpMutation,
  useDeletePumpMutation,
} = api
