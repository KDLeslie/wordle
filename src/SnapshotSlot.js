
export const createSnapshotSlots = (colours, word) => {
  if(colours === undefined || word === undefined) {
    return;
  }
  const slots = [];
  for (let i = 0; i < 5; i++) {
    slots.push(<SnapshotSlot key={i} colour={colours[i]} index={i} word={word} ></SnapshotSlot>);
  }
  return(slots);
};

const SnapshotSlot = ({ colour, index, word }) => {
  
  return (
    <div style={{
      width: '100%', 
      fontSize: '40px',
      textAlign: 'center',
      background: colour,
      borderStyle: 'solid',
      fontFamily: 'Oxygen',
      borderColor: 'black',
      color: 'black',
      borderRadius: '5px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '10px'
    }}>
      {word[index]} 
    </div>
  );
};

export default SnapshotSlot;