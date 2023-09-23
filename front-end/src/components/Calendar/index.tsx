import React, { useState } from "react";
import Cell from "./cell";
import '../../css/style.css';

const Calendar = () => {
  const range = (start, end) => Array.from({ length: end - start + 1 }, (_, i) => i);
  const time = ["", "7:00", "8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"];
  const rows = [
    {
      name: "Mon",
      columns: time.length,
    },
    {
      name: "The",
      columns: time.length
    },
    {
      name: "Wed",
      columns: time.length
    },
    {
      name: "Thu",
      columns: time.length
    },
    {
      name: "Fri",
      columns: time.length
    },
    {
      name: "Sat",
      columns: time.length
    },
    {
      name: "Sun",
      columns: time.length
    },
  ]

  const createItems = () => {
    let temp = []
    rows.forEach((row, rowIndex) => {
      range(0, row.columns - 1).forEach((column, columnIndex) => {
        temp.push({
          row: rowIndex,
          column: columnIndex,
          item: ""
        })
      })
    })
    return temp;
  }
  const [items, setItems] = useState(createItems())
  
  const getItem = (row, column) => {
    return items.find((item) => item.row === row && item.column === column).item;
  }
  const getItemIndex = (row, column) => {
    return items.findIndex((item) => item.row === row && item.column === column);
  }
  const setClick = (row, column, item) => {
    setItems(
      [
        ...items.slice(0, getItemIndex(row, column)),
      {
        row: row,
        column: column,
        item: "-"
      },
      ...items.slice(getItemIndex(row, column) + 1, items.length)
    ])
  }

  return (
    <div>
      <table>
        <tr>
          {
            time.map((item) => {
              return <th className="typography">
                { item }
              </th>
            })
          }
        </tr>
        
          {
            rows.map((row, rowIndex) => {
              
              let temp = range(1, row.columns - 1).map((column, columnIndex) => {
                return (<td>
                  <Cell
                    item={ getItem(rowIndex, columnIndex) }
                    onClick={ setClick }
                    row={ rowIndex }
                    column={ columnIndex }
                  />
                </td>)
              })

              return  <tr>
                <td className="typography">
                  { row.name }
                </td>
                { temp }
              </tr>
            })
          }
      </table>

    </div>
  );
}

export default Calendar;