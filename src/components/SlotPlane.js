import { useDrop } from 'react-dnd';
import "./SlotPlane.css";

const createSlots = (colours, word, setLetter) => {
  const slots = [];
  for (let i = 0; i < 5; i++) {
    slots.push(
      <Slot
        key={i}
        colour={colours[i]}
        index={i}
        word={word}
        changeLetter={setLetter}
      />
    );
  }
  return(slots);
};

const Slot = ({ colour, index, word, changeLetter }) => {
  const [{ isOver }, dropRef] = useDrop(() => ({
      accept: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
        'm','n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
      drop: (item) => changeLetter(index, item.type, word),
      canDrop: () => true,
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      })
    }),
    [word]
  );

  return (
    <div 
      ref={dropRef}
      className={`slot ${isOver ? 'slot-over' : ''}`}
      style={isOver ? null : { background: colour }}
    >
      {word[index]}
    </div>
  );
};

const SlotPlane = ({ currentColours, currentGuess, setLetter }) => {
  return(
    <div className="slot-plane">
      {createSlots(currentColours, currentGuess, setLetter)}
    </div>
  );
};

export default SlotPlane;