import { useDrop } from 'react-dnd';

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
    <div ref={dropRef} style={{
      width: '100%',
      fontSize: '100px',
      textAlign: 'center',
      background: isOver ? 'CornflowerBlue' : colour,
      borderStyle: 'solid',
      fontFamily: 'Oxygen',
      borderColor: 'black',
      color: 'black',
      borderRadius: '5px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100px'
    }}>
      {word[index]}
    </div>
  );
};

const SlotPlane = ({ currentColours, currentGuess, setLetter }) => {
  return(
    <div style={{
      height: '20%',
      width: '100%',
      display: 'flex'
    }}>
      {createSlots(currentColours, currentGuess, setLetter)}
    </div>
  );
};

export default SlotPlane;