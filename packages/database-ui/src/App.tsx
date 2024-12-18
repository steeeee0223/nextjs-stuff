import { Database } from "./database/database";

function App() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <div className="w-[600px]">
        <Database />
      </div>
    </div>
  );
}

export default App;
