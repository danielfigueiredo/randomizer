import React, { useCallback, useState } from 'react';
import { createTheme, Alert, Box, Button, Chip, Grid, List, ListItem, ListItemText, TextField, Typography, ThemeProvider, CssBaseline } from '@mui/material';

function shuffle(frozenArray: string[]): string[] {
  const array = [...frozenArray];
  let currentIndex = array.length, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const [addInputValue, setAddInputValue] = useState<string>('');
  const [listValues, setListValues] = useState<string[]>([]);
  const [randomizedList, setRandomizedList] = useState<string[]>([]);
  const [showError, setShowError] = useState(false);

  const onAddInputToList = useCallback(() => {
    if (addInputValue) {
      if (listValues.includes(addInputValue)) {
        setShowError(true);

        return;
      }
      const moreListValues = addInputValue.split('\n')
        .map(row => row.trim())
        .filter((row, index, rows) => !!row && !listValues.includes(row) && rows.indexOf(row) === index);
      setListValues([...listValues, ...moreListValues]);
      setAddInputValue('');
    }
  }, [listValues, setListValues, setAddInputValue, addInputValue, setShowError]);

  const onRandomize = useCallback(() => {
    setRandomizedList(shuffle(listValues));
  }, [listValues, setRandomizedList]);

  const onDeleteItem = useCallback((item: string) => {
    return () => setListValues(listValues.filter(i => i !== item));
  }, [listValues, setListValues]);

  const onChangeAddItemInput = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setShowError(false);
    setAddInputValue(event.target.value)
  }, [setShowError, setAddInputValue]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box margin={2}>
        <Box width="100%">
          <TextField
            style={{ width: '30%' }}
            rows={10}
            multiline
            value={addInputValue}
            onChange={onChangeAddItemInput}
          />
          <Button onClick={onAddInputToList}>
            Add to list
          </Button>
        </Box>
        <Box paddingY={1}>
          {showError && <Alert severity="error">Item already exists in list</Alert>}
        </Box>
        <Grid container>
          <Grid item xs={6} height={10}>
            <Typography variant="h6">List</Typography>
          </Grid>
          <Grid item xs={6}>
            <Button onClick={onRandomize}>
              <Typography variant="button">Randomize list</Typography>
            </Button>
          </Grid>
          <Grid item xs={6}>
            {listValues.map(item => (
              <Box key={item} marginBottom={1}>
                <Chip clickable onClick={onDeleteItem(item)} onDelete={onDeleteItem(item)} label={item} />
              </Box>
            ))}
          </Grid>
          <Grid item xs={6}>
            <List dense={true}>
              {randomizedList.map(item => (
                <ListItem key={item}>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}

export default App;
