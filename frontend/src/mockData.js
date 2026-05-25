const mockData = {

  // Dashboard Stats
  dashboardStats: {
    activeInvitations: 4,
    completedVisits: 120,
    pendingApproval: 2,
    expiredPasses: 6
  },

  // Active Invitations
  activeInvitations: [
    {
      id: 1,
      guestName: "Rahul Sharma",
      expectedDate: "2026-05-27",
      expectedTime: "18:30",
      status: "Pending",
      purpose: "Dinner",
      qrCode: "QR001"
    },

    {
      id: 2,
      guestName: "Aman Khan",
      expectedDate: "2026-05-28",
      expectedTime: "10:00",
      status: "Approved",
      purpose: "Meeting",
      qrCode: "QR002"
    },

    {
      id: 3,
      guestName: "Priya Singh",
      expectedDate: "2026-05-29",
      expectedTime: "15:00",
      status: "Pending",
      purpose: "Birthday",
      qrCode: "QR003"
    },

    {
      id: 4,
      guestName: "Mohit Verma",
      expectedDate: "2026-05-30",
      expectedTime: "20:00",
      status: "Approved",
      purpose: "Family Visit",
      qrCode: "QR004"
    }
  ],

  // Invitation History
  history: [
    {
      id: 101,
      guestName: "Neha Gupta",
      visitDate: "2026-05-20",
      status: "Completed",
      entryTime: "11:10",
      exitTime: "13:30"
    },

    {
      id: 102,
      guestName: "Arjun Yadav",
      visitDate: "2026-05-21",
      status: "Rejected",
      entryTime: null,
      exitTime: null
    },

    {
      id: 103,
      guestName: "Sana Ali",
      visitDate: "2026-05-22",
      status: "Completed",
      entryTime: "17:00",
      exitTime: "19:15"
    },

    {
      id: 104,
      guestName: "Rohan Kapoor",
      visitDate: "2026-05-23",
      status: "Expired",
      entryTime: null,
      exitTime: null
    }
  ]

};

export default mockData;