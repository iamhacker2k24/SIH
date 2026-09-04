const demoUsers = [
  { id: 'u-1', name: 'Gurpreet Singh', email: 'farmer@agrilink.in', role: 'FPO', fpoName: 'Malwa Farmers Producer Co.', phone: '+91 98765 00112' },
  { id: 'u-2', name: 'Ramesh Patel', email: 'ramesh@agrilink.in', role: 'Farmer', phone: '+91 94221 55667' },
  { id: 'u-3', name: 'ITC Procurement Cell', email: 'buyer@itc.com', role: 'Buyer', companyName: 'ITC Agro Division', phone: '+91 99112 33445' },
  { id: 'u-4', name: 'APMC Admin Inspector', email: 'admin@mandi.gov.in', role: 'Admin', phone: '+91 98110 00000' }
];

const login = async (req, res) => {
  try {
    const { email, role } = req.body;
    let user = demoUsers.find(u => u.email.toLowerCase() === email?.toLowerCase());
    
    if (!user) {
      user = {
        id: `u-${Date.now()}`,
        name: email ? email.split('@')[0] : 'Krishi User',
        email: email || 'user@agrilink.in',
        role: role || 'Farmer',
        phone: '+91 98000 00000'
      };
    }

    res.json({
      success: true,
      token: `mock-jwt-token-${user.id}`,
      user
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getProfile = async (req, res) => {
  res.json({
    success: true,
    user: req.user || demoUsers[0]
  });
};

module.exports = {
  login,
  getProfile,
  demoUsers
};
