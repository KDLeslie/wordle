import { useDrag } from 'react-dnd';

export const createTiles = (numRows) => {
  let rows = [];
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
  let tiles = [];
  let colsPerRow = Math.floor(26 / totalNumRows);
  for (let i = 0; i < numCols; i++) {
    var letter = String.fromCharCode(97 + i + colsPerRow * rowNumber);
    tiles.push(<Tile key={letter} id={letter} color={'purple'}>{letter}</Tile>);
  }
  return (
    <div key={'r' + rowNumber} style={{ 
      display: 'flex',
      height: '50%'
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
      fontSize: '70px',
      textAlign: 'center',
      background: color,
      fontFamily: 'Oxygen',
      borderStyle: 'solid',
      borderColor: 'black',
      cursor: canDrag ? 'move' : null,
      color: 'white',
      borderRadius: '5px',
      minHeight: '100px',
      minWidth: '60px'
    }}>
      {children} 
    </div>
  );
};

export default Tile;