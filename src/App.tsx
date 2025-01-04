import Navbar from './components/pages/Navbar';
import Taskmanagement from './components/pages/Taskmanagement';
import { WavyBackground } from './components/ui/wavy-background';

const App: React.FC = () => {
  return (
    <>
      <main>
        <Navbar />
        <br />
        <br />
        <br />
        <br />
        <WavyBackground className="mt-28">
          <Taskmanagement />
        </WavyBackground>
      </main>
    </>
  );
};

export default App;
