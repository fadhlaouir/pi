import React from "react";
import Timetable from "react-timetable-events";
import "./index.css";

function Calendar() {
  const IRM = {
    monday: [
      {
        id: 1,
        name: "Custom Event 1",
        type: "custom",
        startTime: new Date("2018-02-23T11:30:00"),
        endTime: new Date("2018-02-23T13:30:00"),
      },
    ],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
  };
  return (
    <div>
      <h1>Calendar</h1>

      <Timetable
        events={IRM}
        hoursInterval={{
          from: 8,
          to: 18,
        }}
      />
    </div>
  );
}

export default Calendar;
