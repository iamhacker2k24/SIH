import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Truck, Navigation, Compass, MapPin, Phone, Calendar, Clock,
  CheckCircle2, AlertTriangle, ShieldCheck, Download, Printer,
  Thermometer, Warehouse, ChevronRight, ArrowRight, DollarSign,
  Activity, FileText, Share2, Gauge, RefreshCw, Plus, X, Search,
  Check, Info, User
} from 'lucide-react';
import { api } from '../services/api';
import { useLanguage } from '../context/LanguageContext';

export default function LogisticsStorage({ currentUser, selectedState }) {
  const { t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();

  // Active Tab: 'transport' | 'tracking' | 'fleet' | 'storage'
  const tabParam = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState(tabParam || 'transport');

  useEffect(() => {
    if (tabParam && ['transport', 'tracking', 'fleet', 'storage'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  const handleTabSwitch = (tabKey) => {
    setActiveTab(tabKey);
    setSearchParams({ tab: tabKey });
  };

  // ----------------------------------------------------
  // 1. VEHICLE CATALOG FOR BOOKING
  // ----------------------------------------------------
  const availableVehicles = [
    {
      id: 'veh-tata-ace',
      name: 'Tata Ace Gold ("Chota Hathi")',
      category: 'Mini Truck',
      capacity: '1.2 Tonnes (12 Qtl / 35-40 Crates)',
      dimensions: '7.2 ft × 4.9 ft Open Tray',
      baseFare: 450,
      perKmRate: 18,
      suitableFor: 'Fresh vegetables, fruits, local APMC Mandi delivery (within 60 km). Agile in narrow lanes.',
      badge: 'POPULAR FOR VEGETABLES',
      availableCount: 14,
      avgEtaMin: 15
    },
    {
      id: 'veh-bolero-pickup',
      name: 'Mahindra Bolero Maxi Truck Plus',
      category: 'Agri Pickup',
      capacity: '2.5 Tonnes (25 Qtl / 60 Bags)',
      dimensions: '8.5 ft × 5.5 ft Heavy Deck',
      baseFare: 650,
      perKmRate: 23,
      suitableFor: 'Wheat, paddy, onion sacks, spices. High ground clearance for rural farm gates.',
      badge: 'BEST FOR GRAIN BAGS',
      availableCount: 9,
      avgEtaMin: 20
    },
    {
      id: 'veh-tractor-trolley',
      name: 'Farm Tractor Trolley Hauler',
      category: 'Tractor Hauler',
      capacity: '5.0 Tonnes (50 Qtl)',
      dimensions: '11 ft × 6 ft Hydraulic Tipping',
      baseFare: 500,
      perKmRate: 20,
      suitableFor: 'Sugarcane, raw paddy, fodder. Ideal for field pickups & local sugar mill transit.',
      badge: 'HEAVY FARM-GATE HAUL',
      availableCount: 6,
      avgEtaMin: 25
    },
    {
      id: 'veh-cargo-car',
      name: 'Agri Express Cargo Van / Car',
      category: 'Express Van',
      capacity: '800 kg (8 Qtl / 25 Crates)',
      dimensions: 'Enclosed Weather-Proof Bay',
      baseFare: 350,
      perKmRate: 15,
      suitableFor: 'High-value mushrooms, organic strawberries, herbs, flowers & urgent direct-to-buyer runs.',
      badge: 'WEATHERPROOF EXPRESS',
      availableCount: 11,
      avgEtaMin: 12
    },
    {
      id: 'veh-eicher-17ft',
      name: 'Eicher Pro 2090 (17ft Heavy Freight)',
      category: 'Heavy Freight',
      capacity: '9.0 Tonnes (90 Qtl / 200 Bags)',
      dimensions: '17.5 ft Covered Container Bed',
      baseFare: 1200,
      perKmRate: 32,
      suitableFor: 'Inter-district & interstate mandi freight (e.g. Nashik to Delhi, Abohar to Jaipur).',
      badge: 'INTERSTATE LONG-HAUL',
      availableCount: 5,
      avgEtaMin: 35
    },
    {
      id: 'veh-reefer-van',
      name: 'Reefer Cold Chain Refrigerated Van',
      category: 'Refrigerated Chiller',
      capacity: '4.0 Tonnes (40 Qtl)',
      dimensions: 'Insulated Chiller (2°C to 8°C)',
      baseFare: 1400,
      perKmRate: 36,
      suitableFor: 'Dairy, table grapes, exotic berries, flowers. Active cooling with zero transit spoilage.',
      badge: 'ACTIVE COLD CHAIN CHILLER',
      availableCount: 3,
      avgEtaMin: 30
    }
  ];

  // ----------------------------------------------------
  // 2. LIVE GPS TRACKED SHIPMENTS DATASET
  // ----------------------------------------------------
  const [trackedShipments, setTrackedShipments] = useState([
    {
      id: 'TRK-8821',
      vehicleName: 'Tata Ace Gold (Chota Hathi)',
      plateNumber: 'PB-10-CZ-4921',
      driverName: 'Joginder Singh',
      driverPhone: '+91 98765 43210',
      driverRating: 4.9,
      tripsCompleted: 184,
      farmerName: currentUser?.name || 'Ramesh Patel',
      commodity: 'Nashik Red Onions',
      quantity: '1.2 Tonnes (30 Bags)',
      origin: 'Khanna Farm Gate, Ludhiana (Punjab)',
      destination: 'Azadpur APMC Mandi, Shed #4 (Delhi)',
      status: 'IN_TRANSIT',
      progressPercent: 68,
      currentSpeedKmH: 54,
      distanceCoveredKm: 82,
      distanceRemainingKm: 38,
      etaMins: 38,
      etaTime: '10:15 AM',
      cargoTemp: '24°C (Normal)',
      gateOtp: '8821',
      lastLocation: 'NH-44 Highway near Karnal Toll Plaza',
      waypoints: [
        { time: '06:30 AM', title: 'Produce Loaded at Khanna Farm Gate', done: true },
        { time: '07:15 AM', title: 'Weighbridge Recorded: 12.4 Quintals Net', done: true },
        { time: '08:45 AM', title: 'Cruising on NH-44 Highway near Karnal', done: true, current: true },
        { time: '09:45 AM', title: 'Azadpur Mandi Commercial Gate Pass Verification', done: false },
        { time: '10:15 AM', title: 'Final Commission Agent Shed #4 Delivery & Payment Release', done: false }
      ]
    },
    {
      id: 'TRK-9043',
      vehicleName: 'Mahindra Bolero Maxi Truck',
      plateNumber: 'GJ-03-BW-1192',
      driverName: 'Kishore Patel',
      driverPhone: '+91 98123 45678',
      driverRating: 4.8,
      tripsCompleted: 92,
      farmerName: 'Gurpreet Singh (FPO)',
      commodity: 'Sharbati Wheat (Grade-A)',
      quantity: '2.5 Tonnes (50 Bags)',
      origin: 'Rajkot Rural Depot (Gujarat)',
      destination: 'Gondal APMC Mandi, Yard B',
      status: 'APPROACHING_MANDI',
      progressPercent: 94,
      currentSpeedKmH: 32,
      distanceCoveredKm: 36,
      distanceRemainingKm: 2.5,
      etaMins: 8,
      etaTime: '09:25 AM',
      cargoTemp: 'Ambient (28°C)',
      gateOtp: '4491',
      lastLocation: 'Gondal Bypass Road (2.5 km to APMC Yard)',
      waypoints: [
        { time: '07:00 AM', title: 'Loaded at Rajkot Farmers Cooperative Depot', done: true },
        { time: '08:15 AM', title: 'Quality Sample Inspected & Verified', done: true },
        { time: '09:10 AM', title: 'Passing Gondal Ring Road Bypass', done: true },
        { time: '09:25 AM', title: 'Approaching APMC Security Ingate (ETA: 8 mins)', done: true, current: true },
        { time: '09:40 AM', title: 'Unloading at Trader Warehouse', done: false }
      ]
    },
    {
      id: 'TRK-7120',
      vehicleName: 'Reefer Cold Chain Refrigerated Van',
      plateNumber: 'MH-12-RF-3390',
      driverName: 'Satish Shinde',
      driverPhone: '+91 99001 22334',
      driverRating: 5.0,
      tripsCompleted: 64,
      farmerName: 'Sahyadri Organic Farmers Collective',
      commodity: 'Fresh Table Strawberries & Blueberries',
      quantity: '3.8 Tonnes (320 Chilled Crates)',
      origin: 'Mahabaleshwar Cold Hub (Maharashtra)',
      destination: 'Vashi Navi Mumbai Wholesale Fruit Market',
      status: 'IN_TRANSIT',
      progressPercent: 42,
      currentSpeedKmH: 62,
      distanceCoveredKm: 58,
      distanceRemainingKm: 78,
      etaMins: 75,
      etaTime: '11:45 AM',
      cargoTemp: '3.8°C (Ideal Chilled Active Chiller)',
      gateOtp: '7120',
      lastLocation: 'Mumbai-Pune Expressway near Khandala Pass',
      waypoints: [
        { time: '05:30 AM', title: 'Pre-cooled Strawberries Loaded in Chiller Container', done: true },
        { time: '06:45 AM', title: 'IoT Cold Chain Temperature Logger Sealed at 3.8°C', done: true },
        { time: '08:10 AM', title: 'Transit through Expressway Ghat Section', done: true, current: true },
        { time: '10:30 AM', title: 'Arrival at Vashi Cold Logistics Terminal', done: false },
        { time: '11:45 AM', title: 'Delivery to Institutional Supermarket Distributor', done: false }
      ]
    }
  ]);

  const [selectedTrackingShipment, setSelectedTrackingShipment] = useState(trackedShipments[0]);

  // ----------------------------------------------------
  // 3. BOOKING FORM STATE
  // ----------------------------------------------------
  const [selectedVehicle, setSelectedVehicle] = useState(availableVehicles[0]);
  const [pickupLocation, setPickupLocation] = useState('Khanna Village Farm Gate, Ludhiana');
  const [dropMandi, setDropMandi] = useState('Azadpur APMC Mandi, Delhi');
  const [cargoCrop, setCargoCrop] = useState('Wheat (Grain)');
  const [cargoWeightQuintals, setCargoWeightQuintals] = useState(15);
  const [pickupDate, setPickupDate] = useState(new Date().toISOString().split('T')[0]);
  const [pickupTimeSlot, setPickupTimeSlot] = useState('Morning (06:00 - 09:00)');
  const [farmerPhone, setFarmerPhone] = useState('+91 98765 43210');
  const [estimatedDistanceKm, setEstimatedDistanceKm] = useState(45);
  const [specialInstructions, setSpecialInstructions] = useState('Please bring tarpaulin cover in case of rain.');
  const [bookingConfirmedModal, setBookingConfirmedModal] = useState(null);

  // Calculate estimated freight fare
  const estimatedFare = selectedVehicle
    ? selectedVehicle.baseFare + (estimatedDistanceKm * selectedVehicle.perKmRate)
    : 0;

  const handleConfirmTransportBooking = (e) => {
    e.preventDefault();
    if (!pickupLocation || !dropMandi) return;

    const newBookingId = `TRK-${Math.floor(1000 + Math.random() * 9000)}`;
    const newShipment = {
      id: newBookingId,
      vehicleName: selectedVehicle.name,
      plateNumber: `${selectedState ? selectedState.substring(0, 2).toUpperCase() : 'PB'}-${Math.floor(10 + Math.random() * 89)}-AZ-${Math.floor(1000 + Math.random() * 9000)}`,
      driverName: 'Sukhdev Singh',
      driverPhone: '+91 98444 33221',
      driverRating: 4.9,
      tripsCompleted: 112,
      farmerName: currentUser?.name || 'Ramesh Patel',
      commodity: `${cargoCrop} (${cargoWeightQuintals} Quintals)`,
      quantity: `${(cargoWeightQuintals / 10).toFixed(1)} Tonnes (${cargoWeightQuintals} Qtl)`,
      origin: pickupLocation,
      destination: dropMandi,
      status: 'SCHEDULED',
      progressPercent: 5,
      currentSpeedKmH: 0,
      distanceCoveredKm: 0,
      distanceRemainingKm: estimatedDistanceKm,
      etaMins: 15,
      etaTime: 'Driver Dispatched to Farm',
      cargoTemp: 'Normal',
      gateOtp: String(Math.floor(1000 + Math.random() * 9000)),
      lastLocation: 'Driver Assigned • En route to Farm Gate for Loading',
      fareTotal: estimatedFare,
      waypoints: [
        { time: 'Just Now', title: 'Booking Confirmed & Driver Assigned', done: true, current: true },
        { time: 'In 15 Mins', title: 'Driver Arrival at Farm Gate for Loading', done: false },
        { time: 'Scheduled', title: `Transit to ${dropMandi} (${estimatedDistanceKm} km)`, done: false },
        { time: 'Scheduled', title: 'APMC Gate Arrival & Weighment', done: false },
        { time: 'Scheduled', title: 'Final Delivery & Unloading', done: false }
      ]
    };

    setTrackedShipments(prev => [newShipment, ...prev]);
    setSelectedTrackingShipment(newShipment);
    setBookingConfirmedModal(newShipment);
  };

  // ----------------------------------------------------
  // 4. PRINT / DOWNLOAD BILTY MODAL
  // ----------------------------------------------------
  const handlePrintBilty = (shipment) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Agri-Logistics Consignment Bilty / Lorry Receipt</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 25px; color: #111; line-height: 1.4; }
            .header { border-bottom: 2px solid #059669; padding-bottom: 10px; margin-bottom: 15px; display: flex; justify-content: space-between; }
            .header h1 { color: #059669; margin: 0; font-size: 22px; }
            .bilty-number { font-size: 16px; font-weight: bold; color: #dc2626; }
            table { width: 100%; border-collapse: collapse; margin-top: 15px; }
            th, td { border: 1px solid #ccc; padding: 8px 12px; font-size: 12px; text-align: left; }
            th { background-color: #f3f4f6; }
            .otp-box { margin: 20px 0; border: 2px dashed #059669; padding: 12px; border-radius: 6px; background: #ecfdf5; }
            .footer { margin-top: 35px; border-top: 1px solid #ddd; padding-top: 10px; font-size: 11px; text-align: center; color: #666; }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <h1>🌾 KrishiLink Agri-Logistics Freight Bilty</h1>
              <div>Official APMC Farm-to-Mandi Transport Consignment Note</div>
            </div>
            <div style="text-align: right;">
              <div class="bilty-number">BILTY NO: ${shipment.id}</div>
              <div>Date: ${new Date().toLocaleDateString('en-IN')}</div>
            </div>
          </div>

          <table>
            <tr>
              <th width="25%">Consignor (Farmer / FPO)</th>
              <td width="25%"><strong>${shipment.farmerName}</strong></td>
              <th width="25%">Consignee (Mandi / Buyer)</th>
              <td width="25%"><strong>${shipment.destination}</strong></td>
            </tr>
            <tr>
              <th>Pickup Location</th>
              <td>${shipment.origin}</td>
              <th>Vehicle Plate & Type</th>
              <td><strong>${shipment.plateNumber}</strong> (${shipment.vehicleName})</td>
            </tr>
            <tr>
              <th>Designated Driver</th>
              <td>${shipment.driverName} (${shipment.driverPhone})</td>
              <th>Commodity / Weight</th>
              <td><strong>${shipment.commodity}</strong> - ${shipment.quantity}</td>
            </tr>
            <tr>
              <th>Status</th>
              <td><strong>${shipment.status}</strong></td>
              <th>Security Gate Pass OTP</th>
              <td><strong style="color:#059669; font-size:16px;">${shipment.gateOtp}</strong></td>
            </tr>
          </table>

          <div class="otp-box">
            <strong>⚠️ MANDI GATE DELIVERY PROTOCOL:</strong><br/>
            Present this Bilty along with Security OTP (<strong>${shipment.gateOtp}</strong>) to the APMC Ingate Officer.
            Driver is authorized for direct entry into the Mandi Unloading Bay without demurrage delays.
          </div>

          <div class="footer">
            Generated via KrishiLink Central Transport & Logistics Command Hub • All rights reserved.
          </div>

          <script>
            window.onload = function() { window.print(); }
          </script>
        </body>
      </html>
    `;

    printWindow.document.write(html);
    printWindow.document.close();
  };

  // ----------------------------------------------------
  // 5. EXISTING WDRA COLD STORAGE & WAREHOUSE LOGIC
  // ----------------------------------------------------
  const [facilities, setFacilities] = useState([]);
  const [loadingStorage, setLoadingStorage] = useState(true);
  const [filterStorageType, setFilterStorageType] = useState('');
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [isLocating, setIsLocating] = useState(false);
  const [selectedMapTarget, setSelectedMapTarget] = useState(null);
  const [requiredTonnes, setRequiredTonnes] = useState(25);
  const [durationDays, setDurationDays] = useState(30);

  const facilityCoords = {
    'log-1': { lat: 30.9010, lng: 75.8573, address: 'GT Road, Khanna, Ludhiana, Punjab 141401' },
    'log-2': { lat: 29.6857, lng: 76.9905, address: 'Industrial Area, Karnal, Haryana 132001' },
    'log-3': { lat: 22.3039, lng: 70.8022, address: 'GIDC Phase-2, Rajkot, Gujarat 360003' }
  };

  useEffect(() => {
    fetchFacilities();
  }, [filterStorageType]);

  const calculateHaversineDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c * 10) / 10;
  };

  const fetchFacilities = async () => {
    setLoadingStorage(true);
    try {
      const res = await api.getLogistics({ type: filterStorageType });
      if (res.success) {
        const enriched = res.data.map(item => {
          const coords = facilityCoords[item.id] || { lat: 28.6139, lng: 77.2090, address: `${item.district}, ${item.state}` };
          return { ...item, ...coords, distanceKm: 12.4 };
        });
        setFacilities(enriched);
        if (enriched.length > 0 && !selectedMapTarget) {
          setSelectedMapTarget(enriched[0]);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingStorage(false);
    }
  };

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;
        setUserLocation({ lat: userLat, lng: userLng });

        const updated = facilities.map(fac => {
          const dist = calculateHaversineDistance(userLat, userLng, fac.lat, fac.lng);
          return { ...fac, distanceKm: dist };
        }).sort((a, b) => a.distanceKm - b.distanceKm);

        setFacilities(updated);
        if (updated.length > 0) setSelectedMapTarget(updated[0]);
        setIsLocating(false);
      },
      (error) => {
        console.error(error);
        alert('Unable to access GPS location. Showing standard facility distances.');
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleBookStorage = async (e) => {
    e.preventDefault();
    if (!selectedFacility) return;
    try {
      const res = await api.bookLogistics({
        logisticsId: selectedFacility.id,
        requiredTonnes,
        durationDays
      }, currentUser);

      if (res.success) {
        setBookingSuccess(res.data || { bookingId: 'LOG-BOOK-9912', status: 'CONFIRMED' });
        setTimeout(() => {
          setSelectedFacility(null);
          setBookingSuccess(null);
        }, 2500);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Top Header Banner */}
      <div className="glass-card responsive-header-banner" style={{
        background: 'linear-gradient(135deg, #071f15 0%, #0c2b20 100%)',
        border: '1px solid var(--border-glow)'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
            <span className="badge badge-green" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Truck size={14} /> {t('nav_logistics', 'Transport & Logistics')}
            </span>
            <span className="badge badge-blue">
              APMC Mandi Freight Network
            </span>
          </div>
          <h1 style={{ fontSize: '1.75rem', color: '#fff', fontWeight: 800, marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Truck color="var(--primary)" size={28} /> {t('logistics_title', 'Transportation, Live GPS Tracking & Logistics Hub')}
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', maxWidth: '750px' }}>
            {t('logistics_sub', 'Book commercial vehicles, mini trucks & tractors for Mandi transit, track active dispatches with live GPS, and reserve WDRA cold storage.')}
          </p>
        </div>

        {/* Action button in header */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button
            className="btn btn-primary"
            onClick={() => handleTabSwitch('transport')}
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <Plus size={16} /> Book Transport Now
          </button>
          <button
            className="btn btn-outline"
            onClick={() => handleTabSwitch('tracking')}
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <Navigation size={16} /> Track Shipment
          </button>
        </div>
      </div>

      {/* 4 Interactive Feature Navigation Tabs */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        overflowX: 'auto',
        borderBottom: '1px solid var(--border-color)',
        paddingBottom: '0.5rem'
      }}>
        <button
          onClick={() => handleTabSwitch('transport')}
          className={`btn ${activeTab === 'transport' ? 'btn-primary' : 'btn-outline'}`}
          style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', whiteSpace: 'nowrap', borderRadius: 'var(--radius-sm)' }}
        >
          <Truck size={16} /> {t('tab_book_vehicle', '🚚 Book Vehicle & Freight')}
        </button>

        <button
          onClick={() => handleTabSwitch('tracking')}
          className={`btn ${activeTab === 'tracking' ? 'btn-primary' : 'btn-outline'}`}
          style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', whiteSpace: 'nowrap', borderRadius: 'var(--radius-sm)' }}
        >
          <Navigation size={16} /> {t('tab_live_tracking', '📍 Live GPS Fleet Tracking')}
          <span className="badge badge-green" style={{ fontSize: '0.7rem', padding: '0.1rem 0.4rem' }}>LIVE 🟢</span>
        </button>

        <button
          onClick={() => handleTabSwitch('fleet')}
          className={`btn ${activeTab === 'fleet' ? 'btn-primary' : 'btn-outline'}`}
          style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', whiteSpace: 'nowrap', borderRadius: 'var(--radius-sm)' }}
        >
          <FileText size={16} /> {t('tab_fleet_management', '📋 My Dispatches')}
          <span className="badge badge-blue" style={{ fontSize: '0.7rem', padding: '0.1rem 0.4rem' }}>{trackedShipments.length}</span>
        </button>

        <button
          onClick={() => handleTabSwitch('storage')}
          className={`btn ${activeTab === 'storage' ? 'btn-primary' : 'btn-outline'}`}
          style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', whiteSpace: 'nowrap', borderRadius: 'var(--radius-sm)' }}
        >
          <Warehouse size={16} /> {t('tab_cold_storage', '🏢 Cold Storage & Warehouses')}
        </button>
      </div>

      {/* ========================================================= */}
      {/* TAB 1: BOOK TRANSPORT & COMMERCIAL VEHICLE               */}
      {/* ========================================================= */}
      {activeTab === 'transport' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', color: '#fff', fontWeight: 700, marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Truck size={20} color="var(--primary)" /> 1. Select Vehicle for Farm-to-Mandi Transit
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              Choose from verified APMC commercial haulers with transparent per-kilometer rates and instant driver dispatch.
            </p>
          </div>

          {/* Vehicle Selection Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1rem' }}>
            {availableVehicles.map(vehicle => {
              const isSelected = selectedVehicle?.id === vehicle.id;
              return (
                <div
                  key={vehicle.id}
                  className="glass-card"
                  onClick={() => setSelectedVehicle(vehicle)}
                  style={{
                    cursor: 'pointer',
                    borderColor: isSelected ? 'var(--primary)' : 'var(--border-color)',
                    background: isSelected ? 'rgba(16, 185, 129, 0.1)' : 'var(--bg-card)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative',
                    transition: 'all 0.2s ease',
                    boxShadow: isSelected ? '0 0 15px rgba(16, 185, 129, 0.25)' : 'none'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                      <span className="badge badge-green" style={{ fontSize: '0.7rem' }}>{vehicle.badge}</span>
                      <span className="badge badge-blue" style={{ fontSize: '0.7rem' }}>📍 {vehicle.availableCount} Available</span>
                    </div>

                    <h3 style={{ fontSize: '1.1rem', color: '#fff', fontWeight: 700, marginBottom: '0.25rem' }}>
                      {vehicle.name}
                    </h3>
                    <div style={{ fontSize: '0.8rem', color: 'var(--accent-gold)', fontWeight: 600, marginBottom: '0.5rem' }}>
                      {vehicle.category} • Capacity: {vehicle.capacity}
                    </div>

                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.85rem', lineHeight: 1.4 }}>
                      {vehicle.suitableFor}
                    </p>

                    <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)', marginBottom: '0.85rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Estimated Rate</span>
                        <span style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--primary)' }}>
                          ₹{vehicle.baseFare} <span style={{ fontSize: '0.75rem', fontWeight: 400, color: 'var(--text-muted)' }}>base +</span> ₹{vehicle.perKmRate}/km
                        </span>
                      </div>
                      <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                        Dimensions: {vehicle.dimensions}
                      </div>
                    </div>
                  </div>

                  <button
                    className={`btn ${isSelected ? 'btn-primary' : 'btn-outline'}`}
                    style={{ width: '100%', fontSize: '0.85rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.3rem' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedVehicle(vehicle);
                    }}
                  >
                    {isSelected ? <><Check size={16} /> Selected for Booking</> : 'Select Vehicle'}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Interactive Booking & Cost Estimator Form */}
          <div className="glass-card" style={{
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(6, 78, 59, 0.05) 100%)',
            border: '1px solid var(--border-glow)',
            marginTop: '0.5rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', color: '#fff', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Calendar size={20} color="var(--primary)" /> 2. Schedule Pickup & Confirm Booking
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.825rem' }}>
                  Selected Vehicle: <strong style={{ color: 'var(--primary)' }}>{selectedVehicle?.name}</strong> (Capacity: {selectedVehicle?.capacity})
                </p>
              </div>

              {/* Instant Fare Badge */}
              <div style={{
                background: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid var(--primary)',
                padding: '0.65rem 1.25rem',
                borderRadius: 'var(--radius-md)',
                textAlign: 'right'
              }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Estimated Trip Fare ({estimatedDistanceKm} km)</div>
                <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--accent-gold)' }}>
                  ₹{estimatedFare.toLocaleString('en-IN')}
                </div>
              </div>
            </div>

            <form onSubmit={handleConfirmTransportBooking}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
                <div>
                  <label className="form-label" style={{ fontSize: '0.85rem' }}>
                    <MapPin size={14} color="var(--primary)" style={{ display: 'inline', marginRight: '4px' }} />
                    Pickup Location (Farm Gate / Village)
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    required
                    placeholder="e.g. Khanna Farm Gate, Ludhiana"
                  />
                </div>

                <div>
                  <label className="form-label" style={{ fontSize: '0.85rem' }}>
                    <Warehouse size={14} color="var(--primary)" style={{ display: 'inline', marginRight: '4px' }} />
                    Destination APMC Mandi / Buyer Depot
                  </label>
                  <select
                    className="form-select"
                    value={dropMandi}
                    onChange={(e) => setDropMandi(e.target.value)}
                    required
                  >
                    <option value="Azadpur APMC Mandi, Delhi">Azadpur APMC Mandi, Delhi</option>
                    <option value="Khanna APMC Grain Market, Punjab">Khanna APMC Grain Market, Punjab</option>
                    <option value="Vashi APMC Agricultural Market, Navi Mumbai">Vashi APMC Agricultural Market, Navi Mumbai</option>
                    <option value="Gondal APMC Yard, Gujarat">Gondal APMC Yard, Gujarat</option>
                    <option value="Nashik APMC Onion Market, Maharashtra">Nashik APMC Onion Market, Maharashtra</option>
                    <option value="Karnal APMC Depot, Haryana">Karnal APMC Depot, Haryana</option>
                  </select>
                </div>

                <div>
                  <label className="form-label" style={{ fontSize: '0.85rem' }}>Cargo Commodity</label>
                  <input
                    type="text"
                    className="form-input"
                    value={cargoCrop}
                    onChange={(e) => setCargoCrop(e.target.value)}
                    required
                    placeholder="e.g. Wheat, Potato, Onion, Rice"
                  />
                </div>

                <div>
                  <label className="form-label" style={{ fontSize: '0.85rem' }}>Weight (Quintals)</label>
                  <input
                    type="number"
                    className="form-input"
                    value={cargoWeightQuintals}
                    onChange={(e) => setCargoWeightQuintals(Number(e.target.value))}
                    min={1}
                    required
                  />
                </div>

                <div>
                  <label className="form-label" style={{ fontSize: '0.85rem' }}>Estimated Transit Distance (km)</label>
                  <input
                    type="number"
                    className="form-input"
                    value={estimatedDistanceKm}
                    onChange={(e) => setEstimatedDistanceKm(Number(e.target.value))}
                    min={1}
                    required
                  />
                </div>

                <div>
                  <label className="form-label" style={{ fontSize: '0.85rem' }}>Pickup Date</label>
                  <input
                    type="date"
                    className="form-input"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="form-label" style={{ fontSize: '0.85rem' }}>Preferred Time Slot</label>
                  <select
                    className="form-select"
                    value={pickupTimeSlot}
                    onChange={(e) => setPickupTimeSlot(e.target.value)}
                  >
                    <option value="Early Morning (05:00 - 08:00)">Early Morning (05:00 - 08:00) - For Morning Mandi Auction</option>
                    <option value="Morning (08:00 - 11:00)">Morning (08:00 - 11:00)</option>
                    <option value="Afternoon (12:00 - 15:00)">Afternoon (12:00 - 15:00)</option>
                    <option value="Evening (16:00 - 19:00)">Evening (16:00 - 19:00)</option>
                  </select>
                </div>

                <div>
                  <label className="form-label" style={{ fontSize: '0.85rem' }}>Contact Phone</label>
                  <input
                    type="text"
                    className="form-input"
                    value={farmerPhone}
                    onChange={(e) => setFarmerPhone(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label className="form-label" style={{ fontSize: '0.85rem' }}>Special Driver Instructions (Optional)</label>
                <input
                  type="text"
                  className="form-input"
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  placeholder="e.g. Bring tarpaulin, driver assistance needed for loading crates"
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', alignItems: 'center' }}>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{
                    padding: '0.75rem 2rem',
                    fontSize: '1rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                  }}
                >
                  <Truck size={18} /> Confirm Transport & Dispatch Driver
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 2: LIVE GPS FLEET TRACKING                           */}
      {/* ========================================================= */}
      {activeTab === 'tracking' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Shipment Switcher */}
          <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Navigation size={22} color="var(--primary)" />
              <div>
                <h3 style={{ fontSize: '1.15rem', color: '#fff', fontWeight: 700 }}>Live Fleet GPS Telemetry</h3>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Real-time satellite coordinates, vehicle speed, and Mandi ETA</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Select Consignment:</span>
              <select
                className="form-select"
                style={{ minWidth: '220px', padding: '0.4rem 0.75rem' }}
                value={selectedTrackingShipment.id}
                onChange={(e) => {
                  const found = trackedShipments.find(s => s.id === e.target.value);
                  if (found) setSelectedTrackingShipment(found);
                }}
              >
                {trackedShipments.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.id} - {s.commodity} ({s.status})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Main Tracking Showcase Grid */}
          <div className="grid-2" style={{ gridTemplateColumns: '1.2fr 0.8fr', alignItems: 'start' }}>
            {/* Left Column: Real-time Telemetry & Route Progress */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="glass-card" style={{ border: '2px solid var(--primary)' }}>
                {/* Status Bar */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span className="badge badge-green" style={{ fontSize: '0.8rem', padding: '0.25rem 0.65rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', display: 'inline-block', boxShadow: '0 0 8px #10b981' }}></span>
                      GPS SIGNAL ACTIVE • {selectedTrackingShipment.status}
                    </span>
                    <span className="badge badge-blue">ID: {selectedTrackingShipment.id}</span>
                  </div>

                  <div style={{ fontSize: '0.85rem', color: 'var(--accent-gold)', fontWeight: 700 }}>
                    Gate Pass OTP: <span style={{ fontSize: '1.05rem', color: '#fff', background: 'rgba(245, 158, 11, 0.2)', padding: '0.15rem 0.5rem', borderRadius: '4px' }}>{selectedTrackingShipment.gateOtp}</span>
                  </div>
                </div>

                {/* Vehicle & Commodity Header */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <h2 style={{ fontSize: '1.35rem', color: '#fff', fontWeight: 800, marginBottom: '0.25rem' }}>
                    {selectedTrackingShipment.vehicleName}
                  </h2>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                    Plate Number: <strong style={{ color: 'var(--primary)' }}>{selectedTrackingShipment.plateNumber}</strong> • Cargo: <strong>{selectedTrackingShipment.commodity}</strong> ({selectedTrackingShipment.quantity})
                  </div>
                </div>

                {/* Telemetry Metrics 4-Pack */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', marginBottom: '1.25rem' }}>
                  <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>Current Speed</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--primary)' }}>
                      {selectedTrackingShipment.currentSpeedKmH} <span style={{ fontSize: '0.7rem', fontWeight: 400 }}>km/h</span>
                    </div>
                  </div>

                  <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>Remaining</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff' }}>
                      {selectedTrackingShipment.distanceRemainingKm} <span style={{ fontSize: '0.7rem', fontWeight: 400 }}>km</span>
                    </div>
                  </div>

                  <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>ETA to Mandi</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent-gold)' }}>
                      {selectedTrackingShipment.etaMins} <span style={{ fontSize: '0.7rem', fontWeight: 400 }}>mins</span>
                    </div>
                  </div>

                  <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>Cargo Condition</div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#38bdf8' }}>
                      {selectedTrackingShipment.cargoTemp}
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                    <span>Origin: {selectedTrackingShipment.origin.split(',')[0]}</span>
                    <span style={{ fontWeight: 700, color: 'var(--primary)' }}>{selectedTrackingShipment.progressPercent}% Transit Completed</span>
                    <span>Destination: {selectedTrackingShipment.destination.split(',')[0]}</span>
                  </div>
                  <div style={{ width: '100%', height: '10px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '5px', overflow: 'hidden' }}>
                    <div style={{
                      width: `${selectedTrackingShipment.progressPercent}%`,
                      height: '100%',
                      background: 'linear-gradient(90deg, #10b981 0%, #3b82f6 100%)',
                      transition: 'width 0.5s ease'
                    }}></div>
                  </div>
                  <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
                    📍 Last Reported GPS Location: <strong style={{ color: '#fff' }}>{selectedTrackingShipment.lastLocation}</strong>
                  </div>
                </div>

                {/* Waypoint Timeline */}
                <div>
                  <h4 style={{ fontSize: '0.9rem', color: '#fff', fontWeight: 700, marginBottom: '0.75rem' }}>
                    Transit Checkpoints & Milestones
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                    {selectedTrackingShipment.waypoints.map((wp, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                        <div style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          background: wp.done ? '#10b981' : 'rgba(255, 255, 255, 0.1)',
                          color: wp.done ? '#fff' : 'var(--text-muted)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          flexShrink: 0
                        }}>
                          {wp.done ? '✓' : idx + 1}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '0.85rem', fontWeight: wp.current ? 700 : 500, color: wp.current ? 'var(--primary)' : wp.done ? '#fff' : 'var(--text-muted)' }}>
                            {wp.title}
                          </div>
                          <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>{wp.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Driver Card, Direct Actions & Google Maps Link */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* Driver Details Card */}
              <div className="glass-card">
                <h3 style={{ fontSize: '1.1rem', color: '#fff', fontWeight: 700, marginBottom: '0.85rem' }}>
                  Assigned Driver & Hauler Profile
                </h3>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1rem' }}>
                  <div style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontWeight: 800,
                    fontSize: '1.25rem'
                  }}>
                    {selectedTrackingShipment.driverName.charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff' }}>
                      {selectedTrackingShipment.driverName}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      APMC Verified Commercial Driver • <strong style={{ color: 'var(--accent-gold)' }}>★ {selectedTrackingShipment.driverRating}</strong> ({selectedTrackingShipment.tripsCompleted} trips)
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Driver Phone:</span>
                    <strong style={{ color: '#fff' }}>{selectedTrackingShipment.driverPhone}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Vehicle Reg:</span>
                    <strong style={{ color: 'var(--primary)' }}>{selectedTrackingShipment.plateNumber}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Consignor (Farmer):</span>
                    <strong style={{ color: '#fff' }}>{selectedTrackingShipment.farmerName}</strong>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <a
                    href={`tel:${selectedTrackingShipment.driverPhone}`}
                    className="btn btn-primary"
                    style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.4rem', textDecoration: 'none' }}
                  >
                    <Phone size={16} /> Call Driver Now
                  </a>

                  <button
                    className="btn btn-outline"
                    onClick={() => handlePrintBilty(selectedTrackingShipment)}
                    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.4rem' }}
                  >
                    <Printer size={16} /> Print / Download Freight Bilty
                  </button>
                </div>
              </div>

              {/* Mandi Direct Gate Entry Advice */}
              <div className="glass-card" style={{
                background: 'rgba(59, 130, 246, 0.08)',
                border: '1px solid rgba(59, 130, 246, 0.3)'
              }}>
                <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#38bdf8', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <ShieldCheck size={16} /> Fast-Track Mandi Ingate Clearance
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.4, margin: 0 }}>
                  This vehicle is registered under KrishiLink Direct Mandi Integration. When the driver arrives at {selectedTrackingShipment.destination.split(',')[0]}, sharing Security Gate Pass OTP (<strong>{selectedTrackingShipment.gateOtp}</strong>) guarantees immediate barrier entry without weighing queue delays.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 3: MY DISPATCHES & LOGISTICS MANAGEMENT             */}
      {/* ========================================================= */}
      {activeTab === 'fleet' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div>
              <h2 style={{ fontSize: '1.25rem', color: '#fff', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <FileText size={20} color="var(--primary)" /> My Consignments & Logistics Management
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                Manage all booked vehicles, view live status, print APMC delivery Bilty receipts, and coordinate delivery.
              </p>
            </div>

            <button
              className="btn btn-primary"
              onClick={() => handleTabSwitch('transport')}
              style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}
            >
              <Plus size={16} /> Book New Vehicle
            </button>
          </div>

          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>Consignment ID</th>
                  <th>Vehicle & Driver</th>
                  <th>Commodity & Weight</th>
                  <th>Route (Pickup → Drop)</th>
                  <th>Status</th>
                  <th>Security OTP</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {trackedShipments.map(s => (
                  <tr key={s.id}>
                    <td>
                      <strong style={{ color: 'var(--primary)' }}>{s.id}</strong>
                    </td>
                    <td>
                      <div><strong>{s.vehicleName}</strong></div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {s.plateNumber} • {s.driverName} ({s.driverPhone})
                      </div>
                    </td>
                    <td>
                      <div>{s.commodity}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--accent-gold)' }}>{s.quantity}</div>
                    </td>
                    <td>
                      <div style={{ fontSize: '0.8rem' }}><strong>From:</strong> {s.origin.split(',')[0]}</div>
                      <div style={{ fontSize: '0.8rem' }}><strong>To:</strong> {s.destination.split(',')[0]}</div>
                    </td>
                    <td>
                      <span className={`badge ${s.status === 'IN_TRANSIT' ? 'badge-blue' : s.status === 'APPROACHING_MANDI' ? 'badge-green' : 'badge-gold'}`}>
                        {s.status}
                      </span>
                    </td>
                    <td>
                      <strong style={{ color: '#fff', background: 'rgba(255, 255, 255, 0.1)', padding: '0.15rem 0.45rem', borderRadius: '4px' }}>
                        {s.gateOtp}
                      </strong>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.35rem' }}>
                        <button
                          className="btn btn-primary"
                          style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem' }}
                          onClick={() => {
                            setSelectedTrackingShipment(s);
                            handleTabSwitch('tracking');
                          }}
                        >
                          Track Live
                        </button>
                        <button
                          className="btn btn-outline"
                          style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem' }}
                          onClick={() => handlePrintBilty(s)}
                          title="Print Bilty"
                        >
                          <Printer size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 4: WDRA COLD STORAGE & WAREHOUSES                   */}
      {/* ========================================================= */}
      {activeTab === 'storage' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Storage Filter & GPS Control Bar */}
          <div className="glass-card" style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', alignItems: 'center' }}>
              <span style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-muted)', flexShrink: 0 }}>Storage Type:</span>
              <button
                className={`btn ${filterStorageType === '' ? 'btn-primary' : 'btn-outline'}`}
                style={{ borderRadius: '20px', padding: '0.35rem 0.85rem', fontSize: '0.825rem' }}
                onClick={() => setFilterStorageType('')}
              >
                All Warehouses
              </button>
              <button
                className={`btn ${filterStorageType === 'Cold Storage' ? 'btn-primary' : 'btn-outline'}`}
                style={{ borderRadius: '20px', padding: '0.35rem 0.85rem', fontSize: '0.825rem' }}
                onClick={() => setFilterStorageType('Cold Storage')}
              >
                <Thermometer size={14} /> Cold Storage Chambers
              </button>
              <button
                className={`btn ${filterStorageType === 'Dry Warehouse' ? 'btn-primary' : 'btn-outline'}`}
                style={{ borderRadius: '20px', padding: '0.35rem 0.85rem', fontSize: '0.825rem' }}
                onClick={() => setFilterStorageType('Dry Warehouse')}
              >
                <Warehouse size={14} /> Dry WDRA Warehouses
              </button>
            </div>

            {/* Live GPS Detection Button */}
            <button
              className="btn btn-primary"
              onClick={handleDetectLocation}
              disabled={isLocating}
              style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
            >
              <Compass size={16} className={isLocating ? 'animate-spin' : ''} />
              {isLocating ? 'Detecting Location...' : userLocation ? 'GPS Updated (Nearest First)' : 'Sort by Nearest GPS'}
            </button>
          </div>

          {/* Grid: Storage List */}
          <div className="grid-2" style={{ gridTemplateColumns: '1.1fr 0.9fr', alignItems: 'start' }}>
            {/* Left Column: Facilities List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {loadingStorage ? (
                <div className="glass-card" style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '3rem' }}>
                  Loading storage facilities...
                </div>
              ) : (
                facilities.map(facility => (
                  <div
                    key={facility.id}
                    className="glass-card"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      border: selectedMapTarget?.id === facility.id ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                      background: selectedMapTarget?.id === facility.id ? 'rgba(16, 185, 129, 0.08)' : 'var(--bg-card)',
                      gap: '1rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onClick={() => setSelectedMapTarget(facility)}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                        <span className="badge badge-green">{facility.type}</span>
                        <span className="badge badge-blue">📍 {facility.distanceKm} km away</span>
                      </div>

                      <h3 style={{ fontSize: '1.2rem', color: '#fff', fontWeight: 700, marginBottom: '0.35rem' }}>{facility.name}</h3>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.5rem' }}>
                        <MapPin size={14} color="var(--primary)" /> {facility.address}
                      </div>

                      <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '0.85rem', borderRadius: 'var(--radius-sm)', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Capacity Available</div>
                          <div style={{ fontSize: '1rem', fontWeight: 700, color: '#fff' }}>{facility.capacityAvailableTonnes} Tonnes</div>
                        </div>
                        <div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Rate</div>
                          <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--primary)' }}>
                            ₹{facility.costPerQuintalPerDay || 4.5}/Qtl/Day
                          </div>
                        </div>
                      </div>

                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                        <div><Phone size={12} style={{ display: 'inline', marginRight: '4px' }} /> {facility.contactPhone}</div>
                        <div>Rating: <strong style={{ color: 'var(--accent-gold)' }}>★ {facility.rating} / 5.0</strong></div>
                      </div>
                    </div>

                    <button
                      className="btn btn-primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedFacility(facility);
                      }}
                    >
                      Reserve Storage Chamber
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Right Column: Facility Map & Direction Info */}
            <div>
              {selectedMapTarget && (
                <div className="glass-card" style={{ position: 'sticky', top: '90px' }}>
                  <h3 style={{ fontSize: '1.15rem', color: '#fff', fontWeight: 700, marginBottom: '0.5rem' }}>
                    {selectedMapTarget.name}
                  </h3>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                    📍 {selectedMapTarget.address}
                  </div>

                  {/* Visual Map Simulator */}
                  <div style={{
                    height: '240px',
                    borderRadius: 'var(--radius-md)',
                    background: 'linear-gradient(135deg, #091710 0%, #15271d 100%)',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1rem',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    <div style={{ position: 'absolute', inset: 0, opacity: 0.15, background: 'radial-gradient(circle, #10b981 10%, transparent 11%)', backgroundSize: '16px 16px' }}></div>
                    <MapPin size={40} color="var(--primary)" style={{ animation: 'bounce 2s infinite' }} />
                    <div style={{ color: '#fff', fontWeight: 700, fontSize: '0.9rem', marginTop: '0.5rem', zIndex: 1 }}>
                      GPS Coordinates: {selectedMapTarget.lat}° N, {selectedMapTarget.lng}° E
                    </div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', zIndex: 1 }}>
                      WDRA Electronic Negotiable Warehouse Receipt (e-NWR) Enabled
                    </div>
                  </div>

                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${selectedMapTarget.lat},${selectedMapTarget.lng}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-primary"
                    style={{ width: '100%', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}
                  >
                    <Compass size={16} /> Open Directions in Google Maps
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* CONFIRMED BOOKING MODAL                                  */}
      {/* ========================================================= */}
      {bookingConfirmedModal && (
        <div className="modal-overlay" onClick={() => setBookingConfirmedModal(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '520px', textAlign: 'center' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(16, 185, 129, 0.2)',
              color: '#10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem auto'
            }}>
              <CheckCircle2 size={36} />
            </div>

            <h3 style={{ fontSize: '1.35rem', color: '#fff', fontWeight: 800, marginBottom: '0.35rem' }}>
              Transport Booked Successfully!
            </h3>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              Your commercial vehicle has been reserved and dispatched for farm pickup.
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              padding: '1rem',
              textAlign: 'left',
              marginBottom: '1.25rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Consignment Bilty:</span>
                <strong style={{ color: 'var(--primary)', fontSize: '0.85rem' }}>{bookingConfirmedModal.id}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Vehicle & Plate:</span>
                <strong style={{ color: '#fff', fontSize: '0.85rem' }}>{bookingConfirmedModal.vehicleName} ({bookingConfirmedModal.plateNumber})</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Assigned Driver:</span>
                <strong style={{ color: '#fff', fontSize: '0.85rem' }}>{bookingConfirmedModal.driverName} ({bookingConfirmedModal.driverPhone})</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Mandi Gate Pass OTP:</span>
                <strong style={{ color: 'var(--accent-gold)', fontSize: '1rem' }}>{bookingConfirmedModal.gateOtp}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Estimated Trip Fare:</span>
                <strong style={{ color: 'var(--primary)', fontSize: '1rem' }}>₹{bookingConfirmedModal.fareTotal?.toLocaleString('en-IN')}</strong>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                className="btn btn-outline"
                style={{ flex: 1 }}
                onClick={() => {
                  handlePrintBilty(bookingConfirmedModal);
                }}
              >
                <Printer size={16} /> Print Bilty
              </button>

              <button
                className="btn btn-primary"
                style={{ flex: 1 }}
                onClick={() => {
                  setBookingConfirmedModal(null);
                  handleTabSwitch('tracking');
                }}
              >
                <Navigation size={16} /> Track Live GPS
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* COLD STORAGE RESERVATION MODAL                           */}
      {/* ========================================================= */}
      {selectedFacility && (
        <div className="modal-overlay" onClick={() => setSelectedFacility(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '500px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.2rem', color: '#fff', fontWeight: 700 }}>
                Reserve Storage: {selectedFacility.name}
              </h3>
              <button
                onClick={() => setSelectedFacility(null)}
                style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            {bookingSuccess ? (
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <CheckCircle2 size={48} color="var(--primary)" style={{ margin: '0 auto 1rem' }} />
                <h4 style={{ color: '#fff', fontSize: '1.1rem' }}>Capacity Reserved Successfully!</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  Booking ID: <strong>{bookingSuccess.bookingId}</strong>
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookStorage}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div>
                    <label className="form-label">Required Capacity (Tonnes)</label>
                    <input
                      type="number"
                      className="form-input"
                      value={requiredTonnes}
                      onChange={(e) => setRequiredTonnes(Number(e.target.value))}
                      min="1"
                      max={selectedFacility.capacityAvailableTonnes}
                      required
                    />
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                      Max available: {selectedFacility.capacityAvailableTonnes} Tonnes
                    </div>
                  </div>

                  <div>
                    <label className="form-label">Storage Duration (Days)</label>
                    <input
                      type="number"
                      className="form-input"
                      value={durationDays}
                      onChange={(e) => setDurationDays(Number(e.target.value))}
                      min="1"
                      max="365"
                      required
                    />
                  </div>

                  <div style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    padding: '0.85rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-color)'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem', fontSize: '0.85rem' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Estimated Cost:</span>
                      <strong style={{ color: 'var(--primary)' }}>
                        ₹{((requiredTonnes * 10) * (selectedFacility.costPerQuintalPerDay || 4.5) * durationDays).toLocaleString('en-IN')}
                      </strong>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      Subsidized under APMC Post-Harvest Storage Policy (₹{selectedFacility.costPerQuintalPerDay || 4.5}/Qtl/day)
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                  <button type="button" className="btn btn-outline" onClick={() => setSelectedFacility(null)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Confirm Reservation
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
