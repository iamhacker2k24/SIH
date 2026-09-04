const { memoryLots } = require('./lotController');
const { memoryMandiPrices } = require('./mandiController');

// Mock buyer demand catalog
const buyerDemands = [
  {
    id: 'dem-1',
    buyerCompany: 'ITC Agro Business Division',
    buyerContact: 'Deepak Verma',
    commodity: 'Wheat (Sharbati)',
    requiredGrade: 'Grade A',
    targetVolumeQuintals: 1000,
    maxPricePerQuintal: 2500,
    targetState: 'Haryana',
    verificationScore: 98,
    status: 'ACTIVE_SOURCING'
  },
  {
    id: 'dem-2',
    buyerCompany: 'Global Rice Exporters Ltd',
    buyerContact: 'Vikram Mehta',
    commodity: 'Paddy (Basmati 1121)',
    requiredGrade: 'Grade A',
    targetVolumeQuintals: 500,
    maxPricePerQuintal: 4600,
    targetState: 'Punjab',
    verificationScore: 99,
    status: 'ACTIVE_SOURCING'
  },
  {
    id: 'dem-3',
    buyerCompany: 'Shankar Cotton Mills Gujarat',
    buyerContact: 'Praful Shah',
    commodity: 'Cotton (Medium Staple)',
    requiredGrade: 'Grade A',
    targetVolumeQuintals: 300,
    maxPricePerQuintal: 7400,
    targetState: 'Gujarat',
    verificationScore: 95,
    status: 'ACTIVE_SOURCING'
  }
];

// GET /api/match
const getMatches = async (req, res) => {
  try {
    const { role } = req.query; // 'Farmer', 'FPO', 'Buyer'

    const matches = [];

    buyerDemands.forEach(demand => {
      // Find matching produce lots
      const matchingLots = memoryLots.filter(lot => 
        lot.commodity.toLowerCase().includes(demand.commodity.toLowerCase()) ||
        demand.commodity.toLowerCase().includes(lot.commodity.toLowerCase())
      );

      matchingLots.forEach(lot => {
        // Match logic calculation
        let score = 70; // Base score
        if (lot.grade === demand.requiredGrade) score += 15;
        if (lot.askingPricePerQuintal <= demand.maxPricePerQuintal) score += 10;
        if (lot.location.state === demand.targetState) score += 5;

        matches.push({
          matchId: `match-${demand.id}-${lot.id}`,
          matchScorePercent: Math.min(score, 99),
          buyerDemand: demand,
          produceLot: lot,
          priceMarginDelta: demand.maxPricePerQuintal - lot.askingPricePerQuintal,
          recommendation: score > 85 
            ? 'High Priority Match! Instant Deal Potential' 
            : 'Good Alignment - Minor negotiation recommended'
        });
      });
    });

    res.json({
      success: true,
      count: matches.length,
      buyerDemands,
      data: matches
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getMatches,
  buyerDemands
};
