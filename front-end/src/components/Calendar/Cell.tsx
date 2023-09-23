import React, { useState } from "react";
import '../../css/style.css';

interface Props {
  item: string,
  row: number,
  column: number,
  onClick: (
    row: number,
    column: number,
    item: string
  ) => void,
  
}

const Cell = ({item, onClick, row, column}: Props) => {
  const [state, setState] = useState(item);

  return <div
    className="cell"
    onClick={ () => onClick(row, column, item) }
  >
    { state }
  </div>
}

export default Cell;