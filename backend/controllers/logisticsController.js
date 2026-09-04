const { initialLogistics } = require('../utils/seedData');

let memoryLogistics = [...initialLogistics];
let bookings = [];

// GET /api/logistics
const getLogisticsOptions = async (req, res) => {
  try {
    const { type, state, district } = req.query;
    let list = memoryLogistics;

    if (type) list = list.filter(item => item.type === type);
    if (state) list = list.filter(item => item.state.toLowerCase() === state.toLowerCase());
    if (district) list = list.filter(item => item.district.toLowerCase() === district.toLowerCase());

    res.json({ success: true, count: list.length, data: list });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/logistics/book
const bookStorageOrTransport = async (req, res) => {
  try {
    const { logisticsId, lotId, requiredTonnes, durationDays, pickupAddress } = req.body;

    const facility = memoryLogistics.find(item => item.id === logisticsId);
    if (!facility) {
      return res.status(404).json({ success: false, message: 'Logistics provider or facility not found' });
    }

    const estimatedCost = facility.type === 'Transport Provider' 
      ? (facility.transportRatePerKmQuintal * Number(requiredTonnes || 10) * 10 * 50) 
      : (facility.costPerQuintalPerDay * Number(requiredTonnes || 10) * 10 * Number(durationDays || 30));

    const booking = {
      bookingId: `BK-${Date.now().toString().substr(-6)}`,
      logisticsId,
      facilityName: facility.name,
      type: facility.type,
      lotId: lotId || 'General Lot',
      requiredTonnes: Number(requiredTonnes) || 10,
      durationDays: Number(durationDays) || 30,
      pickupAddress: pickupAddress || 'Farm Gate',
      estimatedCost,
      status: 'CONFIRMED',
      createdAt: new Date().toISOString()
    };

    bookings.unshift(booking);

    res.status(201).json({
      success: true,
      message: `${facility.type} booking confirmed successfully!`,
      data: booking
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getLogisticsOptions,
  bookStorageOrTransport,
  memoryLogistics,
  bookings
};
