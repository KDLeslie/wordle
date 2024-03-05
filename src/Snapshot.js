import { createSnapshotSlots } from "./SnapshotSlot";

export const createSnapshots = (guessHistory, colourHistory, index) => {
    const snapshots = [];
    const total = Math.ceil(index / 6) * 6;
    for (let i = 0; i < total; i++) {
        let display = true;
        if (i >= index) {
            display = false;
        }
        snapshots.push(<Snapshot key={'h' + i} guess={guessHistory[i]} colours={colourHistory[i]} display={display}></Snapshot>);
    }
    return(snapshots);
}

const Snapshot = ({ guess, colours, display }) => {

    return (
        <div style={{ 
            display: 'flex',
            width: '15%',
            height: '100%',
            visibility: display ? null : 'hidden'
        }}>
            {createSnapshotSlots(colours, guess)}
        </div>
    );
    
};

export default Snapshot;