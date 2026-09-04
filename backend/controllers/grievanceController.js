const { initialGrievances } = require('../utils/seedData');

let memoryGrievances = [...initialGrievances];

// GET /api/grievances
const getAllGrievances = async (req, res) => {
  try {
    res.json({ success: true, count: memoryGrievances.length, data: memoryGrievances });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/grievances
const createGrievance = async (req, res) => {
  try {
    const { raisedByName, raisedByRole, category, orderId, subject, description } = req.body;

    const newTicket = {
      id: `grv-${Date.now().toString().substr(-5)}`,
      ticketId: `GRV-2026-${Math.floor(100 + Math.random() * 900)}`,
      raisedByName: raisedByName || req.user?.name || 'Farmer User',
      raisedByRole: raisedByRole || req.user?.role || 'Farmer',
      category: category || 'Quality Mismatch',
      orderId: orderId || 'N/A',
      subject: subject || 'Quality verification dispute',
      description: description || 'No description provided.',
      status: 'OPEN',
      resolutionNotes: 'Ticket assigned to Mandi Dispute Redressal Officer.',
      createdAt: new Date().toISOString()
    };

    memoryGrievances.unshift(newTicket);

    res.status(201).json({
      success: true,
      message: 'Dispute / Grievance ticket submitted successfully!',
      data: newTicket
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PUT /api/grievances/:id/status
const updateGrievanceStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, resolutionNotes } = req.body;

    const ticket = memoryGrievances.find(g => g.id === id || g.ticketId === id);
    if (!ticket) return res.status(404).json({ success: false, message: 'Grievance ticket not found' });

    if (status) ticket.status = status;
    if (resolutionNotes) ticket.resolutionNotes = resolutionNotes;

    res.json({
      success: true,
      message: `Grievance ticket ${ticket.ticketId} updated successfully`,
      data: ticket
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllGrievances,
  createGrievance,
  updateGrievanceStatus,
  memoryGrievances
};
