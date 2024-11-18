import React from 'react';
import { useSetState } from 'naifu';

interface PartyState {
  guestCount: number;
  partyTheme: string;
}

const GuestList = () => {
  const [partyState, setPartyState] = useSetState<PartyState>({
    guestCount: 0,
    partyTheme: 'Beach Party',
  });

  return (
    <div>
      <pre>{JSON.stringify(partyState, null, 2)}</pre>
      <p>
        <button type="button" onClick={() => setPartyState((prev) => ({ guestCount: prev.guestCount + 1 }))}>
          Add Guest
        </button>
      </p>
    </div>
  );
};

export default GuestList;
