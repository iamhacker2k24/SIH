import React, { createContext, useContext, useState, useEffect } from 'react';

export const LANGUAGES = [
  { code: 'English', label: 'English', nativeName: 'English' },
  { code: 'Hindi', label: 'हिन्दी', nativeName: 'हिन्दी' },
  { code: 'Punjabi', label: 'ਪੰਜਾਬੀ', nativeName: 'ਪੰਜਾਬੀ' },
  { code: 'Gujarati', label: 'ગુજરાતી', nativeName: 'ગુજરાતી' },
  { code: 'Marathi', label: 'मराठी', nativeName: 'मराठी' },
  { code: 'Telugu', label: 'తెలుగు', nativeName: 'తెలుగు' },
  { code: 'Tamil', label: 'தமிழ்', nativeName: 'தமிழ்' },
  { code: 'Bengali', label: 'বাংলা', nativeName: 'বাংলা' }
];

export const TRANSLATIONS = {
  English: {
    // Nav items
    nav_home: 'Home',
    nav_prices: 'Prices',
    nav_market: 'Market',
    nav_buyer: 'Buyer',
    nav_fpo: 'FPO Hub',
    nav_match: 'Match',
    nav_logistics: 'Logistics',
    nav_orders: 'Escrow',
    nav_support: 'Support',
    nav_admin: 'Admin',
    nav_login: 'Login',
    nav_state: 'State',
    nav_all_india: 'All India',
    nav_language: 'Language',

    // Theme
    theme_light: 'Light Mode',
    theme_dark: 'Dark Mode',
    switch_theme: 'Toggle Theme',
    
    // Farmer Hub
    portal_badge: 'KrishiLink Farmer Portal',
    greeting_namaste: 'Namaste',
    greeting_ji: 'Ji',
    farmer_role: 'Kisan',
    hero_title: 'Select an Option Below to Access Krishi Services',
    hero_subtitle: 'Instant direct access to produce sales, live Mandi rates, nearest APMC markets, government crop subsidies, low-interest Kisan credit loans, and cold storage booking.',
    services_hub_title: '🌾 Krishi Services Hub',
    click_card_hint: 'Click any card to open page',
    open_page: 'Open Page',

    // Cards
    card_sell_title: 'Sell Product',
    card_sell_sub: 'Post harvested crop & set your desire asking price',
    card_sell_tag: 'Direct Buyer Sale',

    card_price_title: 'Check Live Price',
    card_price_sub: 'Real-time Mandi price discovery & AI sale forecasts',
    card_price_tag: 'Live Analytics',

    card_mandi_title: 'Find Nearest Mandi',
    card_mandi_sub: 'Locate local APMC grain markets & active traders',
    card_mandi_tag: 'APMC Directory',

    card_schemes_title: 'Government Schemes',
    card_schemes_sub: 'PM-KISAN, PMFBY crop insurance & solar pump subsidies',
    card_schemes_tag: 'Sarkari Subsidy',

    card_loan_title: 'Take Agri Loan',
    card_loan_sub: 'Low-interest 4% Kisan Credit Line & instant loan approval',
    card_loan_tag: '4% KCC Credit',

    card_rates_title: 'Live Commodity Rates',
    card_rates_sub: 'Detailed commodity rate charts & historical 30-day trends',
    card_rates_tag: '30-Day Trends',

    card_storage_title: 'Book Cold Storage',
    card_storage_sub: 'WDRA certified warehouses & climate control chambers',
    card_storage_tag: 'Storage & Freight',

    card_support_title: 'Support & Dispute',
    card_support_sub: 'APMC helpline & payment/quality dispute resolution desk',
    card_support_tag: 'Helpline Desk',

    // Marketplace
    marketplace_title: 'Digital Produce Marketplace & Buyer Demands',
    marketplace_sub: 'Direct lot creation by Farmers/FPOs and verified bulk procurement tenders posted by institutional buyers.',
    post_produce_lot: 'Post Produce Lot (Desire Price)',
    post_buyer_tender: 'Post Buyer Procurement Tender',
    farmer_crop_lots: 'Farmer Crop Lots Available',
    recent_buyer_demands: 'Recent Buyer Demands & Tenders',
    filter_listings: 'Filter Listings',
    all_commodities: 'All Commodities',
    all_grades: 'All Quality Grades',
    clear_filters: 'Clear Filters',
    asking_price: 'Asking Price',
    place_bid: 'Place Bid',
    buy_direct: 'Buy Direct',
    fulfill_demand: 'Fulfill Demand',
    volume: 'Volume',
    grade: 'Grade',

    // Price Discovery
    price_discovery_title: 'Live APMC Mandi Rates & AI Price Forecasting',
    price_discovery_sub: 'Real-time commodity price tracking across Indian APMCs with 30-day historical charts and AI sale recommendations.',
    search_commodity_placeholder: 'Search commodity (e.g. Wheat, Paddy, Cotton, Tomato)...',
    select_state_filter: 'All States',
    historical_trends: 'Historical Price Trend',
    modal_price: 'Modal Price',
    min_price: 'Min Price',
    max_price: 'Max Price',
    ai_recommendation: 'AI Sale Recommendation',
    sell_now: 'SELL NOW',
    hold_product: 'HOLD PRODUCT',
    chart_30_days: '30-Day History',

    // Mandi Directory
    mandi_directory_title: 'National APMC Mandi Directory',
    mandi_directory_sub: 'Directory of agricultural produce market committees, daily arrival volumes, and active licensed commission agents.',
    search_mandi: 'Search Mandi or District...',
    active_traders: 'Active Traders',
    daily_volume: 'Daily Arrivals',
    contact_director: 'Contact Mandi Office',
    get_directions: 'Get Directions',

    // Government Schemes
    schemes_title: 'Central & State Agricultural Schemes',
    schemes_sub: 'Verified subsidies, financial support, and crop insurance programs for Indian farmers.',
    apply_online: 'Apply Online',
    subsidy_rate: 'Subsidy / Benefit',
    eligibility: 'Eligibility Criteria',
    read_guidelines: 'Official Guidelines',

    // Agri Loans
    loans_title: 'Low-Interest Kisan Credit & Agri Loans',
    loans_sub: '4% subsidized Kisan Credit Card (KCC) lines, collateral-free credit, and equipment financing.',
    apply_loan: 'Apply for Loan',
    interest_rate: 'Interest Rate',
    instant_approval: 'Instant Approval',
    loan_calculator: 'Loan EMI Calculator',

    // Smart Match
    smart_match_title: 'AI Smart Match: Farmer Produce & Buyer Demands',
    smart_match_sub: 'Algorithmic matching between harvest lots and institutional buyers for maximum profit margins.',
    match_score: 'Match Score',
    connect_buyer: 'Connect with Buyer',
    create_contract: 'Draft Direct Contract',

    // Logistics & Storage
    logistics_title: 'Cold Storage & Agri Freight Booking',
    logistics_sub: 'WDRA-certified cold storage facilities, climate-controlled chambers, and reliable farm-to-mandi transport.',
    book_storage: 'Book Cold Storage',
    book_transport: 'Book Transport Truck',
    available_capacity: 'Available Capacity',

    // Orders & Escrow
    orders_title: 'Escrow Protected Orders & Contracts',
    orders_sub: 'Safe digital trade with tripartite escrow accounts: buyer funds are locked until produce inspection passes.',
    escrow_status: 'Escrow Status',
    track_delivery: 'Track Shipment',
    release_funds: 'Release Funds to Farmer',

    // Grievance Desk
    grievance_title: 'APMC & Payment Grievance Desk',
    grievance_sub: 'Official dispute resolution desk for weighment discrepancies, delayed payments, and quality rejections.',
    file_grievance: 'Lodge New Grievance',
    track_grievance: 'Track Complaint Status',
    helpline_number: 'National APMC Helpline: 1800-180-1551',

    // Buyer & FPO Panels
    buyer_panel_title: 'Institutional Buyer Procurement Dashboard',
    buyer_panel_sub: 'Bulk procurement, contract farming management, and automated supplier payments.',
    fpo_panel_title: 'Farmer Producer Organization (FPO) Hub',
    fpo_panel_sub: 'Aggregated crop lots, input procurement discounts, and member dividend management.',
    admin_panel_title: 'KrishiLink Administrative Console',
    admin_panel_sub: 'National commodity trade analytics, user verification, and compliance monitoring.',

    // AI Chat & Assistant
    ai_title: 'KrishiAI Assistant',
    ai_copilot: 'KrishiAI Advisory Copilot',
    ai_greeting: 'Namaste! I am KrishiAI. How can I help you with crop prices, buyers, or storage today?',
    ai_placeholder: 'Ask KrishiAI...',
    ai_placeholder_detailed: 'Ask KrishiAI (e.g. Should I sell Onion now in Nashik Mandi?)',
    ai_disclaimer: 'Agricultural Advisory • Powered by Gemini AI',
    ai_ask_btn: 'Send',
    ai_listening: 'Listening...',

    // Common
    search: 'Search',
    filter: 'Filter',
    refresh: 'Refresh',
    all: 'All',
    loading: 'Loading...',
    apply_now: 'Apply Now',
    view_details: 'View Details',
    footer_text: '🌾 KrishiLink — Market Linkages & Price Discovery Platform'
  },

  Hindi: {
    // Nav items
    nav_home: 'होम',
    nav_prices: 'मंडी भाव',
    nav_market: 'बाज़ार',
    nav_buyer: 'खरीदार',
    nav_fpo: 'FPO केंद्र',
    nav_match: 'स्मार्ट मैच',
    nav_logistics: 'लॉजिस्टिक्स',
    nav_orders: 'एस्क्रो/ऑर्डर',
    nav_support: 'सहायता',
    nav_admin: 'एडमिन',
    nav_login: 'लॉगिन',
    nav_state: 'राज्य',
    nav_all_india: 'सम्पूर्ण भारत',
    nav_language: 'भाषा',

    // Theme
    theme_light: 'लाइट मोड',
    theme_dark: 'डार्क मोड',
    switch_theme: 'थीम बदलें',

    // Farmer Hub
    portal_badge: 'कृषि-लिंक किसान पोर्टल',
    greeting_namaste: 'नमस्ते',
    greeting_ji: 'जी',
    farmer_role: 'किसान',
    hero_title: 'कृषि सेवाओं का उपयोग करने के लिए नीचे एक विकल्प चुनें',
    hero_subtitle: 'फसल बिक्री, लाइव मंडी भाव, निकटतम एपीएमसी बाजार, सरकारी कृषि सब्सिडी, 4% किसान क्रेडिट ऋण और कोल्ड स्टोरेज बुकिंग की त्वरित सीधी पहुंच।',
    services_hub_title: '🌾 कृषि सेवा केंद्र',
    click_card_hint: 'पेज खोलने के लिए किसी भी कार्ड पर क्लिक करें',
    open_page: 'पेज खोलें',

    // Cards
    card_sell_title: 'फसल बेचें',
    card_sell_sub: 'अपनी कटी हुई फसल पोस्ट करें और मनचाहा भाव तय करें',
    card_sell_tag: 'प्रत्यक्ष खरीदार बिक्री',

    card_price_title: 'लाइव भाव देखें',
    card_price_sub: 'रीयल-टाइम मंडी मूल्य खोज और एआई बिक्री पूर्वानुमान',
    card_price_tag: 'लाइव भाव विश्लेषण',

    card_mandi_title: 'निकटतम मंडी खोजें',
    card_mandi_sub: 'स्थानीय एपीएमसी अनाज मंडियों और सक्रिय व्यापारियों का पता लगाएं',
    card_mandi_tag: 'एपीएमसी डायरेक्टरी',

    card_schemes_title: 'सरकारी योजनाएं',
    card_schemes_sub: 'पीएम-किसान, पीएमएफबीवाई फसल बीमा और सौर पंप सब्सिडी',
    card_schemes_tag: 'सरकारी सब्सिडी',

    card_loan_title: 'कृषि ऋण लें',
    card_loan_sub: 'कम ब्याज 4% किसान क्रेडिट लाइन और त्वरित ऋण स्वीकृति',
    card_loan_tag: '4% केसीसी क्रेडिट',

    card_rates_title: 'लाइव फसल दरें',
    card_rates_sub: 'विस्तृत फसल दर चार्ट और 30-दिवसीय ऐतिहासिक रुझान',
    card_rates_tag: '30-दिवसीय रुझान',

    card_storage_title: 'कोल्ड स्टोरेज बुक करें',
    card_storage_sub: 'डब्लूडीआरए प्रमाणित गोदाम और नियंत्रित तापमान कक्ष',
    card_storage_tag: 'भंडारण एवं भाड़ा',

    card_support_title: 'सहायता एवं विवाद निवारण',
    card_support_sub: 'एपीएमसी हेल्पलाइन और भुगतान/गुणवत्ता विवाद समाधान डेस्क',
    card_support_tag: 'हेल्पलाइन डेस्क',

    // Marketplace
    marketplace_title: 'डिजिटल कृषि उपज बाज़ार एवं खरीदार मांगें',
    marketplace_sub: 'किसानों/FPO द्वारा सीधी फसल लॉट लिस्टिंग और सत्यापित खरीदारों के थोक टेंडर।',
    post_produce_lot: 'फसल लॉट पोस्ट करें (मनचाहा भाव)',
    post_buyer_tender: 'खरीदार खरीद टेंडर पोस्ट करें',
    farmer_crop_lots: 'उपलब्ध किसान फसल लॉट',
    recent_buyer_demands: 'हालिया खरीदार मांगें और टेंडर',
    filter_listings: 'सूचीबद्ध फसलें फ़िल्टर करें',
    all_commodities: 'सभी फसलें',
    all_grades: 'सभी गुणवत्ता श्रेणियां',
    clear_filters: 'फ़िल्टर हटाएं',
    asking_price: 'मांग मूल्य',
    place_bid: 'बोली लगाएं',
    buy_direct: 'सीधा खरीदें',
    fulfill_demand: 'मांग पूरी करें',
    volume: 'मात्रा',
    grade: 'श्रेणी',

    // Price Discovery
    price_discovery_title: 'लाइव एपीएमसी मंडी भाव एवं एआई मूल्य पूर्वानुमान',
    price_discovery_sub: 'देशभर की मंडियों में लाइव मूल्य ट्रैकिंग, 30 दिनों का ऐतिहासिक चार्ट एवं एआई बिक्री सलाह।',
    search_commodity_placeholder: 'फसल खोजें (उदा. गेहूं, धान, कपास, टमाटर, प्याज)...',
    select_state_filter: 'सभी राज्य',
    historical_trends: 'ऐतिहासिक मूल्य रुझान',
    modal_price: 'मॉडल भाव',
    min_price: 'न्यूनतम भाव',
    max_price: 'अधिकतम भाव',
    ai_recommendation: 'एआई बिक्री सिफारिश',
    sell_now: 'अभी बेचें',
    hold_product: 'फसल रोकें',
    chart_30_days: '30 दिनों का इतिहास',

    // Mandi Directory
    mandi_directory_title: 'राष्ट्रीय एपीएमसी मंडी डायरेक्टरी',
    mandi_directory_sub: 'अनाज मंडियों, दैनिक आवक मात्रा एवं अधिकृत आढ़तियों व व्यापारियों की जानकारी।',
    search_mandi: 'मंडी या जिला खोजें...',
    active_traders: 'सक्रिय व्यापारी',
    daily_volume: 'दैनिक आवक',
    contact_director: 'मंडी कार्यालय संपर्क',
    get_directions: 'दिशा-निर्देश प्राप्त करें',

    // Government Schemes
    schemes_title: 'केंद्रीय एवं राज्य कृषि योजनाएं',
    schemes_sub: 'भारतीय किसानों के लिए सत्यापित सब्सिडी, वित्तीय सहायता और फसल बीमा योजनाएं।',
    apply_online: 'ऑनलाइन आवेदन करें',
    subsidy_rate: 'सब्सिडी / लाभ',
    eligibility: 'पात्रता मापदंड',
    read_guidelines: 'आधिकारिक दिशानिर्देश',

    // Agri Loans
    loans_title: 'कम ब्याज किसान क्रेडिट एवं कृषि ऋण',
    loans_sub: '4% रियायती किसान क्रेडिट कार्ड (केसीसी), बिना गारंटी ऋण और कृषि उपकरण वित्तपोषण।',
    apply_loan: 'ऋण के लिए आवेदन करें',
    interest_rate: 'ब्याज दर',
    instant_approval: 'त्वरित स्वीकृति',
    loan_calculator: 'ऋण ईएमआई कैलकुलेटर',

    // Smart Match
    smart_match_title: 'एआई स्मार्ट मैच: किसान फसल और खरीदार मांग',
    smart_match_sub: 'अधिकतम लाभ मार्जिन के लिए किसान लॉट और संस्थागत खरीदारों का त्वरित मिलान।',
    match_score: 'मैच स्कोर',
    connect_buyer: 'खरीदार से संपर्क करें',
    create_contract: 'सीधा अनुबंध बनाएं',

    // Logistics & Storage
    logistics_title: 'कोल्ड स्टोरेज एवं कृषि ढुलाई बुकिंग',
    logistics_sub: 'डब्लूडीआरए प्रमाणित शीतगृह, वातानुकूलित चैंबर और सुरक्षित खेत-से-मंडी परिवहन।',
    book_storage: 'कोल्ड स्टोरेज बुक करें',
    book_transport: 'परिवहन ट्रक बुक करें',
    available_capacity: 'उपलब्ध क्षमता',

    // Orders & Escrow
    orders_title: 'एस्क्रो सुरक्षित ऑर्डर एवं अनुबंध',
    orders_sub: 'त्रिपक्षीय एस्क्रो खाते के साथ सुरक्षित व्यापार: फसल जांच पास होने तक राशि सुरक्षित रहती है।',
    escrow_status: 'एस्क्रो स्थिति',
    track_delivery: 'शिपमेंट ट्रैक करें',
    release_funds: 'किसान को भुगतान जारी करें',

    // Grievance Desk
    grievance_title: 'एपीएमसी एवं भुगतान शिकायत निवारण डेस्क',
    grievance_sub: 'तौल विसंगतियों, विलंबित भुगतान और गुणवत्ता विवादों के आधिकारिक समाधान हेतु मंच।',
    file_grievance: 'नई शिकायत दर्ज करें',
    track_grievance: 'शिकायत की स्थिति जांचें',
    helpline_number: 'राष्ट्रीय एपीएमसी हेल्पलाइन: 1800-180-1551',

    // Buyer & FPO Panels
    buyer_panel_title: 'संस्थागत खरीदार खरीद डैशबोर्ड',
    buyer_panel_sub: 'थोक खरीद, अनुबंध खेती प्रबंधन और स्वचालित आपूर्तिकर्ता भुगतान।',
    fpo_panel_title: 'किसान उत्पादक संगठन (FPO) केंद्र',
    fpo_panel_sub: 'सामूहिक फसल लॉट, कृषि इनपुट पर छूट और सदस्य लाभांश प्रबंधन।',
    admin_panel_title: 'कृषि-लिंक प्रशासनिक कंसोल',
    admin_panel_sub: 'राष्ट्रीय कमोडिटी व्यापार विश्लेषण, उपयोगकर्ता सत्यापन और अनुपालन निगरानी।',

    // AI Chat & Assistant
    ai_title: 'कृषि-AI सहायक',
    ai_copilot: 'कृषि-AI सलाहकार कोपायलट',
    ai_greeting: 'नमस्ते! मैं कृषि-AI हूँ। आज मैं आपकी फसल के भाव, खरीदार या भंडारण में कैसे मदद कर सकता हूँ?',
    ai_placeholder: 'कृषि-AI से पूछें...',
    ai_placeholder_detailed: 'कृषि-AI से पूछें (उदा. क्या मुझे अभी नासिक मंडी में प्याज बेचना चाहिए?)',
    ai_disclaimer: 'कृषि परामर्श • जेमिनी AI द्वारा संचालित',
    ai_ask_btn: 'भेजें',
    ai_listening: 'सुन रहा हूँ...',

    // Common
    search: 'खोजें',
    filter: 'फ़िल्टर',
    refresh: 'ताज़ा करें',
    all: 'सभी',
    loading: 'लोड हो रहा है...',
    apply_now: 'अभी आवेदन करें',
    view_details: 'विवरण देखें',
    footer_text: '🌾 कृषि-लिंक — बाज़ार लिंकेज एवं मूल्य खोज मंच'
  },

  Punjabi: {
    nav_home: 'ਮੁੱਖ ਪੰਨਾ',
    nav_prices: 'ਮੰਡੀ ਭਾਅ',
    nav_market: 'ਮਾਰਕੀਟ',
    nav_buyer: 'ਖਰੀਦਦਾਰ',
    nav_fpo: 'ਐੱਫ.ਪੀ.ਓ ਹੱਬ',
    nav_match: 'ਸਮਾਰਟ ਮੈਚ',
    nav_logistics: 'ਲੌਜਿਸਟਿਕਸ',
    nav_orders: 'ਐਸਕਰੋ/ਆਰਡਰ',
    nav_support: 'ਸਹਾਇਤਾ',
    nav_admin: 'ਐਡਮਿਨ',
    nav_login: 'ਲਾਗਇਨ',
    nav_state: 'ਰਾਜ',
    nav_all_india: 'ਸਾਰਾ ਭਾਰਤ',
    nav_language: 'ਭਾਸ਼ਾ',

    theme_light: 'ਲਾਈਟ ਮੋਡ',
    theme_dark: 'ਡਾਰਕ ਮੋਡ',
    switch_theme: 'ਥੀਮ ਬਦਲੋ',

    portal_badge: 'ਕ੍ਰਿਸ਼ੀਲਿੰਕ ਕਿਸਾਨ ਪੋਰਟਲ',
    greeting_namaste: 'ਸਤਿ ਸ਼੍ਰੀ ਅਕਾਲ',
    greeting_ji: 'ਜੀ',
    farmer_role: 'ਕਿਸਾਨ',
    hero_title: 'ਖੇਤੀ ਸੇਵਾਵਾਂ ਲਈ ਹੇਠਾਂ ਦਿੱਤੇ ਵਿਕਲਪਾਂ ਵਿੱਚੋਂ ਚੁਣੋ',
    hero_subtitle: 'ਫਸਲ ਵੇਚਣ, ਲਾਈਵ ਮੰਡੀ ਭਾਅ, ਨੇੜਲੀਆਂ ਏ.ਪੀ.ਐੱਮ.ਸੀ ਮੰਡੀਆਂ, ਸਰਕਾਰੀ ਸਬਸਿਡੀਆਂ, 4% ਕਿਸਾਨ ਕ੍ਰੈਡਿਟ ਅਤੇ ਕੋਲਡ ਸਟੋਰੇਜ ਦੀ ਤੁਰੰਤ ਪਹੁੰਚ।',
    services_hub_title: '🌾 ਖੇਤੀ ਸੇਵਾ ਕੇਂਦਰ',
    click_card_hint: 'ਪੰਨਾ ਖੋਲ੍ਹਣ ਲਈ ਕਿਸੇ ਵੀ ਕਾਰਡ ਤੇ ਕਲਿੱਕ ਕਰੋ',
    open_page: 'ਪੰਨਾ ਖੋਲ੍ਹੋ',

    card_sell_title: 'ਫਸਲ ਵੇਚੋ',
    card_sell_sub: 'ਕੱਟੀ ਹੋਈ ਫਸਲ ਦਰਜ ਕਰੋ ਅਤੇ ਆਪਣੀ ਮਰਜ਼ੀ ਦਾ ਭਾਅ ਲਗਾਓ',
    card_sell_tag: 'ਸਿੱਧੀ ਖਰੀਦਦਾਰ ਵਿਕਰੀ',

    card_price_title: 'ਲਾਈਵ ਭਾਅ ਵੇਖੋ',
    card_price_sub: 'ਰੀਅਲ-ਟਾਈਮ ਮੰਡੀ ਭਾਅ ਖੋਜ ਅਤੇ ਏ.ਆਈ ਵਿਕਰੀ ਭਵਿੱਖਬਾਣੀ',
    card_price_tag: 'ਲਾਈਵ ਵਿਸ਼ਲੇਸ਼ਣ',

    card_mandi_title: 'ਨੇੜਲੀ ਮੰਡੀ ਲੱਭੋ',
    card_mandi_sub: 'ਸਥਾਨਕ ਦਾਣਾ ਮੰਡੀਆਂ ਅਤੇ ਸਰਗਰਮ ਵਪਾਰੀਆਂ ਦਾ ਪਤਾ ਲਗਾਓ',
    card_mandi_tag: 'ਮੰਡੀ ਡਾਇਰੈਕਟਰੀ',

    card_schemes_title: 'ਸਰਕਾਰੀ ਸਕੀਮਾਂ',
    card_schemes_sub: 'ਪੀ.ਐੱਮ-ਕਿਸਾਨ, ਫਸਲ ਬੀਮਾ ਅਤੇ ਸੋਲਰ ਪੰਪ ਸਬਸਿਡੀਆਂ',
    card_schemes_tag: 'ਸਰਕਾਰੀ ਸਬਸਿਡੀ',

    card_loan_title: 'ਖੇਤੀਬਾੜੀ ਲੋਨ ਲਵੋ',
    card_loan_sub: 'ਸਸਤਾ 4% ਕਿਸਾਨ ਕ੍ਰੈਡਿਟ ਕਾਰਡ ਅਤੇ ਤੁਰੰਤ ਮਨਜ਼ੂਰੀ',
    card_loan_tag: '4% ਕੇ.ਸੀ.ਸੀ ਕ੍ਰੈਡਿਟ',

    card_rates_title: 'ਲਾਈਵ ਵਸਤੂ ਦਰਾਂ',
    card_rates_sub: 'ਵਿਸਤ੍ਰਿਤ ਫਸਲ ਦਰ ਚਾਰਟ ਅਤੇ 30-ਦਿਨਾਂ ਰੁਝਾਨ',
    card_rates_tag: '30-ਦਿਨ ਰੁਝਾਨ',

    card_storage_title: 'ਕੋਲਡ ਸਟੋਰੇਜ ਬੁੱਕ ਕਰੋ',
    card_storage_sub: 'ਪ੍ਰਮਾਣਿਤ ਗੋਦਾਮ ਅਤੇ ਤਾਪਮਾਨ ਨਿਯੰਤਰਿਤ ਕਮਰੇ',
    card_storage_tag: 'ਸਟੋਰੇਜ ਅਤੇ ਟਰਾਂਸਪੋਰਟ',

    card_support_title: 'ਸਹਾਇਤਾ ਅਤੇ ਨਿਪਟਾਰਾ',
    card_support_sub: 'ਮੰਡੀ ਹੈਲਪਲਾਈਨ ਅਤੇ ਭੁਗਤਾਨ/ਗੁਣਵੱਤਾ ਵਿਵਾਦ ਹੱਲ ਡੈਸਕ',
    card_support_tag: 'ਹੈਲਪਲਾਈਨ ਡੈਸਕ',

    marketplace_title: 'ਡਿਜੀਟਲ ਅਨਾਜ ਮੰਡੀ ਅਤੇ ਖਰੀਦਦਾਰ ਮੰਗਾਂ',
    marketplace_sub: 'ਕਿਸਾਨਾਂ ਦੁਆਰਾ ਸਿੱਧੀ ਫਸਲ ਲਿਸਟਿੰਗ ਅਤੇ ਪ੍ਰਮਾਣਿਤ ਖਰੀਦਦਾਰਾਂ ਦੇ ਥੋਕ ਟੈਂਡਰ।',
    post_produce_lot: 'ਫਸਲ ਦਰਜ ਕਰੋ (ਮਨਚਾਹਾ ਭਾਅ)',
    post_buyer_tender: 'ਖਰੀਦਦਾਰ ਖਰੀਦ ਟੈਂਡਰ ਪੋਸਟ ਕਰੋ',
    farmer_crop_lots: 'ਉਪਲਬਧ ਫਸਲ ਲਾਟ',
    recent_buyer_demands: 'ਤਾਜ਼ਾ ਖਰੀਦਦਾਰ ਮੰਗਾਂ',
    filter_listings: 'ਫਸਲਾਂ ਫਿਲਟਰ ਕਰੋ',
    all_commodities: 'ਸਾਰੀਆਂ ਫਸਲਾਂ',
    all_grades: 'ਸਾਰੇ ਗੁਣਵੱਤਾ ਗ੍ਰੇਡ',
    clear_filters: 'ਫਿਲਟਰ ਹਟਾਓ',
    asking_price: 'ਮੰਗਿਆ ਮੁੱਲ',
    place_bid: 'ਬੋਲੀ ਲਗਾਓ',
    buy_direct: 'ਸਿੱਧਾ ਖਰੀਦੋ',
    fulfill_demand: 'ਮੰਗ ਪੂਰੀ ਕਰੋ',
    volume: 'ਮਾਤਰਾ',
    grade: 'ਗ੍ਰੇਡ',

    price_discovery_title: 'ਲਾਈਵ ਏ.ਪੀ.ਐੱਮ.ਸੀ ਮੰਡੀ ਭਾਅ ਅਤੇ ਏ.ਆਈ ਪੂਰਵ-ਅਨੁਮਾਨ',
    price_discovery_sub: 'ਦੇਸ਼ ਭਰ ਦੀਆਂ ਮੰਡੀਆਂ ਦੇ ਲਾਈਵ ਭਾਅ, 30 ਦਿਨਾਂ ਦੇ ਚਾਰਟ ਅਤੇ ਵਿਕਰੀ ਸਲਾਹ।',
    search_commodity_placeholder: 'ਫਸਲ ਖੋਜੋ (ਜਿਵੇਂ ਕਣਕ, ਝੋਨਾ, ਨਰਮਾ, ਟਮਾਟਰ)...',
    select_state_filter: 'ਸਾਰੇ ਰਾਜ',
    historical_trends: 'ਇਤਿਹਾਸਕ ਮੁੱਲ ਰੁਝਾਨ',
    modal_price: 'ਮਾਡਲ ਰੇਟ',
    min_price: 'ਘੱਟੋ-ਘੱਟ ਰੇਟ',
    max_price: 'ਵੱਧ ਤੋਂ ਵੱਧ ਰੇਟ',
    ai_recommendation: 'ਏ.ਆਈ ਵਿਕਰੀ ਸਿਫਾਰਸ਼',
    sell_now: 'ਹੁਣੇ ਵੇਚੋ',
    hold_product: 'ਫਸਲ ਰੋਕੋ',
    chart_30_days: '30-ਦਿਨਾਂ ਇਤਿਹਾਸ',

    mandi_directory_title: 'ਰਾਸ਼ਟਰੀ ਦਾਣਾ ਮੰਡੀ ਡਾਇਰੈਕਟਰੀ',
    mandi_directory_sub: 'ਦਾਣਾ ਮੰਡੀਆਂ, ਰੋਜ਼ਾਨਾ ਆਮਦ ਅਤੇ ਲਾਇਸੰਸਸ਼ੁਦਾ ਆੜ੍ਹਤੀਆਂ ਦੀ ਸੂਚੀ।',
    search_mandi: 'ਮੰਡੀ ਜਾਂ ਜ਼ਿਲ੍ਹਾ ਖੋਜੋ...',
    active_traders: 'ਸਰਗਰਮ ਵਪਾਰੀ',
    daily_volume: 'ਰੋਜ਼ਾਨਾ ਆਮਦ',
    contact_director: 'ਮੰਡੀ ਦਫ਼ਤਰ ਸੰਪਰਕ',
    get_directions: 'ਦਿਸ਼ਾ-ਨਿਰਦੇਸ਼ ਲਵੋ',

    schemes_title: 'ਕੇਂਦਰੀ ਅਤੇ ਰਾਜ ਖੇਤੀਬਾੜੀ ਸਕੀਮਾਂ',
    schemes_sub: 'ਕਿਸਾਨਾਂ ਲਈ ਸਰਕਾਰੀ ਸਬਸਿਡੀਆਂ, ਵਿੱਤੀ ਸਹਾਇਤਾ ਅਤੇ ਫਸਲ ਬੀਮਾ।',
    apply_online: 'ਆਨਲਾਈਨ ਅਰਜ਼ੀ ਦਿਓ',
    subsidy_rate: 'ਸਬਸਿਡੀ / ਲਾਭ',
    eligibility: 'ਯੋਗਤਾ ਮਾਪਦੰਡ',
    read_guidelines: 'ਸਰਕਾਰੀ ਨਿਯਮ',

    loans_title: 'ਸਸਤੇ ਵਿਆਜ ਤੇ ਕਿਸਾਨ ਕ੍ਰੈਡਿਟ ਅਤੇ ਕਰਜ਼ੇ',
    loans_sub: '4% ਸਬਸਿਡੀ ਵਾਲਾ ਕਿਸਾਨ ਕ੍ਰੈਡਿਟ ਕਾਰਡ (ਕੇ.ਸੀ.ਸੀ) ਅਤੇ ਆਸਾਨ ਕਰਜ਼ਾ।',
    apply_loan: 'ਕਰਜ਼ੇ ਲਈ ਅਰਜ਼ੀ ਦਿਓ',
    interest_rate: 'ਵਿਆਜ ਦਰ',
    instant_approval: 'ਤੁਰੰਤ ਮਨਜ਼ੂਰੀ',
    loan_calculator: 'ਕਰਜ਼ਾ ਕੈਲਕੁਲੇਟਰ',

    smart_match_title: 'ਏ.ਆਈ ਸਮਾਰਟ ਮੈਚ: ਫਸਲ ਅਤੇ ਖਰੀਦਦਾਰ',
    smart_match_sub: 'ਵੱਧ ਮੁਨਾਫ਼ੇ ਲਈ ਕਿਸਾਨਾਂ ਅਤੇ ਵੱਡੇ ਖਰੀਦਦਾਰਾਂ ਦਾ ਸਿੱਧਾ ਮੇਲ।',
    match_score: 'ਮੈਚ ਸਕੋਰ',
    connect_buyer: 'ਖਰੀਦਦਾਰ ਨਾਲ ਸੰਪਰਕ',
    create_contract: 'ਸਿੱਧਾ ਸਮਝੌਤਾ ਬਣਾਓ',

    logistics_title: 'ਕੋਲਡ ਸਟੋਰੇਜ ਅਤੇ ਖੇਤੀ ਟਰਾਂਸਪੋਰਟ ਬੁਕਿੰਗ',
    logistics_sub: 'ਪ੍ਰਮਾਣਿਤ ਕੋਲਡ ਸਟੋਰੇਜ ਅਤੇ ਖੇਤ ਤੋਂ ਮੰਡੀ ਤੱਕ ਸੁਰੱਖਿਅਤ ਟਰਾਂਸਪੋਰਟ।',
    book_storage: 'ਕੋਲਡ ਸਟੋਰੇਜ ਬੁੱਕ ਕਰੋ',
    book_transport: 'ਟਰੱਕ ਬੁੱਕ ਕਰੋ',
    available_capacity: 'ਉਪਲਬਧ ਸਮਰੱਥਾ',

    orders_title: 'ਐਸਕਰੋ ਸੁਰੱਖਿਅਤ ਆਰਡਰ ਅਤੇ ਸਮਝੌਤੇ',
    orders_sub: 'ਸੁਰੱਖਿਅਤ ਡਿਜੀਟਲ ਵਪਾਰ: ਫਸਲ ਦੀ ਜਾਂਚ ਹੋਣ ਤੱਕ ਪੈਸੇ ਸੁਰੱਖਿਅਤ ਰਹਿੰਦੇ ਹਨ।',
    escrow_status: 'ਐਸਕਰੋ ਸਥਿਤੀ',
    track_delivery: 'ਆਰਡਰ ਟਰੈਕ ਕਰੋ',
    release_funds: 'ਕਿਸਾਨ ਨੂੰ ਪੈਸੇ ਜਾਰੀ ਕਰੋ',

    grievance_title: 'ਮੰਡੀ ਅਤੇ ਭੁਗਤਾਨ ਸ਼ਿਕਾਇਤ ਨਿਵਾਰਣ ਡੈਸਕ',
    grievance_sub: 'ਤੋਲ, ਲੇਟ ਪੇਮੈਂਟ ਅਤੇ ਕੁਆਲਿਟੀ ਝਗੜਿਆਂ ਦੇ ਨਿਪਟਾਰੇ ਲਈ ਡੈਸਕ।',
    file_grievance: 'ਨਵੀਂ ਸ਼ਿਕਾਇਤ ਦਰਜ ਕਰੋ',
    track_grievance: 'ਸ਼ਿਕਾਇਤ ਦੀ ਸਥਿਤੀ ਵੇਖੋ',
    helpline_number: 'ਰਾਸ਼ਟਰੀ ਹੈਲਪਲਾਈਨ: 1800-180-1551',

    buyer_panel_title: 'ਖਰੀਦਦਾਰ ਪ੍ਰਬੰਧਨ ਡੈਸ਼ਬੋਰਡ',
    buyer_panel_sub: 'ਥੋਕ ਖਰੀਦ, ਕੰਟਰੈਕਟ ਫਾਰਮਿੰਗ ਅਤੇ ਆਟੋਮੈਟਿਕ ਭੁਗਤਾਨ।',
    fpo_panel_title: 'ਕਿਸਾਨ ਉਤਪਾਦਕ ਸੰਗਠਨ (FPO) ਹੱਬ',
    fpo_panel_sub: 'ਸਾਂਝੀ ਫਸਲ ਵਿਕਰੀ, ਖੇਤੀ ਸੰਦਾਂ ਤੇ ਛੋਟ ਅਤੇ ਮੈਂਬਰ ਮੁਨਾਫ਼ਾ।',
    admin_panel_title: 'ਕ੍ਰਿਸ਼ੀਲਿੰਕ ਪ੍ਰਸ਼ਾਸਕੀ ਕੰਸੋਲ',
    admin_panel_sub: 'ਰਾਸ਼ਟਰੀ ਵਪਾਰ ਵਿਸ਼ਲੇਸ਼ਣ, ਉਪਭੋਗਤਾ ਤਸਦੀਕ ਅਤੇ ਨਿਗਰਾਨੀ।',

    ai_title: 'ਕ੍ਰਿਸ਼ੀ-AI ਸਹਾਇਕ',
    ai_copilot: 'ਕ੍ਰਿਸ਼ੀ-AI ਸਲਾਹਕਾਰ',
    ai_greeting: 'ਸਤਿ ਸ਼੍ਰੀ ਅਕਾਲ! ਮੈਂ ਕ੍ਰਿਸ਼ੀ-AI ਹਾਂ। ਅੱਜ ਮੈਂ ਫਸਲਾਂ ਦੇ ਭਾਅ, ਖਰੀਦਦਾਰਾਂ ਜਾਂ ਸਟੋਰੇਜ ਵਿੱਚ ਤੁਹਾਡੀ ਕਿਵੇਂ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ?',
    ai_placeholder: 'ਕ੍ਰਿਸ਼ੀ-AI ਨੂੰ ਪੁੱਛੋ...',
    ai_placeholder_detailed: 'ਕ੍ਰਿਸ਼ੀ-AI ਨੂੰ ਪੁੱਛੋ (ਜਿਵੇਂ ਕਿ ਕੀ ਮੈਨੂੰ ਕਣਕ ਹੁਣ ਵੇਚਣੀ ਚਾਹੀਦੀ ਹੈ?)',
    ai_disclaimer: 'ਖੇਤੀਬਾੜੀ ਸਲਾਹਕਾਰ • ਜੈਮਿਨੀ AI ਦੁਆਰਾ ਸੰਚਾਲਿਤ',
    ai_ask_btn: 'ਭੇਜੋ',
    ai_listening: 'ਸੁਣ ਰਿਹਾ ਹਾਂ...',

    search: 'ਖੋਜੋ',
    filter: 'ਫਿਲਟਰ',
    refresh: 'ਤਾਜ਼ਾ ਕਰੋ',
    all: 'ਸਾਰੇ',
    loading: 'ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ...',
    apply_now: 'ਹੁਣੇ ਅਰਜ਼ੀ ਦਿਓ',
    view_details: 'ਵੇਰਵੇ ਵੇਖੋ',
    footer_text: '🌾 ਕ੍ਰਿਸ਼ੀਲਿੰਕ — ਮਾਰਕੀਟ ਲਿੰਕੇਜ ਅਤੇ ਕੀਮਤ ਖੋਜ ਪਲੇਟਫਾਰਮ'
  },

  Gujarati: {
    nav_home: 'હોમ',
    nav_prices: 'બજાર ભાવ',
    nav_market: 'માર્કેટ',
    nav_buyer: 'ખરીદદાર',
    nav_fpo: 'FPO હબ',
    nav_match: 'સ્માર્ટ મેચ',
    nav_logistics: 'લોજિસ્ટિક્સ',
    nav_orders: 'એસ્ક્રો/ઓર્ડર',
    nav_support: 'સહાયતા',
    nav_admin: 'એડમિન',
    nav_login: 'લોગિન',
    nav_state: 'રાજ્ય',
    nav_all_india: 'સમગ્ર ભારત',
    nav_language: 'ભાષા',

    theme_light: 'લાઇટ મોડ',
    theme_dark: 'ડાર્ક મોડ',
    switch_theme: 'થીમ બદલો',

    portal_badge: 'કૃષિલિંક કિસાન પોર્ટલ',
    greeting_namaste: 'નમસ્તે',
    greeting_ji: 'જી',
    farmer_role: 'ખેડૂત',
    hero_title: 'કૃષિ સેવાઓ મેળવવા માટે નીચે આપેલા વિકલ્પોમાંથી પસંદ કરો',
    hero_subtitle: 'પાક વેચાણ, લાઇવ માર્કેટ યાર્ડ ભાવ, નજીકના APMC બજારો, સરકારી સબસિડી, 4% કિસાન ક્રેડિટ લોન અને કોલ્ડ સ્ટોરેજ બુકિંગ.',
    services_hub_title: '🌾 કૃષિ સેવા કેન્દ્ર',
    click_card_hint: 'પેજ ખોલવા માટે કોઈપણ કાર્ડ પર ક્લિક કરો',
    open_page: 'પેજ ખોલો',

    card_sell_title: 'પાક વેચો',
    card_sell_sub: 'તમારી ઉપજ નોંધાવો અને તમારો ઇચ્છિત ભાવ નક્કી કરો',
    card_sell_tag: 'સીધું ખરીદદાર વેચાણ',

    card_price_title: 'લાઇવ ભાવ જુઓ',
    card_price_sub: 'રીઅલ-ટાઇમ માર્કેટ યાર્ડ ભાવ અને AI વેચાણ આગાહી',
    card_price_tag: 'લાઇવ એનાલિટિક્સ',

    card_mandi_title: 'નજીકની મંડી શોધો',
    card_mandi_sub: 'સ્થાનિક APMC માર્કેટ યાર્ડ અને સક્રિય વેપારીઓ શોધો',
    card_mandi_tag: 'APMC ડિરેક્ટરી',

    card_schemes_title: 'સરકારી યોજનાઓ',
    card_schemes_sub: 'પીએમ-કિસાન, પાક વીમો અને સોલાર પંપ સબસિડી',
    card_schemes_tag: 'સરકારી સબસિડી',

    card_loan_title: 'કૃષિ લોન લો',
    card_loan_sub: 'ઓછા 4% વ્યાજે કિસાન ક્રેડિટ કાર્ડ અને ત્વરિત મંજૂરી',
    card_loan_tag: '4% KCC ધિરાણ',

    card_rates_title: 'લાઇવ કોમોડિટી દરો',
    card_rates_sub: 'વિગતવાર પાક દર ચાર્ટ અને 30-દિવસના વલણો',
    card_rates_tag: '30-દિવસના વલણો',

    card_storage_title: 'કોલ્ડ સ્ટોરેજ બુક કરો',
    card_storage_sub: 'પ્રમાણિત વેરહાઉસ અને તાપમાન નિયંત્રિત ચેમ્બર',
    card_storage_tag: 'સ્ટોરેજ અને ટ્રાન્સપોર્ટ',

    card_support_title: 'સહાય અને ફરિયાદ નિવારણ',
    card_support_sub: 'APMC હેલ્પલાઇન અને ચુકવણી/ગુણવત્તા વિવાદ નિવારણ ડેસ્ક',
    card_support_tag: 'હેલ્પલાઇન ડેસ્ક',

    marketplace_title: 'ડિજિટલ એગ્રી માર્કેટપ્લેસ અને ખરીદદાર માંગ',
    marketplace_sub: 'ખેડૂતો દ્વારા સીધું પાક વેચાણ અને માન્ય સંસ્થાકીય ખરીદદારોના જથ્થાબંધ ટેન્ડર.',
    post_produce_lot: 'પાક લૉટ નોંધાવો (ઇચ્છિત ભાવ)',
    post_buyer_tender: 'ખરીદદાર ખરીદી ટેન્ડર ઉમેરો',
    farmer_crop_lots: 'ઉપલબ્ધ ખેડૂત પાક લૉટ્સ',
    recent_buyer_demands: 'તાજેતરની ખરીદદાર માંગણીઓ',
    filter_listings: 'યાદી ફિલ્ટર કરો',
    all_commodities: 'બધા પાકો',
    all_grades: 'બધા ગુણવત્તા ગ્રેડ',
    clear_filters: 'ફિલ્ટર્સ સાફ કરો',
    asking_price: 'માંગણી ભાવ',
    place_bid: 'બોલી લગાવો',
    buy_direct: 'સીધું ખરીદો',
    fulfill_demand: 'માંગ પૂરી કરો',
    volume: 'જથ્થો',
    grade: 'ગ્રેડ',

    price_discovery_title: 'લાઇવ માર્કેટ યાર્ડ ભાવ અને AI આગાહી',
    price_discovery_sub: 'ગુજરાત અને ભારતના બજારોના લાઇવ દરો, 30 દિવસના ચાર્ટ્સ અને AI વેચાણ સલાહ.',
    search_commodity_placeholder: 'પાક શોધો (દા.ત. ઘઉં, ડાંગર, કપાસ, મગફળી, ટામેટા)...',
    select_state_filter: 'બધા રાજ્યો',
    historical_trends: 'ઐતિહાસિક ભાવ વલણ',
    modal_price: 'મોડલ ભાવ',
    min_price: 'ન્યૂનતમ ભાવ',
    max_price: 'મહત્તમ ભાવ',
    ai_recommendation: 'AI વેચાણ ભલામણ',
    sell_now: 'હમણાં વેચો',
    hold_product: 'પાક સાચવો',
    chart_30_days: '30 દિવસનો ઇતિહાસ',

    mandi_directory_title: 'રાષ્ટ્રીય APMC માર્કેટ યાર્ડ ડિરેક્ટરી',
    mandi_directory_sub: 'માર્કેટ યાર્ડ્સ, દૈનિક આવક અને લાયસન્સ ધરાવતા વેપારીઓની સૂચિ.',
    search_mandi: 'માર્કેટ યાર્ડ અથવા જિલ્લો શોધો...',
    active_traders: 'સક્રિય વેપારીઓ',
    daily_volume: 'દૈનિક આવક',
    contact_director: 'મંડી કચેરી સંપર્ક',
    get_directions: 'દિશા નિર્દેશો મેળવો',

    schemes_title: 'કેન્દ્રીય અને રાજ્ય કૃષિ યોજનાઓ',
    schemes_sub: 'ખેડૂતો માટે માન્ય સબસિડી, સહાય અને પાક વીમા યોજનાઓ.',
    apply_online: 'ઓનલાઇન અરજી કરો',
    subsidy_rate: 'સબસિડી / લાભ',
    eligibility: 'પાત્રતા માપદંડ',
    read_guidelines: 'સત્તાવાર માર્ગદર્શિકા',

    loans_title: 'ઓછા વ્યાજે કિસાન ક્રેડિટ અને કૃષિ લોન',
    loans_sub: '4% રાહત દરે કિસાન ક્રેડિટ કાર્ડ (KCC) અને સરળ કૃષિ ધિરાણ.',
    apply_loan: 'લોન માટે અરજી કરો',
    interest_rate: 'વ્યાજ દર',
    instant_approval: 'ત્વરિત મંજૂરી',
    loan_calculator: 'લોન કેલ્ક્યુલેટર',

    smart_match_title: 'AI સ્માર્ટ મેચ: પાક અને ખરીદદાર',
    smart_match_sub: 'મહત્તમ નફા માટે ખેડૂત અને ખરીદદારોનું સીધું જોડાણ.',
    match_score: 'મેચ સ્કોર',
    connect_buyer: 'ખરીદદાર સાથે જોડાઓ',
    create_contract: 'સીધો કરાર કરો',

    logistics_title: 'કોલ્ડ સ્ટોરેજ અને વાહન બુકિંગ',
    logistics_sub: 'પ્રમાણિત કોલ્ડ સ્ટોરેજ અને ખેતરથી યાર્ડ સુધીનું સુરક્ષિત પરિવહન.',
    book_storage: 'કોલ્ડ સ્ટોરેજ બુક કરો',
    book_transport: 'ટ્રક બુક કરો',
    available_capacity: 'ઉપલબ્ધ ક્ષમતા',

    orders_title: 'એસ્ક્રો સુરક્ષિત ઓર્ડર અને કરારો',
    orders_sub: 'સુરક્ષિત ડિજિટલ વેપાર: પાકની ચકાસણી પૂર્ણ થાય ત્યાં સુધી રકમ સુરક્ષિત.',
    escrow_status: 'એસ્ક્રો સ્થિતિ',
    track_delivery: 'ઓર્ડર ટ્રેક કરો',
    release_funds: 'ખેડૂતને ચુકવણી કરો',

    grievance_title: 'યાર્ડ અને ચુકવણી ફરિયાદ નિવારણ',
    grievance_sub: 'તોલમાપ, વિલંબિત ચુકવણી અને ગુણવત્તાના વિવાદોનું નિવારણ.',
    file_grievance: 'નવી ફરિયાદ નોંધાવો',
    track_grievance: 'ફરિયાદ સ્થિતિ તપાસો',
    helpline_number: 'રાષ્ટ્રીય હેલ્પલાઇન: 1800-180-1551',

    buyer_panel_title: 'સંસ્થાકીય ખરીદદાર ડેશબોર્ડ',
    buyer_panel_sub: 'જથ્થાબંધ ખરીદી, કોન્ટ્રાક્ટ ફાર્મિંગ અને ઓટોમેટેડ ચુકવણી.',
    fpo_panel_title: 'કિસાન પ્રોડ્યુસર ઓર્ગેનાઈઝેશન (FPO) હબ',
    fpo_panel_sub: 'સામૂહિક પાક વેચાણ, ખાતર-બિયારણ પર છૂટ અને નફા વહેંચણી.',
    admin_panel_title: 'કૃષિલિંક એડમિન કન્સોલ',
    admin_panel_sub: 'રાષ્ટ્રીય વેપાર વિશ્લેષણ, વપરાશકર્તા ચકાસણી અને મોનિટરિંગ.',

    ai_title: 'કૃષિ-AI સહાયક',
    ai_copilot: 'કૃષિ-AI સલાહકાર',
    ai_greeting: 'નમસ્તે! હું કૃષિ-AI છું. આજે હું તમને પાકના ભાવ, ખરીદદારો કે સ્ટોરેજમાં કેવી રીતે મદદ કરી શકું?',
    ai_placeholder: 'કૃષિ-AI ને પૂછો...',
    ai_placeholder_detailed: 'કૃષિ-AI ને પૂછો (દા.ત. શું મારે અત્યારે ડુંગળી વેચવી જોઈએ?)',
    ai_disclaimer: 'કૃષિ સલાહકાર • જેમિની AI દ્વારા સંચાલિત',
    ai_ask_btn: 'મોકલો',
    ai_listening: 'સાંભળી રહ્યો છું...',

    search: 'શોધો',
    filter: 'ફિલ્ટર',
    refresh: 'તાજું કરો',
    all: 'બધા',
    loading: 'લોડ થઈ રહ્યું છે...',
    apply_now: 'હમણાં અરજી કરો',
    view_details: 'વિગતો જુઓ',
    footer_text: '🌾 કૃષિલિંક — માર્કેટ લિંકેજ અને ભાવ શોધ પ્લેટફોર્મ'
  },

  Marathi: {
    nav_home: 'मुख्यपृष्ठ',
    nav_prices: 'बाजार भाव',
    nav_market: 'बाजारपेठ',
    nav_buyer: 'खरेदीदार',
    nav_fpo: 'FPO केंद्र',
    nav_match: 'स्मार्ट मॅच',
    nav_logistics: 'लॉजिस्टिक्स',
    nav_orders: 'एस्क्रो/ऑर्डर',
    nav_support: 'मदत व तक्रार',
    nav_admin: 'अ‍ॅडमिन',
    nav_login: 'लॉगिन',
    nav_state: 'राज्य',
    nav_all_india: 'संपूर्ण भारत',
    nav_language: 'भाषा',

    theme_light: 'लाइट मोड',
    theme_dark: 'डार्क मोड',
    switch_theme: 'थीम बदला',

    portal_badge: 'कृषीलिंक शेतकरी पोर्टल',
    greeting_namaste: 'नमस्ते',
    greeting_ji: 'जी',
    farmer_role: 'शेतकरी',
    hero_title: 'कृषी सेवांचा लाभ घेण्यासाठी खालील पर्यायांमधून निवडा',
    hero_subtitle: 'शेतमाल विक्री, थेट बाजार भाव, जवळील APMC बाजार समित्या, शासकीय कृषी सबसिडी, 4% किसान क्रेडिट कर्ज आणि शीतगृह बुकिंग.',
    services_hub_title: '🌾 कृषी सेवा केंद्र',
    click_card_hint: 'पृष्ठ उघडण्यासाठी कोणत्याही कार्डवर क्लिक करा',
    open_page: 'पृष्ठ उघडा',

    card_sell_title: 'शेतमाल विका',
    card_sell_sub: 'काढणी झालेला शेतमाल नोंदवा आणि तुमचा अपेक्षित भाव ठरवा',
    card_sell_tag: 'थेट खरेदीदार विक्री',

    card_price_title: 'थेट भाव तपासा',
    card_price_sub: 'रिअल-टाइम बाजार समिती भाव शोध आणि AI विक्री अंदाज',
    card_price_tag: 'थेट बाजार विश्लेषण',

    card_mandi_title: 'जवळची बाजार समिती शोधा',
    card_mandi_sub: 'स्थानिक APMC धान्य मंडई आणि सक्रिय व्यापारी शोधा',
    card_mandi_tag: 'APMC निर्देशिका',

    card_schemes_title: 'शासकीय योजना',
    card_schemes_sub: 'पीएम-किसान, पीक विमा आणि सौर कृषी पंप सबसिडी',
    card_schemes_tag: 'सरकारी अनुदान',

    card_loan_title: 'कृषी कर्ज मिळवा',
    card_loan_sub: 'कमी 4% व्याजावर किसान क्रेडिट लाईन आणि त्वरित कर्ज मंजुरी',
    card_loan_tag: '4% KCC क्रेडिट',

    card_rates_title: 'थेट कमोडिटी दर',
    card_rates_sub: 'तपशीलवार शेतमाल दर चार्ट आणि 30-दिवसांचे कल',
    card_rates_tag: '30-दिवसांचे ट्रेंड्स',

    card_storage_title: 'कोल्ड स्टोरेज बुक करा',
    card_storage_sub: 'प्रमाणित वखार आणि तापमान नियंत्रित गोदामे',
    card_storage_tag: 'साठवणूक आणि वाहतूक',

    card_support_title: 'मदत आणि विवाद निवारण',
    card_support_sub: 'APMC हेल्पलाइन आणि देयक/गुणवत्ता विवाद निवारण डेस्क',
    card_support_tag: 'हेल्पलाइन डेस्क',

    marketplace_title: 'डिजिटल शेतमाल बाजारपेठ आणि खरेदीदार मागण्या',
    marketplace_sub: 'शेतकऱ्यांकडून थेट शेतमाल विक्री आणि मोठ्या खरेदीदारांचे थेट खरेदी टेंडर.',
    post_produce_lot: 'शेतमाल लॉट नोंदवा (अपेक्षित भाव)',
    post_buyer_tender: 'खरेदीदार खरेदी टेंडर नोंदवा',
    farmer_crop_lots: 'उपलब्ध शेतमाल लॉट्स',
    recent_buyer_demands: 'नुकत्याच आलेल्या खरेदीदार मागण्या',
    filter_listings: 'शेतमाल फिल्टर करा',
    all_commodities: 'सर्व पिके',
    all_grades: 'सर्व गुणवत्ता ग्रेड्स',
    clear_filters: 'फिल्टर काढा',
    asking_price: 'मागणी भाव',
    place_bid: 'बोली लावा',
    buy_direct: 'थेट खरेदी करा',
    fulfill_demand: 'मागणी पूर्ण करा',
    volume: 'प्रमाण',
    grade: 'प्रत',

    price_discovery_title: 'थेट APMC बाजार समिती भाव आणि AI अंदाज',
    price_discovery_sub: 'महाराष्ट्रातील व देशातील बाजार समित्यांचे थेट दर, 30 दिवसांचे चार्ट्स व विक्री मार्गदर्शन.',
    search_commodity_placeholder: 'शेतमाल शोधा (उदा. कांदा, सोयाबीन, कापूस, गहू, टोमॅटो)...',
    select_state_filter: 'सर्व राज्ये',
    historical_trends: 'ऐतिहासिक भाव कल',
    modal_price: 'सरासरी भाव',
    min_price: 'किमान भाव',
    max_price: 'कमाल भाव',
    ai_recommendation: 'AI विक्री शिफारस',
    sell_now: 'आताच विका',
    hold_product: 'माल थांबवा',
    chart_30_days: '30 दिवसांचा इतिहास',

    mandi_directory_title: 'राष्ट्रीय कृषी उत्पन्न बाजार समिती निर्देशिका',
    mandi_directory_sub: 'बाजार समित्या, दैनंदिन शेतमाल आवक आणि परवानाधारक आडत्यांची यादी.',
    search_mandi: 'बाजार समिती किंवा जिल्हा शोधा...',
    active_traders: 'सक्रिय व्यापारी',
    daily_volume: 'दैनंदिन आवक',
    contact_director: 'बाजार समिती कार्यालय संपर्क',
    get_directions: 'मार्ग पहा',

    schemes_title: 'शासकीय कृषी योजना',
    schemes_sub: 'शेतकऱ्यांसाठी प्रमाणित अनुदाने, आर्थिक साहाय्य व पीक विमा योजना.',
    apply_online: 'ऑनलाइन अर्ज करा',
    subsidy_rate: 'सबसिडी / लाभ',
    eligibility: 'पात्रता निकष',
    read_guidelines: 'अधिकृत मार्गदर्शक तत्त्वे',

    loans_title: 'कमी व्याजावर किसान क्रेडिट आणि शेती कर्ज',
    loans_sub: '4% सवलतीच्या दरात किसान क्रेडिट कार्ड (KCC) आणि झटपट कर्ज मंजुरी.',
    apply_loan: 'कर्जासाठी अर्ज करा',
    interest_rate: 'व्याज दर',
    instant_approval: 'त्वरित मंजुरी',
    loan_calculator: 'कर्ज ईएमआय गणक',

    smart_match_title: 'AI स्मार्ट मॅच: शेतमाल आणि खरेदीदार',
    smart_match_sub: 'शेतकऱ्यांचा नफा वाढवण्यासाठी थेट योग्य खरेदीदाराशी जोडणी.',
    match_score: 'मॅच स्કોअर',
    connect_buyer: 'खरेदीदाराशी संपर्क',
    create_contract: 'थेट करार तयार करा',

    logistics_title: 'शीतगृह आणि शेतमाल वाहतूक बुकिंग',
    logistics_sub: 'प्रमाणित शीतगृहे आणि शेतातून थेट बाजार समितीपर्यंत सुरक्षित वाहतूक.',
    book_storage: 'कोल्ड स्टोरेज बुक करा',
    book_transport: 'वाहतूक ट्रक बुक करा',
    available_capacity: 'उपलब्ध जागा',

    orders_title: 'एस्क्रो सुरक्षित ऑर्डर्स आणि व्यवहार',
    orders_sub: 'सुरक्षित डिजिटल व्यवहार: मालाची तपासणी पूर्ण होईपर्यंत रक्कम सुरक्षित राहते.',
    escrow_status: 'एस्क्रो स्थिती',
    track_delivery: 'डिलिव्हरी ट्रॅक करा',
    release_funds: 'शेतकऱ्याला पैसे वर्ग करा',

    grievance_title: 'बाजार समिती व पेमेंट तक्रार निवारण',
    grievance_sub: 'वजनमाप, देयक विलंब व प्रतवारी वादांवर अधिकृत तोडगा मंच.',
    file_grievance: 'नवीन तक्रार नोंदवा',
    track_grievance: 'तक्रारीची स्थिती तपासा',
    helpline_number: 'राष्ट्रीय हेल्पलाइन: 1800-180-1551',

    buyer_panel_title: 'खरेदीदार व्यवस्थापन डॅशबोर्ड',
    buyer_panel_sub: 'मोठी खरेदी, कंत्रાટી शेती व्यवस्थापन आणि स्वयंचलित देयके.',
    fpo_panel_title: 'शेतकरी उत्पादक संस्था (FPO) केंद्र',
    fpo_panel_sub: 'एकत्रित शेतमाल विक्री, बियाणे-खतांवर सवलत व नफा वाटप.',
    admin_panel_title: 'कृषीलिंक प्रशासकीय नियंत्रण कक्ष',
    admin_panel_sub: 'राष्ट्रीय शेतमाल व्यापार विश्लेषण, वापरकर्ता पडताळणी आणि देखरेख.',

    ai_title: 'कृषी-AI सहाय्यक',
    ai_copilot: 'कृषी-AI सल्लागार',
    ai_greeting: 'नमस्ते! मी कृषी-AI आहे. आज मी तुम्हाला पिकांचे भाव, खरेदीदार किंवा साठवणुकीबद्दल कशी मदत करू शकतो?',
    ai_placeholder: 'कृषी-AI ला विचारा...',
    ai_placeholder_detailed: 'कृषी-AI ला विचारा (उदा. मी आता नाशिक बाजार समितीत कांदा विकावा का?)',
    ai_disclaimer: 'कृषी सल्लागार • जेमिनी AI द्वारे समर्थित',
    ai_ask_btn: 'पाठवा',
    ai_listening: 'ऐकत आहे...',

    search: 'शोधा',
    filter: 'फिल्टर',
    refresh: 'ताजे करा',
    all: 'सर्व',
    loading: 'लोड होत आहे...',
    apply_now: 'आता अर्ज करा',
    view_details: 'तपशील पहा',
    footer_text: '🌾 कृषीलिंक — बाजार जोडणी आणि भाव शोध व्यासपीठ'
  },

  Telugu: {
    nav_home: 'హోమ్',
    nav_prices: 'మార్కెట్ ధరలు',
    nav_market: 'మార్కెట్',
    nav_buyer: 'కొనుగోలుదారు',
    nav_fpo: 'FPO కేంద్రం',
    nav_match: 'స్మార్ట్ మ్యాచ్',
    nav_logistics: 'లాజిస్టిక్స్',
    nav_orders: 'ఎస్క్రో/ఆర్డర్లు',
    nav_support: 'సహాయం',
    nav_admin: 'అడ్మిన్',
    nav_login: 'లాగిన్',
    nav_state: 'రాష్ట్రం',
    nav_all_india: 'భారతదేశం మొత్తం',
    nav_language: 'భాష',

    theme_light: 'లైట్ మోడ్',
    theme_dark: 'డార్క్ మోడ్',
    switch_theme: 'థీమ్ మార్చండి',

    portal_badge: 'కృషిలింక్ రైతు పోర్టల్',
    greeting_namaste: 'నమస్కారం',
    greeting_ji: 'గారు',
    farmer_role: 'రైతు',
    hero_title: 'వ్యవసాయ సేవలను పొందడానికి క్రింది ఎంపికలలో ఒకదాన్ని ఎంచుకోండి',
    hero_subtitle: 'పంట విక్రయాలు, ప్రత్యక్ష మార్కెట్ ధరలు, సమీప APMC మార్కెట్లు, ప్రభుత్వ సబ్సిడీలు, 4% కిసాన్ క్రెడిట్ రుణాలు మరియు కోల్డ్ స్టోరేజ్ బుకింగ్.',
    services_hub_title: '🌾 కృషి సేవా కేంద్రం',
    click_card_hint: 'పేజీని తెరవడానికి ఏదైనా కార్డ్‌పై క్లిక్ చేయండి',
    open_page: 'పేజీ తెరవండి',

    card_sell_title: 'పంట అమ్మండి',
    card_sell_sub: 'పంట వివరాలు నమోదు చేసి మీ కావలసిన ధరను నిర్ణయించండి',
    card_sell_tag: 'ప్రత్యక్ష కొనుగోలుదారు విక్రయం',

    card_price_title: 'లైవ్ ధరలు చూడండి',
    card_price_sub: 'రియల్ టైమ్ మార్కెట్ ధరలు మరియు AI అమ్మకాల అంచనాలు',
    card_price_tag: 'లైవ్ విశ్లేషణ',

    card_mandi_title: 'సమీప మార్కెట్ కనుగొనండి',
    card_mandi_sub: 'స్థానిక APMC మార్కెట్లు మరియు వ్యాపారులను గుర్తించండి',
    card_mandi_tag: 'APMC డైరెక్టరీ',

    card_schemes_title: 'ప్రభుత్వ పథకాలు',
    card_schemes_sub: 'పీఎం-కిసాన్, పంట బీమా మరియు సోలార్ పంప్ సబ్సిడీలు',
    card_schemes_tag: 'ప్రభుత్వ సబ్సిడీ',

    card_loan_title: 'వ్యవసాయ రుణం పొందండి',
    card_loan_sub: 'తక్కువ 4% వడ్డీతో కిసాన్ క్రెడిట్ కార్డ్ మరియు తక్షణ ఆమోదం',
    card_loan_tag: '4% KCC క్రెడిట్',

    card_rates_title: 'లైవ్ వస్తువుల ధరలు',
    card_rates_sub: 'వివరణాత్మక పంట ధరల చార్ట్‌లు మరియు 30 రోజుల ట్రెండ్‌లు',
    card_rates_tag: '30 రోజుల ట్రెండ్స్',

    card_storage_title: 'కోల్డ్ స్టోరేజ్ బుక్ చేయండి',
    card_storage_sub: 'ధృవీకరించబడిన గిడ్డంగులు మరియు శీతల గదులు',
    card_storage_tag: 'నిల్వ మరియు రవాణా',

    card_support_title: 'సహాయం మరియు వివాద పరిష్కారం',
    card_support_sub: 'APMC హెల్ప్‌లైన్ మరియు చెల్లింపు/నాణ్యత వివాద పరిష్కార డెస్క్',
    card_support_tag: 'హెల్ప్‌లైన్ డెస్క్',

    marketplace_title: 'డిజిటల్ వ్యవసాయ మార్కెట్‌ప్లేస్',
    marketplace_sub: 'రైతుల నుండి ప్రత్యక్ష పంట విక్రయాలు మరియు పెద్ద కొనుగోలుదారుల టెండర్లు.',
    post_produce_lot: 'పంట లాట్ పోస్ట్ చేయండి',
    post_buyer_tender: 'కొనుగోలు టెండర్ పోస్ట్ చేయండి',
    farmer_crop_lots: 'లభ్యమయ్యే పంట లాట్లు',
    recent_buyer_demands: 'తాజా కొనుగోలుదారు డిమాండ్లు',
    filter_listings: 'ఫిల్టర్ చేయండి',
    all_commodities: 'అన్ని పంటలు',
    all_grades: 'అన్ని నాణ్యత గ్రేడ్లు',
    clear_filters: 'ఫిల్టర్లను తొలగించండి',
    asking_price: 'కోరిన ధర',
    place_bid: 'బిడ్ వేయండి',
    buy_direct: 'నేరుగా కొనండి',
    fulfill_demand: 'డిమాండ్ పూర్తి చేయండి',
    volume: 'పరిమాణం',
    grade: 'గ్రేడ్',

    price_discovery_title: 'లైవ్ మార్కెట్ ధరలు & AI అంచనాలు',
    price_discovery_sub: 'దేశవ్యాప్త మార్కెట్ ధరలు, 30 రోజుల చార్ట్‌లు మరియు అమ్మకాల సలహాలు.',
    search_commodity_placeholder: 'పంటను శోధించండి (ఉదా. వరి, గోధుమ, పత్తి, మిర్చి, టమోటా)...',
    select_state_filter: 'అన్ని రాష్ట్రాలు',
    historical_trends: 'చారిత్రక ధరల సరళి',
    modal_price: 'సగటు ధర',
    min_price: 'కనిష్ట ధర',
    max_price: 'గరిష్ట ధర',
    ai_recommendation: 'AI అమ్మకం సిఫార్సు',
    sell_now: 'ఇప్పుడే అమ్మండి',
    hold_product: 'నిల్వ ఉంచండి',
    chart_30_days: '30 రోజుల చరిత్ర',

    mandi_directory_title: 'జాతీయ APMC మార్కెట్ డైరెక్టరీ',
    mandi_directory_sub: 'వ్యవసాయ మార్కెట్లు, రోజువారీ రాకలు మరియు లైసెన్స్ పొందిన వ్యాపారులు.',
    search_mandi: 'మార్కెట్ లేదా జిల్లా శోధించండి...',
    active_traders: 'క్రియాశీల వ్యాపారులు',
    daily_volume: 'రోజువారీ రాక',
    contact_director: 'మార్కెట్ కార్యాలయం సంప్రదింపు',
    get_directions: 'దారి కనుగొనండి',

    schemes_title: 'కేంద్ర & రాష్ట్ర ప్రభుత్వ పథకాలు',
    schemes_sub: 'రైతులకు అధికారిక సబ్సిడీలు, ఆర్థిక సహాయం మరియు పంట బీమా పథకాలు.',
    apply_online: 'ఆన్‌లైన్‌లో దరఖాస్తు చేయండి',
    subsidy_rate: 'సబ్సిడీ / ప్రయోజనం',
    eligibility: 'అర్హత ప్రమాణాలు',
    read_guidelines: 'అధికారిక నిబంధనలు',

    loans_title: 'తక్కువ వడ్డీ కిసాన్ క్రెడిట్ రుణాలు',
    loans_sub: '4% సబ్సిడీ కిసాన్ క్రెడిట్ కార్డ్ (KCC) మరియు తక్షణ రుణాలు.',
    apply_loan: 'రుణం కోసం దరఖాస్తు',
    interest_rate: 'వడ్డీ రేటు',
    instant_approval: 'తక్షణ ఆమోదం',
    loan_calculator: 'రుణ కాలిక్యులేటర్',

    smart_match_title: 'AI స్మార్ట్ మ్యాచ్: పంట & కొనుగోలుదారు',
    smart_match_sub: 'రైతు లాట్లు మరియు సంస్థాగత కొనుగోలుదారుల మధ్య ప్రత్యక్ష అనుసంధానం.',
    match_score: 'మ్యాచ్ స్కోర్',
    connect_buyer: 'కొనుగోలుదారుతో సంప్రదించండి',
    create_contract: 'ప్రత్యక్ష ఒప్పందం చేసుకోండి',

    logistics_title: 'కోల్డ్ స్టోరేజ్ & రవాణా బుకింగ్',
    logistics_sub: 'ధృవీకరించబడిన శీతల గిడ్డంగులు మరియు పొలం నుండి మార్కెట్‌కు సురక్షిత రవాణా.',
    book_storage: 'కోల్డ్ స్టోరేజ్ బుక్ చేయండి',
    book_transport: 'రవాణా ట్రక్ బుక్ చేయండి',
    available_capacity: 'లభ్యమయ్యే స్థలం',

    orders_title: 'ఎస్క్రో సురక్షిత ఆర్డర్లు & ఒప్పందాలు',
    orders_sub: 'సురక్షిత డిజిటల్ వర్తకం: పంట తనిఖీ పూర్తయ్యే వరకు నగదు సురక్షితం.',
    escrow_status: 'ఎస్క్రో స్థితి',
    track_delivery: 'డెలివరీ ట్రాక్ చేయండి',
    release_funds: 'రైతుకు చెల్లింపు విడుదల చేయండి',

    grievance_title: 'మార్కెట్ & చెల్లింపుల వివాద పరిష్కారం',
    grievance_sub: 'తూనికలు, ఆలస్యమైన చెల్లింపులు మరియు నాణ్యత సమస్యల పరిష్కార కేంద్రం.',
    file_grievance: 'కొత్త ఫిర్యాదు చేయండి',
    track_grievance: 'ఫిర్యాదు స్థితి చూడండి',
    helpline_number: 'జాతీయ హెల్ప్‌లైన్: 1800-180-1551',

    buyer_panel_title: 'సంస్థాగత కొనుగోలుదారు డ్యాష్‌బోర్డ్',
    buyer_panel_sub: 'భారీ కొనుగోళ్లు, కాంట్రాక్ట్ వ్యవసాయం మరియు ఆటోమేటెడ్ చెల్లింపులు.',
    fpo_panel_title: 'రైతు ఉత్పత్తిదారుల సంస్థ (FPO) కేంద్రం',
    fpo_panel_sub: 'సమిష్టి పంట అమ్మకాలు, ఎరువులపై తగ్గింపు మరియు సభ్యుల డివిడెండ్.',
    admin_panel_title: 'కృషిలింక్ అడ్మినిస్ట్రేటివ్ కన్సోల్',
    admin_panel_sub: 'జాతీయ వ్యవసాయ వాణిజ్య విశ్లేషణ, వినియోగదారు ధృవీకరణ మరియు పర్యవేక్షణ.',

    ai_title: 'కృషి-AI అసిస్టెంట్',
    ai_copilot: 'కృషి-AI సలహాదారు',
    ai_greeting: 'నమస్కారం! నేను కృషి-AI ని. పంట ధరలు, కొనుగోలుదారులు లేదా నిల్వ విషయాల్లో మీకు ఎలా సహాయపడగలను?',
    ai_placeholder: 'కృషి-AI ని అడగండి...',
    ai_placeholder_detailed: 'కృషి-AI ని అడగండి (ఉదా. నేను ఇప్పుడు ఉల్లిపాయలను మార్కెట్లో అమ్మవచ్చా?)',
    ai_disclaimer: 'వ్యవసాయ సలహాదారు • జెమిని AI ఆధారితం',
    ai_ask_btn: 'పంపండి',
    ai_listening: 'వింటున్నాను...',

    search: 'శోధించండి',
    filter: 'ఫిల్టర్',
    refresh: 'రిఫ్రెష్',
    all: 'అన్నీ',
    loading: 'లోడ్ అవుతోంది...',
    apply_now: 'ఇప్పుడే దరఖాస్తు చేసుకోండి',
    view_details: 'వివరాలు చూడండి',
    footer_text: '🌾 కృషిలింక్ — మార్కెట్ అనుసంధానం మరియు ధరల అన్వేషణ వేదిక'
  },

  Tamil: {
    nav_home: 'முகப்பு',
    nav_prices: 'சந்தை விலை',
    nav_market: 'சந்தை',
    nav_buyer: 'வாங்குபவர்',
    nav_fpo: 'FPO மையம்',
    nav_match: 'ஸ்மார்ட் மேட்ச்',
    nav_logistics: 'போக்குவரத்து',
    nav_orders: 'எஸ்க்ரோ/ஆர்டர்கள்',
    nav_support: 'உதவி',
    nav_admin: 'நிர்வாகம்',
    nav_login: 'உள்நுழைவு',
    nav_state: 'மாநிலம்',
    nav_all_india: 'அனைத்து இந்தியா',
    nav_language: 'மொழி',

    theme_light: 'லைட் மோடு',
    theme_dark: 'டார்க் மோடு',
    switch_theme: 'தீம் மாற்று',

    portal_badge: 'கிரிஷிலிங்க் உழவர் போர்டல்',
    greeting_namaste: 'வணக்கம்',
    greeting_ji: '',
    farmer_role: 'விவசாயி',
    hero_title: 'விவசாய சேவைகளைப் பெற கீழே உள்ள விருப்பங்களில் ஒன்றைத் தேர்ந்தெடுக்கவும்',
    hero_subtitle: 'பயிர் விற்பனை, நேரடி மண்டி விலைகள், அருகிலுள்ள APMC சந்தைகள், அரசு மானியங்கள், 4% கிசான் கடன் மற்றும் குளிர்சாதன கிடங்கு முன்பதிவு.',
    services_hub_title: '🌾 விவசாய சேவை மையம்',
    click_card_hint: 'பக்கத்தைத் திறக்க ஏதேனும் ஒரு அட்டையைக் கிளிக் செய்யவும்',
    open_page: 'பக்கத்தைத் திறக்கவும்',

    card_sell_title: 'பயிரை விற்கவும்',
    card_sell_sub: 'அறுவடை செய்த பயிரை பதிவேற்றி நீங்கள் விரும்பும் விலையை நிர்ணயிக்கவும்',
    card_sell_tag: 'நேரடி வாங்குபவர் விற்பனை',

    card_price_title: 'நேரடி விலை சரிபார்க்கவும்',
    card_price_sub: 'நிகழ்நேர மண்டி விலை தகவல் மற்றும் AI விற்பனை முன்னறிவிப்பு',
    card_price_tag: 'நேரடி பகுப்பாய்வு',

    card_mandi_title: 'அருகிலுள்ள மண்டியைக் கண்டறியவும்',
    card_mandi_sub: 'உள்ளூர் APMC சந்தைகள் மற்றும் வணிகர்களைக் கண்டறியவும்',
    card_mandi_tag: 'APMC அடைவு',

    card_schemes_title: 'அரசு திட்டங்கள்',
    card_schemes_sub: 'PM-கிசான், பயிர் காப்பீடு மற்றும் சோலார் பம்ப் மானியங்கள்',
    card_schemes_tag: 'அரசு மானியம்',

    card_loan_title: 'விவசாய கடன் பெறவும்',
    card_loan_sub: 'குறைந்த 4% வட்டியில் கிசான் கிரெடிட் கார்டு மற்றும் உடனடி ஒப்புதல்',
    card_loan_tag: '4% KCC கடன்',

    card_rates_title: 'நேரடி பண்ட விலைகள்',
    card_rates_sub: 'விரிவான பயிர் விலை அட்டவணை மற்றும் 30-நாள் போக்குகள்',
    card_rates_tag: '30-நாள் போக்குகள்',

    card_storage_title: 'குளிர்சாதன கிடங்கு முன்பதிவு',
    card_storage_sub: 'சான்றளிக்கப்பட்ட கிடங்குகள் மற்றும் வெப்பநிலை கட்டுப்பாட்டு அறைகள்',
    card_storage_tag: 'சேமிப்பு & சரக்கு',

    card_support_title: 'உதவி மற்றும் சர்ச்சை தீர்வு',
    card_support_sub: 'APMC உதவி எண் மற்றும் கட்டணம்/தரம் சர்ச்சை தீர்வு மையம்',
    card_support_tag: 'உதவி மையம்',

    marketplace_title: 'டிஜிட்டல் விளைபொருள் சந்தை',
    marketplace_sub: 'விவசாயிகளின் நேரடி விளைபொருள் விற்பனை மற்றும் மொத்த கொள்முதல் டெண்டர்கள்.',
    post_produce_lot: 'விளைபொருளைப் பதிவிடு (விருப்ப விலை)',
    post_buyer_tender: 'கொள்முதல் டெண்டரைப் பதிவிடு',
    farmer_crop_lots: 'கிடைக்கும் பயிர் லாட்டுகள்',
    recent_buyer_demands: 'சமீபத்திய வாங்குபவர் தேவைகள்',
    filter_listings: 'பட்டியலை வடிகட்டு',
    all_commodities: 'அனைத்துப் பயிர்கள்',
    all_grades: 'அனைத்து தர நிலைகள்',
    clear_filters: 'வடிகட்டிகளை நீக்கு',
    asking_price: 'கேட்கப்படும் விலை',
    place_bid: 'ஏலம் எடு',
    buy_direct: 'நேரடியாக வாங்கு',
    fulfill_demand: 'தேவையை பூர்த்தி செய்',
    volume: 'அளவு',
    grade: 'தரம்',

    price_discovery_title: 'நேரடி APMC மண்டி விலை & AI கணிப்பு',
    price_discovery_sub: 'இந்திய சந்தைகளின் நேரடி விலை நிலவரம், 30-நாள் வரைபடங்கள் மற்றும் விற்பனை ஆலோசனை.',
    search_commodity_placeholder: 'பயிரைத் தேடு (எ.கா. நெல், கோதுமை, பருத்தி, தக்காளி)...',
    select_state_filter: 'அனைத்து மாநிலங்கள்',
    historical_trends: 'வரலாற்று விலை போக்கு',
    modal_price: 'மாதிரி விலை',
    min_price: 'குறைந்தபட்ச விலை',
    max_price: 'அதிகபட்ச விலை',
    ai_recommendation: 'AI விற்பனை பரிந்துரை',
    sell_now: 'இப்போதே விற்கவும்',
    hold_product: 'பயிரை இருப்பு வை',
    chart_30_days: '30-நாள் வரலாறு',

    mandi_directory_title: 'தேசிய APMC மண்டி அடைவு',
    mandi_directory_sub: 'தானிய சந்தைகள், தினசரி வரத்து மற்றும் உரிமம் பெற்ற வர்த்தகர்களின் பட்டியல்.',
    search_mandi: 'மண்டி அல்லது மாவட்டத்தைத் தேடு...',
    active_traders: 'செயலில் உள்ள வணிகர்கள்',
    daily_volume: 'தினசரி வரத்து',
    contact_director: 'மண்டி அலுவலக தொடர்பு',
    get_directions: 'திசையைக் காண்க',

    schemes_title: 'மத்திய & மாநில அரசு திட்டங்கள்',
    schemes_sub: 'விவசாயிகளுக்கான மானியங்கள், நிதி உதவி மற்றும் பயிர் காப்பீட்டுத் திட்டங்கள்.',
    apply_online: 'ஆன்லைனில் விண்ணப்பிக்கவும்',
    subsidy_rate: 'மானியம் / பலன்',
    eligibility: 'தகுதி வரம்புகள்',
    read_guidelines: 'அதிகாரப்பூர்வ விதிகள்',

    loans_title: 'குறைந்த வட்டி கிசான் கிரெடிட் கடன்கள்',
    loans_sub: '4% மானிய வட்டியில் கிசான் கடன் அட்டை (KCC) மற்றும் உடனடி கடன் ஒப்புதல்.',
    apply_loan: 'கடனுக்கு விண்ணப்பிக்கவும்',
    interest_rate: 'வட்டி விகிதம்',
    instant_approval: 'உடனடி ஒப்புதல்',
    loan_calculator: 'கடன் கால்குலேட்டர்',

    smart_match_title: 'AI ஸ்மார்ட் மேட்ச்: பயிர் & வாங்குபவர்',
    smart_match_sub: 'விவசாயிகளுக்கும் பெரிய கொள்முதல் நிறுவனங்களுக்கும் நேரடி இணைப்பு.',
    match_score: 'பொருத்தம் மதிப்பெண்',
    connect_buyer: 'வாங்குபவருடன் இணை',
    create_contract: 'நேரடி ஒப்பந்தம் செய்',

    logistics_title: 'குளிர்சாதன கிடங்கு & போக்குவரத்து முன்பதிவு',
    logistics_sub: 'சான்றளிக்கப்பட்ட கிடங்குகள் மற்றும் பண்ணையிலிருந்து மண்டிக்கு பாதுகாப்பான லாரி போக்குவரத்து.',
    book_storage: 'கிடங்கு முன்பதிவு செய்',
    book_transport: 'லாரி முன்பதிவு செய்',
    available_capacity: 'கிடைக்கும் இடம்',

    orders_title: 'எஸ்க்ரோ பாதுகாக்கப்பட்ட ஆர்டர்கள் & வர்த்தகம்',
    orders_sub: 'பாதுகாப்பான டிஜிட்டல் வர்த்தகம்: பயிர் தரம் சோதிக்கப்படும் வரை பணம் பாதுகாப்பாக இருக்கும்.',
    escrow_status: 'எஸ்க்ரோ நிலை',
    track_delivery: 'ஆர்டரை கண்காணிக்கவும்',
    release_funds: 'விவசாயிக்கு பணம் விடுவி',

    grievance_title: 'மண்டி & கட்டண குறைதீர்ப்பு மையம்',
    grievance_sub: 'எடை முரண்பாடுகள், கட்டண தாமதம் மற்றும் தரப் பிரச்சினைகளுக்கான தீர்வு மையம்.',
    file_grievance: 'புதிய புகார் பதிவு செய்',
    track_grievance: 'புகாரின் நிலையை அறி',
    helpline_number: 'தேசிய உதவி எண்: 1800-180-1551',

    buyer_panel_title: 'நிறுவன வாங்குபவர் டாஷ்போர்டு',
    buyer_panel_sub: 'மொத்த கொள்முதல், ஒப்பந்த விவசாயம் மற்றும் தானியங்கி கட்டணங்கள்.',
    fpo_panel_title: 'உழவர் உற்பத்தியாளர் நிறுவனம் (FPO) மையம்',
    fpo_panel_sub: 'கூட்டு விளைபொருள் விற்பனை, உரம்-விதைகள் தள்ளுபடி மற்றும் லாப பகிர்வு.',
    admin_panel_title: 'கிரிஷிலிங்க் நிர்வாகக் கட்டுப்பாட்டு அறை',
    admin_panel_sub: 'தேசிய பண்ட வர்த்தக பகுப்பாய்வு, பயனர் சரிபார்ப்பு மற்றும் கண்காணிப்பு.',

    ai_title: 'கிரிஷி-AI உதவியாளர்',
    ai_copilot: 'கிரிஷி-AI ஆலோசகர்',
    ai_greeting: 'வணக்கம்! நான் கிரிஷி-AI. பயிர் விலைகள், வாங்குபவர்கள் அல்லது சேமிப்பு குறித்து உங்களுக்கு எவ்வாறு உதவ முடியும்?',
    ai_placeholder: 'கிரிஷி-AI யிடம் கேளுங்கள்...',
    ai_placeholder_detailed: 'கிரிஷி-AI யிடம் கேளுங்கள் (எ.கா. நான் இப்போது வெங்காயத்தை விற்க வேண்டுமா?)',
    ai_disclaimer: 'விவசாய ஆலோசனை • ஜெமினி AI மூலம் இயக்கப்படுகிறது',
    ai_ask_btn: 'அனுப்பு',
    ai_listening: 'கேட்கிறது...',

    search: 'தேடுக',
    filter: 'வடிகட்டு',
    refresh: 'புதுப்பி',
    all: 'அனைத்தும்',
    loading: 'ஏற்றுகிறது...',
    apply_now: 'இப்போதே விண்ணப்பிக்கவும்',
    view_details: 'விவரங்களைக் காண்க',
    footer_text: '🌾 கிரிஷிலிங்க் — சந்தை இணைப்பு மற்றும் விலை கண்டுபிடிப்பு தளம்'
  },

  Bengali: {
    nav_home: 'হোম',
    nav_prices: 'মন্ডির দর',
    nav_market: 'বাজার',
    nav_buyer: 'ক্রেতা',
    nav_fpo: 'FPO কেন্দ্র',
    nav_match: 'স্মার্ট ম্যাচ',
    nav_logistics: 'লজিস্টিকস',
    nav_orders: 'এসক্রো/অর্ডার',
    nav_support: 'সহায়তা',
    nav_admin: 'অ্যাডমিন',
    nav_login: 'লগইন',
    nav_state: 'রাজ্য',
    nav_all_india: 'সমগ্র ভারত',
    nav_language: 'ভাষা',

    theme_light: 'লাইট মোড',
    theme_dark: 'ডার্ক মোড',
    switch_theme: 'থিম পরিবর্তন',

    portal_badge: 'কৃষিলিংক কৃষক পোর্টাল',
    greeting_namaste: 'নমস্কার',
    greeting_ji: '',
    farmer_role: 'কৃষক',
    hero_title: 'কৃষি সেবা পেতে নিচের যে কোনো বিকল্প নির্বাচন করুন',
    hero_subtitle: 'ফসল বিক্রি, লাইভ মন্ডির দর, নিকটবর্তী APMC বাজার, সরকারি কৃষি ভর্তুকি, ৪% কিষাণ ক্রেডিট ঋণ এবং কোল্ড স্টোরেজ বুকিং।',
    services_hub_title: '🌾 কৃষি সেবা কেন্দ্র',
    click_card_hint: 'পেজ খুলতে যেকোনো কার্ডে ক্লিক করুন',
    open_page: 'পেজ খুলুন',

    card_sell_title: 'ফসল বিক্রি করুন',
    card_sell_sub: 'আপনার ফসল তালিকাভুক্ত করুন এবং নিজের কাঙ্ক্ষিত দর নির্ধারণ করুন',
    card_sell_tag: 'সরাসরি ক্রেতা বিক্রি',

    card_price_title: 'লাইভ দর দেখুন',
    card_price_sub: 'রিয়েল-টাইম মন্ডির দর অনুসন্ধান এবং এআই বিক্রয় পূর্বাভাস',
    card_price_tag: 'লাইভ বিশ্লেষণ',

    card_mandi_title: 'নিকটবর্তী মন্ডি খুঁজুন',
    card_mandi_sub: 'স্থানীয় APMC শস্য মন্ডি এবং সক্রিয় ব্যবসায়ীদের সন্ধান করুন',
    card_mandi_tag: 'APMC ডিরেক্টরি',

    card_schemes_title: 'সরকারি প্রকল্প',
    card_schemes_sub: 'পিএম-কিষাণ, ফসল বিমা এবং সৌর পাম্প ভর্তুকি',
    card_schemes_tag: 'সরকারি ভর্তুকি',

    card_loan_title: 'কৃষি ঋণ নিন',
    card_loan_sub: 'কম ৪% সুদে কিষাণ ক্রেডিট কার্ড এবং দ্রুত অনুমোদন',
    card_loan_tag: '৪% KCC ক্রেডিট',

    card_rates_title: 'লাইভ পণ্যের দর',
    card_rates_sub: 'বিস্তারিত শস্য দর চার্ট এবং ৩০ দিনের ট্রেন্ড',
    card_rates_tag: '৩০ দিনের ট্রেন্ড',

    card_storage_title: 'কোল্ড স্টোরেজ বুক করুন',
    card_storage_sub: 'প্রত্যয়িত গুদাম এবং তাপমাত্রা নিয়ন্ত্রিত কক্ষ',
    card_storage_tag: 'সংরক্ষণ ও পরিবহন',

    card_support_title: 'সহায়তা ও বিরোধ নিষ্পত্তি',
    card_support_sub: 'APMC হেল্পলাইন এবং পেমেন্ট/গুণমান সংক্রান্ত বিরোধ নিষ্পত্তি ডেস্ক',
    card_support_tag: 'হেল্পলাইন ডেস্ক',

    marketplace_title: 'ডিজিটাল কৃষি বাজার এবং ক্রেতার চাহিদা',
    marketplace_sub: 'কৃষকদের সরাসরি ফসল বিক্রয় এবং যাচাইকৃত বড় ক্রেতাদের পাইকারি দরপত্র।',
    post_produce_lot: 'ফসল তালিকাভুক্ত করুন (কাঙ্ক্ষিত দর)',
    post_buyer_tender: 'ক্রেতা সংগ্রহ দরপত্র যোগ করুন',
    farmer_crop_lots: 'উপলব্ধ ফসলের লট',
    recent_buyer_demands: 'সাম্প্রতিক ক্রেতার চাহিদা ও দরপত্র',
    filter_listings: 'তালিকা ফিল্টার করুন',
    all_commodities: 'সকল ফসল',
    all_grades: 'সকল গুণমান গ্রেড',
    clear_filters: 'ফিল্টার মুছুন',
    asking_price: 'কাঙ্ক্ষিত দর',
    place_bid: 'দরপ্রস্তাব দিন',
    buy_direct: 'সরাসরি কিনুন',
    fulfill_demand: 'চাহিদা পূরণ করুন',
    volume: 'পরিমাণ',
    grade: 'গ্রেড',

    price_discovery_title: 'লাইভ মন্ডি দর ও এআই মূল্য পূর্বাভাস',
    price_discovery_sub: 'ভারতের বিভিন্ন মন্ডির লাইভ দর, ৩০ দিনের ইতিহাস চার্ট এবং বিক্রয় পরামর্শ।',
    search_commodity_placeholder: 'ফসল খুঁজুন (যেমন ধান, গম, পাট, আলু, পেঁয়াজ)...',
    select_state_filter: 'সকল রাজ্য',
    historical_trends: 'ঐতিহাসিক মূল্যের ট্রেন্ড',
    modal_price: 'গড় দর',
    min_price: 'সর্বনিম্ন দর',
    max_price: 'সর্বোচ্চ দর',
    ai_recommendation: 'এআই বিক্রয় পরামর্শ',
    sell_now: 'এখনই বিক্রি করুন',
    hold_product: 'মজুদ রাখুন',
    chart_30_days: '৩০ দিনের ইতিহাস',

    mandi_directory_title: 'জাতীয় মন্ডি ডিরেক্টরি',
    mandi_directory_sub: 'শস্য মন্ডি, দৈনিক শস্যের আগমন এবং অনুমোদিত আড়তদারদের তালিকা।',
    search_mandi: 'মন্ডি বা জেলা খুঁজুন...',
    active_traders: 'সক্রিয় ব্যবসায়ী',
    daily_volume: 'দৈনিক আগমন',
    contact_director: 'মন্ডি অফিস যোগাযোগ',
    get_directions: 'দিকনির্দেশ পান',

    schemes_title: 'কেন্দ্রীয় ও রাজ্য কৃষি প্রকল্প',
    schemes_sub: 'কৃষকদের জন্য সরকারি অনুদান, আর্থিক সহায়তা এবং ফসল বিমা প্রকল্প।',
    apply_online: 'অনলাইনে আবেদন করুন',
    subsidy_rate: 'ভর্তুকি / সুবিধা',
    eligibility: 'যোগ্যতার মানদণ্ড',
    read_guidelines: 'অফিসিয়াল নির্দেশিকা',

    loans_title: 'স্বল্প সুদে কিষাণ ক্রেডিট ও কৃষি ঋণ',
    loans_sub: '৪% ভর্তুকি সুদে কিষাণ ক্রেডিট কার্ড (KCC) এবং সহজ ঋণ।',
    apply_loan: 'ঋণের আবেদন করুন',
    interest_rate: 'সুদের হার',
    instant_approval: 'দ্রুত অনুমোদন',
    loan_calculator: 'ঋণ ক্যালকুলেটর',

    smart_match_title: 'এআই স্মার্ট ম্যাচ: ফসল ও ক্রেতা সংযোগ',
    smart_match_sub: 'সর্বোচ্চ লাভের জন্য কৃষক এবং প্রাতিষ্ঠানিক ক্রেতাদের মধ্যে সরাসরি সংযোগ।',
    match_score: 'ম্যাচ স্কোর',
    connect_buyer: 'ক্রেতার সাথে যোগাযোগ',
    create_contract: 'সরাসরি চুক্তি করুন',

    logistics_title: 'কোল্ড স্টোরেজ ও কৃষি পরিবহন বুকিং',
    logistics_sub: 'প্রত্যয়িত হিমাগার এবং খামার থেকে মন্ডি পর্যন্ত নিরাপদ পরিবহন ব্যবস্থা।',
    book_storage: 'কোল্ড স্টোরেজ বুক করুন',
    book_transport: 'ট্রাক বুক করুন',
    available_capacity: 'উপলব্ধ ক্ষমতা',

    orders_title: 'এসক্রো সুরক্ষিত অর্ডার ও লেনদেন',
    orders_sub: 'নিরাপদ ডিজিটাল বাণিজ্য: পণ্যের গুণমান পরীক্ষা না হওয়া পর্যন্ত অর্থ সুরক্ষিত থাকে।',
    escrow_status: 'এসক্রো অবস্থা',
    track_delivery: 'অর্ডার ট্র্যাক করুন',
    release_funds: 'কৃষককে অর্থ পরিশোধ করুন',

    grievance_title: 'মন্ডি ও পেমেন্ট অভিযোগ নিষ্পত্তি ডেস্ক',
    grievance_sub: 'ওজন বৈষম্য, বিলম্বিত পেমেন্ট এবং ফসলের মান সংক্রান্ত বিরোধ নিষ্পত্তির প্ল্যাটফর্ম।',
    file_grievance: 'নতুন অভিযোগ দায়ের করুন',
    track_grievance: 'অভিযোগের অবস্থা জানুন',
    helpline_number: 'জাতীয় হেল্পলাইন: ১৮০০-১৮০-১৫৫১',

    buyer_panel_title: 'প্রাতিষ্ঠানিক ক্রেতা ড্যাশবোর্ড',
    buyer_panel_sub: 'পাইকারি ক্রয়, চুক্তিভিত্তিক চাষাবাদ ব্যবস্থাপনা এবং স্বয়ংক্রিয় অর্থপ্রদান।',
    fpo_panel_title: 'কৃষক উৎপাদক সংস্থা (FPO) কেন্দ্র',
    fpo_panel_sub: 'সম্মিলিত ফসল বিক্রয়, সার-বীজে ছাড় এবং সদস্যদের লভ্যাংশ বণ্টন।',
    admin_panel_title: 'কৃষিলিংক প্রশাসনিক কনসোল',
    admin_panel_sub: 'জাতীয় কৃষি বাণিজ্য বিশ্লেষণ, ব্যবহারকারী যাচাইকরণ এবং পর্যবেক্ষণ।',

    ai_title: 'কৃষি-AI সহকারী',
    ai_copilot: 'কৃষি-AI উপদেষ্টা',
    ai_greeting: 'নমস্কার! আমি কৃষি-AI। ফসলের দর, ক্রেতা বা স্টোরেজ সংক্রান্ত বিষয়ে আজ আমি আপনাকে কীভাবে সাহায্য করতে পারি?',
    ai_placeholder: 'কৃষি-AI কে জিজ্ঞাসা করুন...',
    ai_placeholder_detailed: 'কৃষি-AI কে জিজ্ঞাসা করুন (যেমন: আমার কি এখন আলু বিক্রি করা উচিত?)',
    ai_disclaimer: 'কৃষি পরামর্শদাতা • জেমিনি AI দ্বারা চালিত',
    ai_ask_btn: 'পাঠান',
    ai_listening: 'শুনছি...',

    search: 'অনুসন্ধান',
    filter: 'ফিল্টার',
    refresh: 'রিফ্রেশ',
    all: 'সব',
    loading: 'লোড হচ্ছে...',
    apply_now: 'এখনই আবেদন করুন',
    view_details: 'বিস্তারিত দেখুন',
    footer_text: '🌾 কৃষিলিংক — বাজার সংযোগ ও মূল্য আবিষ্কার প্ল্যাটফর্ম'
  }
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    const saved = localStorage.getItem('krishilink_language');
    if (saved && TRANSLATIONS[saved]) {
      return saved;
    }
    return 'English';
  });

  const setLanguage = (newLang) => {
    const matched = LANGUAGES.find(
      l => l.code.toLowerCase() === (newLang || '').toLowerCase() ||
           l.label.toLowerCase() === (newLang || '').toLowerCase()
    );
    const targetLang = matched ? matched.code : (TRANSLATIONS[newLang] ? newLang : 'English');
    setLanguageState(targetLang);
    localStorage.setItem('krishilink_language', targetLang);
    try {
      document.documentElement.lang = targetLang === 'English' ? 'en' :
        targetLang === 'Hindi' ? 'hi' :
        targetLang === 'Punjabi' ? 'pa' :
        targetLang === 'Gujarati' ? 'gu' :
        targetLang === 'Marathi' ? 'mr' :
        targetLang === 'Telugu' ? 'te' :
        targetLang === 'Tamil' ? 'ta' :
        targetLang === 'Bengali' ? 'bn' : 'en';
    } catch (e) {
      console.warn(e);
    }
  };

  const t = (key, fallback) => {
    const currentDict = TRANSLATIONS[language];
    if (currentDict && currentDict[key]) {
      return currentDict[key];
    }
    if (TRANSLATIONS.English && TRANSLATIONS.English[key]) {
      return TRANSLATIONS.English[key];
    }
    return fallback !== undefined ? fallback : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, languages: LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
