import { DeviceCategoryConfig, DeviceCondition, ClassificationResult } from '../types';

export const DEVICE_CATEGORIES: DeviceCategoryConfig[] = [
  {
    id: 'mobile-phone',
    name: 'Mobile Phone',
    iconName: 'Smartphone',
    description: 'Smartphones, feature phones, iPhones, and Android devices.',
    minPrice: 300,
    maxPrice: 2500,
    avgWeightKg: 0.2,
    carbonOffsetKg: 28,
    hazards: ['Lithium-ion battery', 'Lead solder', 'Brominated flame retardants'],
    recoverableMaterials: ['Gold (0.034g)', 'Silver (0.35g)', 'Copper (16g)', 'Cobalt', 'Palladium'],
    disposalMethod: 'Professional disassembly, automated battery separation, hydrometallurgical precious metal extraction, and NIST 800-88 compliant physical storage degaussing.'
  },
  {
    id: 'laptop',
    name: 'Laptop',
    iconName: 'Laptop',
    description: 'Ultrabooks, gaming laptops, MacBooks, netbooks, and business workstations.',
    minPrice: 800,
    maxPrice: 6000,
    avgWeightKg: 2.1,
    carbonOffsetKg: 180,
    hazards: ['Mercury in LCD backlights', 'Lithium battery', 'Cadmium'],
    recoverableMaterials: ['Aluminum chassis', 'Copper heat pipes', 'Gold RAM pins', 'Tantalum capacitors'],
    disposalMethod: 'Safe battery detachment, thermal paste neutralization, PCB smelting, and high-purity aluminum alloy recycling.'
  },
  {
    id: 'desktop-computer',
    name: 'Desktop Computer',
    iconName: 'Monitor',
    description: 'CPU towers, all-in-one PCs, servers, and workstation desktops.',
    minPrice: 500,
    maxPrice: 4000,
    avgWeightKg: 9.5,
    carbonOffsetKg: 240,
    hazards: ['Lead in CRT/motherboards', 'Beryllium oxide', 'Flame retardant casing'],
    recoverableMaterials: ['Steel chassis (5kg+)', 'Copper wiring', 'Silicon chips', 'Precious metal CPU pins'],
    disposalMethod: 'Mechanical shredding, magnetic ferrous separation, eddy-current non-ferrous sorting, and optical plastic grading.'
  },
  {
    id: 'tablet',
    name: 'Tablet',
    iconName: 'Tablet',
    description: 'iPads, Android tablets, e-readers, and graphic drawing pads.',
    minPrice: 500,
    maxPrice: 3000,
    avgWeightKg: 0.5,
    carbonOffsetKg: 45,
    hazards: ['Integrated polymer battery', 'Indium tin oxide touch glass'],
    recoverableMaterials: ['Lithium', 'Cobalt', 'Glass substrate', 'Rare earth neodymium magnets'],
    disposalMethod: 'Laser-guided screen de-bonding, inert chamber battery removal, and microchip chemical recovery.'
  },
  {
    id: 'television',
    name: 'Television',
    iconName: 'Tv',
    description: 'LED, OLED, LCD, Plasma, and legacy CRT TV sets.',
    minPrice: 500,
    maxPrice: 3500,
    avgWeightKg: 12.0,
    carbonOffsetKg: 160,
    hazards: ['Phosphor coatings', 'Mercury cold-cathode tubes', 'Lead glass in CRT'],
    recoverableMaterials: ['Copper deflection yokes', 'ABS plastic casing', 'High-grade optical diffusers'],
    disposalMethod: 'Controlled closed-loop vacuum separation, hazardous lead glass refining, and polymer granulating.'
  },
  {
    id: 'printer',
    name: 'Printer',
    iconName: 'Printer',
    description: 'LaserJet, InkJet, all-in-one scanners, and receipt printers.',
    minPrice: 200,
    maxPrice: 1500,
    avgWeightKg: 6.0,
    carbonOffsetKg: 55,
    hazards: ['Micro-toner particulate resins', 'Ozone filters', 'Volatile organic compounds'],
    recoverableMaterials: ['Stepper motors', 'Precision steel rods', 'Electronic controller boards'],
    disposalMethod: 'Toner vacuum extraction in sealed filtration units, motor dismantling, and high-impact polystyrene recycling.'
  },
  {
    id: 'battery',
    name: 'Battery',
    iconName: 'BatteryCharging',
    description: 'Power banks, laptop batteries, UPS lead-acid, and rechargeable cells.',
    minPrice: 100,
    maxPrice: 800,
    avgWeightKg: 0.8,
    carbonOffsetKg: 22,
    hazards: ['Sulfuric acid', 'Nickel-cadmium', 'Lithium hexafluorophosphate electrolyte'],
    recoverableMaterials: ['Cobalt sulfate', 'Lithium carbonate', 'Nickel', 'Manganese'],
    disposalMethod: 'Deep cryogenic discharge, inert atmosphere shredding, acid leaching, and battery-grade precursor synthesis.'
  },
  {
    id: 'charger',
    name: 'Charger',
    iconName: 'Plug',
    description: 'Phone adapters, laptop chargers, USB-C fast power bricks, and cords.',
    minPrice: 50,
    maxPrice: 300,
    avgWeightKg: 0.25,
    carbonOffsetKg: 8,
    hazards: ['PVC insulation halogens', 'Electrolytic capacitor fluids'],
    recoverableMaterials: ['High-conductivity copper wire', 'Ferrite transformer cores', 'Brass prongs'],
    disposalMethod: 'Cable stripping and granulating, acoustic copper-PVC gravity separation, and transformer core reclamation.'
  },
  {
    id: 'keyboard',
    name: 'Keyboard',
    iconName: 'Keyboard',
    description: 'Mechanical keyboards, membrane desktop keyboards, and wireless units.',
    minPrice: 50,
    maxPrice: 400,
    avgWeightKg: 0.8,
    carbonOffsetKg: 12,
    hazards: ['Brominated flame retardant plastics'],
    recoverableMaterials: ['PBT/ABS keycaps', 'Gold-plated mechanical switch leaves', 'Flexible Mylar circuits'],
    disposalMethod: 'De-soldering, contact pin reclamation, mechanical plastic shredding, and polymer recycling.'
  },
  {
    id: 'mouse',
    name: 'Mouse',
    iconName: 'Mouse',
    description: 'Optical mice, laser gaming mice, trackballs, and wireless pointers.',
    minPrice: 30,
    maxPrice: 250,
    avgWeightKg: 0.15,
    carbonOffsetKg: 5,
    hazards: ['Micro switch lead solder'],
    recoverableMaterials: ['Miniature optical sensors', 'Microswitches', 'Shielded USB copper cabling'],
    disposalMethod: 'Micro-component classification, sensor desoldering, and housing polymer pelletizing.'
  },
  {
    id: 'other',
    name: 'Other Electronic Devices',
    iconName: 'Cpu',
    description: 'Routers, smart home devices, audio systems, headphones, and gaming consoles.',
    minPrice: 100,
    maxPrice: 2000,
    avgWeightKg: 1.5,
    carbonOffsetKg: 35,
    hazards: ['General electronic circuitry metals', 'Battery residues'],
    recoverableMaterials: ['Integrated circuits', 'Capacitors', 'Copper wiring', 'Structural polymers'],
    disposalMethod: 'Manual inspection, hazardous sub-assembly isolation, and high-efficiency material recovery.'
  }
];

export const CONDITION_MULTIPLIERS: Record<DeviceCondition, { factor: number; label: string; desc: string }> = {
  'Working': {
    factor: 1.0,
    label: 'Fully Functional (100% Value)',
    desc: 'Powers on, display/functions operate properly, suitable for refurbishing or component reuse.'
  },
  'Partially Working': {
    factor: 0.65,
    label: 'Partially Working (~65% Value)',
    desc: 'Minor hardware faults, worn battery, or damaged port but core motherboard is intact.'
  },
  'Not Working': {
    factor: 0.4,
    label: 'Not Working (~40% Value)',
    desc: 'Does not power on or major component failure; eligible for circuit & material recovery.'
  },
  'Damaged': {
    factor: 0.2,
    label: 'Physical Damage / Broken (~20% Value)',
    desc: 'Cracked casing, screen shatter, water exposure; harvested for precious metals & safe smelting.'
  }
};

export function calculateClassification(
  categoryId: string,
  condition: DeviceCondition,
  quantity: number = 1
): ClassificationResult {
  const category = DEVICE_CATEGORIES.find(c => c.id === categoryId) || DEVICE_CATEGORIES[0];
  const multiplier = CONDITION_MULTIPLIERS[condition]?.factor || 1.0;
  const safeQuantity = Math.max(1, Math.min(100, Number(quantity) || 1));

  const minValPerUnit = Math.round(category.minPrice * multiplier);
  const maxValPerUnit = Math.round(category.maxPrice * multiplier);
  // A balanced realistic estimate in the upper-middle spectrum for reward
  const recommendedUnitVal = Math.round((minValPerUnit + maxValPerUnit) / 2);

  const totalReward = recommendedUnitVal * safeQuantity;
  const totalCarbonOffset = Math.round(category.carbonOffsetKg * safeQuantity * 10) / 10;
  const totalWeight = Math.round(category.avgWeightKg * safeQuantity * 10) / 10;

  const disposalAdvice = [
    `Recommended Recycling Process: ${category.disposalMethod}`,
    `Hazard Mitigation: Safe neutralization of ${category.hazards.join(', ')}.`,
    `Material Recovery Potential: High recovery yield for ${category.recoverableMaterials.slice(0, 3).join(', ')}.`,
    `Environmental Impact: Disposing through this channel avoids ~${totalCarbonOffset} kg of CO2 equivalent emissions.`
  ];

  return {
    category,
    condition,
    quantity: safeQuantity,
    estimatedMinValue: minValPerUnit * safeQuantity,
    estimatedMaxValue: maxValPerUnit * safeQuantity,
    recommendedValue: recommendedUnitVal,
    totalEstimatedReward: totalReward,
    totalCarbonOffsetKg: totalCarbonOffset,
    totalWeightKg: totalWeight,
    disposalAdvice
  };
}

export const INDIAN_CITIES = [
  'Guntur',
  'Vijayawada',
  'Amaravati',
  'Visakhapatnam',
  'Tirupati',
  'Hyderabad',
  'Warangal',
  'Chennai',
  'Coimbatore',
  'Bengaluru',
  'Mysuru',
  'Kochi',
  'Mumbai',
  'Pune',
  'Delhi NCR',
  'Kolkata'
];

export const INDIAN_STATES = [
  'Andhra Pradesh',
  'Telangana',
  'Tamil Nadu',
  'Karnataka',
  'Kerala',
  'Maharashtra',
  'Delhi',
  'West Bengal',
  'Gujarat'
];

export const TIME_SLOTS = [
  '9:00 AM – 11:00 AM',
  '11:00 AM – 1:00 PM',
  '2:00 PM – 4:00 PM',
  '4:00 PM – 6:00 PM'
];
