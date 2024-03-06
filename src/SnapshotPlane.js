const createSnapshots = (guessHistory, colourHistory, index) => {
  const snapshots = [];
  // create an entire row of 6 at a time
  const total = Math.ceil(index / 6) * 6;
  for (let i = 0; i < total; i++) {
    let display = true;
    if (i >= index) {
      display = false;
    }
    snapshots.push(
      <Snapshot
        key={'h' + i}
        guess={guessHistory[i]}
        colours={colourHistory[i]}
        display={display}
      />
    );
  }
  return(snapshots);
}

const Snapshot = ({ guess, colours, display }) => {
  return (
    <div style={{
      display: 'flex',
      width: '15%',
      height: '100%',
      visibility: display ? null : 'hidden',
      paddingTop: '5px',
      paddingBottom: '5px'
    }}>
      {createSnapshotSlots(colours, guess)}
    </div>
  );
};

const createSnapshotSlots = (colours, word) => {
  if(colours === undefined || word === undefined) {
    return;
  }
  const slots = [];
  for (let i = 0; i < 5; i++) {
    slots.push(
      <SnapshotSlot
        key={i}
        colour={colours[i]}
        index={i}
        word={word}
      />
    );
  }
  return(slots);
};

const SnapshotSlot = ({ colour, index, word }) => {
  return (
    <div style={{
      width: '100%',
      fontSize: '50px',
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

const SnapshotPlane = ({ guessHistory, colourHistory, index }) => {
  return(
    <div style={{
      width: '100%',
      display: 'flex',
      boxSizing: 'border-box',
      justifyContent: 'space-between',
      flexWrap: 'wrap'
      }}>
        {createSnapshots(guessHistory, colourHistory, index)}
    </div>
  );
}

export default SnapshotPlane;