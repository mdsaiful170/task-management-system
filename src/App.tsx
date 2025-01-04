import Navbar from '@components/pages/Navbar';
import { WavyBackground } from '@ui/wavy-background';
import Taskmanagement from '@components/pages/Taskmanagement';

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
