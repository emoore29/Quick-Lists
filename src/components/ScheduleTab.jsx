import Schedule from "./Schedule";
import { CancelX } from "./svgs";

export default function ScheduleTab({
  isScheduleVisible,
  setIsScheduleVisible,
}) {
  function closeSchedule() {
    setIsScheduleVisible(false);
  }

  return (
    <div
      id="goals"
      className={`${
        isScheduleVisible ? "" : "hidden"
      } relative flex flex-col bg-surface dark:bg-dmSurface p-10 max-h- w-full overflow-y-auto`}
    >
      <h2 className="mb-5 text-center">Schedule</h2>{" "}
      <button
        onClick={closeSchedule}
        aria-label="Close secondary tasks"
        className="absolute top-0 right-0 m-5"
      >
        <CancelX />
      </button>
      <Schedule />
    </div>
  );
}
