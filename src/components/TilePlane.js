import { useDrag } from 'react-dnd';
import "../styles/TilePlane.css";

const createTiles = () => {
  const tiles = [];
  for (let i = 0; i < 26; i++) {
    const letter = String.fromCharCode(97 + i);
    tiles.push(
      <Tile
        key={"Tile_" + letter}
        id={letter}
        color={'purple'}
      >
        {letter}
      </Tile>);
  }
  return tiles;
};

const Tile = ({ id, color, children }) => {
  const [{ isDragging, canDrag }, dragRef] = useDrag(() => ({
      item: { type: id },
      type: id,
      canDrag: () => true,
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
        canDrag: !!monitor.canDrag()
      })
    }),
    []
  );

  return (
    <div
      ref={dragRef}
      id={id}
      className={`tile ${isDragging ? 'tile-dragging' : ''}`}
      style={{ background: color, cursor: canDrag ? 'move' : null }}
    >
      {children}
    </div>
  );
};

const TilePlane = () => {
  return (
    <div className="tile-plane">
      {createTiles()}
    </div>
  );
}

export default TilePlane;