import { useDrop } from 'react-dnd';
import "../styles/SlotPlane.css";

const createSlots = (colours, word, setLetter) => {
  const slots = [];
  for (let i = 0; i < 5; i++) {
    slots.push(
      <Slot
        key={"Slot_" + i}
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
  const letters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i));

  const [{ isOver }, dropRef] = useDrop(() => ({
      accept: letters,
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