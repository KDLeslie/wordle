import { useDrag } from 'react-dnd';

export const createTiles = (numRows) => {
  const rows = [];
  let numCols = Math.floor(26 / numRows);
  for (let i = 0; i < numRows; i++) {
    if(i + 1 === numRows) {
      numCols += 26 % numRows;
    } 
    rows.push(createRow(numCols, numRows, i));
  }
  return(rows);
};

export const createRow = (numCols, totalNumRows, rowNumber) => {
  const height = 100 / totalNumRows;
  const tiles = [];
  const colsPerRow = Math.floor(26 / totalNumRows);
  for (let i = 0; i < numCols; i++) {
    const letter = String.fromCharCode(97 + i + colsPerRow * rowNumber);
    tiles.push(<Tile key={letter} id={letter} color={'purple'}>{letter}</Tile>);
  }
  return (
    <div key={'r' + rowNumber} style={{ 
      display: 'flex',
      height: `${height}%`
    }}>
      {tiles}
    </div>
  );
};

const Tile = ({ id, color, children }) => {
  const [{ isDragging, canDrag }, dragRef] = useDrag(() => ({
      item: {type: id},
      type: id,
      canDrag: () => true,
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
        canDrag: !!monitor.canDrag()
      })
    }),
    []
  );

  return ( isDragging ? null :
    <div ref={dragRef} id={id} style={{
      width: '100%', 
      fontSize: '85px',
      textAlign: 'center',
      background: color,
      fontFamily: 'Oxygen',
      borderStyle: 'solid',
      borderColor: 'black',
      cursor: canDrag ? 'move' : null,
      color: 'white',
      borderRadius: '5px',
      minHeight: '60px',
      minWidth: '60px'
    }}>
      {children} 
    </div>
  );
};

export default Tile;