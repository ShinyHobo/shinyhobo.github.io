class Event {
    EventName: string = "";
    EventSource: string = "";
    Start: Date = new Date;
    End: Date = new Date();
  }
  
  const simulateDate = (value: number) => {
    var t = new Date();
    t.setSeconds(t.getSeconds() + value);
    return t;
  };
  
  const testData: Event[] = [
    {
        Start: simulateDate(0),
        End: simulateDate(5),
        EventName: "Full-time",
        EventSource: "Deliverable 1"
    },
    {
      Start: simulateDate(5),
      End: simulateDate(10),
      EventName: "Unscheduled",
      EventSource: "Deliverable 1"
    },
    {
      Start: simulateDate(10),
      End: simulateDate(16),
      EventName: "Part-time",
      EventSource: "Deliverable 1"
    },
    {
      Start: simulateDate(16),
      End: simulateDate(28),
      EventName: "Full-time",
      EventSource: "Deliverable 1"
    },
    {
        Start: simulateDate(0),
        End: simulateDate(5),
        EventName: "Dev specific time (full)",
        EventSource: "Deliverable 1"
    },
    {
        Start: simulateDate(5),
        End: simulateDate(10),
        EventName: "Dev specific time (unscheduled)",
        EventSource: "Deliverable 1"
    },
    {
        Start: simulateDate(10),
        End: simulateDate(28),
        EventName: "Dev specific time (full)",
        EventSource: "Deliverable 1"
    },
    {
        Start: simulateDate(10),
        End: simulateDate(15),
        EventName: "Dev specific time (part)",
        EventSource: "Deliverable 1"
    },
    {
      Start: simulateDate(0),
      End: simulateDate(10),
      EventName: "Full-time",
      EventSource: "Deliverable 3"
    },
    {
      Start: simulateDate(0),
      End: simulateDate(15),
      EventName: "Dev specific time (full)",
      EventSource: "Deliverable 3"
    },
    {
      Start: simulateDate(10),
      End: simulateDate(20),
      EventName: "Part-time",
      EventSource: "Deliverable 3"
    },
    {
        Start: simulateDate(10),
        End: simulateDate(20),
        EventName: "Dev specific time (part)",
        EventSource: "Deliverable 3"
    }
  ];
  
  export default testData;
  