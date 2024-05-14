import React from 'react';
import "../styles/SnapshotPlane.css";

const createSnapshots = (guessHistory, colourHistory, guessCount) => {
  const snapshots = [];
  for (let i = 0; i < guessCount; i++) {
    snapshots.push(
      <Snapshot
        key={'h' + i}
        guess={guessHistory[i]}
        colours={colourHistory[i]}
      />
    );
  }
  return snapshots;
}

const Snapshot = ({ guess, colours }) => {
  return (
    <div className="snapshot">
      {createSnapshotSlots(colours, guess)}
    </div>
  );
};

const createSnapshotSlots = (colours, word) => {
  if (colours === undefined || word === undefined) {
    return;
  }
  return colours.map((colour, index) => (
    <SnapshotSlot
      key={index}
      colour={colour}
      index={index}
      word={word}
    />
  ));
};

const SnapshotSlot = ({ colour, index, word }) => {
  return (
    <div className="snapshot-slot" style={{ background: colour }}>
      {word[index]}
    </div>
  );
};

const SnapshotPlane = ({ guessHistory, colourHistory, guessCount }) => {
  return (
    <div className="snapshot-plane">
      {createSnapshots(guessHistory, colourHistory, guessCount)}
    </div>
  );
}

export default SnapshotPlane;