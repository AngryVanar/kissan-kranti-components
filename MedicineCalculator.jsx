import React, { useState, useEffect } from "react";

const dosageMapping = {
  apple_black_rot_1: { value: 12, unit: "L" },
  apple_black_rot_2: { value: 1, unit: "kg" },
  apple_cedar_rust_1: { value: 12, unit: "L" },
  apple_cedar_rust_2: { value: 12, unit: "L" },
  apple_scab_1: { value: 12, unit: "L" },
  apple_scab_2: { value: 140, unit: "ML" },
  cherry_powder_1: { value: 12, unit: "L" },
  cherry_powder_2: { value: 1233, unit: "kg" },
  corn_common_rust1: { value: 1, unit: "L" },
  corn_common_rust2: { value: 5, unit: "kg" },
  corn_gray_leaf_spot1: { value: 12, unit: "L" },
  corn_gray_leaf_spot2: { value: 12, unit: "L" },
  corn_northern_leaf_blight1: { value: 1, unit: "L" },
  corn_northern_leaf_blight2: { value: 5, unit: "kg" },
  grapes_black_measles1: { value: 1, unit: "kg" },
  grapes_black_measles2: { value: 5, unit: "kg" },
  grapes_black_rot1: { value: 1, unit: "L" },
  grapes_black_rot2: { value: 5, unit: "kg" },
  grapes_leaf_spot1: { value: 1, unit: "L" },
  grapes_leaf_spot2: { value: 5, unit: "kg" },
  peach_bacterial_spot1: { value: 1, unit: "kg" },
  peach_bacterial_spot2: { value: 5, unit: "kg" },
  pepper_bacterial_spot1: { value: 1, unit: "kg" },
  pepper_bacterial_spot2: { value: 5, unit: "kg" },
  potato_early_blight1: { value: 1, unit: "L" },
  potato_early_blight2: { value: 5, unit: "kg" },
  potato_late_blight1: { value: 1, unit: "L" },
  potato_late_blight2: { value: 5, unit: "kg" },
  strawberry_leaf_scorch1: { value: 5, unit: "kg" },
  strawberry_leaf_scorch2: { value: 1, unit: "kg" },
  tomato_bacterial_spot1: { value: 1, unit: "L" },
  tomato_bacterial_spot2: { value: 5, unit: "kg" },
  tomato_early_blight1: { value: 1, unit: "L" },
  tomato_early_blight2: { value: 1, unit: "kg" },
  tomato_early_blight3: { value: 5, unit: "kg" },
  tomato_late_blight1: { value: 1, unit: "L" },
  tomato_late_blight2: { value: 1, unit: "kg" },
  tomato_late_blight3: { value: 5, unit: "kg" },
  tomato_leaf_mold1: { value: 1, unit: "L" },
  tomato_leaf_mold2: { value: 1, unit: "kg" },
  tomato_leaf_mold3: { value: 5, unit: "kg" },
  tomato_leaf_spot1: { value: 1, unit: "L" },
  tomato_leaf_spot2: { value: 1, unit: "kg" },
  tomato_leaf_spot3: { value: 5, unit: "kg" },
  tomato_mosaic_virus1: { value: 12, unit: "L" },
  tomato_mosaic_virus2: { value: 1, unit: "L" },
  tomato_spider_mite1: { value: 1, unit: "L" },
  tomato_spider_mite2: { value: 1, unit: "L" },
  tomato_spider_mite3: { value: 5, unit: "kg" },
  tomato_target_spot1: { value: 1, unit: "L" },
  tomato_target_spot2: { value: 1, unit: "L" },
  tomato_target_spot3: { value: 5, unit: "kg" },
  tomato_Yellow_Leaf_Curl_Virus1: { value: 1, unit: "L" },
  tomato_Yellow_Leaf_Curl_Virus2: { value: 1, unit: "L" },
  tomato_Yellow_Leaf_Curl_Virus3: { value: 5, unit: "kg" },
  moneyPlantOrganic: { value: 5, unit: "tons/acre" },
  moneyPlantChemical: { value: 50, unit: "kg NPK (10:10:10)/acre" },
  moneyPlantChemical_2: { value: 100, unit: "kg NPK (10:10:10)/acre" },
  moneyPlantManganeseLime: { value: 1, unit: "tons/acre" },
  moneyPlantManganeseGypsum: { value: 200, unit: "kg/acre" },
  moneyPlantManganeseBalancedNPK: { value: 50, unit: "kg/acre" },

  cucumberDowneyBasalDose: { value: 100, unit: "kg NPK (10:26:26)/acre" },
  cucumberDowneyTopDressingPotassiumSulfate: { value: 25, unit: "kg/acre" },
  cucumberDowneyTopDressingMonoPotassiumPhosphate: {
    value: 3,
    unit: "kg/acre",
  },
  cucumberDowneyOrganic: { value: 1, unit: "tons/acre" },

  cucumberPowderyBasal: { value: 100, unit: "kg NPK (10:26:26)/acre" },
  cucumberPowderySilicon: { value: 50, unit: "kg/acre" },
  cucumberPowderyOrganic: { value: 1, unit: "tons/acre" },

  watermelonDowneyBasal: { value: 100, unit: "kg NPK (10:26:26)/acre" },
  watermelonDowneyTopDressingPotassiumSulfate: { value: 25, unit: "kg/acre" },
  watermelonDowneyTopDressingMonoPotassiumPhosphate: {
    value: 3,
    unit: "kg/acre",
  },
  watermelonDowneyOrganic: { value: 1, unit: "tons/acre" },

  watermelonMosaicBasal: { value: 100, unit: "kg NPK (10:20:20)/acre" },
  watermelonMosaicTopDressing: { value: 25, unit: "kg/acre" },
  watermelonMosaicFoliarSprayMicronutrient: { value: 2, unit: "g/L" },
  watermelonMosaicOrganic: { value: 1, unit: "tons/acre" },

  sugarcaneBacterialBlightBasal: { value: 100, unit: "kg NPK (12:32:16)/acre" },
  sugarcaneBacterialBlightTopDressingUrea: { value: 50, unit: "kg/acre" },
  sugarcaneBacterialBlightTopDressingPotassiumSulfate: {
    value: 25,
    unit: "kg/acre",
  },
  sugarcaneBacterialBlightMicronutrient: { value: 2, unit: "g/L" },
  sugarcaneBacterialBlightOrganic: { value: 2, unit: "tons/acre" },

  sugarcaneRedRotBasal: { value: 125, unit: "kg NPK (10:26:26)/acre" },
  sugarcaneRedRotTopDressingPotassiumSulfate: { value: 50, unit: "kg/acre" },
  sugarcaneRedRotTopDressingUrea: { value: 50, unit: "kg/acre" },
  sugarcaneRedRotMicronutrient: { value: 2, unit: "g/L" },
  sugarcaneRedRotOrganic: { value: 2, unit: "tons/acre" },

  bananaBlackSigatokaBasal: { value: 150, unit: "kg NPK (14:14:14)/acre" },
  bananaBlackSigatokaTopDressing: { value: 100, unit: "kg/acre" },
  bananaBlackSigatokaTopDressingPotassiumSulfate: {
    value: 100,
    unit: "kg/acre",
  },
  bananaBlackSigatokaMicronutrient: { value: 2, unit: "g/L" },
  bananaBlackSigatokaOrganic: { value: 3, unit: "tons/acre" },

  bananaBractMosaicBasal: { value: 150, unit: "kg NPK (14:14:14)/acre" },
  bananaBractMosaicTopDressing: { value: 100, unit: "kg/acre" },
  bananaBractMosaicTopDressingPotassiumSulfate: { value: 100, unit: "kg/acre" },
  bananaBractMosaicMicronutrient: { value: 2, unit: "g/L" },
  bananaBractMosaicOrganic: { value: 3, unit: "tons/acre" },

  bananaMokoBasal: { value: 150, unit: "kg NPK (14:14:14)/acre" },
  bananaMokoTopDressingUrea: { value: 100, unit: "kg/acre" },
  bananaMokoTopDressingPotassiumSulfate: { value: 100, unit: "kg/acre" },
  bananaMokoMicronutrient: { value: 2, unit: "g/L" },
  bananaMokoOrganic: { value: 3, unit: "tons/acre" },

  bananaPanamaBasal: { value: 150, unit: "kg NPK (14:14:14)/acre" },
  bananaPanamaTopDressingUrea: { value: 100, unit: "kg/acre" },
  bananaPanamaTopDressingPotassiumSulfate: { value: 100, unit: "kg/acre" },
  bananaPanamaMicronutrient: { value: 2, unit: "g/L" },
  bananaPanamaOrganic: { value: 3, unit: "tons/acre" },

  bananaYellowSigatokaBasal: {
    value: 150,
    unit: "kg NPK (14:14:14 or 20:20:20)/acre",
  },
  bananaYellowSigatokaTopDressing: {
    value: 100,
    unit: "kg Urea and Potassium Sulfate/acre",
  },
  bananaYellowSigatokaMicronutrient: { value: 2, unit: "g/L Zinc or Borax" },

  potatoNematodeBasal: { value: 150, unit: "kg NPK (14:14:14)/acre" },
  potatoNematodeTripleSuperphosphate: { value: 50, unit: "kg/acre" },
  potatoNematodeGypsum: { value: 100, unit: "kg/acre" },
  potatoNematodeTopDressingUrea: { value: 100, unit: "kg/acre" },
  potatoNematodeTopDressingPotassiumSulfate: { value: 100, unit: "kg/acre" },
  potatoNematodeTopDressingCalciumNitrate: { value: 100, unit: "kg/acre" },
  potatoNematodeMicronutrient: { value: 2, unit: "g/L" },
  potatoNematodeOrganic: { value: 3, unit: "tons/acre" },

  potatoPestBasal: { value: 150, unit: "kg NPK (14:14:14)/acre" },
  potatoPestTripleSuperphosphate: { value: 50, unit: "kg/acre" },
  potatoPestGypsum: { value: 100, unit: "kg/acre" },
  potatoPestTopDressingUrea: { value: 50, unit: "kg/acre" },
  potatoPestTopDressingPotassiumSulfate: { value: 100, unit: "kg/acre" },
  potatoPestTopDressingCalciumNitrate: { value: 100, unit: "kg/acre" },
  potatoPestTopDressingMagnesiumSulfate: { value: 50, unit: "kg/acre" },
  potatoPestMicronutrient: { value: 2, unit: "g/L" },
  potatoPestOrganic: { value: 3, unit: "tons/acre" },

  maizeFallArmywormBasal: { value: 150, unit: "kg NPK (14:14:14)/acre" },
  maizeFallArmywormTripleSuperphosphate: { value: 50, unit: "kg/acre" },
  maizeFallArmywormGypsum: { value: 100, unit: "kg/acre" },
  maizeFallArmywormTopDressingUrea: { value: 50, unit: "kg/acre" },
  maizeFallArmywormTopDressingPotassiumSulfate: { value: 100, unit: "kg/acre" },
  maizeFallArmywormTopDressingCalciumNitrate: { value: 100, unit: "kg/acre" },
  maizeFallArmywormTopDressingMagnesiumSulfate: { value: 50, unit: "kg/acre" },
  maizeFallArmywormMicronutrient: { value: 2, unit: "g/L" },
  maizeFallArmywormOrganic: { value: 3, unit: "tons/acre" },

  maizeGrasshopperBasal: { value: 150, unit: "kg NPK (14:14:14)/acre" },
  maizeGrasshopperTripleSuperphosphate: { value: 50, unit: "kg/acre" },
  maizeGrasshopperGypsum: { value: 100, unit: "kg/acre" },
  maizeGrasshopperTopDressingUrea: { value: 50, unit: "kg/acre" },
  maizeGrasshopperTopDressingPotassiumSulfate: { value: 100, unit: "kg/acre" },
  maizeGrasshopperTopDressingCalciumNitrate: { value: 100, unit: "kg/acre" },
  maizeGrasshopperTopDressingMagnesiumSulfate: { value: 50, unit: "kg/acre" },
  maizeGrasshopperMicronutrient: { value: 2, unit: "g/L" },
  maizeGrasshopperOrganic: { value: 3, unit: "tons/acre" },

  maizeLeafBattleBasal: { value: 150, unit: "kg NPK (14:14:14)/acre" },
  maizeLeafBattleTripleSuperphosphate: { value: 50, unit: "kg/acre" },
  maizeLeafBattleGypsum: { value: 100, unit: "kg/acre" },
  maizeLeafBattleTopDressingUrea: { value: 50, unit: "kg/acre" },
  maizeLeafBattleTopDressingPotassiumSulfate: { value: 100, unit: "kg/acre" },
  maizeLeafBattleTopDressingCalciumNitrate: { value: 100, unit: "kg/acre" },
  maizeLeafBattleTopDressingMagnesiumSulfate: { value: 50, unit: "kg/acre" },
  maizeLeafBattleMicronutrient: { value: 2, unit: "g/L" },
  maizeLeafBattleOrganic: { value: 3, unit: "tons/acre" },

  cashewAnthracnoseBasal: { value: 100, unit: "kg NPK (14:14:14)/acre" },
  cashewAnthracnoseSuperphosphate: { value: 50, unit: "kg/acre" },
  cashewAnthracnoseGypsum: { value: 50, unit: "kg/acre" },
  cashewAnthracnoseTopDressingUrea: { value: 30, unit: "kg/acre" },
  cashewAnthracnoseTopDressingPotassiumSulfate: { value: 100, unit: "kg/acre" },
  cashewAnthracnoseTopDressingCalciumNitrate: { value: 50, unit: "kg/acre" },
  cashewAnthracnoseTopDressingMagnesiumSulfate: { value: 50, unit: "kg/acre" },
  cashewAnthracnoseMicronutrient: { value: 2, unit: "g/L" },
  cashewAnthracnoseOrganic: { value: 3, unit: "tons/acre" },

  cottonAmericanBollwormBasal: { value: 100, unit: "kg NPK (14:14:14)/acre" },
  cottonAmericanBollwormSuperphosphate: { value: 50, unit: "kg/acre" },
  cottonAmericanBollwormGypsum: { value: 50, unit: "kg/acre" },
  cottonAmericanBollwormTopDressingUrea: { value: 50, unit: "kg/acre" },
  cottonAmericanBollwormTopDressingPotassiumSulfate: {
    value: 100,
    unit: "kg/acre",
  },
  cottonAmericanBollwormTopDressingCalciumNitrate: {
    value: 50,
    unit: "kg/acre",
  },
  cottonAmericanBollwormTopDressingMagnesiumSulfate: {
    value: 50,
    unit: "kg/acre",
  },
  cottonAmericanBollwormMicronutrient: { value: 2, unit: "g/L" },
  cottonAmericanBollwormOrganic: { value: 3, unit: "tons/acre" },

  cottonAnthracnoseBasal: { value: 100, unit: "kg NPK (14:14:14)/acre" },
  cottonAnthracnoseSuperphosphate: { value: 50, unit: "kg/acre" },
  cottonAnthracnoseGypsum: { value: 50, unit: "kg/acre" },
  cottonAnthracnoseTopDressingUrea: { value: 30, unit: "kg/acre" },
  cottonAnthracnoseTopDressingPotassiumSulfate: { value: 100, unit: "kg/acre" },
  cottonAnthracnoseTopDressingCalciumNitrate: { value: 50, unit: "kg/acre" },
  cottonAnthracnoseTopDressingMagnesiumSulfate: { value: 50, unit: "kg/acre" },
  cottonAnthracnoseMicronutrient: { value: 2, unit: "g/L" },
  cottonAnthracnoseOrganic: { value: 3, unit: "tons/acre" },

  cottonAphidBasal: { value: 100, unit: "kg NPK (14:14:14)/acre" },
  cottonAphidSuperphosphate: { value: 50, unit: "kg/acre" },
  cottonAphidGypsum: { value: 50, unit: "kg/acre" },
  cottonAphidTopDressingUrea: { value: 30, unit: "kg/acre" },
  cottonAphidTopDressingPotassiumSulfate: { value: 100, unit: "kg/acre" },
  cottonAphidTopDressingCalciumNitrate: { value: 50, unit: "kg/acre" },
  cottonAphidTopDressingMagnesiumSulfate: { value: 50, unit: "kg/acre" },
  cottonAphidMicronutrient: { value: 2, unit: "g/L" },
  cottonAphidOrganic: { value: 3, unit: "tons/acre" },
};

const conversionRates = {
  acre: 1,
  hectare: 0.4047,
  katha: 32,
  cent: 100,
  kanal: 8,
  bigha_punjab: 3.025,
  bigha_rajasthan: 1.6,
};

function MedicineCalculator() {
  const [cropDisease, setCropDisease] = useState("");
  const [perUnitDosage, setPerUnitDosage] = useState(null);
  const [area, setArea] = useState("");
  const [fromUnit, setFromUnit] = useState("acre");
  const [result, setResult] = useState("");

  const handleCropDiseaseChange = (event) => {
    setCropDisease(event.target.value);
  };

  const handleAreaChange = (event) => {
    setArea(event.target.value);
  };

  const handleFromUnitChange = (event) => {
    setFromUnit(event.target.value);
  };

  useEffect(() => {
    if (cropDisease) {
      const dosageInfo = dosageMapping[cropDisease];
      if (dosageInfo && fromUnit) {
        // Dosage per unit should be based on selected unit (area unit) without multiplying by conversion factor.
        // Use the base dosage value from dosageMapping for the per unit calculation.
        const conversionRate = conversionRates[fromUnit] || 1; // Default to 1 if no conversion rate exists.
        setPerUnitDosage(dosageInfo.value / conversionRate); // Adjust dosage based on area unit.
      }
    }
  }, [cropDisease, fromUnit]);

  const calculateDosage = () => {
    if (isNaN(area) || area <= 0) {
      setResult("Please enter a valid land area.");
      return;
    }

    const dosageInfo = dosageMapping[cropDisease];
    if (!dosageInfo) {
      setResult("Invalid crop or disease selection.");
      return;
    }

    if (!conversionRates[fromUnit]) {
      setResult("Invalid unit selection.");
      return;
    }

    const areaInAcres = area / conversionRates[fromUnit];
    const totalDosage = (areaInAcres * dosageInfo.value).toFixed(2);

    setResult(
      `Total dosage for ${area} ${fromUnit}(s): ${totalDosage} ${dosageInfo.unit}`
    );
  };

  return (
    <div className="max-w-3xl mx-5 md:mx-auto bg-[#ffffff] text-black shadow-lg z-20 p-8 rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Crop Disease Dosage Calculator
      </h1>

      <div className="mb-4">
        <label
          htmlFor="crop-disease"
          className="block text-lg font-medium mb-2"
        >
          Select Crop Disease:
        </label>
        <select
          id="crop-disease"
          value={cropDisease}
          onChange={handleCropDiseaseChange}
          className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="select">--Select--</option>
          <option value="apple_black_rot_1">
            Apple - Black Rot (Copper Fungicide)
          </option>
          <option value="apple_black_rot_2">
            Apple - Black Rot (Organic Fertilizer)
          </option>
          <option value="apple_cedar_rust_1">
            Apple - Cedar Rust (Copper Fungicide)
          </option>
          <option value="apple_cedar_rust_2">
            Apple - Cedar Rust (Sulfur Fungicide)
          </option>
          <option value="apple_scab_1">Apple - Scab (Copper Fungicide)</option>
          <option value="apple_scab_2">Apple - Scab (Bio Fungicides)</option>
          <option value="cherry_powder_1">
            Cherry Powdery Mildew (Sulfur Fungicide)
          </option>
          <option value="cherry_powder_2">
            Cherry Powdery Mildew (Potassium Bicarbonate)
          </option>
          <option value="corn_common_rust1">
            Corn - Common Rust (Pyraclostrobin)
          </option>
          <option value="corn_common_rust2">
            Corn - Common Rust (NPK 15-15-15)
          </option>
          <option value="corn_gray_leaf_spot1">
            Corn - Gray Leaf Spot (Copper Fungicide)
          </option>
          <option value="corn_gray_leaf_spot2">
            Corn - Gray Leaf Spot (Triazole Fungicide)
          </option>
          <option value="corn_northern_leaf_blight1">
            Corn - Northern Leaf Blight (Azoxystrobin)
          </option>
          <option value="corn_northern_leaf_blight2">
            Corn - Northern Leaf Blight (NPK 20-10-10)
          </option>
          <option value="grapes_black_measles1">
            Grapes - Black Measles (Mancozeb)
          </option>
          <option value="grapes_black_measles2">
            Grapes - Black Measles (NPK 10-10-10)
          </option>
          <option value="grapes_black_rot1">
            Grapes - Black Rot (Myclobutanil)
          </option>
          <option value="grapes_black_rot2">
            Grapes - Black Rot (NPK 15-15-15)
          </option>
          <option value="grapes_leaf_spot1">
            Grapes - Leaf Spot (Chlorothalonil)
          </option>
          <option value="grapes_leaf_spot2">
            Grapes - Leaf Spot (NPK 10-20-20)
          </option>
          <option value="peach_bacterial_spot1">
            Peach - Bacterial Spot (Copper Hydroxide)
          </option>
          <option value="peach_bacterial_spot2">
            Peach - Bacterial Spot (NPK 10-10-10)
          </option>
          <option value="pepper_bacterial_spot1">
            Pepper - Bacterial Spot (Copper Oxychloride)
          </option>
          <option value="pepper_bacterial_spot2">
            Pepper - Bacterial Spot (NPK 15-15-15)
          </option>
          <option value="potato_early_blight1">
            Potato - Early Blight (Chlorothalonil)
          </option>
          <option value="potato_early_blight2">
            Potato - Early Blight (NPK 10-20-20)
          </option>
          <option value="potato_late_blight1">
            Potato - Late Blight (MetalaxylM)
          </option>
          <option value="potato_late_blight2">
            Potato - Late Blight (NPK 15-15-15)
          </option>
          <option value="strawberry_leaf_scorch1">
            Strawberry - Leaf Scorch (NPK 10-10-10)
          </option>
          <option value="strawberry_leaf_scorch2">
            Strawberry - Leaf Scorch (Copper Hydroxide)
          </option>
          <option value="tomato_bacterial_spot1">
            Tomato - Bacterial Spot (Chlorothalonil)
          </option>
          <option value="tomato_bacterial_spot2">
            Tomato - Bacterial Spot (NPK 10-20-20)
          </option>
          <option value="tomato_early_blight1">
            Tomato - Early Blight (Chlorothalonil)
          </option>
          <option value="tomato_early_blight2">
            Tomato - Early Blight (Mancozeb)
          </option>
          <option value="tomato_early_blight3">
            Tomato - Early Blight (NPK 10-20-20)
          </option>
          <option value="tomato_late_blight1">
            Tomato - Late Blight (MetalaxylM)
          </option>
          <option value="tomato_late_blight2">
            Tomato - Late Blight (Copper Hydroxide)
          </option>
          <option value="tomato_late_blight3">
            Tomato - Late Blight (NPK 10-20-20)
          </option>
          <option value="tomato_leaf_mold1">
            Tomato - Leaf Mold (Azoxystrobin)
          </option>
          <option value="tomato_leaf_mold2">
            Tomato - Leaf Mold (Copper Hydroxide)
          </option>
          <option value="tomato_leaf_mold3">
            Tomato - Leaf Mold (NPK 10-20-20)
          </option>
          <option value="tomato_leaf_spot1">
            Tomato - Leaf Spot (Chlorothalonil)
          </option>
          <option value="tomato_leaf_spot2">
            Tomato - Leaf Spot (Mancozeb)
          </option>
          <option value="tomato_leaf_spot3">
            Tomato - Leaf Spot (NPK 10-20-20)
          </option>
          <option value="tomato_mosaic_virus1">
            Tomato - Mosaic Virus (Copper Fungicide)
          </option>
          <option value="tomato_mosaic_virus2">
            Tomato - Mosaic Virus (Insecticidal Soap")
          </option>
          <option value="tomato_spider_mite1">
            Tomato - Spider Mite (Abamectin)
          </option>
          <option value="tomato_spider_mite2">
            Tomato - Spider Mite (Insecticidal Soap)
          </option>
          <option value="tomato_spider_mite3">
            Tomato - Spider Mite (NPK 10-20-20)
          </option>
          <option value="tomato_target_spot1">
            Tomato - Target Spot (Chlorothalonil)
          </option>
          <option value="tomato_target_spot2">
            Tomato - Target Spot (Azoxystrobin)
          </option>
          <option value="tomato_target_spot3">
            Tomato - Target Spot (NPK 10-20-20")
          </option>
          <option value="tomato_Yellow_Leaf_Curl_Virus1">
            Tomato - Yellow Leaf Curl Virus (Imidacloprid)
          </option>
          <option value="tomato_Yellow_Leaf_Curl_Virus2">
            Tomato - Yellow Leaf Curl Virus (Thiamethoxam)
          </option>
          <option value="tomato_Yellow_Leaf_Curl_Virus3">
            Tomato - Yellow Leaf Curl Virus (NPK 10-10-10)
          </option>
          <option value="moneyPlantOrganic">
            Money Plant Organic Fertilizer
          </option>
          <option value="moneyPlantChemical">
            Money Plant Chemical Fertilizer NPK (10:10:10)
          </option>
          <option value="moneyPlantManganeseLime">
            Money Plant Manganese Toxicity - Lime
          </option>
          <option value="moneyPlantManganeseGypsum">
            Money Plant Manganese Toxicity - Gypsum
          </option>
          <option value="moneyPlantManganeseBalancedNPK">
            Money Plant Manganese Toxicity - Balanced NPK
          </option>
          <option value="cucumberDowneyBasalDose">
            Cucumber Downey Mildew - Basal Dose NPK (10:26:26)
          </option>
          <option value="cucumberDowneyTopDressing">
            Cucumber Downey Mildew - Top Dressing Potassium Sulfate
          </option>
          <option value="cucumberDowneyOrganic">
            Cucumber Downey Mildew - Organic Fertilizer
          </option>
          <option value="cucumberPowderyBasal">
            Cucumber Powdery Mildew - Basal Application NPK(10:26:26)
          </option>
          <option value="cucumberPowderySilicon">
            Cucumber Powdery Mildew - Silicon Fertilizer
          </option>
          <option value="cucumberPowderyOrganic">
            Cucumber Powdery Mildew - Organic Options
          </option>
          <option value="watermelonDowneyBasal">
            Watermelon Downey Mildew - Basal Dose NPK (10:26:26)
          </option>
          <option value="watermelonDowneyTopDressing">
            Watermelon Downey Mildew - Top Dressing Potassium Sulfate
          </option>
          <option value="watermelonDowneyOrganic">
            Watermelon Downey Mildew - Organic Fertilizers
          </option>
          <option value="watermelonMosaicBasal">
            Watermelon Mosaic Virus - Basal Dose NPK (10:20:20)
          </option>
          <option value="watermelonMosaicTopDressing">
            Watermelon Mosaic Virus - Top Dressing Potassium Sulfate
          </option>
          <option value="watermelonMosaicOrganic">
            Watermelon Mosaic Virus - Organic Fertilizers
          </option>
          <option value="sugarcaneBacterialBasal">
            Sugarcane Bacterial Blight - Basal Dose NPK (12:32:16)
          </option>
          <option value="sugarcaneBacterialTopDressing">
            Sugarcane Bacterial Blight - Top Dressing Urea, Potassium Sulfate
          </option>
          <option value="sugarcaneBacterialMicronutrient">
            Sugarcane Bacterial Blight - Micronutrient: Zinc or Copper
          </option>
          <option value="sugarcaneBacterialOrganic">
            Sugarcane Bacterial Blight - Organic Fertilizers
          </option>
          <option value="sugarcaneRedRotBasal">
            Sugarcane Red Rot - Basal Dose NPK (10:26:26)
          </option>
          <option value="sugarcaneRedRotTopDressing">
            Sugarcane Red Rot - Top Dressing Potassium Sulfate, Urea
          </option>
          <option value="sugarcaneRedRotMicronutrient">
            Sugarcane Red Rot - Micronutrient: Zinc or Borax
          </option>
          <option value="sugarcaneRedRotOrganic">
            Sugarcane Red Rot - Organic Fertilizers
          </option>
          <option value="bananaBlackSigatokaBasal">
            Banana Black Sigatoka - Basal Dose NPK (14:14:14 or 20:20:20)
          </option>
          <option value="bananaBlackSigatokaTopDressing">
            Banana Black Sigatoka - Top Dressing Urea, Potassium Sulfate
          </option>
          <option value="bananaBlackSigatokaMicronutrient">
            Banana Black Sigatoka - Micronutrient: Zinc or Borax
          </option>
          <option value="bananaBlackSigatokaOrganic">
            Banana Black Sigatoka - Organic Fertilizers
          </option>
          <option value="bananaBractMosaicBasal">
            Banana Bract Mosaic Virus - Basal Dose NPK (14:14:14 or 20:20:20)
          </option>
          <option value="bananaBractMosaicTopDressing">
            Banana Bract Mosaic Virus - Top Dressing Urea, Potassium Sulfate
          </option>
          <option value="bananaBractMosaicMicronutrient">
            Banana Bract Mosaic Virus - Micronutrient: Zinc or Borax
          </option>
          <option value="bananaBractMosaicOrganic">
            Banana Bract Mosaic Virus - Organic Fertilizers
          </option>
          <option value="bananaMokoBasal">
            Banana Moko Disease - Basal Dose NPK (14:14:14 or 20:20:20)
          </option>
          <option value="bananaMokoTopDressing">
            Banana Moko Disease - Top Dressing Urea, Potassium Sulfate
          </option>
          <option value="bananaMokoMicronutrient">
            Banana Moko Disease - Micronutrient: Zinc or Borax
          </option>
          <option value="bananaMokoOrganic">
            Banana Moko Disease - Organic Fertilizers
          </option>
          <option value="bananaPanamaBasal">
            Banana Panama Disease - Basal Dose NPK (14:14:14 or 20:20:20)
          </option>
          <option value="bananaPanamaTopDressing">
            Banana Panama Disease - Top Dressing Urea, Potassium Sulfate
          </option>
          <option value="bananaPanamaMicronutrient">
            Banana Panama Disease - Micronutrient: Zinc or Borax
          </option>
          <option value="bananaPanamaOrganic">
            Banana Panama Disease - Organic Fertilizers
          </option>
          <option value="bananaYellowSigatokaBasal">
            Banana Yellow Sigatoka - Basal Dose NPK (14:14:14 or 20:20:20)
          </option>
          <option value="bananaYellowSigatokaTopDressing">
            Banana Yellow Sigatoka - Top Dressing Urea, Potassium Sulfate
          </option>
          <option value="bananaYellowSigatokaMicronutrient">
            Banana Yellow Sigatoka - Micronutrient: Zinc or Borax
          </option>
          <option value="potatoNematodeBasal">
            Potato Nematode: Basal Dose - NPK (14:14:14)
          </option>
          <option value="potatoNematodeTripleSuperphosphate">
            Potato Nematode: Triple Superphosphate
          </option>
          <option value="potatoNematodeGypsum">Potato Nematode: Gypsum</option>
          <option value="potatoNematodeTopDressingUrea">
            Potato Nematode: Top Dressing Urea
          </option>
          <option value="potatoNematodeTopDressingPotassiumSulfate">
            Potato Nematode: Top Dressing Potassium Sulfate
          </option>
          <option value="potatoNematodeTopDressingCalciumNitrate">
            Potato Nematode: Top Dressing Calcium Nitrate
          </option>
          <option value="potatoNematodeMicronutrient">
            Potato Nematode: Micronutrient
          </option>
          <option value="potatoNematodeOrganic">
            Potato Nematode: Organic Fertilizers
          </option>
          <option value="potatoPestBasal">
            Potato Pest: Basal Dose - NPK (14:14:14)
          </option>
          <option value="potatoPestTripleSuperphosphate">
            Potato Pest: Triple Superphosphate
          </option>
          <option value="potatoPestGypsum">Potato Pest: Gypsum</option>
          <option value="potatoPestTopDressingUrea">
            Potato Pest: Top Dressing Urea
          </option>
          <option value="potatoPestTopDressingPotassiumSulfate">
            Potato Pest: Top Dressing Potassium Sulfate
          </option>
          <option value="potatoPestTopDressingCalciumNitrate">
            Potato Pest: Top Dressing Calcium Nitrate
          </option>
          <option value="potatoPestTopDressingMagnesiumSulfate">
            Potato Pest: Top Dressing Magnesium Sulfate
          </option>
          <option value="potatoPestMicronutrient">
            Potato Pest: Micronutrient
          </option>
          <option value="potatoPestOrganic">
            Potato Pest: Organic Fertilizers
          </option>
          <option value="maizeFallArmywormBasal">
            Maize Fall Armyworm: Basal Dose - NPK (14:14:14)
          </option>
          <option value="maizeFallArmywormTripleSuperphosphate">
            Maize Fall Armyworm: Triple Superphosphate
          </option>
          <option value="maizeFallArmywormGypsum">
            Maize Fall Armyworm: Gypsum
          </option>
          <option value="maizeFallArmywormTopDressingUrea">
            Maize Fall Armyworm: Top Dressing Urea
          </option>
          <option value="maizeFallArmywormTopDressingPotassiumSulfate">
            Maize Fall Armyworm: Top Dressing Potassium Sulfate
          </option>
          <option value="maizeFallArmywormTopDressingCalciumNitrate">
            Maize Fall Armyworm: Top Dressing Calcium Nitrate
          </option>
          <option value="maizeFallArmywormTopDressingMagnesiumSulfate">
            Maize Fall Armyworm: Top Dressing Magnesium Sulfate
          </option>
          <option value="maizeFallArmywormMicronutrient">
            Maize Fall Armyworm: Micronutrient
          </option>
          <option value="maizeFallArmywormOrganic">
            Maize Fall Armyworm: Organic Fertilizers
          </option>
          <option value="maizeGrasshopperBasal">
            Maize Grasshopper: Basal Dose - NPK (14:14:14)
          </option>
          <option value="maizeGrasshopperTripleSuperphosphate">
            Maize Grasshopper: Triple Superphosphate
          </option>
          <option value="maizeGrasshopperGypsum">
            Maize Grasshopper: Gypsum
          </option>
          <option value="maizeGrasshopperTopDressingUrea">
            Maize Grasshopper: Top Dressing Urea
          </option>
          <option value="maizeGrasshopperTopDressingPotassiumSulfate">
            Maize Grasshopper: Top Dressing Potassium Sulfate
          </option>
          <option value="maizeGrasshopperTopDressingCalciumNitrate">
            Maize Grasshopper: Top Dressing Calcium Nitrate
          </option>
          <option value="maizeGrasshopperTopDressingMagnesiumSulfate">
            Maize Grasshopper: Top Dressing Magnesium Sulfate
          </option>
          <option value="maizeGrasshopperMicronutrient">
            Maize Grasshopper: Micronutrient
          </option>
          <option value="maizeGrasshopperOrganic">
            Maize Grasshopper: Organic Fertilizers
          </option>
          <option value="maizeLeafBattleBasal">
            Maize Leaf Battle: Basal Dose - NPK (14:14:14)
          </option>
          <option value="maizeLeafBattleTripleSuperphosphate">
            Maize Leaf Battle: Triple Superphosphate
          </option>
          <option value="maizeLeafBattleGypsum">
            Maize Leaf Battle: Gypsum
          </option>
          <option value="maizeLeafBattleTopDressingUrea">
            Maize Leaf Battle: Top Dressing Urea
          </option>
          <option value="maizeLeafBattleTopDressingPotassiumSulfate">
            Maize Leaf Battle: Top Dressing Potassium Sulfate
          </option>
          <option value="maizeLeafBattleTopDressingCalciumNitrate">
            Maize Leaf Battle: Top Dressing Calcium Nitrate
          </option>
          <option value="maizeLeafBattleTopDressingMagnesiumSulfate">
            Maize Leaf Battle: Top Dressing Magnesium Sulfate
          </option>
          <option value="maizeLeafBattleMicronutrient">
            Maize Leaf Battle: Micronutrient
          </option>
          <option value="maizeLeafBattleOrganic">
            Maize Leaf Battle: Organic Fertilizers
          </option>
          <option value="cashewAnthracnoseBasal">
            Cashew Anthracnose: Basal Dose - NPK (14:14:14)
          </option>
          <option value="cashewAnthracnoseSuperphosphate">
            Cashew Anthracnose: Superphosphate
          </option>
          <option value="cashewAnthracnoseGypsum">
            Cashew Anthracnose: Gypsum
          </option>
          <option value="cashewAnthracnoseTopDressingUrea">
            Cashew Anthracnose: Top Dressing Urea
          </option>
          <option value="cashewAnthracnoseTopDressingPotassiumSulfate">
            Cashew Anthracnose: Top Dressing Potassium Sulfate
          </option>
          <option value="cashewAnthracnoseTopDressingCalciumNitrate">
            Cashew Anthracnose: Top Dressing Calcium Nitrate
          </option>
          <option value="cashewAnthracnoseTopDressingMagnesiumSulfate">
            Cashew Anthracnose: Top Dressing Magnesium Sulfate
          </option>
          <option value="cashewAnthracnoseMicronutrient">
            Cashew Anthracnose: Micronutrient
          </option>
          <option value="cashewAnthracnoseOrganic">
            Cashew Anthracnose: Organic Fertilizers
          </option>
          <option value="cottonAmericanBollwormBasal">
            Cotton American Bollworm: Basal Dose - NPK (14:14:14)
          </option>
          <option value="cottonAmericanBollwormSuperphosphate">
            Cotton American Bollworm: Superphosphate
          </option>
          <option value="cottonAmericanBollwormGypsum">
            Cotton American Bollworm: Gypsum
          </option>
          <option value="cottonAmericanBollwormTopDressingUrea">
            Cotton American Bollworm: Top Dressing Urea
          </option>
          <option value="cottonAmericanBollwormTopDressingPotassiumSulfate">
            Cotton American Bollworm: Top Dressing Potassium Sulfate
          </option>
          <option value="cottonAmericanBollwormTopDressingCalciumNitrate">
            Cotton American Bollworm: Top Dressing Calcium Nitrate
          </option>
          <option value="cottonAmericanBollwormTopDressingMagnesiumSulfate">
            Cotton American Bollworm: Top Dressing Magnesium Sulfate
          </option>
          <option value="cottonAmericanBollwormMicronutrient">
            Cotton American Bollworm: Micronutrient
          </option>
          <option value="cottonAmericanBollwormOrganic">
            Cotton American Bollworm: Organic Fertilizers
          </option>
          <option value="cottonAnthracnoseBasal">
            Cotton Anthracnose: Basal Dose - NPK (14:14:14)
          </option>
          <option value="cottonAnthracnoseSuperphosphate">
            Cotton Anthracnose: Superphosphate
          </option>
          <option value="cottonAnthracnoseGypsum">
            Cotton Anthracnose: Gypsum
          </option>
          <option value="cottonAnthracnoseTopDressingUrea">
            Cotton Anthracnose: Top Dressing Urea
          </option>
          <option value="cottonAnthracnoseTopDressingPotassiumSulfate">
            Cotton Anthracnose: Top Dressing Potassium Sulfate
          </option>
          <option value="cottonAnthracnoseTopDressingCalciumNitrate">
            Cotton Anthracnose: Top Dressing Calcium Nitrate
          </option>
          <option value="cottonAnthracnoseTopDressingMagnesiumSulfate">
            Cotton Anthracnose: Top Dressing Magnesium Sulfate
          </option>
          <option value="cottonAnthracnoseMicronutrient">
            Cotton Anthracnose: Micronutrient
          </option>
          <option value="cottonAnthracnoseOrganic">
            Cotton Anthracnose: Organic Fertilizers
          </option>
          <option value="cottonAphidBasal">
            Cotton Aphid: Basal Dose - NPK (14:14:14)
          </option>
          <option value="cottonAphidSuperphosphate">
            Cotton Aphid: Superphosphate
          </option>
          <option value="cottonAphidGypsum">Cotton Aphid: Gypsum</option>
          <option value="cottonAphidTopDressingUrea">
            Cotton Aphid: Top Dressing Urea
          </option>
          <option value="cottonAphidTopDressingPotassiumSulfate">
            Cotton Aphid: Top Dressing Potassium Sulfate
          </option>
          <option value="cottonAphidTopDressingCalciumNitrate">
            Cotton Aphid: Top Dressing Calcium Nitrate
          </option>
          <option value="cottonAphidTopDressingMagnesiumSulfate">
            Cotton Aphid: Top Dressing Magnesium Sulfate
          </option>
          <option value="cottonAphidMicronutrient">
            Cotton Aphid: Micronutrient
          </option>
          <option value="cottonAphidOrganic">
            Cotton Aphid: Organic Fertilizers
          </option>
          {/* Add other diseases as needed */}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="area" className="block text-lg font-medium mb-2">
          Area of Land:
        </label>
        <input
          type="number"
          id="area"
          value={area}
          onChange={handleAreaChange}
          placeholder="Enter area"
          className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="from-unit" className="block text-lg font-medium mb-2">
          Select Area Unit:
        </label>
        <select
          id="from-unit"
          value={fromUnit}
          onChange={handleFromUnitChange}
          className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="acre">Acre</option>
          <option value="hectare">Hectare</option>
          <option value="katha">Katha</option>
          <option value="cent">Cent</option>
          <option value="kanal">Kanal</option>
          <option value="bigha_punjab">Bigha (Punjab/Haryana)</option>
          <option value="bigha_rajasthan">Bigha (Rajasthan)</option>
          {/* Add other units if needed */}
        </select>
      </div>

      {/* Display the per unit dosage */}
      {perUnitDosage !== null && (
        <div className="mb-4 text-lg font-medium">
          Dosage required per 1 {fromUnit}: {perUnitDosage}{" "}
          {dosageMapping[cropDisease]?.unit}
        </div>
      )}

      <div className="mb-4 flex items-center justify-center">
        <button
          onClick={calculateDosage}
          className="w-fit bg-green-500 hover:bg-green-600 rounded text-white cursor-pointer px-4 py-2 font-bold hover:scale-[1.05] shadow-md focus:outline-none"
        >
          Calculate Dosage
        </button>
      </div>

      <div id="result" className="text-xl font-medium mt-4 text-center">
        {result}
      </div>
    </div>
  );
}

export default MedicineCalculator;
