import { useDrag } from 'react-dnd';

const createTiles = (numRows) => {
  const rows = [];
  let numCols = Math.floor(26 / numRows);
  for (let i = 0; i < numRows; i++) {
    if(i + 1 === numRows) {
      // last row needs the remainder as well
      numCols += 26 % numRows;
    }
    rows.push(createTileRow(i, numCols, numRows));
  }
  return(rows);
};

const createTileRow = (rowIndex, numCols, totalNumRows) => {
  const height = 100 / totalNumRows;
  const tiles = [];
  const colsPerRow = Math.floor(26 / totalNumRows);
  for (let i = 0; i < numCols; i++) {
    const letter = String.fromCharCode(97 + i + colsPerRow * rowIndex);
    tiles.push(
      <Tile
        key={letter}
        id={letter}
        color={'purple'}
      >
        {letter}
      </Tile>);
  }
  return (
    <div key={'r' + rowIndex} style={{
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

const TilePlane = () => {
  return(
    <div style={{
      height: '40%',
      width: '100%'
    }}>
      {createTiles(3)}
    </div>
  );
}

export default TilePlane;