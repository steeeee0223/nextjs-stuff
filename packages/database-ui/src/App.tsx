import { Database } from "./database";

import "./notion.css";

function App() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-10">
      {/* Notion Page Content */}
      <div
        className="notion-page-content"
        // No need: shrink-0 grow flex flex-col w-full max-w-full items-start text-base z-40
      >
        {/* Wrapper for Database View */}
        {/* width, left, padding-x will change when resizing */}
        <div className="relative min-h-10 w-full px-[96px]">
          <Database />
        </div>
      </div>
    </div>
  );
}

export default App;
