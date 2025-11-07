# Solar Proposal PDF Generator Setup

## 📦 Required Packages Installation

Run these commands to install the necessary packages for PDF generation:

```bash
# Install PDF generation library
npm install react-native-html-to-pdf

# Install file sharing (optional but recommended)
npm install react-native-share

# Install file viewer (optional but recommended)
npm install react-native-file-viewer
```

## 🔧 Android Permissions

Add these permissions to `android/app/src/main/AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
```

## 📱 Usage

1. Import the component in your screen:
```tsx
import ProposalGenerator from '../components/ProposalGenerator';
```

2. Add it to your screen:
```tsx
<ProposalGenerator />
```

## 🎨 Features

- ✅ Matches the exact design from your solar proposal image
- ✅ Professional gradient design with Rising Sun branding
- ✅ Environmental impact calculations
- ✅ Customer information display
- ✅ Price breakdown with disclaimers
- ✅ Contact information section

## 📋 Generated PDF Includes

- Customer name and address
- Solar capacity recommendations (3 kWp)
- Roof area requirements (360 Sq. ft / 33 Sq. m)
- Bill savings percentage (55%)
- Environmental impact:
  - CO₂ reduction (47 metric tons)
  - Trees planted equivalent (774)
  - Coal burn avoided (23 metric tons)
- Price estimation (₹1,86,380)
- Contact details

## 🔧 Customization

You can customize the proposal by passing customer data to the `generateProposalPDF` function:

```tsx
const customerData = {
  name: "John Doe",
  address: "123 Main Street, City, State - 12345",
  solarCapacity: "5 kWp",
  roofArea: "500 Sq. ft",
  roofAreaM2: "46 Sq. m",
  billSavings: "65%",
  co2Reduced: "62",
  treesPlanted: "1020",
  coalAvoided: "31",
  price: "₹2,45,000",
  contactPerson: "Sales Manager",
  email: "contact@company.com",
  phone: "9876543210"
};

generateProposalPDF(customerData);
```

## 📂 File Location

Generated PDFs are saved to:
- **Android**: `/storage/emulated/0/Documents/SolarProposal_CustomerName.pdf`
- **iOS**: `Documents` folder in app sandbox

## 🚀 Next Steps

1. Install the packages
2. Add the component to your app
3. Test PDF generation
4. Customize with your branding/data