import places from './assets/places.json';
import Places from './components/Places';
import { Place } from './types';

function App() {
  return (
    <>
      <Places places={places as Place[]} />
    </>
  );
}

export default App;
