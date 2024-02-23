import { useDrop } from 'react-dnd';

export const createSlots = (colours, word, setLetter) => {
  const slots = [];
  for (let i = 0; i < 5; i++) {
    slots.push(<Slot key={i} colour={colours[i]} index={i} word={word} changeLetter={setLetter}></Slot>);
  }
  return(slots);
};

const Slot = ({ colour, index, word, changeLetter }) => {
  const [{ isOver }, drop] = useDrop(() => ({
      accept: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
      drop: (item) => changeLetter(index, item.type, word),
      canDrop: () => true,
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      })
    }),
    [word]
  );
  return (
    <div ref={drop} style={{
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

export default Slot;