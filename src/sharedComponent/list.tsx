import * as React from 'react';
import {useEffect, useState} from 'react';
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
  } from "@tanstack/react-table";

  import  SearchPatient from "./SearchPatient";


  type listProps = {
    data: patient[] | []
  };

  type patient = {
    cin: string,
    firstName: string,
    lastName: string,
    gender: 'H' | 'F',
    dateOfBirth: string,
    insuranceCompany: 'CNOPS' | 'FAR',
    isAdherent: 'Oui' | 'Non' ,
  };
  

  // this is a plainTextComponent(dump component)
  export default function List({data}: listProps) {

    const columnHelper = createColumnHelper();
  
    const columns = [
      columnHelper.accessor("cin", {
        id: "cin",
        cell: (info: any) => <span>{info.getValue()}</span>,
        header: "N°CNIE",
      }),
      columnHelper.accessor("lastName", {
        cell: (info : any) => <span>{info.getValue()}</span>,
        header: "Nom",
      }),
      columnHelper.accessor("firstName", {
        cell: (info : any) => <span>{info.getValue()}</span>,
        header: "Prénom",
      }),
      columnHelper.accessor("gender", {
        cell: (info: any) => <span>{info.getValue()}</span>,
        header: "Sexe",
      }),
      columnHelper.accessor("dateOfBirth", {
        cell: (info: any) => <span>{info.getValue()}</span>,
        header: "date de naissance",
      }),
      columnHelper.accessor("insuranceCompany", {
        cell: (info: any) => <span>{info.getValue()}</span>,
        header: "Assuré",
      }),
      columnHelper.accessor("isAdherent", {
        cell: (info: any) => <span>{info.getValue()+''}</span>,
        header: "Adhérant",
      }),
    ];
    const [globalFilter, setGlobalFilter] = useState<string>('');
  
    const table = useReactTable({
      data,
      columns,
      state: {
        globalFilter,
      },
      getFilteredRowModel: getFilteredRowModel(),
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      initialState: {
        pagination: {
          pageSize: 7,
        },
    },
    });
    const pages:number [] = [...Array(table.getPageCount()).keys()].map(i => i + 1);
  
    return (
      <div className="m-full h-full font-medium p-2 mx-auto text-dark-blue flex flex-col items-start pb-10">
          <div className="w-3/5 mb-10 -mt-20" >
            <SearchPatient 
              initValue={globalFilter ?? ""}
              submitSearch={(value:string) => setGlobalFilter(value)}
            />
        </div>
        <div className="w-full h-full flex flex-col justify-between">
          <table className="w-full text-left">
            <thead className=" text-light-blue">
              {table.getHeaderGroups().map((headerGroup: any) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header: any) => (
                    <th key={header.id} className="capitalize px-3.5 py-2 ">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row: any, i: any) => (
                    <tr
                      key={row.id}
                      className={` capitalize
                      ${i % 2 === 0 ? "bg-dark-blue-op" : ""}
                      `}
                    >
                      {row.getVisibleCells().map((cell: any) => (
                        <td key={cell.id} className= {`px-3.5 py-2  ${ !cell.getContext() && "hidden  md:flex"} `}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                ))
                ) : (
                  <tr className="text-center h-32">
                  <td colSpan={12}>Aucun patient!</td>
                </tr>
              )}
            </tbody>
          </table>
          {/* pagination */}

        <div className="w-full bg-white rounded-md flex items-center justify-end gap-2">
          <button
            onClick={() => {
              table.previousPage();
            }}
            disabled={!table.getCanPreviousPage()}
            className={`${!table.getCanPreviousPage() ? "invisible" : ""} p-1 border border-gray-300 px-2 bg-dark-blue text-white rounded-md`}
          >
            {"<"}
            </button>
              <span className="flex items-center gap-4">
                {
                  table.getPageCount()<5 ?
                  pages.map( p => 
                    <button 
                    onClick={()=>table.setPageIndex(p-1)}
                    key={p} 
                    className={`${table.getState().pagination.pageIndex+1 === p &&'p-1 border border-gray-300 px-2 bg-white rounded-md'  }`}
                    >
                      {p}
                    </button>
                    
                  )
                  :
                  <div  className="flex items-center gap-4">
                    { [1,2,3].map( p => 
                        <button 
                          onClick={()=>p!==4 && table.setPageIndex(p-1)}
                          key={p} 
                          className={`${table.getState().pagination.pageIndex<3 && table.getState().pagination.pageIndex+1 === p &&'p-1 border border-gray-300 px-2 bg-white rounded-md'  }`}
                          >
                          { p}
                        </button>
                      )
                    }
                    {
                      table.getState().pagination.pageIndex>2 && table.getState().pagination.pageIndex<table.getPageCount()-1 ?
                      <div className="flex flex-row gap-4">
                        {table.getState().pagination.pageIndex+1>4&&<div>...</div>}
                        <button 
                          className={`${table.getState().pagination.pageIndex>2 && table.getState().pagination.pageIndex<table.getPageCount()-1 &&'p-1 border border-gray-300 px-2 bg-white rounded-md'  }`}
                          >
                          { table.getState().pagination.pageIndex+1}
                        </button>  
                        {table.getState().pagination.pageIndex+1<table.getPageCount()&&<div>...</div>}
                      </div>
                      :
                      <button 
                        className={`${table.getState().pagination.pageIndex>2 && table.getState().pagination.pageIndex<table.getPageCount()-1 &&'p-1 border border-gray-300 px-2 bg-white rounded-md'  }`}
                      >
                        { '...'}
                      </button>
                    }
                    <button 
                      onClick={()=>table.setPageIndex(table.getPageCount()-1)}
                      className={`${table.getState().pagination.pageIndex+1 === table.getPageCount() &&'p-1 border border-gray-300 px-2 bg-white rounded-md'  }`}
                      >
                      {table.getPageCount() }
                    </button>
                  </div>

                }
              </span>
            <button
              onClick={() => {
                table.nextPage();
              }}
              disabled={!table.getCanNextPage()}
              className={`${!table.getCanNextPage() ? "invisible" : ""} p-1 border border-gray-300 px-2 bg-dark-blue text-white rounded-md`}
            >
              {">"}
            </button>
          </div>
        </div>
      </div>
    );
  };
  
