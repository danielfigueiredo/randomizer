import React, { useCallback, useState } from 'react';
import { Button } from '@mui/material';

function shuffle(frozenArray: string[]): string[] {
  const array = [...frozenArray];
  let currentIndex = array.length, randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function App() {
  const [addInputValue, setAddInputValue] = useState<string>('');
  const [listValues, setListValues] = useState<string[]>([]);
  const [randomizedList, setRandomizedList] = useState<string[]>([]);

  const onAddInputToList = useCallback(() => {
    setListValues([...listValues, addInputValue]);
    setAddInputValue('');
  }, [listValues, setListValues, setAddInputValue, addInputValue]);

  return (
    <div style={{ margin: '15px' }}>
      <input
        style={{ marginRight: '10px' }}
        value={addInputValue}
        onChange={(event) => {
          setAddInputValue((event.target as HTMLInputElement).value)
        }}
        onKeyUp={(event) => {
          if (event.key === 'Enter' && addInputValue) {
            onAddInputToList();
          }
        }}
      />
      <Button
        onClick={() => {
          if (addInputValue) {
            onAddInputToList();
          }
        }}
      >
        Add to list
      </Button>
      <p>List: {listValues.join(', ')}</p>
      <Button onClick={() => {
        setRandomizedList(shuffle(listValues));
      }}>
        Randomize list
      </Button>
      <p>Randomized list: {randomizedList.join(', ')}</p>
    </div>
  );
}

export default App;
