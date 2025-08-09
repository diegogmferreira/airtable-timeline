import { TimelineList } from "./components/timeline-list.js";
import { Timeline } from "./components/timeline.js";
import { TimelineProvider } from "./context/timeline-context.js";
import { timelineItems } from "./timelineItems.js";

export function App() {
  return (
    <TimelineProvider>
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <header >
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Airtable Timeline
            </h1>
            <p className="text-gray-600">
              Airtable Engineering Take Home Assignment - Turing Labs
            </p>
          </header>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <Timeline />
            </div>

            <div className="flex-shrink-0 flex items-center justify-center">
              <TimelineList
                items={timelineItems}
              />
            </div>
          </div>

          <div className="text-center text-sm text-gray-500 ">
            <p>
              Created by Diego Galvão: {" "}
              <a
                href="https://linkedin.com/in/diegogmferreira"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                LinkedIn
              </a>
            </p>
          </div>

        </div>
      </div>
    </TimelineProvider>
  );
}