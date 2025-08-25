import './App.css';
import { MainPage } from './pages/main-page/main-page.tsx';
import { Suspense } from 'react';
import { Spinner } from './components/spinner/spinner.tsx';

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <MainPage />
    </Suspense>
  );
}

export default App;
