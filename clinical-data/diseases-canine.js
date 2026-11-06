// Vetcare AI OS - Canine (Dog) Clinical Disease Database, Symptom Matrices & Rx Regimens (2026 Production)
(function () {
  "use strict";

  // 1. GLOBAL NAMESPACE ATTACHMENT
  window.VetcareApp = window.VetcareApp || {};
  window.VetcareApp.ClinicalData = window.VetcareApp.ClinicalData || {};

  // 2. CANINE CLINICAL DATABASE DOSSIERS (COMPREHENSIVE ZERO-PLACEHOLDER SPECIFICATION)
  window.VetcareApp.ClinicalData.Canine = [
    {
      id: "canine-parvo",
      name: "Canine Parvovirus Enteritis (CPV-2 Acute Hemorrhagic Enteritis)",
      nameHi: "कैनाइन पार्वो वायरस (कुत्तों की गंभीर खूनी उल्टी, बदबूदार दस्त व निर्जलीकरण)",
      category: "Viral Enteric",
      tempRange: {
        minF: 98.0,
        maxF: 104.5,
        normalF: 101.5
      },
      cardinalSymptoms: [
        "Projectile, foul-smelling, hemorrhagic (bloody) liquid diarrhea with sloughed mucosal tissue (अत्यधिक बदबूदार, खून व आंतों की झिल्ली युक्त पतले खूनी दस्त)",
        "Persistent, intractable vomiting of white frothy fluid or bile-stained liquid (लगातार सफेद झागदार या पीले पित्त की उल्टी होना)",
        "Severe, rapid dehydration with loss of skin turgor and sunken ocular globes (त्वचा का खिंचाव खत्म होना, आंखें धंसना व गंभीर निर्जलीकरण)",
        "Profound hypothermia (<99.0°F) in terminal endotoxic septic shock, or initial high fever (शुरुआत में तेज बुखार, बाद में सेप्टिक शॉक में शरीर का अत्यधिक ठंडा पड़ना)",
        "Complete anorexia, severe mental depression, and tucking of the abdomen due to visceral pain (पूर्ण रूप से खाना-पीना छोड़ना, अत्यधिक सुस्ती व पेट सिकोड़ना)",
        "Profound panleukopenia (WBC < 2,000 /µL) predisposing to gram-negative bacteremia and DIC (सफेद रक्त कणिकाओं की भारी कमी जिससे रक्त संक्रमण व मौत का खतरा)"
      ],
      differentialDiagnosis: [
        "Canine Coronavirus Enteritis (CCoV)",
        "Hemorrhagic Gastroenteritis (HGE / AHDS)",
        "Intestinal Intussusception",
        "Linear Gastrointestinal Foreign Body",
        "Ancylostomiasis (Hookworm severe infestation)",
        "Giardiasis"
      ],
      firstLineDrugs: [
        {
          genericName: "Maropitant Citrate",
          brandExample: "Cerenia 10mg/ml",
          doseMgPerKg: 1.0,
          route: "SC",
          frequency: "OD",
          durationDays: 5,
          pregnancySafe: true,
          notes: "Neurokinin-1 (NK-1) receptor antagonist. Gold standard antiemetic; blocks central emetic center and visceral gut nociception. Inject cold to reduce stinging."
        },
        {
          genericName: "Ondansetron Hydrochloride",
          brandExample: "Emeset 2mg/ml",
          doseMgPerKg: 0.5,
          route: "IV",
          frequency: "TDS",
          durationDays: 5,
          pregnancySafe: true,
          notes: "Serotonin 5-HT3 receptor antagonist. Administer as slow IV push for synergistic control of refractory vomiting alongside Maropitant."
        },
        {
          genericName: "Pantoprazole Sodium",
          brandExample: "Pantocid 40mg vial",
          doseMgPerKg: 1.0,
          route: "IV",
          frequency: "OD",
          durationDays: 5,
          pregnancySafe: true,
          notes: "Proton pump inhibitor. Prevents gastric acid erosion, mucosal ulceration, and reflux esophagitis caused by persistent vomition."
        },
        {
          genericName: "Ceftriaxone Sodium",
          brandExample: "Monocef 250mg/500mg vial",
          doseMgPerKg: 25.0,
          route: "IV",
          frequency: "BD",
          durationDays: 5,
          pregnancySafe: true,
          notes: "Third-generation cephalosporin. Crucial broad-spectrum barrier against bacterial translocation across denuded intestinal villi."
        },
        {
          genericName: "Metronidazole",
          brandExample: "Metrogyl IV (500mg/100ml)",
          doseMgPerKg: 10.0,
          route: "IV",
          frequency: "BD",
          durationDays: 5,
          pregnancySafe: false,
          notes: "Anaerobic and protozoal coverage. Infuse slowly over 30 minutes to eliminate Clostridium overgrowth and prevent septic peritonitis."
        }
      ],
      supportiveCare: [
        "AGGRESSIVE INTRAVENOUS RESUSCITATION: Ringer's Lactate (RL) or Plasmalyte-A at 60-90 ml/kg/day + percentage dehydration deficit replacement.",
        "Potassium Chloride (KCl) supplementation: Add 20-30 mEq/L to IV fluids to correct severe hypokalemia induced by vomition and diarrhea.",
        "Maintain strict NPO (Nil Per Os - nothing by mouth) during intractable vomiting; initiate early micro-enteral nutrition via syringe (liquid convalescence diet) as soon as vomiting ceases for 12 hours.",
        "Provide thermal support (heating pad, warm blankets) to actively correct hypothermia and prevent hypovolemic vascular collapse."
      ],
      contraindications: [
        "FATAL: NEVER administer Metoclopramide if intestinal intussusception or foreign body obstruction is suspected (causes intestinal perforation).",
        "NEVER administer oral medications or food while the dog is actively vomiting (induces fatal aspiration pneumonia).",
        "NEVER administer NSAIDs (Meloxicam, Carprofen) or Corticosteroids; triggers fulminant gastrointestinal perforation and acute renal necrosis in dehydrated patients.",
        "Avoid aminoglycosides (Gentamicin, Amikacin) until rehydration is 100% achieved due to acute nephrotoxic tubular necrosis."
      ],
      desiNuskhe: [
        {
          name: "इलेक्ट्रोलाइट चावल मांड व अरारोट लुआब (Convalescent Rice Starch & Arrowroot Gut Protector)",
          ingredients: "Overcooked white rice water (Chawal ka Mand) 500ml, Arrowroot powder 10g, Rock sugar (Mishri) 10g, Table salt 2g.",
          preparation: "Boil high-starch white rice in excess water. Strain thick starch water, dissolve arrowroot powder and salts, and cool to room temperature.",
          administration: "Administer 5-10 ml orally via syringe every 2 hours ONLY after vomiting has completely stopped for 12-24 hours. Lines the damaged enteric mucosa."
        },
        {
          name: "अनारदाना व दूब घास रस (Pomegranate Rind & Bermuda Grass Hemostatic Extract)",
          ingredients: "Dry pomegranate rind (Anar ka chilka) 20g, Fresh Doob grass (Cynodon dactylon) 20g, Water 250ml.",
          preparation: "Boil bruised pomegranate peel and fresh grass in water down to 100ml. Filter through sterile double muslin cloth.",
          administration: "Syringe 5 ml BD during recovery to exert natural tannin-mediated astringent action on hemorrhagic enteric capillary beds."
        }
      ],
      preventionAndVaccination: [
        "Core Vaccination (DHPPiL): Primary dose at 6 weeks, booster at 9 weeks, third booster at 12 weeks, and final puppy booster at 16 weeks.",
        "Annual revaccination with high-antigenic titer modified live CPV-2b/2c vaccines.",
        "Disinfect contaminated premises, floors, and cages exclusively with 1:30 dilution of household Sodium Hypochlorite (Bleach) or Potassium Peroxymonosulfate (Virkon-S).",
        "Strict isolation: Do not take non-fully vaccinated puppies to public parks, pet shops, or walking tracks."
      ]
    },
    {
      id: "canine-distemper",
      name: "Canine Distemper (Canine Morbillivirus Neuro-Systemic Infection)",
      nameHi: "कैनाइन डिस्टेंपर (कुत्तों का संक्रामक तांत्रिक रोग / हार्ड पैड रोग व दौरे)",
      category: "Viral Neuro-systemic",
      tempRange: {
        minF: 102.5,
        maxF: 106.0,
        normalF: 101.5
      },
      cardinalSymptoms: [
        "Biphasic fever: Initial febrile spike (103-105°F) subsiding, followed by a second sustained high spike with multi-systemic failure (दो चरणों में आने वाला तेज बुखार)",
        "Bilateral thick mucopurulent oculonasal discharge and productive wet coughing (आंखों व नाक से गाढ़ा मवाद जैसा स्राव बहना व लगातार गीली खांसी)",
        "Hyperkeratosis of footpads and nasal planum ('Hard Pad Disease') with cracking and secondary pain (पैरों की गद्दियों व नाक का अत्यधिक कड़ा, सूखा व दरारयुक्त हो जाना)",
        "Rhythmic involuntary localized muscle twitches, ticking, and continuous localized jerking (Myoclonus / Chorea) (मांसपेशियों का लगातार फड़कना, खासकर जबड़े व पैरों का हिलना)",
        "'Chewing-gum' fits: Salivation, jaw-champing, and focal motor seizures progressing to generalized epileptiform convulsions (मुंह चलाना जैसे गोंद चबा रहे हों, लार गिरना व मिर्गी के दौरे)",
        "Optic neuritis, sudden retinal detachment, anterior uveitis, and complete permanent blindness (आंखों की पुतली का फैलना, रेटिना खराब होना व अंधापन)"
      ],
      differentialDiagnosis: [
        "Rabies (Paralytic or Furious phase)",
        "Infectious Canine Hepatitis (CAV-1)",
        "Canine Parvovirus (enteric phase)",
        "Canine Infectious Respiratory Disease Complex (Bordetella bronchiseptica)",
        "Lead / Organophosphate Poisoning",
        "Idiopathic Epilepsy"
      ],
      firstLineDrugs: [
        {
          genericName: "Levetiracetam",
          brandExample: "Keppra 500mg tabs / 100mg/ml IV",
          doseMgPerKg: 20.0,
          route: "Oral",
          frequency: "TDS",
          durationDays: 21,
          pregnancySafe: true,
          notes: "First-choice anticonvulsant for distemper-induced myoclonus, jaw champing, and epileptic status. Rapid onset without excessive hepatic metabolism."
        },
        {
          genericName: "Phenobarbital Sodium",
          brandExample: "Gardenal 30mg/60mg tabs / Inj",
          doseMgPerKg: 3.0,
          route: "Oral",
          frequency: "BD",
          durationDays: 30,
          pregnancySafe: false,
          notes: "Maintenance anticonvulsant for refractory seizures. Titrate to achieve therapeutic serum level (15-40 µg/ml). Monitor liver enzymes."
        },
        {
          genericName: "Ceftriaxone Sodium",
          brandExample: "Intracef 500mg vial",
          doseMgPerKg: 25.0,
          route: "IV",
          frequency: "BD",
          durationDays: 7,
          pregnancySafe: true,
          notes: "Crosses inflamed blood-brain barrier. Controls life-threatening secondary bacterial bronchopneumonia and suppurative meningoencephalitis."
        },
        {
          genericName: "Mecobalamin + Pyridoxine + Nicotinamide (Vitamin B-Complex)",
          brandExample: "Neurobion Forte / Optineuron Inj",
          doseMgPerKg: 1.0,
          route: "IM",
          frequency: "OD",
          durationDays: 14,
          pregnancySafe: true,
          notes: "Promotes myelin sheath regeneration and counters neurotropic viral axonal degeneration."
        },
        {
          genericName: "Alpha Lipoic Acid + Vitamin E",
          brandExample: "Evion 400mg / Neuro-Antioxidant Cap",
          doseMgPerKg: 10.0,
          route: "Oral",
          frequency: "OD",
          durationDays: 21,
          pregnancySafe: true,
          notes: "Potent neuroprotective antioxidant therapy to scavenge free radicals within inflamed central nervous tissue."
        }
      ],
      supportiveCare: [
        "Perform nebulization using sterile normal saline and N-Acetylcysteine (200 mg) for 15 minutes TID to mobilize viscous bronchopulmonary exudates.",
        "Clean oculonasal discharges with warm boric acid 2% solution; apply protective ciprofloxacin-dexamethasone eye drops ONLY if corneal ulcer is ruled out.",
        "Provide soft, heavily padded bedding and change positions every 2 hours if the patient is paretic to prevent decubitus bed sores.",
        "Maintain high-calorie, semi-solid nutrition with high biologic value protein and omega-3 fatty acids (EPA/DHA)."
      ],
      contraindications: [
        "NEVER administer systemic Corticosteroids (Dexamethasone/Prednisolone) during active viremia; induces catastrophic lymphoid depletion and accelerates fatal encephalitis.",
        "NEVER administer Paracetamol, Ibuprofen, or Diclofenac (causes acute fatal canine hepatic and renal toxicosis).",
        "Avoid high-dose Diazepam orally in chronic seizure control (rapid development of tolerance and risk of hepatic necrosis)."
      ],
      desiNuskhe: [
        {
          name: "अश्वगंधा, ब्राह्मी व शंखपुष्पी स्नायु शामक चूर्ण (Ashwagandha & Brahmi Neuro-Regenerative Tonic)",
          ingredients: "Ashwagandha (Withania somnifera) 30g, Brahmi (Bacopa monnieri) 30g, Shankhpushpi 30g, Pure Cow's Ghee 100g.",
          preparation: "Triturate the herbs into micro-fine powder. Blend 2g of the herbal blend into 5g of pure warm cow's ghee.",
          administration: "Feed orally twice daily. Acts as a potent medhya rasayana to alleviate nervous agitation and mitigate chronic myoclonic twitching."
        },
        {
          name: "हल्दी व नारियल तेल खुरपका मरहम (Turmeric & Virgin Coconut Pad Emollient)",
          ingredients: "Pure Curcuma longa powder (Haldi) 20g, Virgin Coconut Oil 100ml, Pure Beeswax 20g.",
          preparation: "Melt beeswax in coconut oil on low flame, incorporate turmeric powder, and allow to set into a smooth ointment.",
          administration: "Massage liberally over cracked, hyperkeratotic footpads and the dry nasal planum twice daily to restore skin elasticity."
        }
      ],
      preventionAndVaccination: [
        "Core Vaccination with modified live Canine Distemper Virus (CDV) vaccine: 6, 9, 12, and 16 weeks of age.",
        "Booster at 1 year of age and triennial revaccination thereafter.",
        "Strictly isolate infected dogs: CDV is shed in all body secretions (respiratory droplets, urine, feces) and can persist in damp kennels.",
        "Disinfect surroundings with quaternary ammonium compounds, bleach (1:30), or glutaraldehyde."
      ]
    },
    {
      id: "canine-rabies",
      name: "Rabies / Hydrophobia (Lyssavirus Encephalomyelitis - 100% Fatal Zoonosis)",
      nameHi: "रेबीज / हाइड्रोफोबिया / जलांतक (घातक वायरल मस्तिष्क ज्वर - 100% प्राणघातक जुनोटिक रोग)",
      category: "Fatal Viral Zoonosis",
      tempRange: {
        minF: 100.5,
        maxF: 105.0,
        normalF: 101.5
      },
      cardinalSymptoms: [
        "Prodromal behavioral metamorphosis: Friendly dogs become timid/aggressive; shy dogs become abnormally clingy (व्यवहार में अचानक असामान्य बदलाव)",
        "Furious Form: Extreme erratic unprovoked aggression, biting inanimate objects (stones, iron rods, wood) (अत्यधिक हिंसक होना, बिना वजह पत्थर, लोहे व लकड़ी को काटना)",
        "Dysphagia, laryngeal paralysis, and pathognomonic dropped jaw with inability to swallow (गला घुट जाना, जबड़ा लटकना व निगलने में पूरी तरह असमर्थता)",
        "Profuse continuous drooling of thick frothy saliva hanging from the open mouth (मुंह से लगातार गाढ़ी झागदार लार टपकना)",
        "Altered phonation: Hoarse, abnormal howling bark ('croup-like' cry) due to vocal cord paresis (आवाज में भारी बदलाव, कर्कश भौंकना या रोना)",
        "Dumb/Paralytic Form: Rapidly ascending lower motor neuron paralysis starting from hind limbs, progressing to coma and respiratory arrest (पिछले पैरों से शुरू होकर पूरे शरीर का पक्षाघात व मृत्यु)"
      ],
      differentialDiagnosis: [
        "Aujeszky's Disease (Pseudorabies)",
        "Canine Distemper (Encephalitic stage)",
        "Laryngeal foreign body / Bone lodgement in pharynx",
        "Severe Hypocalcemia",
        "Acute Lead Toxicosis"
      ],
      firstLineDrugs: [
        {
          genericName: "TREATMENT IS STRICTLY PROHIBITED BY LAW",
          brandExample: "Statutory Public Health Protocol",
          doseMgPerKg: 0.0,
          route: "IV",
          frequency: "Stat",
          durationDays: 0,
          pregnancySafe: false,
          notes: "There is NO cure for clinical rabies in canines. Attempting medical treatment creates extreme fatal human exposure risk. Rabies has a ~100% fatality rate once clinical signs appear."
        },
        {
          genericName: "Post-Exposure Prophylaxis (PEP) for Bitten Humans: Anti-Rabies Vaccine (ARV)",
          brandExample: "Rabipur / Verorab (Human Cell-Culture)",
          doseMgPerKg: 0.0,
          route: "IM",
          frequency: "Stat",
          durationDays: 28,
          pregnancySafe: true,
          notes: "For exposed handlers/veterinarians: Immediate administration of Human Rabies Immunoglobulin (HRIG 20 IU/kg) infiltrated into the wound + Essen ARV regimen on Days 0, 3, 7, 14, and 28."
        }
      ],
      supportiveCare: [
        "IMMEDIATE STATUTORY ACTION: Place the suspected canine in an escape-proof, double-locked, secure isolation cage under 10-day quarantine observation.",
        "NEVER examine the oral cavity with bare hands or attempt to remove perceived throat obstructions.",
        "Notify the District Veterinary Officer and Municipal Public Health authorities immediately.",
        "In case of death: Carcass must not be autopsied on open ground; the head/brain must be submitted in a cold chain container to an authorized diagnostic laboratory (FAT - Fluorescent Antibody Test) followed by deep incineration."
      ],
      contraindications: [
        "CRITICAL: NEVER attempt to administer oral medications, fluids, or drenching (triggers choking, violent defensive biting, and human inoculation).",
        "NEVER administer rabies vaccine to an animal already exhibiting overt clinical signs of rabies (ineffective and dangerous).",
        "Never release or handle suspected rabid animals without heavy anti-bite protective gloves, snare poles, and face shields."
      ],
      desiNuskhe: [
        {
          name: "काटे गए घाव का त्वरित साबुन व पानी से प्रक्षालन (Immediate Post-Bite Emergency Decontamination)",
          ingredients: "Running tap water (Prachur Jal) 10-15 Liters, Alkaline Carbolic/Detergent Soap (Lifebuoy or Rin), Povidone Iodine 10%.",
          preparation: "Immediate field procedure: Do not wait for medical arrival.",
          administration: "Wash the bite wound vigorously under a forceful stream of running tap water with alkaline soap for a minimum of 15 FULL MINUTES continuously. Paint generously with 10% Povidone-Iodine. Destroys the lipid envelope of the virus locally."
        }
      ],
      preventionAndVaccination: [
        "Inactivated Rabies Vaccine (e.g., Nobivac Rabies, Defensor-3, Raksharab): Primary dose at 12 weeks (3 months) of age.",
        "Mandatory booster at 1 year of age, followed by strict annual or triennial revaccination as per local municipal statutes.",
        "Enforce mass ABC-ARV (Animal Birth Control - Anti-Rabies Vaccination) programs in community/feral street dog populations.",
        "Pre-exposure prophylaxis (PrEP) immunization (Days 0, 7, 21/28) for all clinical veterinarians, vet nurses, and animal shelter workers."
      ]
    },
    {
      id: "canine-ehrlichiosis",
      name: "Canine Monocytic Ehrlichiosis / Tick Fever (Ehrlichia canis Infection)",
      nameHi: "कैनाइन एर्लिचियोसिस / टिक फीवर (चिचड़ी जनित बुखार, रक्ताल्पता, प्लेटलेट की कमी व नकसीर)",
      category: "Tick-borne Rickettsial",
      tempRange: {
        minF: 102.5,
        maxF: 105.5,
        normalF: 101.5
      },
      cardinalSymptoms: [
        "Spontaneous epistaxis (severe bleeding from one or both nostrils) due to severe thrombocytopenia (नाक से अचानक खून बहना / नकसीर फूटना)",
        "Petechiae, ecchymoses, and hematomas on the ventral abdomen, gums, and inner pinnae (मसूड़ों, पेट व कानों की त्वचा पर खून के लाल-नीले चकत्ते पड़ना)",
        "High intermittent fever with shivering, depression, and severe weight loss (तेज रुक-रुक कर आने वाला बुखार, कंपकंपी व वजन घटना)",
        "Generalized lymphadenopathy and marked splenomegaly palpable on physical examination (गर्दन व जांघों की ग्रंथियों व तिल्ली का असामान्य रूप से बढ़ना)",
        "Ocular lesions: Bilateral anterior uveitis, hyphema (blood in the anterior chamber), and retinal hemorrhages (आंखों में खून उतरना, धुंधलापन व अंधापन)",
        "Severe thrombocytopenia (Platelets < 50,000 /µL) with concurrent non-regenerative anemia and leukopenia in chronic phase (प्लेटलेट्स व हीमोग्लोबिन में जानलेवा गिरावट)"
      ],
      differentialDiagnosis: [
        "Canine Babesiosis (Babesia gibsoni/canis)",
        "Canine Anaplasmosis (Anaplasma platys)",
        "Immune-Mediated Thrombocytopenia (IMTP / Evans Syndrome)",
        "Leptospirosis",
        "Rodenticide (Anticoagulant) Poisoning"
      ],
      firstLineDrugs: [
        {
          genericName: "Doxycycline Hyclate / Monohydrate",
          brandExample: "Doxt-SL / Doxypet 100mg/300mg tabs",
          doseMgPerKg: 10.0,
          route: "Oral",
          frequency: "OD",
          durationDays: 28,
          pregnancySafe: false,
          notes: "DRUG OF CHOICE. Administer 10 mg/kg OD (or 5 mg/kg BD) with a moist meal for a FULL 28 CONSECUTIVE DAYS to clear sequestration in bone marrow/spleen. Always flush with water to prevent esophagitis."
        },
        {
          genericName: "Imidocarb Dipropionate",
          brandExample: "Imizol 120mg/ml",
          doseMgPerKg: 5.0,
          route: "SC",
          frequency: "Stat",
          durationDays: 1,
          pregnancySafe: false,
          notes: "Adjunctive rickettsial/hemoparasite agent: 5 mg/kg SC once, repeated after 14 days. Pre-treat with Atropine (0.04 mg/kg SC) if salivation/cholinergic signs occur."
        },
        {
          genericName: "Prednisolone",
          brandExample: "Omnacortil 10mg/20mg tabs",
          doseMgPerKg: 1.0,
          route: "Oral",
          frequency: "OD",
          durationDays: 5,
          pregnancySafe: false,
          notes: "Short tapering course (1 mg/kg for 3-5 days, then taper) to halt immune-mediated platelet destruction when life-threatening bleeding/epistaxis is active."
        },
        {
          genericName: "Carbazochrome / Ethamsylate",
          brandExample: "Dicynene 250mg Inj / Tabs",
          doseMgPerKg: 10.0,
          route: "IV",
          frequency: "BD",
          durationDays: 3,
          pregnancySafe: true,
          notes: "Systemic hemostatic agent. Promotes capillary endothelial resistance and platelet adhesiveness during active epistaxis episodes."
        }
      ],
      supportiveCare: [
        "Perform whole blood transfusion (Fresh whole blood at 10-20 ml/kg) if PCV drops below 15% or ongoing intractable epistaxis threatens life.",
        "Ice pack application over the nasal dorsum to achieve local vasoconstriction during active epistaxis.",
        "Administer hematinic therapy: Ferrous sulfate, folic acid, methylcobalamin, and copper/cobalt supplements for 30-60 days.",
        "Provide liver protectants (Silymarin, SAMe) to offset medication burden and hepatic inflammation."
      ],
      contraindications: [
        "NEVER administer Doxycycline on an empty dry stomach (induces severe ulcerative esophagitis and esophageal stricture).",
        "NEVER administer NSAIDs (Meloxicam, Carprofen) in thrombocytopenic dogs (aggravates platelet dysfunction and triggers catastrophic internal hemorrhage).",
        "Avoid breeding affected dogs during active disease due to vertical in-utero transmission risks."
      ],
      desiNuskhe: [
        {
          name: "पपीते के पत्तों का रस व गिलोय सत्व (Papaya Leaf & Giloy Platelet Enhancer)",
          ingredients: "Fresh Carica papaya leaves 50g, Fresh Tinospora cordifolia (Giloy) stems 20g, Clean filtered water 100ml.",
          preparation: "Crush fresh young papaya leaves and giloy stems without adding excess water. Express dark green juice through sterile cheesecloth.",
          administration: "Drench 5-10 ml orally twice daily for 7-14 days. Contains carpaine and flavonoids that stimulate thrombopoietin production and bone marrow megakaryocytopoiesis."
        },
        {
          name: "दूर्वा घास व आंवला रक्तरोधी रस (Bermuda Grass & Amla Coagulation Booster)",
          ingredients: "Fresh Cynodon dactylon (Doob) 50g, Indian Gooseberry (Amla) juice 20ml, Honey 10ml.",
          preparation: "Grind washed doob grass into a fine paste and extract green juice. Blend with fresh amla juice and pure honey.",
          administration: "Administer 10 ml orally twice daily during bleeding diathesis to provide bioflavonoids and Vitamin C to reinforce fragile capillary beds."
        }
      ],
      preventionAndVaccination: [
        "No vaccine is available against Ehrlichia canis.",
        "Total Tick Control: Monthly oral isoxazoline administration (Fluralaner - Bravecto, Afoxolaner - NexGard, or Sarolaner - Simparica).",
        "Apply tick collars containing Deltamethrin or Amitraz (e.g., Scalibor, Preventic) for active deterrence against Rhipicephalus sanguineus (brown dog tick).",
        "Environmental acaricidal treatment of kennels with Cypermethrin or Deltamethrin spray every 3 weeks during summer and monsoon seasons."
      ]
    },
    {
      id: "canine-babesiosis",
      name: "Canine Babesiosis (Babesia gibsoni & Babesia canis Hemoprotozoosis)",
      nameHi: "कैनाइन बबेसियोसिस (कुत्तों का रक्त-परजीवी रोग / लाल पेशाब, पीलिया व तीव्र रक्ताल्पता)",
      category: "Protozoan Hemoparasitic",
      tempRange: {
        minF: 103.0,
        maxF: 106.0,
        normalF: 101.5
      },
      cardinalSymptoms: [
        "Pathognomonic port-wine or cola-colored urine (Hemoglobinuria) due to massive intravascular hemolysis (कोला या गहरे लाल-भूरे रंग का पेशाब आना)",
        "Profound pallor of mucous membranes rapidly progressing to severe icterus/jaundice (मसूड़ों व आंखों का पहले सफेद पड़ना, फिर गहरा पीला हो जाना)",
        "Extreme lethargy, exercise intolerance, tachypnea, and bounding water-hammer pulse (अत्यधिक कमजोरी, चलने में असमर्थता व तेज-तेज सांस लेना)",
        "Spiking high fever (103.5 - 106°F) accompanied by rigorous muscle tremors (अचानक तेज कंपकंपी वाला बुखार)",
        "Splenomegaly with abdominal discomfort upon mid-abdominal palpation (तिल्ली का अत्यधिक बढ़ना व पेट में दर्द)",
        "Severe regenerative hemolytic anemia (PCV plunging < 15%) with hyperbilirubinemia and spherocytosis (लाल रक्त कोशिकाओं का टूटना व हीमोग्लोबिन में घातक कमी)"
      ],
      differentialDiagnosis: [
        "Canine Monocytic Ehrlichiosis (E. canis)",
        "Immune-Mediated Hemolytic Anemia (IMHA / Coombs positive)",
        "Canine Leptospirosis (icteric form)",
        "Zinc / Onion / Garlic Toxicosis",
        "Snake Envenomation (Viperid hemolytic venom)"
      ],
      firstLineDrugs: [
        {
          genericName: "Diminazene Diaceturate (For Babesia canis)",
          brandExample: "Berenil 7% Inj / Diminavet",
          doseMgPerKg: 3.5,
          route: "IM",
          frequency: "Stat",
          durationDays: 1,
          pregnancySafe: false,
          notes: "Inject deep intramuscularly. Highly curative for large Babesia (B. canis). Repeat once after 24 hours ONLY if strictly necessary. Overdose causes fatal cerebellar hemorrhage."
        },
        {
          genericName: "Imidocarb Dipropionate",
          brandExample: "Imizol 120mg/ml",
          doseMgPerKg: 6.6,
          route: "SC",
          frequency: "Stat",
          durationDays: 2,
          pregnancySafe: false,
          notes: "Inject 6.6 mg/kg SC once, repeat after 14 days. Effective against B. canis. Pre-treat with Atropine to alleviate excessive salivation, lacrimation, and diarrhea."
        },
        {
          genericName: "Atovaquone + Azithromycin Protocol (For Babesia gibsoni)",
          brandExample: "Mepron Oral Susp (750mg/5ml) + Azee 200mg",
          doseMgPerKg: 13.3,
          route: "Oral",
          frequency: "TDS",
          durationDays: 10,
          pregnancySafe: true,
          notes: "GOLD STANDARD for small Babesia (B. gibsoni): Atovaquone 13.3 mg/kg PO TID administered with a high-fat meal + Azithromycin 10 mg/kg PO OD for 10 days."
        },
        {
          genericName: "Clindamycin Hydrochloride (Alternative B. gibsoni Protocol)",
          brandExample: "Antirobe / Clindex 150mg/300mg",
          doseMgPerKg: 25.0,
          route: "Oral",
          frequency: "BD",
          durationDays: 21,
          pregnancySafe: true,
          notes: "Often combined with Diminazene (3.5 mg/kg IM Day 1) + Metronidazole (15 mg/kg BD) for resource-constrained therapy of B. gibsoni."
        }
      ],
      supportiveCare: [
        "Perform emergency blood transfusion (Cross-matched packed red blood cells or fresh whole blood) immediately if PCV < 12% or clinical shock develops.",
        "Judicious balanced IV fluid therapy (Normal Saline or Ringer's Lactate) to flush free hemoglobin through renal tubules and prevent acute pigment nephropathy.",
        "Administer Hepatoprotectives: Ursodeoxycholic acid (UDCA 10-15 mg/kg OD) and S-Adenosylmethionine (SAMe 20 mg/kg OD) to resolve severe cholestatic icterus.",
        "Keep the patient strictly warm, quiet, and rested in an oxygen-enriched environment during peak hemolysis."
      ],
      contraindications: [
        "CRITICAL: NEVER exceed the recommended dose of Diminazene Diaceturate (causes catastrophic symmetric midbrain and cerebellar necrotic cavitation).",
        "NEVER administer Imidocarb intravenously (triggers acute hypotensive collapse, severe bradycardia, and sudden death).",
        "Do NOT administer urinary acidifiers; alkaline urine protects renal tubules from hemoglobinuric nephrosis."
      ],
      desiNuskhe: [
        {
          name: "पुनर्नवा, मकोय व गिलोय यकृत-वृक्क शोधन काढ़ा (Punarnava, Makoy & Giloy Renal Flush)",
          ingredients: "Punarnava root (Boerhavia diffusa) 30g, Dried Black Nightshade berries (Makoy) 20g, Fresh Giloy 30g, Water 500ml.",
          preparation: "Boil ingredients slowly down to 150ml. Filter and cool completely.",
          administration: "Administer 10-15 ml orally twice daily. Acts as a gentle diuretic to prevent hemoglobin casts from obstructing the renal collecting ducts and eases jaundice."
        },
        {
          name: "गन्ने का शुद्ध ताजा रस व ग्लूकोज (Fresh Sugarcane & Glucose Hepatic Energizer)",
          ingredients: "Freshly squeezed hygienic Sugarcane Juice 50ml, Dextrose monohydrate powder 10g.",
          preparation: "Dissolve dextrose in fresh, clean sugarcane juice.",
          administration: "Syringe 20 ml orally TID. Supplies direct glycogen stores to the damaged hepatic parenchyma and combats hypoglycemia."
        }
      ],
      preventionAndVaccination: [
        "No fully protective universal commercial vaccine is available in Asia/India (Pirodog available in Europe has limited strain cross-protection).",
        "Rigorous vector management: Rhipicephalus sanguineus and Haemaphysalis bispinosa tick control with isoxazolines (Bravecto, Simparica) administered on schedule.",
        "Never use unsterilized surgical needles, scalpels, or grooming clippers between multiple dogs (prevents iatrogenic blood-borne transmission).",
        "Screen all canine blood donor candidates by real-time PCR for Babesia gibsoni/canis prior to transfusion."
      ]
    },
    {
      id: "canine-leptospirosis",
      name: "Canine Leptospirosis (Leptospira interrogans Zoonotic Hepatorenal Syndrome)",
      nameHi: "कैनाइन लेप्टोस्पायरोसिस (संक्रामक पीलिया, गुर्दे की विफलता व पेशाब में खून - घातक जुनोटिक रोग)",
      category: "Bacterial Zoonotic",
      tempRange: {
        minF: 102.5,
        maxF: 105.0,
        normalF: 101.5
      },
      cardinalSymptoms: [
        "Acute oliguric or anuric Renal Failure: Severe polydipsia initially, progressing to complete cessation of urination (शुरुआत में ज्यादा प्यास, बाद में पेशाब का पूरी तरह बंद होना)",
        "Deep bright-yellow icterus (jaundice) across sclera, gums, and skin with foul uremic breath odor (गहरी पीली आंखें व मसूड़े, और मुंह से पेशाब/यूरिया जैसी बदबू आना)",
        "Severe myalgia, lumbar pain, hunching of the back, and extreme reluctance to move (कमर व जांघों की मांसपेशियों में असहनीय दर्द व अकड़न)",
        "Widespread petechial mucosal hemorrhages, hematemesis, and dark melena (खूनी उल्टी व काला तारकोल जैसा खूनी मल आना)",
        "Intractable vomiting, severe dehydration, and rapidly progressive uremic ulceration of the tongue tip (लगातार उल्टी, जीभ पर छाले पड़ना व निर्जलीकरण)",
        "Leptospiric Pulmonary Hemorrhage Syndrome (LPHS): Sudden dyspnea, hemoptysis, and acute respiratory failure (फेफड़ों से खून आना व सांस लेने में अत्यधिक तकलीफ)"
      ],
      differentialDiagnosis: [
        "Infectious Canine Hepatitis (CAV-1)",
        "Canine Babesiosis / Ehrlichiosis",
        "Acute Ethylene Glycol (Antifreeze) Poisoning",
        "Acute Pancreatitis",
        "Immune-Mediated Hemolytic Anemia"
      ],
      firstLineDrugs: [
        {
          genericName: "Ampicillin Sodium",
          brandExample: "Ampicillin 500mg vial",
          doseMgPerKg: 20.0,
          route: "IV",
          frequency: "TDS",
          durationDays: 5,
          pregnancySafe: true,
          notes: "PHASE 1 (ACUTE LEPTOSPIREMIA): Administer IV to rapidly eliminate bacteremia, halt replication, and prevent progressive visceral seeding. Shift to Doxycycline once vomiting stops."
        },
        {
          genericName: "Doxycycline Hyclate",
          brandExample: "Doxt-SL / Doxypet 100mg",
          doseMgPerKg: 5.0,
          route: "Oral",
          frequency: "BD",
          durationDays: 14,
          pregnancySafe: false,
          notes: "PHASE 2 (RENAL CARRIER CLEARANCE): Mandatory 5 mg/kg BD (or 10 mg/kg OD) for 14 continuous days to eradicate leptospires colonized within the renal proximal tubular epithelium."
        },
        {
          genericName: "Ondansetron Hydrochloride",
          brandExample: "Emeset 2mg/ml",
          doseMgPerKg: 0.5,
          route: "IV",
          frequency: "BD",
          durationDays: 5,
          pregnancySafe: true,
          notes: "Antiemetic to control intractable uremic vomiting and allow transition to oral doxycycline therapy."
        },
        {
          genericName: "Furosemide (ONLY in rehydrated oliguric patients)",
          brandExample: "Lasix 10mg/ml",
          doseMgPerKg: 2.0,
          route: "IV",
          frequency: "Stat",
          durationDays: 1,
          pregnancySafe: true,
          notes: "Used cautiously as a furosemide challenge ONLY after central venous pressure/rehydration is restored to convert oliguric AKI to non-oliguric AKI."
        }
      ],
      supportiveCare: [
        "STRICT ZOONOTIC PPE PROTOCOL: Handlers must wear waterproof gowns, double nitrile gloves, eye goggles, and face shields. Leptospires penetrate mucous membranes and abraded skin.",
        "Treat urine as hazardous biohazard waste: Collect via closed indwelling Foley catheter system; neutralize urine collection bags with 10% bleach.",
        "Initiate intensive fluid therapy using balanced isotonic crystalloids (Plasmalyte or Normal Saline) titrated meticulously against urine output to avoid pulmonary edema.",
        "Hemodialysis or Continuous Renal Replacement Therapy (CRRT) where available is the gold standard for severe uremic acute kidney injury."
      ],
      contraindications: [
        "CRITICAL: Never handle an infected or suspect dog, its bedding, or urine without protective waterproof gloves and face protection.",
        "NEVER administer NSAIDs (Meloxicam, Ketoprofen) or Aminoglycosides (Gentamicin); causes irreversible renal papillary necrosis in nephritic kidneys.",
        "Avoid aggressive fluid overloading in anuric patients (triggers fatal leptospiral pulmonary hemorrhage and pulmonary edema)."
      ],
      desiNuskhe: [
        {
          name: "गोखरू व वरुण छाल वृक्क संरक्षक क्वाथ (Gokshura & Varuna Renal Nephroprotective Decoction)",
          ingredients: "Small Gokshura fruits (Tribulus terrestris) 30g, Varuna bark (Crataeva nurvala) 30g, Coriander seeds (Dhaniya) 20g, Water 750ml.",
          preparation: "Boil gokshura, varuna bark, and crushed coriander in water down to 200ml. Filter through sterile gauze.",
          administration: "Administer 10-15 ml orally twice daily during convalescence. Stimulates glomerular filtration, eases azotemia, and reduces tubular inflammation."
        },
        {
          name: "नीम व ब्लीच कीटाणुशोधक घोल (Neem & Hypochlorite Biohazard Kennel Sanitizer)",
          ingredients: "Household Sodium Hypochlorite (Bleach) 200ml, Neem oil extract 50ml, Water 5 Liters.",
          preparation: "Dilute bleach and neem concentrate into water.",
          administration: "Wash and soak all kennel floors, soiled cages, and bedding immediately to instantly neutralize excreted leptospires."
        }
      ],
      preventionAndVaccination: [
        "Vaccination with Quadrivalent Leptospirosis bacterin (containing serovars Canicola, Icterohaemorrhagiae, Grippotyphosa, and Pomona) as part of DHPPiL booster.",
        "Primary vaccine at 9 and 12 weeks, with annual or bi-annual boosters in high-risk/waterlogged endemic zones.",
        "Eliminate rodent populations: Leptospirosis is maintained by wild rats shedding organisms indefinitely in their urine.",
        "Prevent dogs from swimming in, walking through, or drinking stagnant pond water, flooded streets, or marshy ditches."
      ]
    },
    {
      id: "canine-ich",
      name: "Infectious Canine Hepatitis / Blue Eye (Canine Adenovirus-1 CAV-1)",
      nameHi: "संक्रामक यकृत शोथ / ब्लू आई (कुत्तों का एडिनोवायरस यकृत संक्रमण व आंखों पर नीलापन)",
      category: "Viral Hepatic",
      tempRange: {
        minF: 103.0,
        maxF: 106.0,
        normalF: 101.5
      },
      cardinalSymptoms: [
        "Corneal edema ('Blue Eye'): Unilateral or bilateral milky, bluish-white corneal opacification due to immune-complex anterior uveitis (आंखों की पुतली पर नीला-सफेद धुंधलापन / 'ब्लू आई')",
        "Severe, acute abdominal pain with tucked-up abdomen and hepatomegaly on right cranial palpation (पेट के ऊपरी दाएं हिस्से में तेज दर्द व जिगर का बढ़ना)",
        "Spiking biphasic fever (>104°F) accompanied by severe apathy and complete refusal of food (अत्यधिक तेज बुखार, कंपकंपी व पूर्ण अरुचि)",
        "Widespread hemorrhagic diathesis: Spontaneous bleeding gums, hematomas, and prolonged bleeding from venipuncture sites (मसूड़ों से खून आना व इंजेक्शन की जगह से लगातार खून रिसना)",
        "Marked cervical subcutaneous edema involving the head, neck, and ventral chest (सिर, गर्दन व छाती के निचले हिस्से में पानी भर जाना / सूजन)",
        "Coagulopathy resulting from acute hepatic necrosis and secondary Disseminated Intravascular Coagulation (DIC) (जिगर के नष्ट होने से खून जमने की प्रक्रिया रुकना)"
      ],
      differentialDiagnosis: [
        "Canine Parvovirus (peracute hemorrhagic form)",
        "Canine Leptospirosis",
        "Acute Toxic Hepatitis (Aflatoxicosis / Mushroom Poisoning)",
        "Canine Distemper",
        "Canine Herpesvirus (in neonates)"
      ],
      firstLineDrugs: [
        {
          genericName: "Amoxicillin + Clavulanate Potassium",
          brandExample: "Augmentin / Clavam 300mg/600mg Inj",
          doseMgPerKg: 20.0,
          route: "IV",
          frequency: "BD",
          durationDays: 7,
          pregnancySafe: true,
          notes: "Broad-spectrum coverage to prevent enteric bacterial translocation into the devitalized, necrotic hepatic vascular bed."
        },
        {
          genericName: "Fresh Frozen Plasma (FFP)",
          brandExample: "Canine FFP Blood Banking Unit",
          doseMgPerKg: 10.0,
          route: "IV",
          frequency: "Stat",
          durationDays: 2,
          pregnancySafe: true,
          notes: "Essential replacement of active clotting factors (II, VII, IX, X) and antithrombin III to arrest fulminant DIC and hepatic coagulopathy."
        },
        {
          genericName: "Ursodeoxycholic Acid (UDCA)",
          brandExample: "Ursokol / Udiliv 150mg/300mg",
          doseMgPerKg: 15.0,
          route: "Oral",
          frequency: "OD",
          durationDays: 21,
          pregnancySafe: true,
          notes: "Hydrophilic hepatoprotective bile acid. Promotes choleresis, displaces toxic hydrophobic bile salts, and prevents hepatocyte apoptosis."
        },
        {
          genericName: "S-Adenosylmethionine (SAMe) + Silybin",
          brandExample: "Denamarin / Samylin Tabs",
          doseMgPerKg: 20.0,
          route: "Oral",
          frequency: "OD",
          durationDays: 30,
          pregnancySafe: true,
          notes: "Restores hepatic intracellular glutathione concentrations, scavenges free radicals, and supports liver cell membrane regeneration."
        }
      ],
      supportiveCare: [
        "Administer IV Ringer's Lactate supplemented with 5% Dextrose to prevent profound hepatic hypoglycemia and maintain systemic perfusion.",
        "Apply topical 1% Atropine ophthalmic ointment BD to alleviate severe ciliary muscle spasm in eyes afflicted with acute anterior uveitis.",
        "Maintain absolute cage rest; handle the patient with extreme gentleness to avoid rupturing the acutely swollen, fragile liver parenchyma.",
        "Provide a high-carbohydrate, moderate-protein diet containing high branched-chain amino acids (BCAAs) to avoid precipitating hepatic encephalopathy."
      ],
      contraindications: [
        "CRITICAL: NEVER administer topical ophthalmic Corticosteroids without prior Fluorescein staining to definitively rule out corneal ulceration.",
        "NEVER administer medications that undergo extensive hepatic cytochrome P450 oxidation (Diazepam, Chloramphenicol, Acepromazine).",
        "Avoid high-protein red meat diets during the acute phase (triggers hyperammonemia and hepatic coma)."
      ],
      desiNuskhe: [
        {
          name: "भूमि आंवला, कुटकी व कालमेघ यकृत रक्षक काढ़ा (Bhumi Amla, Kutki & Kalmegh Hepatic Elixir)",
          ingredients: "Bhumi Amla (Phyllanthus niruri) 30g, Kutki (Picrorhiza kurroa) 15g, Kalmegh (Andrographis paniculata) 15g, Water 500ml.",
          preparation: "Boil herbs slowly down to 150ml; strain through a fine nylon mesh.",
          administration: "Syringe 10 ml orally twice daily. Renowned Ayurvedic hepatoprotective formulation; suppresses viral replication and restores elevated ALT/AST levels."
        },
        {
          name: "त्रिफला व गुलाब जल नेत्र प्रक्षालन (Triphala & Rose Water Eye Soothing Wash)",
          ingredients: "Triphala powder 10g, Pure distilled rose water (Gulab Jal) 100ml, Sterile Water 200ml.",
          preparation: "Boil triphala in water, filter 3 times through Whatman filter paper to remove all micro-particulates, and mix with rose water.",
          administration: "Flush eyes gently twice daily to relieve photophobia, clear ocular discharges, and soothe inflamed conjunctival folds."
        }
      ],
      preventionAndVaccination: [
        "Vaccination with modified live Canine Adenovirus Type-2 (CAV-2) vaccine included in standard DHPPiL core shots.",
        "Note: CAV-2 vaccine confers robust cross-protection against CAV-1 hepatitis WITHOUT producing the undesirable 'blue-eye' corneal reaction.",
        "Primary series at 6, 9, 12, and 16 weeks, followed by annual boosters.",
        "Disinfect cages and runs with 1:30 dilution of household bleach; CAV-1 is resistant to lipid solvents and ether but susceptible to hypochlorite."
      ]
    },
    {
      id: "canine-sarcoptic-mange",
      name: "Sarcoptic Mange / Canine Scabies (Sarcoptes scabiei var. canis Infestation)",
      nameHi: "कैनाइन स्केबीज / संक्रामक खाज (माइट्स जनित असहनीय खुजली, पपड़ीदार त्वचा व बाल झड़ना)",
      category: "Parasitic Ectoparasite",
      tempRange: {
        minF: 100.5,
        maxF: 102.8,
        normalF: 101.5
      },
      cardinalSymptoms: [
        "Pathognomonic Pinnal-Pedal Reflex: Scratching the edge of the ear pinna with fingertips instantly elicits a frantic hindleg scratching reflex (कान को छूने पर पिछले पैर से खुजली करना)",
        "Intense, frenzied, unrelenting pruritus (itching) that disturbs sleep, eating, and normal behavior (असहनीय व लगातार तीव्र खुजली जिससे कुत्ता सो न सके)",
        "Erythematous papular eruptions progressing to thick, yellowish-gray crusts and scales (त्वचा पर लाल दाने, जो बाद में मोटी पीली-भूरी पपड़ियों में बदल जाते हैं)",
        "Primary lesion distribution: Margins of ear pinnae, lateral elbows, hocks, and ventral chest/abdomen (कान के किनारे, कोहनी, घुटने व पेट के निचले हिस्से पर प्रमुख घाव)",
        "Diffuse alopecia (hair loss), self-induced excoriations, bleeding sores, and secondary bacterial pyoderma (बालों का पूरी तरह झड़ना, खरोंच व मवादयुक्त घाव)",
        "Severe hyperkeratosis, lichenification ('elephant skin'), and profound lymphadenopathy in chronic neglected cases (त्वचा का हाथी की चमड़ी जैसा मोटा, काला व झुर्रीदार होना)"
      ],
      differentialDiagnosis: [
        "Demodectic Mange (Demodex canis - non-pruritic initially)",
        "Flea Allergy Dermatitis (FAD)",
        "Atopic Dermatitis (Canine Atopy)",
        "Malassezia Dermatitis",
        "Dermatophytosis (Ringworm / Microsporum canis)"
      ],
      firstLineDrugs: [
        {
          genericName: "Fluralaner",
          brandExample: "Bravecto Chewable Tab 250mg/500mg/1000mg",
          doseMgPerKg: 25.0,
          route: "Oral",
          frequency: "Stat",
          durationDays: 1,
          pregnancySafe: true,
          notes: "GOLD STANDARD ISOXAZOLINE. Administer 25-56 mg/kg PO once with food. Eliminates 100% of Sarcoptes mites within 48-72 hours with 12 weeks of continuous persistent protection."
        },
        {
          genericName: "Sarolaner",
          brandExample: "Simparica 10mg/20mg/40mg tabs",
          doseMgPerKg: 2.0,
          route: "Oral",
          frequency: "Stat",
          durationDays: 30,
          pregnancySafe: true,
          notes: "Isoxazoline alternative: 2-4 mg/kg PO administered once a month for two consecutive months for complete parasitologic cure."
        },
        {
          genericName: "Ivermectin",
          brandExample: "Neomec / Ivomec 1% Inj (10mg/ml)",
          doseMgPerKg: 0.3,
          route: "SC",
          frequency: "OD",
          durationDays: 28,
          pregnancySafe: false,
          notes: "0.3 mg/kg SC once weekly for 4 consecutive weeks. CONTRAINDICATED in Herding Breeds (Collies, Shepherds) with ABCB1/MDR1 gene mutations due to fatal neurotoxicity."
        },
        {
          genericName: "Cephalexin",
          brandExample: "Ceff / Phexin 300mg/600mg tabs",
          doseMgPerKg: 25.0,
          route: "Oral",
          frequency: "BD",
          durationDays: 21,
          pregnancySafe: true,
          notes: "First-generation cephalosporin for managing extensive secondary bacterial pyoderma caused by self-mutilation and Staphylococcus pseudintermedius."
        },
        {
          genericName: "Chlorhexidine Gluconate (2%) + Ketoconazole (1%) Shampoo",
          brandExample: "Ketochlor / Petderm Shampoo",
          doseMgPerKg: 0.0,
          route: "Topical",
          frequency: "BD",
          durationDays: 21,
          pregnancySafe: true,
          notes: "Bathe the dog twice weekly; lather and leave on skin for a full 10-15 minutes contact time before rinsing to remove crusts and eliminate secondary microbes."
        }
      ],
      supportiveCare: [
        "Treat ALL in-contact dogs and cats in the household simultaneously; Sarcoptes scabiei is extremely contagious.",
        "Fit an Elizabethan collar (E-collar) immediately to prevent relentless self-excoriation and traumatic skin breakdown.",
        "Short-course Apoquel (Oclacitinib 0.4-0.6 mg/kg PO BD for 3 days) to safely break the agonizing itch-scratch cycle without compromising immunity.",
        "Wash all dog bedding, grooming brushes, and harness gear in hot soapy water (>60°C) and treat premises with acaricidal spray."
      ],
      contraindications: [
        "CRITICAL MDR1 WARNING: NEVER administer Ivermectin, Doramectin, or Moxidectin to Collies, Australian Shepherds, Border Collies, or Whippets unless certified MDR1 mutation negative.",
        "NEVER use Amitraz dips in Chihuahuas, pregnant/nursing bitches, puppies under 12 weeks, or diabetic patients.",
        "Never apply motor oil, battery fluid, or kerosene to dog skin (archaic dangerous practice causing fatal chemical toxicity and dermal burns)."
      ],
      desiNuskhe: [
        {
          name: "नीम, करंज व शुद्ध गंधक खाजरोधी तेल (Neem, Karanja & Sulphur Acaricidal Balm)",
          ingredients: "Pure Cold-Pressed Neem Oil 100ml, Karanja Oil (Pongamia pinnata) 100ml, Purified Sulphur powder (Shuddha Gandhak) 20g, Camphor 10g.",
          preparation: "Triturate purified sulphur and camphor into fine micro-powder. Warm neem and karanja oil slightly and blend into a smooth homogeneous therapeutic oil.",
          administration: "Massage thoroughly over crusted, alopecic lesions every alternate day after washing with mild soap. Potent natural miticide, eases itching, and kills mites."
        },
        {
          name: "जैविक सेब का सिरका व एलोवेरा सुखदायक स्प्रे (Raw Apple Cider Vinegar & Aloe Vera Soothing Wash)",
          ingredients: "Raw Apple Cider Vinegar (with mother) 100ml, Pure Aloe Vera gel 100g, Boiled cooled water 200ml.",
          preparation: "Blend apple cider vinegar, fresh aloe vera pulp, and water into a thin sprayable liquid.",
          administration: "Mist lightly onto itchy skin folds (avoiding open raw wounds). Re-balances skin pH and inhibits secondary yeast proliferation."
        }
      ],
      preventionAndVaccination: [
        "No vaccine exists for ectoparasitic mite infestations.",
        "Maintain routine prophylactic isoxazoline administration (Bravecto every 12 weeks or Simparica/NexGard monthly).",
        "Prevent pet contact with stray dogs, feral foxes, or contaminated communal bedding at boarding kennels.",
        "Be aware of zoonotic transmission: Scabies mites can transiently burrow into human arms and torsos, producing itchy papular lesions ('pseudoscabies')."
      ]
    }
  ];

  // 3. CLINICAL SEARCH & RETRIEVAL HELPER METHODS
  window.VetcareApp.ClinicalData.getDiseaseById = function (id) {
    if (!id || typeof id !== "string") return null;
    const cleanId = id.trim().toLowerCase();
    const list = window.VetcareApp.ClinicalData.Canine || [];
    for (let i = 0; i < list.length; i++) {
      if (list[i].id.toLowerCase() === cleanId) {
        return list[i];
      }
    }
    return null;
  };

  window.VetcareApp.ClinicalData.searchDiseasesBySymptom = function (symptomQuery) {
    if (!symptomQuery || typeof symptomQuery !== "string") return [];
    const query = symptomQuery.trim().toLowerCase();
    const list = window.VetcareApp.ClinicalData.Canine || [];
    const results = [];

    for (let i = 0; i < list.length; i++) {
      const disease = list[i];
      let matched = false;

      // Check symptoms
      if (Array.isArray(disease.cardinalSymptoms)) {
        for (let j = 0; j < disease.cardinalSymptoms.length; j++) {
          if (disease.cardinalSymptoms[j].toLowerCase().indexOf(query) !== -1) {
            matched = true;
            break;
          }
        }
      }

      // Check disease name (both English & Hindi)
      if (!matched && disease.name && disease.name.toLowerCase().indexOf(query) !== -1) {
        matched = true;
      }
      if (!matched && disease.nameHi && disease.nameHi.toLowerCase().indexOf(query) !== -1) {
        matched = true;
      }

      // Check differential diagnoses
      if (!matched && Array.isArray(disease.differentialDiagnosis)) {
        for (let k = 0; k < disease.differentialDiagnosis.length; k++) {
          if (disease.differentialDiagnosis[k].toLowerCase().indexOf(query) !== -1) {
            matched = true;
            break;
          }
        }
      }

      if (matched) {
        results.push(disease);
      }
    }
    return results;
  };

  window.VetcareApp.ClinicalData.getDiseasesByCategory = function (category) {
    if (!category || typeof category !== "string") return [];
    const targetCat = category.trim().toLowerCase();
    const list = window.VetcareApp.ClinicalData.Canine || [];
    const results = [];

    for (let i = 0; i < list.length; i++) {
      if (list[i].category && list[i].category.toLowerCase() === targetCat) {
        results.push(list[i]);
      }
    }
    return results;
  };

})();
