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
    id: 1,
    guestName: "Rahul Sharma",
    phone: "9876543210",
    visitDate: "2026-05-25",
    purpose: "Dinner",
    status: "Completed",
  },
  {
    id: 2,
    guestName: "Aman Khan",
    phone: "9876543211",
    visitDate: "2026-05-24",
    purpose: "Meeting",
    status: "Completed",
  },
  {
    id: 3,
    guestName: "Priya Singh",
    phone: "9876543212",
    visitDate: "2026-05-23",
    purpose: "Delivery",
    status: "Rejected",
  },
  {
    id: 4,
    guestName: "Neha Gupta",
    phone: "9876543213",
    visitDate: "2026-05-22",
    purpose: "Family Visit",
    status: "Completed",
  },
],
myGuests : [
    {
      id: 1,
      guestName: "Rahul Sharma",
      phone: "9876543210",
      visitDate: "2026-05-27",
      visitTime: "18:30",
      purpose: "Dinner",
      status: "Approved",
      qrCode: "QR001",
    },

    {
      id: 2,
      guestName: "Aman Khan",
      phone: "9876543211",
      visitDate: "2026-05-28",
      visitTime: "10:00",
      purpose: "Business Meeting",
      status: "Pending",
      qrCode: "QR002",
    },

    {
      id: 3,
      guestName: "Priya Verma",
      phone: "9876543212",
      visitDate: "2026-05-25",
      visitTime: "15:00",
      purpose: "Family Visit",
      status: "Completed",
      qrCode: "QR003",
    },

    {
      id: 4,
      guestName: "Rohit Singh",
      phone: "9876543213",
      visitDate: "2026-05-20",
      visitTime: "12:00",
      purpose: "Courier Pickup",
      status: "Expired",
      qrCode: "QR004",
    },

    {
      id: 5,
      guestName: "Neha Gupta",
      phone: "9876543214",
      visitDate: "2026-05-29",
      visitTime: "19:00",
      purpose: "Birthday Party",
      status: "Approved",
      qrCode: "QR005",
    },

    {
      id: 6,
      guestName: "Arjun Mehta",
      phone: "9876543215",
      visitDate: "2026-05-30",
      visitTime: "09:30",
      purpose: "Maintenance Work",
      status: "Pending",
      qrCode: "QR006",
    },
  ],
};

export default mockData;