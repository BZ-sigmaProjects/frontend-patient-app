import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

type atientCreate = {
    cin: string,
    firstName: string,
    lastName: string,
    gender: 'H' | 'F',
    dateOfBirth: string,
    insuranceCompany: 'CNOPS' | 'FAR',
    numAdherent: string,
    province: string,
    city: string, 
    phone: string,
    address: string,
    complimentAddress: string

}

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3000'}),
    tagTypes: ['Patients'],
    endpoints: (builder:any) =>({
        getPatients: builder.query({
            query: () => '/patients',
            transformResponse: res => res.map(e=> {e.isAdherent = e.isAdherent ? 'Oui' : 'Non'; return e}),
            providesTags: ['Patient']
        }),
        addPatient: builder.mutation({
            query: (patient:patientCreate) => ({
                url: '/patients',
                method: 'POST',
                body: patient
            }),
            invalidatesTags: ['Patient']
        })
    })


})


export const {
    useGetPatientsQuery,
    useAddPatientMutation
} = apiSlice