import { Database } from "./database/database";
import { View } from "./view/view";

function App() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-10">
      <div className="w-[600px]">
        <Database />
      </div>
      <div className="w-[600px]">
        <View />
      </div>
    </div>
  );
}

export default App;
