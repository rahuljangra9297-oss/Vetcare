/**
 * Vetcare AI OS - Clinical Decision Support System
 * clinical-db.js - Production-Ready Master Veterinary Pathology & Pharmacology Database
 * Strictly compliant with clinical veterinary standards (Ruminant & Small Ruminant).
 */

(function () {
  "use strict";

  // 1. Master Disease Database Array
  window.VETCARE_DISEASE_DB = [
    // =========================================================================
    // CATEGORY 1: PROTOZOAL & HEMOPARASITIC DISEASES
    // =========================================================================
    {
      id: "SURRA",
      nameEn: "Surra (Trypanosomiasis)",
      nameHi: "सर्रा रोग (ट्रिपैनोसोमियासिस)",
      ruralNames: ["सर्रा", "तिबरसा", "अंधा ताव", "फेरी रोग", "चक्कर रोग"],
      category: "Protozoal",
      etiology: "Trypanosoma evansi (transmitted mechanically by Tabanus and Stomoxys biting flies).",
      confirmatoryLabDiagnosis: {
        sample: "Whole blood in EDTA (ear vein smear at febrile peak) or wet blood mount.",
        testName: "Wet Blood Film Motility Test / Giemsa-stained thin blood smear / Microhematocrit Centrifugation Technique (MHCT).",
        approxCostINR: 150,
        keyMarker: "Actively undulating, flagellated Trypanosomes between RBCs under 40x/100x oil immersion."
      },
      pathologicalTrajectory: {
        stage1: {
          title: "Early Febrile Wave / Parasitemia",
          signs: "Intermittent spiked fever (104.5 - 106°F), dullness, lacrimation, urticarial plaques on skin, gradual drop in milk.",
          durationHours: 36
        },
        stage2: {
          title: "Acute Hemoparasitic Crisis",
          signs: "Petechial hemorrhages on conjunctiva, progressive severe anemia, edematous swelling of lower abdomen and sheath, marked muscular twitching.",
          durationHours: 48
        },
        stage3: {
          title: "Advanced Neuro-Invasion",
          signs: "Circling movements, head pressing against hard objects, blind stumbling, incoordination, severe teeth grinding, frequent bellowing.",
          durationHours: 24
        },
        stage4: {
          title: "Terminal Sternal/Lateral Recumbency",
          signs: "Hypothermia (<99°F), paddling of limbs, hyperesthesia, comatose state, complete respiratory/circulatory arrest.",
          durationHours: 12
        },
        positiveRecoveryTimeline: [
          "Hour 0: Administration of antiprotozoal (Quinapyramine) and supportive neuro-steroids.",
          "Hour 12: Destruction of circulating parasites; reduction in body temperature to 102.5°F.",
          "Hour 24: Cessation of circling behavior, recovery of menace reflex, willingness to drink fresh water.",
          "Day 3-5: Gradual resumption of rumination; RBC regeneration initiates under hematinic support.",
          "Day 10-14: Milk yield recovery up to 80-90% of baseline; eradication of latent tissue parasite nests."
        ],
        negativeDeteriorationTimeline: [
          "Hour 0-24: Parasite multiplication exceeds 10^5/ml of blood, severe intravascular hemolysis.",
          "Hour 36: Blood-brain barrier breach leading to acute meningoencephalitis and focal brain necrosis.",
          "Hour 60: Continuous seizures, severe hypoglycemic coma, non-responsive pupils.",
          "Hour 72-84: Irreversible brainstem herniation and mortality."
        ]
      },
      treatmentProtocol: {
        injections: [
          {
            category: "Antiprotozoal (Specific Trypanocide)",
            activeSalt: "Quinapyramine Sulfate and Chloride",
            brands: "Triquin (MSD) / Quinapyramine (Vetindia)",
            dosageMgPerKg: "4.4 mg/kg body weight",
            standardDose400kg: "Curative: 2.5 g powder dissolved in 15 ml sterile water; inject 15 ml S/C only.",
            route: "Subcutaneous (SC) strictly. Split into 2 sites to prevent severe local necrosis.",
            pregnancySafety: "Caution in Advanced Pregnancy",
            pregnancyAlertBadge: "SAFE WITH CAUTION",
            clinicalNeed: "Obligatory specific trypanocidal agent to eliminate blood and tissue phase parasites."
          },
          {
            category: "Alternative Trypanocide",
            activeSalt: "Diminazene Aceturate",
            brands: "Berenil (MSD) / Diminavet",
            dosageMgPerKg: "3.5 - 7 mg/kg body weight",
            standardDose400kg: "20 - 30 ml (prepared 7% solution)",
            route: "Deep Intramuscular (IM)",
            pregnancySafety: "Safe",
            pregnancyAlertBadge: "SAFE",
            clinicalNeed: "First-line alternative if Quinapyramine is unavailable."
          },
          {
            category: "Cerebral Decongestant / NSAID",
            activeSalt: "Flunixin Meglumine",
            brands: "Melonex Plus / Megludyne",
            dosageMgPerKg: "2.2 mg/kg body weight",
            standardDose400kg: "15 - 20 ml",
            route: "Slow IV or IM",
            pregnancySafety: "Contraindicated in 3rd Trimester at high doses",
            pregnancyAlertBadge: "PREGNANCY CAUTION",
            clinicalNeed: "Anti-pyretic, controls cerebral inflammation and endotoxic shock."
          },
          {
            category: "Neurotropic Vitamin Complex",
            activeSalt: "Thiamine (B1) 100mg + Pyridoxine (B6) + Cyanocobalamin (B12)",
            brands: "Tribivet (Intas) / Neurobion Forte",
            dosageMgPerKg: "Therapeutic neuro-dose",
            standardDose400kg: "10 - 15 ml",
            route: "IM or slow IV",
            pregnancySafety: "Safe",
            pregnancyAlertBadge: "SAFE",
            clinicalNeed: "Protects myelin sheath, reverses cerebral necrosis and polioencephalomalacia signs."
          }
        ],
        oralMeds: [
          {
            activeSalt: "Iron Tonic + Cobalt + Copper Glycinate + Vitamin B-Complex",
            brands: "Feritas (Intas) / Sharkoferrol (Alembic)",
            dosage: "50 ml twice daily",
            frequency: "10-15 consecutive days",
            pregnancySafety: "Safe",
            purpose: "Accelerates erythropoiesis to overcome lethal post-parasitic anemia."
          },
          {
            activeSalt: "Dextrose Powder & Electrolytes",
            brands: "Electral / Prolyte",
            dosage: "100 g dissolved in 2 liters fresh water twice daily",
            frequency: "3-5 days",
            pregnancySafety: "Safe",
            purpose: "Counters trypanosome-induced catastrophic hypoglycemia."
          }
        ],
        ayurvedicHerbal: [
          {
            formulation: "Herbal Hepato-Protective & Metabolic Stimulant",
            brands: "Liv-52 Protec (Himalaya) / Hepsan",
            ingredients: "Capparis spinosa, Cichorium intybus, Solanum nigrum, Terminalia arjuna",
            approxCostINR: 220,
            dosage: "50 ml orally twice daily for 15 days"
          }
        ],
        homeopathic: [
          {
            remedy: "Arsenicum Album & Nux Vomica",
            potency: "200C",
            dosage: "15 drops of each on clean tongue / roti",
            administrationMode: "Every 4 hours in acute circling phase, then twice daily."
          }
        ],
        homeMadeDesi: [
          {
            title: "Desi Anti-Weakness & Hematinic Decoction",
            ingredients: "Purified Jaggery (Gur) 250g, Crushed Fenugreek (Methi) seeds 50g, Black Cumin (Kalonji) 20g, Mustard Oil 50ml.",
            preparation: "Boil fenugreek and kalonji in 1 liter of water, reduce to half, stir in jaggery and mustard oil, cool to lukewarm.",
            dosage: "Administer once daily orally via drenching bamboo/bottle carefully for 5 days.",
            precautions: "Do NOT drench if animal is exhibiting convulsions or missing swallow reflex to prevent aspiration pneumonia."
          }
        ],
        shedHygieneBiosecurity: {
          sanitationSteps: "Immediate segregation of affected animals in dark fly-proof recovery pens.",
          chemicalDisinfection: "Spray Deltamethrin (Butox 12.5mg/ml) at 2 ml/liter of water on walls, ceiling crevices, and animal surroundings.",
          flyTickControl: "Apply repellent neem oil (Azadirachta indica 5%) emulsion around eyes, neck, and ventral abdomen to halt Tabanus fly mechanical transfer."
        }
      }
    },
    {
      id: "BABESIOSIS",
      nameEn: "Bovine Babesiosis (Tick Fever / Redwater)",
      nameHi: "बबेसियोसिस (चिचड़ी बुखार / लाल पेशाब)",
      ruralNames: ["लाल पेशाब", "कॉफी पेशाब", "चिचड़ी ताव", "झाड़ बुखार"],
      category: "Protozoal",
      etiology: "Babesia bigemina / Babesia bovis (transmitted biological vector: Rhipicephalus microplus ticks).",
      confirmatoryLabDiagnosis: {
        sample: "Capillary blood from ear tip or tail tip smear (fixed with absolute methanol).",
        testName: "Giemsa / Field Stained Thin & Thick Blood Smears.",
        approxCostINR: 120,
        keyMarker: "Intra-erythrocytic paired piriform (pear-shaped) merozoites joined at an acute angle."
      },
      pathologicalTrajectory: {
        stage1: {
          title: "Intra-Erythrocytic Invasion",
          signs: "Sudden hyperthermia (105 - 107°F), extreme restlessness, shivering, selective inappetence, heart rate >90 bpm.",
          durationHours: 24
        },
        stage2: {
          title: "Hemoglobinuric Crisis",
          signs: "Severe intravascular hemolysis, pathognomonic dark red to coffee-colored urine (true hemoglobinuria), pale icteric conjunctiva.",
          durationHours: 36
        },
        stage3: {
          title: "Anoxia & Circulatory Shock",
          signs: "Pipe-stem diarrhea transitioning to dark dry feces, profound jaundice, PCV dropping below 12%, severe dyspnea.",
          durationHours: 24
        },
        stage4: {
          title: "Anoxic Collapse & Organ Failure",
          signs: "Hypothermia, tachycardia >120 bpm with pounding jugular pulse, sternal recumbency, irreversible hypoxic liver necrosis, death.",
          durationHours: 12
        },
        positiveRecoveryTimeline: [
          "Hour 0: Precise dosing of Diminazene Aceturate or Imidocarb Dipropionate.",
          "Hour 6-8: Lysis of Babesia merozoites; termination of active intra-vascular hemolysis.",
          "Hour 18-24: Urine clarity shifts from dark coffee to port-wine, and gradually back to amber/clear.",
          "Day 3: Body temperature normalizes (101.5°F); rumination returns.",
          "Day 7-14: Regeneration of reticulocytes; mucosal pallor subsides with iron supplementation."
        ],
        negativeDeteriorationTimeline: [
          "Hour 0-24: Uninhibited multiplication of protozoa destroying up to 60% of total circulating erythrocytes.",
          "Hour 36: Acute tubular necrosis due to massive hemoglobin casts obstructing renal tubules.",
          "Hour 48-60: Anemic cerebral hypoxia, shock, cardiac collapse, and mortality."
        ]
      },
      treatmentProtocol: {
        injections: [
          {
            category: "Antiprotozoal (Specific Babesiacide)",
            activeSalt: "Diminazene Aceturate with Phenazone",
            brands: "Berenil (MSD) / Babecure",
            dosageMgPerKg: "3.5 - 5 mg/kg body weight",
            standardDose400kg: "20 - 25 ml (7% aqueous solution)",
            route: "Deep Intramuscular (IM) strictly in heavy neck muscle. Do NOT give IV.",
            pregnancySafety: "Safe",
            pregnancyAlertBadge: "SAFE",
            clinicalNeed: "Primary specific drug that arrests Babesia DNA replication."
          },
          {
            category: "Alternative Premium Babesiacide",
            activeSalt: "Imidocarb Dipropionate",
            brands: "Imizol (Schering-Plough) / Imidocarb (Carbesia)",
            dosageMgPerKg: "1.2 mg/kg for treatment, 3.0 mg/kg for prophylaxis",
            standardDose400kg: "3.5 - 4 ml SC strictly",
            route: "Subcutaneous (SC) only.",
            pregnancySafety: "Caution (Anticholinesterase side effects)",
            pregnancyAlertBadge: "SAFE WITH CAUTION",
            clinicalNeed: "Single shot cure with 4-week prophylactic barrier."
          },
          {
            category: "Anti-inflammatory & Analgesic",
            activeSalt: "Meloxicam + Paracetamol",
            brands: "Melonex Plus (Intas)",
            dosageMgPerKg: "Meloxicam 0.5 mg/kg + Paracetamol 15 mg/kg",
            standardDose400kg: "15 - 20 ml",
            route: "Intramuscular (IM)",
            pregnancySafety: "Safe",
            pregnancyAlertBadge: "SAFE",
            clinicalNeed: "Manages severe pyrexia and systemic pain without causing renal shutdown."
          },
          {
            category: "Erythropoietic Hematinic",
            activeSalt: "Iron Sorbitol Citric Acid Complex",
            brands: "Feritas (Intas) / Imferon",
            dosageMgPerKg: "Standard injectable hematinic",
            standardDose400kg: "10 ml on alternate days (total 3 doses)",
            route: "Deep Intramuscular (IM) using Z-track technique",
            pregnancySafety: "Safe",
            pregnancyAlertBadge: "SAFE",
            clinicalNeed: "Replaces massive iron deficit caused by acute intravascular hemolysis."
          },
          {
            category: "Fluid Therapy & Osmotic Support",
            activeSalt: "Dextrose 5% Normal Saline (DNS)",
            brands: "Parenteral DNS 5%",
            dosageMgPerKg: "Fluid volume replacement",
            standardDose400kg: "2000 - 3000 ml slow IV warm drip",
            route: "Intravenous (IV)",
            pregnancySafety: "Safe",
            pregnancyAlertBadge: "SAFE",
            clinicalNeed: "Flushes hemoglobin casts from renal tubules to prevent fatal acute renal failure."
          }
        ],
        oralMeds: [
          {
            activeSalt: "Liver Extract + Choline Chloride + B-Vitamins",
            brands: "Belamyl Oral / Livol",
            dosage: "50 ml twice daily",
            frequency: "10 days",
            pregnancySafety: "Safe",
            purpose: "Protects hepatocytes from bilirubin and anoxic degenerative damage."
          }
        ],
        ayurvedicHerbal: [
          {
            formulation: "Blood Purifying & Hepato-Protective Polyherbal Solution",
            brands: "Yakrit Plihantak Churna / Liv-52 Liquid",
            ingredients: "Bhringraj, Kalmegh, Punarnava, Kasani",
            approxCostINR: 190,
            dosage: "40 ml orally twice daily for 10 days"
          }
        ],
        homeopathic: [
          {
            remedy: "Crotalus Horridus & Phosphorus",
            potency: "200C",
            dosage: "10 drops alternating every 3 hours directly onto oral mucosa",
            administrationMode: "Sublingual drops to arrest microvascular hemagglutination and hematuria."
          }
        ],
        homeMadeDesi: [
          {
            title: "Traditional Cooling & Hydrating Decoction",
            ingredients: "Tender Coconut Water 2 Liters, Crushed Coriander (Dhania) seeds 100g, Desi Khand / Mishri 200g.",
            preparation: "Soak coriander seeds in cold water overnight, strain, blend with fresh coconut water and crushed mishri.",
            dosage: "Offer as sole drinking water twice daily for 3 days.",
            precautions: "Do not withhold clean tap water. Ensure slow oral ingestion to prevent regurgitation."
          }
        ],
        shedHygieneBiosecurity: {
          sanitationSteps: "Thorough burning of cracks and crevices with an LPG flame-gun to eliminate tick eggs.",
          chemicalDisinfection: "Spray Flumethrin 1% pour-on along dorsal midline (10 ml per 100kg body weight) or Amitraz 12.5% spray (2 ml/liter).",
          flyTickControl: "Quarantine and tick-bath all newly introduced cattle before housing in general shed."
        }
      }
    },
    {
      id: "THEILERIOSIS",
      nameEn: "Bovine Tropical Theileriosis",
      nameHi: "थायलेरियासिस (चिचड़ी जनित गांठदार बुखार)",
      ruralNames: ["गांठ बुखार", "गिलटी ताव", "चिचड़ी रोग", "गर्मी का बुखार"],
      category: "Protozoal",
      etiology: "Theileria annulata (vector: Hyalomma anatolicum ticks).",
      confirmatoryLabDiagnosis: {
        sample: "Pre-scapular or pre-femoral lymph node needle aspirate or thin blood smear.",
        testName: "Giemsa Stained Lymph Node Biopsy / Blood Film.",
        approxCostINR: 150,
        keyMarker: "Schizonts (Koch's blue bodies) inside multinucleated lymphocytes; small ring/rod piroplasms in RBCs."
      },
      pathologicalTrajectory: {
        stage1: {
          title: "Lymphadenopathy & High Spiking Fever",
          signs: "Severe fever (105 - 107°F) unyielding to simple paracetamol, marked pathognomonic enlargement of pre-scapular lymph nodes.",
          durationHours: 48
        },
        stage2: {
          title: "Ocular & Respiratory Manifestation",
          signs: "Severe bilateral exophthalmia, petechial hemorrhages on third eyelid, serous to mucopurulent nasal discharge, soft moist cough.",
          durationHours: 48
        },
        stage3: {
          title: "Systemic Destruction & Icterus",
          signs: "Profound anemia, icterus without dark red urine, intermittent diarrhea containing shreds of mucus, severe wasting.",
          durationHours: 36
        },
        stage4: {
          title: "Pulmonary Edema & Terminal Asphyxia",
          signs: "Froth exuding from nostrils, severe open-mouth dyspnea, grunt on expiration, hypothermia, sternal recumbency, asphyxial death.",
          durationHours: 18
        ],
        positiveRecoveryTimeline: [
          "Hour 0: Deep IM administration of Buparvaquone at full dose.",
          "Hour 24: Koch's blue bodies stop proliferating; lymph node tension diminishes noticeably.",
          "Hour 48: Body temperature settles to 102.5 - 103°F; ocular edema begins resolving.",
          "Day 5: Resumption of regular mastication and rumen contractions (2 per 3 minutes).",
          "Day 14: Lymph nodes return to physiological dimensions; blood counts stabilize."
        ],
        negativeDeteriorationTimeline: [
          "Hour 0-48: Unchecked lymphoproliferation followed by pan-lymphocytophthisis (lysis of immune cells).",
          "Hour 72: Interstitial pulmonary edema develops due to massive vascular leakage.",
          "Hour 96-120: Asphyxiation due to alveolar flooding with clear proteinaceous transudate; fatal hypoxia."
        ]
      },
      treatmentProtocol: {
        injections: [
          {
            category: "Antiprotozoal (Specific Theileriacide)",
            activeSalt: "Buparvaquone",
            brands: "Butalex (Zydus) / Zubion (Intas)",
            dosageMgPerKg: "2.5 mg/kg body weight",
            standardDose400kg: "20 ml as a single dose (50 mg/ml solution)",
            route: "Deep Intramuscular (IM) strictly into neck muscles. Distribute into two separate sites.",
            pregnancySafety: "Safe",
            pregnancyAlertBadge: "SAFE",
            clinicalNeed: "Gold standard definitive cure; eliminates both schizont and piroplasm stages."
          },
          {
            category: "Broad-Spectrum Tetracycline Adjunct",
            activeSalt: "Oxytetracycline Long Acting (LA)",
            brands: "Terramycin LA (Zoetis) / Oxyvet LA",
            dosageMgPerKg: "20 mg/kg body weight",
            standardDose400kg: "40 ml (split into two sites of 20 ml each)",
            route: "Deep IM",
            pregnancySafety: "Safe with caution in late pregnancy",
            pregnancyAlertBadge: "SAFE WITH CAUTION",
            clinicalNeed: "Inhibits intracellular schizogony and counters opportunistic secondary bacterial pneumonia."
          },
          {
            category: "Anti-inflammatory & Anti-pyretic",
            activeSalt: "Flunixin Meglumine",
            brands: "Megludyne / Melonex",
            dosageMgPerKg: "2.2 mg/kg body weight",
            standardDose400kg: "15 - 20 ml",
            route: "Slow IV or IM",
            pregnancySafety: "Use with caution in 3rd trimester",
            pregnancyAlertBadge: "PREGNANCY CAUTION",
            clinicalNeed: "Suppresses acute pulmonary inflammation and decreases respiratory transudation."
          },
          {
            category: "Hematinic & Anemia Reversal",
            activeSalt: "Iron Sorbitol Complex + Folic Acid",
            brands: "Feritas (Intas)",
            dosageMgPerKg: "Therapeutic hematinic",
            standardDose400kg: "10 ml every 48 hours for 3 doses",
            route: "Deep IM",
            pregnancySafety: "Safe",
            pregnancyAlertBadge: "SAFE",
            clinicalNeed: "Treats severe non-regenerative anemia caused by erythrocyte destruction."
          }
        ],
        oralMeds: [
          {
            activeSalt: "Copper, Cobalt, Iron, Vitamin E & Selenium Paste",
            brands: "Cofecu / Sharkoferrol",
            dosage: "50 g paste daily",
            frequency: "15 days",
            pregnancySafety: "Safe",
            purpose: "Stimulates bone marrow hematopoiesis."
          }
        ],
        ayurvedicHerbal: [
          {
            formulation: "Immuno-Modulatory & Febrifuge Tonic",
            brands: "Restobal (Ceva/Ayurvet) + Giloy Ghanvati",
            ingredients: "Tinospora cordifolia (Giloy), Withania somnifera (Ashwagandha), Ocimum sanctum",
            approxCostINR: 280,
            dosage: "50 ml Restobal liquid twice daily + 10 Giloy tablets crushed in jaggery"
          }
        ],
        homeopathic: [
          {
            remedy: "China Officinalis & Belladonna",
            potency: "200C",
            dosage: "10 drops every 4 hours for 5 days",
            administrationMode: "Sublingual application to combat weakness from vital fluid loss."
          }
        ],
        homeMadeDesi: [
          {
            title: "Traditional Pre-scapular Camphor Compress & Decoction",
            ingredients: "Pure Camphor (Kapur) 20g, Mustard Oil 250ml, Fresh Turmeric paste 50g.",
            preparation: "Gently heat camphor in mustard oil until completely dissolved; cool down.",
            dosage: "Massage gently over swollen prescapular and prefemoral lymph nodes twice daily.",
            precautions: "Do NOT apply force or open/puncture lymph nodes under any circumstances."
          }
        ],
        shedHygieneBiosecurity: {
          sanitationSteps: "Strip plastering of mud walls; burn cracks harboring 2-host and 3-host Hyalomma ticks.",
          chemicalDisinfection: "Apply Deltamethrin or Amitraz dip/spray every 14 days consistently.",
          flyTickControl: "Regular biological control using poultry birds in backyard settings to ingest engorged ground ticks."
        }
      }
    },
    {
      id: "ANAPLASMOSIS",
      nameEn: "Bovine Anaplasmosis (Gall Sickness)",
      nameHi: "एनाप्लाज्मोसिस (पित्त ज्वर / पीलिया ताव)",
      ruralNames: ["पित्त बुखार", "पीलिया ताव", "सूखा गोबर रोग", "सफेद आंख"],
      category: "Protozoal",
      etiology: "Anaplasma marginale (obligate intra-erythrocytic rickettsia, tick & biting fly vectors, iatrogenic needles).",
      confirmatoryLabDiagnosis: {
        sample: "Peripheral blood smear from ear margin in EDTA.",
        testName: "Giemsa Stained Thin Blood Smear.",
        approxCostINR: 120,
        keyMarker: "Dense, deeply basophilic spherical intra-erythrocytic inclusion bodies located on the extreme margin of erythrocytes."
      },
      pathologicalTrajectory: {
        stage1: {
          title: "Incubation & Subclinical Multiplication",
          signs: "Body temperature climbs to 104 - 105.5°F, progressive drop in milk production, mild constipation with mucus-coated dung.",
          durationHours: 48
        },
        stage2: {
          title: "Acute Extravascular Hemolysis",
          signs: "Severe pallor of mucous membranes transforming to porcelain-white then intense golden yellow (icterus), marked absence of red urine.",
          durationHours: 48
        },
        stage3: {
          title: "Hypoxic Aggression & Collapse",
          signs: "Severe brain hypoxia causing aberrant charging behavior, extreme dehydration, dry hard dung resembling horse pellets, pulse >100 bpm.",
          durationHours: 36
        },
        stage4: {
          title: "Terminal Dehydration & Anoxia",
          signs: "Subnormal temperature, lateral recumbency, muscular tremors, rapid gasping respiration, cardiovascular syncope.",
          durationHours: 12
        },
        positiveRecoveryTimeline: [
          "Hour 0: High-dose Oxytetracycline IV/IM infusion.",
          "Hour 24: Stoppage of erythrocytic phagocytosis in spleen and reticuloendothelial system.",
          "Hour 48: Icteric index begins declining; dung consistency softens to normal pasty texture.",
          "Day 5: Body temperature settles to 101.8°F; aggressive appetite returns.",
          "Day 21: Full recovery of baseline hematocrit and stabilization of carrier status."
        ],
        negativeDeteriorationTimeline: [
          "Hour 0-48: Destruction of up to 70% of circulating RBCs by splenic macrophages (extravascular hemolysis).",
          "Hour 72: Severe cerebral anoxia; acute hepatomegaly with bile stasis (gall sickness).",
          "Hour 96-120: Fatal anoxic cardiac arrest during any mild stress or exertion."
        ]
      },
      treatmentProtocol: {
        injections: [
          {
            category: "Specific Tetracycline Antibiotic",
            activeSalt: "Oxytetracycline Dihydrate (Long Acting)",
            brands: "Terramycin LA (Zoetis) / Oxyvet LA (Cadila)",
            dosageMgPerKg: "20 mg/kg body weight",
            standardDose400kg: "40 ml deep IM (divided into two 20 ml injection sites)",
            route: "Deep Intramuscular (IM) strictly.",
            pregnancySafety: "Safe with caution in late gestation",
            pregnancyAlertBadge: "SAFE WITH CAUTION",
            clinicalNeed: "Definitive rickettsial inhibitor; arrests protein synthesis of Anaplasma bodies."
          },
          {
            category: "Alternative Antimicrobial",
            activeSalt: "Imidocarb Dipropionate",
            brands: "Imizol (Carbesia)",
            dosageMgPerKg: "3.0 mg/kg body weight",
            standardDose400kg: "10 ml SC strictly",
            route: "Subcutaneous (SC)",
            pregnancySafety: "Safe with caution",
            pregnancyAlertBadge: "SAFE WITH CAUTION",
            clinicalNeed: "Eliminates carrier status when dosed twice at 14-day intervals."
          },
          {
            category: "Hepato-Protective & Metabolic Injectable",
            activeSalt: "B-Complex with Liver Extract",
            brands: "Belamyl (Sarabhai) / Tribivet (Intas)",
            dosageMgPerKg: "Therapeutic liver support",
            standardDose400kg: "10 - 15 ml",
            route: "Intramuscular (IM)",
            pregnancySafety: "Safe",
            pregnancyAlertBadge: "SAFE",
            clinicalNeed: "Assists liver parenchymal recovery from massive bile retention."
          },
          {
            category: "Cardiovascular Support & Volume Expander",
            activeSalt: "Normal Saline 0.9% or Dextrose Saline",
            brands: "Parenteral NS / DNS",
            dosageMgPerKg: "Slow IV infusion",
            standardDose400kg: "2000 ml slowly under strict cardiac monitoring",
            route: "Slow IV",
            pregnancySafety: "Safe",
            pregnancyAlertBadge: "SAFE",
            clinicalNeed: "Combats dehydration without precipitating acute anemic heart failure."
          }
        ],
        oralMeds: [
          {
            activeSalt: "Magnesium Sulphate (Epsom Salt) + Liquid Paraffin",
            brands: "Epsom Salt USP",
            dosage: "Magnesium Sulphate 250g + Liquid Paraffin 500ml as a drench",
            frequency: "Single dose initially",
            pregnancySafety: "Safe",
            purpose: "Relieves fatal ruminal and omasal impaction (dry pellet stool) characteristic of gall sickness."
          }
        ],
        ayurvedicHerbal: [
          {
            formulation: "Ayurvedic Hepatic & Biliary Stimulant",
            brands: "Arogyavardhini Vati & Liv-52 Liquid",
            ingredients: "Kutki, Picrorhiza kurroa, Haritaki, Bibhitaki, Amalaki",
            approxCostINR: 175,
            dosage: "50 ml Liv-52 liquid + 8 tablets of Arogyavardhini Vati crushed twice daily for 7 days"
          }
        ],
        homeopathic: [
          {
            remedy: "Chelidonium Majus & Carduus Marianus",
            potency: "200C",
            dosage: "15 drops directly on tongue 3 times daily",
            administrationMode: "Oral mucosal absorption to resolve severe hepatic icterus and bile engorgement."
          }
        ],
        homeMadeDesi: [
          {
            title: "Traditional Sugarcane & Aloe Vera Jaundice Buster",
            ingredients: "Fresh Sugarcane Juice (Ganne ka ras) 2 Liters, Aloe Vera pulp (Gheekumari) 200g, Turmeric powder 25g.",
            preparation: "Blend fresh aloe vera pulp into clean sugarcane juice; add turmeric powder.",
            dosage: "Drench gently once daily for 5 consecutive days.",
            precautions: "Ensure animal is swallowed without distress; avoid if recumbent."
          }
        ],
        shedHygieneBiosecurity: {
          sanitationSteps: "Never reuse hypodermic needles or dehorning/castration tools across multiple animals (iatrogenic transmission risk).",
          chemicalDisinfection: "Spray Flumethrin or Amitraz to eliminate boophilid tick vectors.",
          flyTickControl: "Deploy fly screens and traps for Tabanus and Stomoxys biting fly suppression."
        }
      }
    },

    // =========================================================================
    // CATEGORY 2: BACTERIAL INFECTIONS
    // =========================================================================
    {
      id: "HS",
      nameEn: "Hemorrhagic Septicemia (HS)",
      nameHi: "गलघोंटू (घुर्रा / हेमोरेजिक सेप्टीसीमिया)",
      ruralNames: ["गलघोंटू", "घुर्रा", "घोंटू", "गला सूजा", "कंठ सूजन"],
      category: "Bacterial",
      etiology: "Pasteurella multocida (Serotypes B:2 and E:2). Acute, peracute endotoxic septicemia.",
      confirmatoryLabDiagnosis: {
        sample: "Aspirate from brisket/submandibular edema or peripheral blood smear in sterile EDTA.",
        testName: "Leishman / Giemsa / Methylene Blue Stain.",
        approxCostINR: 100,
        keyMarker: "Gram-negative, characteristic bipolar organisms (safety-pin appearance)."
      },
      pathologicalTrajectory: {
        stage1: {
          title: "Hyper-Acute Septicemic Surge",
          signs: "Sudden spike in body temperature (105 - 107°F), total anorexia, shivering, muscle fasciculations, extreme depression.",
          durationHours: 12
        },
        stage2: {
          title: "Submandibular & Brisket Edema",
          signs: "Warm, tense, painful swelling spreading rapidly across submandibular region, throat, dewlap, and brisket.",
          durationHours: 12
        },
        stage3: {
          title: "Acute Respiratory Distress (Stertor)",
          signs: "Profuse frothy salivation, protruding tongue, loud snoring/grunting respiration (stertor), extended neck.",
          durationHours: 8
        },
        stage4: {
          title: "Endotoxic Shock & Asphyxia",
          signs: "Recumbency, subnormal temperature (<99°F), severe cyanosis of mucous membranes, endotoxic collapse, death.",
          durationHours: 4
        },
        positiveRecoveryTimeline: [
          "Hour 0: Aggressive early bactericidal treatment with Ceftiofur or Oxytetracycline.",
          "Hour 6: Massive drop in endotoxin release; stabilization of respiration.",
          "Hour 12: Throat swelling begins softening and pitting on pressure.",
          "Hour 24: Temperature normalizes (101.5°F); voluntary swallowing of liquid gruel begins.",
          "Day 5: Complete reabsorption of brisket edema and restoration of milk production."
        ],
        negativeDeteriorationTimeline: [
          "Hour 0-12: Bacterial proliferation in blood with massive endotoxemia (LPS release).",
          "Hour 18: Laryngeal edema causes mechanical upper airway obstruction.",
          "Hour 24-30: Fatal asphyxiation coupled with endotoxic circulatory collapse."
        ]
      },
      treatmentProtocol: {
        injections: [
          {
            category: "Third-Generation Cephalosporin (First Line)",
            activeSalt: "Ceftiofur Sodium",
            brands: "Xceft (Zoetis) / Naxcel / Ceftiforce",
            dosageMgPerKg: "1.1 - 2.2 mg/kg body weight",
            standardDose400kg: "1 g dissolved in 20 ml sterile water",
            route: "Intramuscular (IM) or Subcutaneous (SC) every 24 hours for 3 days",
            pregnancy
