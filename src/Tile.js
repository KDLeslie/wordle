import { useDrag } from 'react-dnd';

export const createTiles = () => {
    let row1 = createRow(13, 0);
    let row2 = createRow(13, 1);
    return(
      <>
        {row1}
        {row2}
      </>
    )
  }

  export const createRow = (numOfTiles, rowNumber) => {
    let tiles = [];
    for (let i = 0; i < numOfTiles; i++) {
      var letter = String.fromCharCode(97 + i + rowNumber * numOfTiles);
      tiles.push(<Tile key={letter} id={letter} color={'purple'}>{letter}</Tile>);
    }
    return (
      <div style={{ 
        display: 'flex',
        height: '50%'
      }}>
        {tiles}
      </div>
    )
  }

const Tile = ({ id, color, children }) => {
    const [{ isDragging, canDrag }, dragRef] = useDrag(
      () => ({
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
        borderRadius: '5px'
      }}>
        {children} 
      </div>
    );
  }

  export default Tile;