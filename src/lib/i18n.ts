
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    common: {
      "settings": {
        "title": "Settings",
        "account": "Account",
        "notifications": "Notifications",
        "privacy": "Privacy",
        "policy": "Policies",
        "language": "Language",
        "currency": "Currency",
        "currencyDescription": "Currency used for rewards",
        "twoFactor": "Two-factor authentication",
        "twoFactorDescription": "Add an extra layer of security",
        "saveChanges": "Save Changes",
        "saving": "Saving...",
        "savePreferences": "Save Preferences",
        "saveSettings": "Save Settings",
        "success": "Success",
        "changesDone": "Changes done successfully"
      },
      "languages": {
        "en": "English",
        "te": "Telugu",
        "hi": "Hindi"
      },
      "currencies": {
        "inr": "INR (₹)",
        "usd": "USD ($)",
        "eur": "EUR (€)",
        "gbp": "GBP (£)",
        "cad": "CAD ($)"
      },
      "notifications": {
        "email": "Email Notifications",
        "pickup": "Pickup Reminders",
        "pickupDescription": "Get notified about upcoming pickups",
        "reward": "Reward Confirmations",
        "rewardDescription": "Get notified when you receive rewards",
        "newsletter": "Newsletter",
        "newsletterDescription": "Receive updates, tips, and sustainability news",
        "push": "Push Notifications",
        "pickupAlerts": "Pickup Alerts",
        "pickupAlertsDescription": "Get notifications about pickup status",
        "rewardAlerts": "Reward Alerts",
        "rewardAlertsDescription": "Get notifications about new rewards"
      },
      "privacy": {
        "title": "Privacy Settings",
        "description": "Control your data and privacy options.",
        "location": "Location Services",
        "locationDescription": "Allow access to your location for better pickup service",
        "dataCollection": "Data Collection",
        "dataCollectionDescription": "Help us improve by sharing usage data",
        "profileVisibility": "Profile Visibility",
        "profileVisibilityDescription": "Make your profile visible to other users",
        "deleteAccount": "Delete My Account",
        "deleting": "Deleting..."
      }
    }
  },
  te: {
    common: {
      "settings": {
        "title": "సెట్టింగులు",
        "account": "ఖాతా",
        "notifications": "నోటిఫికేషన్లు",
        "privacy": "గోప్యత",
        "policy": "విధానాలు",
        "language": "భాష",
        "currency": "కరెన్సీ",
        "currencyDescription": "బహుమతుల కోసం ఉపయోగించే కరెన్సీ",
        "twoFactor": "రెండు-కారకాల ప్రమాణీకరణ",
        "twoFactorDescription": "అదనపు భద్రత లేయర్ జోడించండి",
        "saveChanges": "మార్పులను సేవ్ చేయండి",
        "saving": "సేవ్ చేస్తోంది...",
        "savePreferences": "ప్రాధాన్యతలను సేవ్ చేయండి",
        "saveSettings": "సెట్టింగులను సేవ్ చేయండి",
        "success": "విజయం",
        "changesDone": "మార్పులు విజయవంతంగా పూర్తయ్యాయి"
      },
      "languages": {
        "en": "ఇంగ్లీష్",
        "te": "తెలుగు",
        "hi": "హిందీ"
      },
      "currencies": {
        "inr": "INR (₹)",
        "usd": "USD ($)",
        "eur": "EUR (€)",
        "gbp": "GBP (£)",
        "cad": "CAD ($)"
      },
      "notifications": {
        "email": "ఇమెయిల్ నోటిఫికేషన్లు",
        "pickup": "పికప్ రిమైండర్లు",
        "pickupDescription": "రాబోయే పికప్లు గురించి తెలుసుకోండి",
        "reward": "బహుమతి నిర్ధారణలు",
        "rewardDescription": "మీరు బహుమతులు పొందినప్పుడు తెలుసుకోండి",
        "newsletter": "న్యూస్‌లెటర్",
        "newsletterDescription": "అప్‌డేట్లు, చిట్కాలు మరియు స్థిరత్వ వార్తలను పొందండి",
        "push": "పుష్ నోటిఫికేషన్లు",
        "pickupAlerts": "పికప్ అలర్ట్లు",
        "pickupAlertsDescription": "పికప్ స్థితి గురించి నోటిఫికేషన్లు పొందండి",
        "rewardAlerts": "బహుమతి అలర్ట్లు",
        "rewardAlertsDescription": "కొత్త బహుమతుల గురించి నోటిఫికేషన్లు పొందండి"
      },
      "privacy": {
        "title": "గోప్యత సెట్టింగులు",
        "description": "మీ డేటా మరియు గోప్యత ఎంపికలను నియంత్రించండి.",
        "location": "లొకేషన్ సేవలు",
        "locationDescription": "మెరుగైన పికప్ సేవ కోసం మీ లొకేషన్‌కు యాక్సెస్ అనుమతించండి",
        "dataCollection": "డేటా సేకరణ",
        "dataCollectionDescription": "వినియోగ డేటాను భాగస్వామ్యం చేయడం ద్వారా మాకు మెరుగుపరచడంలో సహాయపడండి",
        "profileVisibility": "ప్రొఫైల్ దృశ్యమానత",
        "profileVisibilityDescription": "మీ ప్రొఫైల్‌ను ఇతర వినియోగదారులకు కనిపించేలా చేయండి",
        "deleteAccount": "నా ఖాతాను తొలగించండి",
        "deleting": "తొలగిస్తోంది..."
      }
    }
  },
  hi: {
    common: {
      "settings": {
        "title": "सेटिंग्स",
        "account": "खाता",
        "notifications": "सूचनाएं",
        "privacy": "गोपनीयता",
        "policy": "नीतियां",
        "language": "भाषा",
        "currency": "मुद्रा",
        "currencyDescription": "पुरस्कारों के लिए उपयोग की जाने वाली मुद्रा",
        "twoFactor": "द्विकारक प्रमाणीकरण",
        "twoFactorDescription": "सुरक्षा की एक अतिरिक्त परत जोड़ें",
        "saveChanges": "परिवर्तन सहेजें",
        "saving": "सहेजा जा रहा है...",
        "savePreferences": "प्राथमिकताएं सहेजें",
        "saveSettings": "सेटिंग्स सहेजें",
        "success": "सफलता",
        "changesDone": "परिवर्तन सफलतापूर्वक हो गए"
      },
      "languages": {
        "en": "अंग्रेजी",
        "te": "तेलुगू",
        "hi": "हिंदी"
      },
      "currencies": {
        "inr": "INR (₹)",
        "usd": "USD ($)",
        "eur": "EUR (€)",
        "gbp": "GBP (£)",
        "cad": "CAD ($)"
      },
      "notifications": {
        "email": "ईमेल सूचनाएं",
        "pickup": "पिकअप रिमाइंडर",
        "pickupDescription": "आगामी पिकअप के बारे में सूचित हों",
        "reward": "पुरस्कार पुष्टिकरण",
        "rewardDescription": "जब आप पुरस्कार प्राप्त करते हैं तो सूचित हों",
        "newsletter": "न्यूज़लेटर",
        "newsletterDescription": "अपडेट, सुझाव और स्थिरता समाचार प्राप्त करें",
        "push": "पुश सूचनाएं",
        "pickupAlerts": "पिकअप अलर्ट",
        "pickupAlertsDescription": "पिकअप स्थिति के बारे में सूचनाएं प्राप्त करें",
        "rewardAlerts": "पुरस्कार अलर्ट",
        "rewardAlertsDescription": "नए पुरस्कारों के बारे में सूचनाएं प्राप्त करें"
      },
      "privacy": {
        "title": "गोपनीयता सेटिंग्स",
        "description": "अपने डेटा और गोपनीयता विकल्पों को नियंत्रित करें।",
        "location": "स्थान सेवाएं",
        "locationDescription": "बेहतर पिकअप सेवा के लिए अपने स्थान तक पहुंच की अनुमति दें",
        "dataCollection": "डेटा संग्रह",
        "dataCollectionDescription": "उपयोग डेटा साझा करके हमें बेहतर बनाने में मदद करें",
        "profileVisibility": "प्रोफ़ाइल दृश्यता",
        "profileVisibilityDescription": "अपनी प्रोफ़ाइल को अन्य उपयोगकर्ताओं को दिखाएं",
        "deleteAccount": "मेरा खाता हटाएं",
        "deleting": "हटाया जा रहा है..."
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .init({
    fallbackLng: 'en',
    debug: false,
    
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    },

    interpolation: {
      escapeValue: false
    },

    resources,
    ns: ['common'],
    defaultNS: 'common'
  });

export default i18n;
