import React from "react";
import { usePagination, useTable } from "react-table";
import "./scoreboard.css"
export default function Table({ columns, data }) {

  const {
    getTableProps, 
    getTableBodyProps, 
    headerGroups, 
    rows, 
    prepareRow 
  } = useTable({
    columns,
    data,
  }, usePagination);

  return (
    <div className="ReactTable tableContainer">
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()} className="tableHead" style={{
                border: 'solid 1px black'
              }}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
     
        {rows.map(row => {
          prepareRow(row)
          return (
            <tr className="tableRow" {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()} className="tableCell" style={{
                  border: 'solid 1px black'
                }}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
    </div>
   )
}
