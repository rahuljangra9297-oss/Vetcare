// Vetcare AI OS - Veterinary Ophthalmology, Otolaryngology (ENT) & Ocular Therapeutics Engine (2026 Production)
(function () {
  "use strict";

  // 1. GLOBAL NAMESPACE ATTACHMENT
  window.VetcareApp = window.VetcareApp || {};
  window.VetcareApp.ClinicalData = window.VetcareApp.ClinicalData || {};

  // 2. OPHTHALMIC DIAGNOSTIC PROTOCOLS & REFERENCE INTERVALS
  const DIAGNOSTIC_STANDARDS = {
    fluoresceinStainTest: {
      testName: "Fluorescein Sodium Ophthalmic Stain Test",
      testNameHi: "फ्लोरेसिन कॉर्नियल डाई टेस्ट (कॉर्निया के घाव की जांच)",
      purpose: "Detection of corneal epithelial defects, ulcers, stromal erosion, and nasolacrimal duct patency.",
      proceduralSteps: [
        "Step 1: Moisten the orange-impregnated tip of a sterile Fluorescein Sodium ophthalmic strip with 1-2 drops of sterile saline eyewash (DO NOT touch tip directly to the cornea).",
        "Step 2: Gently elevate the upper eyelid; touch the moistened strip softly against the dorsal bulbar conjunctiva for 1-2 seconds to allow dye dispersal.",
        "Step 3: Allow the animal to blink once or twice to distribute the stain across the precorneal tear film.",
        "Step 4: COPIOUS SALINE FLUSH: Flush excess unattached stain away immediately using 5 to 10 ml of sterile saline eyewash (stain only binds to exposed hydrophilic corneal stroma).",
        "Step 5: Examine under a dark room using a Cobalt Blue light filter / Wood's lamp."
      ],
      clinicalInterpretation: {
        positiveRetention: "Fluorescent bright apple-green retention indicates LOSS OF CORNEAL EPITHELIUM (True Corneal Ulcer). Intact lipid epithelium is hydrophobic and sheds the dye.",
        descemetoceleHallmark: "PATHOGNOMONIC 'CLEAR HOLE' (Doughnut ring): Fluorescein stains the peripheral stroma green, but the center floor of the crater remains completely CLEAR and unstained (Descemet's membrane is hydrophobic and does NOT take up fluorescein; indicates imminent corneal perforation!).",
        seidelTest: "Aqueous humor leakage from a perforated cornea washes through a concentrated drop of fluorescein, visible as a bright green diluted rivulet cascading down the cornea ('Seidel Positive').",
        jonesTest: "Appearance of green dye at the external nares within 5 minutes confirms complete patency of the nasolacrimal drainage system."
      }
    },

    schirmerTearTest: {
      testName: "Schirmer Tear Test-1 (STT-1 / Quantitative Aqueous Tear Production)",
      testNameHi: "शर्मर टियर टेस्ट (आंसू उत्पादन जांच / सूखी आंख)",
      measurementDurationSeconds: 60,
      placementSite: "Lower conjunctival fornix at the junction of the middle and lateral thirds of the lower eyelid.",
      speciesBenchmarksMmPerMin: {
        canine: {
          normal: { min: 15.0, max: 25.0, status: "NORMAL TEAR PRODUCTION" },
          mildKcs: { min: 11.0, max: 14.0, status: "EARLY / MILD KERATOCONJUNCTIVITIS SICCA (KCS)" },
          moderateKcs: { min: 6.0, max: 10.0, status: "MODERATE KCS (True Dry Eye)" },
          severeKcs: { min: 0.0, max: 5.0, status: "SEVERE / END-STAGE KCS (Corneal Desiccation Risk)" }
        },
        feline: {
          normal: { min: 12.0, max: 22.0, status: "NORMAL (Cats have high sympathetic variability; values <9 with clinical signs indicate KCS)" }
        },
        equine: {
          normal: { min: 15.0, max: 30.0, status: "NORMAL EQUINE TEAR PRODUCTION" }
        },
        bovine: {
          normal: { min: 18.0, max: 35.0, status: "NORMAL BOVINE TEAR PRODUCTION" }
        }
      }
    },

    tonometryIop: {
      testName: "Applanation / Rebound Tonometry (Intraocular Pressure - IOP)",
      testNameHi: "टोनोमेट्री (आंख का आंतरिक दबाव / ग्लूकोमा जांच)",
      instrumentType: "TonoVet (Rebound) or Tono-Pen (Applanation)",
      referenceIntervalsMmHg: {
        canine: { min: 10.0, max: 20.0, mean: 15.0 },
        feline: { min: 12.0, max: 24.0, mean: 16.5 },
        equine: { min: 15.0, max: 28.0, mean: 20.0 },
        bovine: { min: 12.0, max: 26.0, mean: 18.0 }
      },
      diagnosticThresholds: {
        uveiticHypotony: {
          cutoffMmHg: 10.0,
          status: "OCULAR HYPOTONY (ANTERIOR UVEITIS)",
          rationale: "IOP < 10-12 mmHg reflects inflammation of the ciliary body resulting in decreased aqueous humor production and increased unconventional uveoscleral outflow."
        },
        glaucomaCrisis: {
          cutoffMmHg: 25.0,
          status: "OCULAR HYPERTENSION / GLAUCOMA EMERGENCY",
          rationale: "IOP > 25-30 mmHg with clinical signs (epispiscleral injection, corneal edema, mydriasis, pain) confirms Glaucoma. Sustained pressures >40 mmHg cause irreversible retinal ganglion cell apoptosis and permanent blindness within 24 to 48 hours."
        }
      }
    }
  };

  // 3. COMPREHENSIVE OPHTHALMOLOGY & ENT DISEASE DOSSIERS
  const CLINICAL_DOSSIERS = [
    // ========================================================================
    // 1. INFECTIOUS BOVINE KERATOCONJUNCTIVITIS (IBK / PINKEYE)
    // ========================================================================
    {
      id: "ophth-bovine-pinkeye",
      nameEn: "Infectious Bovine Keratoconjunctivitis (IBK / Pinkeye)",
      nameHi: "संक्रामक गोवंश नेत्रशोथ / पिंक आई (मोरैक्सेला बोविस जनित अंधापन)",
      system: "Ophthalmology",
      targetSpecies: ["bovine", "bubaline"],
      etiology: "Moraxella bovis (Piliated hemolysin-producing bacterium); synergized by Moraxella bovoculi, Bovine Herpesvirus-1 (BHV-1), UV radiation, and Musca autumnalis face flies.",
      clinicalHallmarks: [
        "Acute photophobia, severe blepharospasm, and profuse serous to mucopurulent epiphora (लगातार पानी बहना व आंख बंद रखना)",
        "Pathognomonic central corneal opacity and ulceration developing rapidly within 48 hours (कॉर्निया के केंद्र में सफेद-पीला छाला)",
        "Severe conjunctival hyperemia ('Pinkeye'), chemosis, and progressive circumcorneal neovascularization ('paintbrush vessel sprouting')",
        "Progression to conical corneal bulging (Keratoconus), anterior synechia, descemetocele, and rupture with total permanent blindness"
      ],
      therapeuticProtocol: [
        {
          treatmentType: "Parenteral Systemic Therapy (Treatment of Choice)",
          drug: "Oxytetracycline Long-Acting (LA 200 mg/ml)",
          dose: "20 mg/kg deep IM single dose (repeat after 72 hours if necessary)",
          rationale: "Oxytetracycline achieves therapeutic concentrations in tears and corneal stroma, halting Moraxella replication."
        },
        {
          treatmentType: "Subconjunctival Bulbar Injection",
          drug: "Procaine Penicillin G (300,000 IU/ml) + Dexamethasone",
          dose: "1.0 to 1.5 ml Procaine Penicillin mixed with 0.5 mg Dexamethasone injected strictly under the bulbar conjunctiva using a 25G needle.",
          rationale: "Provides direct, high-level sustained antimicrobial tissue levels for 48 hours. Use steroid ONLY in early non-ulcerated stages under expert care."
        },
        {
          treatmentType: "Mechanical Eye Protection",
          drug: "Glued Denim / Canvas Eye Patch",
          dose: "Glue breathable patch over affected eye, leaving ventral edge open for drainage.",
          rationale: "Blocks painful UV radiation and prevents mechanical fly feeding (Musca autumnalis) from transmitting infection to herd mates."
        }
      ],
      managementAdvisory: "Execute mandatory whole-herd fly control using synthetic pyrethroid ear tags (Deltamethrin/Cypermethrin) or back-rubbers. Isolate affected animals into darkened sheds."
    },

    // ========================================================================
    // 2. CORNEAL ULCERATION & STEROID COLLAGENOLYSIS RED FLAG
    // ========================================================================
    {
      id: "ophth-corneal-ulcers",
      nameEn: "Corneal Ulceration (Superficial vs Deep Melting vs Descemetocele)",
      nameHi: "कॉर्नियल अल्सर (पुतली का छाला / मेल्टिंग अल्सर व रप्चर खतरा)",
      system: "Ophthalmology",
      targetSpecies: ["canine", "feline", "equine", "bovine"],
      etiology: "Trauma, foreign bodies, eyelash disorders (distichiasis, ectopic cilia), feline herpesvirus (FHV-1), bacterial keratomalacia (Pseudomonas, Streptococcus).",
      clinicalHallmarks: [
        "Positive fluorescein stain retention (green crater outline on cobalt blue examination)",
        "Intense ocular pain: Blepharospasm, enophthalmos, elevation of the third eyelid, lacrimation",
        "Corneal edema: Milky bluish ground-glass opacification surrounding the ulcer crater",
        "PATHOGNOMONIC MELTING ULCER (Keratomalacia): Gelatinous, liquefactive, grayish, jelly-like softening of the corneal stroma that runs downward like melting wax (driven by bacterial and neutrophil matrix metalloproteinases)"
      ],
      CRITICAL_STEROID_CONTRAINDICATION: {
        alertEn: "CRITICAL RED FLAG: ABSOLUTELY NEVER ADMINISTER TOPICAL CORTICOSTEROIDS (Dexamethasone, Betamethasone, Prednisolone) TO AN EYE WITH A FLUORESCEIN-POSITIVE CORNEAL ULCER.",
        alertHi: "अति-घातक चेतावनी: कॉर्नियल अल्सर (छाले) पर स्टेरॉयड आई ड्रॉप्स (डेक्सामेथासोन/बीटामेथासोन) का प्रयोग पूर्णतः वर्जित है। स्टेरॉयड कोलेजन-घुलनशील एंजाइमों को सक्रिय कर पुतली को गला देता है, जिससे आंख फूट जाती है।",
        pathophysiologicalMechanism: "Topical corticosteroids upregulate endogenous matrix metalloproteinases (MMPs) and collagenases while suppressing corneal fibroblastic regeneration. This triggers accelerated stromal melting (keratomalacia) and descemetocele perforation resulting in complete eye rupture within 24 to 48 hours."
      },
      therapeuticProtocol: [
        {
          treatmentType: "Topical Broad-Spectrum Antibiotic",
          drug: "Ofloxacin 0.3% OR Tobramycin 0.3% Ophthalmic Drops",
          dose: "1 drop instilled into affected eye every 2 to 4 hours continuously for 7-10 days.",
          rationale: "Bactericidal coverage against Pseudomonas aeruginosa and Staphylococcus."
        },
        {
          treatmentType: "Antiproteinase / Antienzyme Therapy (For Melting Ulcers)",
          drug: "Autologous Blood Serum Drops (Centrifuged Sterile Patient Serum)",
          dose: "1 drop every 1 to 2 hours for the first 24-48 hours. Keep refrigerated; discard after 5 days.",
          rationale: "Serum contains potent natural alpha-2 macroglobulin and alpha-1 antitrypsin that neutralize destructive bacterial collagenases and arrest corneal melting immediately."
        },
        {
          treatmentType: "Ciliary Spasm Analgesia",
          drug: "Atropine Sulfate 1% Ophthalmic Drops / Ointment",
          dose: "1 drop once or twice daily to effect (titrate until pupil dilates).",
          rationale: "Relieves excruciating deep ciliary muscle spasm pain. CONTRAINDICATED IF GLAUCOMA IS SUSPECTED."
        }
      ]
    },

    // ========================================================================
    // 3. CANINE & FELINE GLAUCOMA (तीव्र ग्लूकोमा)
    // ========================================================================
    {
      id: "ophth-glaucoma-emergency",
      nameEn: "Glaucoma (Acute Ocular Hypertension & Angle-Closure)",
      nameHi: "ग्लूकोमा / काला मोतिया (आंख का बढ़ा हुआ दबाव / अंधापन आपातकाल)",
      system: "Ophthalmology",
      targetSpecies: ["canine", "feline"],
      etiology: "Primary angle-closure glaucoma (goniodysgenesis in Cocker Spaniels, Bassets) vs Secondary glaucoma (anterior lens luxation, uveitis, hyphema, intraocular neoplasia).",
      clinicalHallmarks: [
        "Tonometry IOP > 30 to 70 mmHg (Severe elevation above normal 10-20 mmHg)",
        "Engorged, tortuous, dark red episcleral blood vessels ('ciliary flush' / episcleral injection)",
        "Diffuse, severe, bluish-gray corneal edema resulting from failure of the endothelial corneal pump",
        "Fixed, dilated pupil (Mydriasis) that is completely unreactive to direct light",
        "Buphthalmos (pathological enlargement of the entire globe) in chronic cases, leading to lens subluxation"
      ],
      therapeuticProtocol: [
        {
          treatmentType: "Hyperosmotic Emergency Reduction (Immediate Resuscitation)",
          drug: "Mannitol 20% Solution IV",
          dose: "1.0 to 1.5 g/kg (5 to 7.5 ml/kg) administered via SLOW IV INFUSION over 30 minutes with an in-line blood filter.",
          rationale: "Extracts water from the vitreous humor into systemic circulation via osmotic draw, rapidly lowering IOP by 15-30 mmHg within 45 minutes. Withhold drinking water for 2 hours."
        },
        {
          treatmentType: "Topical Carbonic Anhydrase Inhibitor (Aqueous Suppressant)",
          drug: "Dorzolamide 2% Ophthalmic Drops (Trusopt)",
          dose: "1 drop in affected eye three times daily (TDS).",
          rationale: "Directly inhibits carbonic anhydrase II in the ciliary processes, decreasing aqueous humor secretion by 40-50% independent of pupil diameter."
        },
        {
          treatmentType: "Prostaglandin F2α Analogue (Uveoscleral Outflow Facilitator)",
          drug: "Latanoprost 0.005% Ophthalmic Drops (Xalatan)",
          dose: "1 drop twice daily. PRODUCES INTENSE MIOSIS (Pinpoint pupil).",
          rationale: "Opens the unconventional uveoscleral outflow pathways. STRICTLY CONTRAINDICATED IN ANTERIOR LENS LUXATION OR UVEITIS (worsens pupillary block)."
        }
      ]
    },

    // ========================================================================
    // 4. KERATOCONJUNCTIVITIS SICCA (KCS / DRY EYE)
    // ========================================================================
    {
      id: "ophth-kcs-dry-eye",
      nameEn: "Keratoconjunctivitis Sicca (KCS / Dry Eye Syndrome)",
      nameHi: "सूखी आंख की बीमारी / के.सी.एस. (आंसू ग्रंथि का सूखना)",
      system: "Ophthalmology",
      targetSpecies: ["canine", "feline"],
      etiology: "Immune-mediated T-cell destruction of the lacrimal and nictitans glands; secondary to canine distemper, systemic sulfonamide toxicity, or surgical cherry eye excision.",
      clinicalHallmarks: [
        "Schirmer Tear Test-1 (STT-1) < 10 mm/minute (normal 15-25 mm/min)",
        "Copious, thick, ropey, tenacious mucopurulent ocular discharge clinging to the cornea and eyelid margins",
        "Dull, lusterless, dry, hyperemic cornea with superficial corneal neovascularization and black pigmentary keratitis",
        "Secondary non-healing indolent corneal ulcerations"
      ],
      therapeuticProtocol: [
        {
          treatmentType: "Topical Immunomodulatory Lacrimostimulant (Gold Standard)",
          drug: "Cyclosporine 0.2% Ophthalmic Ointment (Optimmune) OR Tacrolimus 0.02%",
          dose: "Apply 1/4th inch ribbon into conjunctival sac twice daily (BID) continuously for life.",
          rationale: "Suppresses T-helper cell autoimmune destruction of lacrimal acinar tissue, stimulating natural tear production and clearing corneal pigmentation."
        },
        {
          treatmentType: "Ocular Surface Tear Replacement",
          drug: "Sodium Hyaluronate 0.18% - 0.4% Drops / Carboxymethylcellulose Gel",
          dose: "Instill 1 drop every 2 to 4 hours.",
          rationale: "Viscoelastic precorneal lubrication to protect fragile corneal epithelium from mechanical lid friction."
        }
      ],
      managementAdvisory: "Instruct pet owners that KCS is a lifelong chronic condition requiring indefinite daily medication. Never discontinue Cyclosporine abruptly."
    },

    // ========================================================================
    // 5. CHERRY EYE (PROLAPSED GLAND OF THE THIRD EYELID)
    // ========================================================================
    {
      id: "ophth-cherry-eye",
      nameEn: "Prolapse of the Gland of the Third Eyelid ('Cherry Eye')",
      nameHi: "चेरी आई / तीसरी पलक की ग्रंथि का बाहर निकलना (लाल मांस का उभार)",
      system: "Ophthalmology",
      targetSpecies: ["canine", "feline"],
      etiology: "Congenital laxity or defect of the connective tissue anchoring ligament attaching the accessory lacrimal gland to the periorbital fascia (Basset Hounds, Bulldogs, Beagles).",
      clinicalHallmarks: [
        "Smooth, round, bright red, cherry-like fleshy mass protruding from the medial canthus of the eye",
        "Secondary epiphora, conjunctivitis, and ocular irritation",
        "Gland becomes hypertrophied, inflamed, and ulcerated due to environmental desiccation"
      ],
      SURGICAL_RULE_PRESERVE_GLAND: {
        directiveEn: "MANDATORY SURGICAL RULE: STRICTLY PRESERVE AND REPOSITION THE GLAND. COMPLETE SURGICAL EXCISION (REMOVAL) OF THE GLAND IS MALPRACTICE.",
        directiveHi: "अनिवार्य सर्जिकल नियम: तीसरी पलक की ग्रंथि को काटकर कभी न निकालें। इसे सर्जिकल पॉकेट तकनीक (Morgan Pocket) द्वारा अंदर पुनः स्थापित करें। ग्रंथि काटने से पशु आजीवन सूखी आंख (KCS) का शिकार हो जाता है।",
        rationale: "The gland of the third eyelid is responsible for producing 35% to 50% of the entire aqueous tear film volume. Surgical amputation of the gland guarantees severe, irreversible Keratoconjunctivitis Sicca (Dry Eye) within 1 to 4 years post-op."
      },
      surgicalApproach: [
        "Morgan Pocket Technique: Two continuous curvilinear parallel incisions are made in the bulbar conjunctival mucosa dorsal and ventral to the prolapsed gland.",
        "The inflamed gland is gently inverted and pushed into the subconjunctival pocket.",
        "The conjunctival margins are apposed with 5-0 or 6-0 Polyglactin 910 (Vicryl) in a continuous Cushing or simple continuous pattern, leaving both ends open for physiological tear flow.",
        "Ensure all suture knots are buried on the outer palpebral surface to prevent abrasive corneal ulceration."
      ]
    },

    // ========================================================================
    // 6. OTITIS EXTERNA & MEDIA (कान का गंभीर संक्रमण)
    // ========================================================================
    {
      id: "ent-otitis-externa",
      nameEn: "Otitis Externa & Suppurative Otitis Media",
      nameHi: "ओटिटिस एक्सटर्ना / कान का संक्रमण (मवाद, खुजली व बदबू)",
      system: "Otolaryngology (ENT)",
      targetSpecies: ["canine", "feline"],
      etiology: "Primary: Atopic dermatitis, food allergy, Otodectes cynotis ear mites, foreign bodies (grass awns). Secondary: Malassezia pachydermatis yeast, Pseudomonas aeruginosa, Staphylococcus pseudintermedius.",
      clinicalHallmarks: [
        "Continuous head shaking, ear scratching, unilateral head tilt, and painful vocalization upon pinna manipulation",
        "Erythematous, edematous, stenotic external ear canal with foul putrid or sweet sour odor",
        "Discharge characteristics: Dark brown waxy coffee-ground exudate (Yeast/Mites) vs yellowish-green slimy purulent exudate (Pseudomonas)",
        "Otoscopic examination: Strict inspection of the Tympanic Membrane (eardrum) for rupture"
      ],
      therapeuticProtocol: [
        {
          treatmentType: "Ear Cleansing & Ceruminolytic Lavage",
          drug: "Tris-EDTA Solution + Saline (If tympanum intact or ruptured)",
          dose: "Fill ear canal, massage base of ear for 60 seconds (listen for squishing sound), wipe excess with cotton.",
          rationale: "Tris-EDTA chelates calcium/magnesium in bacterial cell walls, sensitizing resilient Pseudomonas to topical antibiotics by 100-fold."
        },
        {
          treatmentType: "Combination Topical Antibacterial / Antifungal / Anti-inflammatory",
          drug: "Gentamicin + Clotrimazole + Betamethasone (Otomax) OR Marbofloxacin + Clotrimazole + Dexamethasone",
          dose: "Instill 4 to 8 drops into cleaned vertical/horizontal canal twice daily for 14 days.",
          rationale: "Synergistic eradication of Malassezia yeast, secondary bacteria, and inflammatory canal stenosis."
        }
      ]
    },

    // ========================================================================
    // 7. CANINE AURAL HEMATOMA (OTHEMATOMA)
    // ========================================================================
    {
      id: "ent-aural-hematoma",
      nameEn: "Canine Aural Hematoma (Othematoma)",
      nameHi: "कान का हेमेटोमा / ओथिमेटोमा (कान के पर्दे में खून भरना)",
      system: "Otolaryngology (ENT)",
      targetSpecies: ["canine", "feline"],
      etiology: "Violent head shaking and scratching secondary to underlying otitis externa or ear mites ruptures the branches of the great auricular artery between the auricular cartilage and skin.",
      clinicalHallmarks: [
        "Fluctuant, warm, fluid-filled, dome-shaped swelling on the concave inner surface of the ear pinna",
        "Head tilt toward the affected ear due to mechanical weight",
        "Secondary deformity ('cauliflower ear') if left untreated due to irregular cicatricial fibrosis and cartilage contracture"
      ],
      surgicalProtocol: [
        "Step 1: Thoroughly clean, treat, and resolve the underlying otitis externa in the ear canal.",
        "Step 2: Make a straight or S-shaped longitudinal incision on the concave pinna through the skin to evacuate all organized blood clots and fibrin.",
        "Step 3: Flush the cavity with sterile saline.",
        "Step 4: Place multiple full-thickness through-and-through mattress sutures using 2-0 or 3-0 Monofilament Nylon with rubber tubing, buttons, or stents on the outer skin.",
        "CRITICAL SUTURE RULE: Suture lines MUST BE PLACED PARALLEL to the longitudinal major auricular blood vessels (never transverse) to prevent vascular necrosis and pinna sloughing.",
        "Step 5: Leave the central incision line open for continuous drainage; bandage ear over the head for 7-10 days."
      ]
    },

    // ========================================================================
    // 8. BRACHYCEPHALIC OBSTRUCTIVE AIRWAY SYNDROME (BOAS)
    // ========================================================================
    {
      id: "ent-boas-respiratory",
      nameEn: "Brachycephalic Obstructive Airway Syndrome (BOAS)",
      nameHi: "ब्रैकीसिफेलिक एयरवे सिंड्रोम (दबी नाक वाले श्वानों में दम घुटना)",
      system: "Otolaryngology (ENT)",
      targetSpecies: ["canine", "feline"],
      etiology: "Congenital anatomical malformations in short-skulled breeds (Pugs, French Bulldogs, English Bulldogs, Persian cats): Stenotic nares, elongated soft palate, everted laryngeal saccules, hypoplastic trachea.",
      clinicalHallmarks: [
        "Loud, stertorous breathing, snoring, and stridor audible at rest, worsening with exercise and heat",
        "Exercise intolerance, cyanosis, aerophagia with gastroesophageal reflux / chronic vomiting",
        "ACUTE OBSTRUCTIVE CRISIS: Severe hyperthermia (>106°F / >41°C), respiratory panic, open-mouth foaming, collapse, and non-cardiogenic pulmonary edema triggered by hot weather"
      ],
      emergencyTherapeuticProtocol: [
        {
          treatmentType: "Immediate Acute Airway Emergency Resuscitation",
          drug: "Dexamethasone Sodium Phosphate (0.15 mg/kg IV) + Butorphanol (0.2 mg/kg IV/IM)",
          dose: "Inject immediately upon presentation; place in cold oxygen cage (100% flow-by).",
          rationale: "Rapidly shrinks severe pharyngeal and laryngeal soft-tissue edema while mild opioid sedation relieves panic-induced hyperventilation."
        },
        {
          treatmentType: "Active Physical Cooling",
          drug: "Room temperature water wetting + fans",
          dose: "Wet body surfaces; discontinue active cooling once core temperature drops to 102.5°F.",
          rationale: "Prevents fatal heat stroke encephalopathy."
        },
        {
          treatmentType: "Definitive Surgical Correction (Post-stabilization)",
          drug: "Surgical Staphylectomy & Wedge Rhinoplasty",
          dose: "Resection of elongated soft palate back to the caudal tip of the tonsils + vertical wedge resection of stenotic nasal alar cartilages.",
          rationale: "Restores normal negative inspiratory airway pressure, terminating BOAS progression."
        }
      ]
    }
  ];

  // 4. SAFETY VERIFICATION & DRUG CONTRAINDICATION ENGINE
  const SafetyEngine = {
    diagnostics: DIAGNOSTIC_STANDARDS,
    dossiers: CLINICAL_DOSSIERS
  };

  /**
   * CRITICAL OPHTHALMIC DRUG VALIDATOR:
   * Cross-checks ophthalmic prescriptions against corneal ulcer and glaucoma statuses.
   *
   * @param {string} drugName - Drug or formulation name (e.g., 'dexamethasone', 'atropine', 'ofloxacin')
   * @param {boolean} hasCornealUlcer - True if fluorescein retention / ulcer is present
   * @param {boolean} hasGlaucoma - True if tonometry IOP is elevated or glaucoma diagnosed
   */
  SafetyEngine.validateEyeMedication = function (drugName, hasCornealUlcer, hasGlaucoma) {
    if (!drugName || typeof drugName !== "string") {
      return { error: "No ophthalmic drug name supplied for safety validation." };
    }

    const d = drugName.trim().toLowerCase();
    const hasUlcer = Boolean(hasCornealUlcer);
    const hasGlauc = Boolean(hasGlaucoma);

    // 1. Corticosteroid in Corneal Ulcer (LETHAL CORNEAL MELT HAZARD)
    const isSteroid = d.indexOf("dexa") !== -1 || d.indexOf("pred") !== -1 ||
                      d.indexOf("beta") !== -1 || d.indexOf("hydrocort") !== -1 ||
                      d.indexOf("triamcin") !== -1 || d.indexOf("steroid") !== -1;

    if (hasUlcer && isSteroid) {
      return {
        approved: false,
        warningLevel: "CRITICAL_COLLAGENOLYSIS_HAZARD",
        alertHeaderEn: "STOP! ABSOLUTE OPHTHALMIC CONTRAINDICATION DETECTED",
        alertHeaderHi: "रुकें! अत्यंत घातक कॉर्निया गलन खतरा",
        messageEn: "Corticosteroids are strictly forbidden in eyes with corneal ulcers. Steroids upregulate matrix metalloproteinases, leading to rapid stromal keratomalacia (melting ulcer) and complete eye perforation within 24-48 hours.",
        messageHi: "कॉर्निया के छाले (अल्सर) पर स्टेरॉयड डालना पूर्णतः निषिद्ध है। यह पुतली को गलाकर आंख को हमेशा के लिए फोड़ सकता है।",
        recommendedAction: "Immediately cancel corticosteroid prescription. Prescribe topical Ofloxacin 0.3% + Autologous Serum drops + Atropine."
      };
    }

    // 2. Mydriatic (Atropine / Tropicamide) in Glaucoma (ACUTE IOP PRESSURE SPIKE)
    const isMydriatic = d.indexOf("atropine") !== -1 || d.indexOf("tropicamide") !== -1 || d.indexOf("homatropine") !== -1;

    if (hasGlauc && isMydriatic) {
      return {
        approved: false,
        warningLevel: "CRITICAL_GLAUCOMA_CONTRAINDICATION",
        alertHeaderEn: "CONTRAINDICATED: MYDRIATIC IN OCULAR HYPERTENSION",
        alertHeaderHi: "ग्लूकोमा में पुतली फैलाने वाली दवा निषिद्ध",
        messageEn: "Atropine and mydriatics induce cycloplegia and pupillary dilation, completely crowding the iridocorneal filtration angle and triggering catastrophic spikes in intraocular pressure (IOP >60 mmHg).",
        messageHi: "ग्लूकोमा (काला मोतिया) में एट्रोपिन आंख का दबाव खतरनाक रूप से बढ़ाकर तुरंत अंधापन ला सकता है।",
        recommendedAction: "Cancel Atropine. Prescribe topical Dorzolamide 2% + Latanoprost 0.005% + IV Mannitol 20%."
      };
    }

    // 3. Latanoprost in Anterior Uveitis / Lens Luxation
    if (d.indexOf("latanoprost") !== -1 && (d.indexOf("uveitis") !== -1 || hasUlcer)) {
      return {
        approved: true,
        warningLevel: "CAUTION",
        messageEn: "Caution: Prostaglandin analogues (Latanoprost) induce intense miosis and can exacerbate intraocular inflammatory blood-aqueous barrier breakdown in active anterior uveitis.",
        messageHi: "सावधानी: लैटानोप्रोस्ट तीव्र पुतली सिकुड़न लाता है; आंतरिक आंख सूजन (यूवाइटिस) में सावधानी बरतें।"
      };
    }

    return {
      approved: true,
      warningLevel: "SAFE",
      messageEn: "Prescription validated. No catastrophic contraindications identified for reported ocular conditions.",
      messageHi: "दवा सुरक्षित है। कोई विपरीत प्रभाव नहीं पाया गया।"
    };
  };

  /**
   * SCHIRMER TEAR TEST (STT) QUANTITATIVE INTERPRETER:
   */
  SafetyEngine.interpretStt = function (sttValueMmPerMin, species) {
    const val = parseFloat(sttValueMmPerMin);
    if (isNaN(val) || val < 0) {
      return { error: "Invalid STT measurement provided: " + sttValueMmPerMin };
    }

    const sp = (species || "canine").trim().toLowerCase();
    const bench = DIAGNOSTIC_STANDARDS.schirmerTearTest.speciesBenchmarksMmPerMin[sp] ||
                  DIAGNOSTIC_STANDARDS.schirmerTearTest.speciesBenchmarksMmPerMin.canine;

    let tier = "NORMAL";
    let rx = "Maintain routine preventative hygiene.";

    if (val < 5.0) {
      tier = "SEVERE / END-STAGE KCS (STT 0-5 mm/min)";
      rx = "Initiate aggressive lacrimostimulant therapy: Tacrolimus 0.02% or Cyclosporine 0.2% (Optimmune) BID + high-viscosity Sodium Hyaluronate lubrication q2-4h.";
    } else if (val >= 5.0 && val <= 10.0) {
      tier = "MODERATE KCS (STT 6-10 mm/min)";
      rx = "Prescribe Cyclosporine 0.2% ointment twice daily + artificial tear drops.";
    } else if (val > 10.0 && val <= 14.0) {
      tier = "EARLY / MILD KCS (STT 11-14 mm/min)";
      rx = "Perform fluorescein stain to rule out secondary ulcers. Apply artificial tears and recheck STT in 21 days.";
    }

    return {
      species: sp,
      measuredSttMmPerMin: val,
      diagnosticTier: tier,
      clinicalRecommendation: rx
    };
  };

  /**
   * INTRAOCULAR PRESSURE (IOP) INTERPRETER:
   */
  SafetyEngine.interpretIop = function (iopMmHg, species) {
    const val = parseFloat(iopMmHg);
    if (isNaN(val) || val < 0) {
      return { error: "Invalid IOP measurement provided: " + iopMmHg };
    }

    const sp = (species || "canine").trim().toLowerCase();
    const ref = DIAGNOSTIC_STANDARDS.tonometryIop.referenceIntervalsMmHg[sp] ||
                DIAGNOSTIC_STANDARDS.tonometryIop.referenceIntervalsMmHg.canine;

    let status = "NORMAL INTRAOCULAR PRESSURE";
    let recommendation = "IOP is within normal physiological limits.";

    if (val > 25.0) {
      status = "GLAUCOMA EMERGENCY / OCULAR HYPERTENSION";
      recommendation = "EMERGENCY: Immediate medical pressure reduction required. Administer Dorzolamide 2% eye drops TDS + Latanoprost 0.005% BID + IV Mannitol 20% (1.5g/kg over 30 mins).";
    } else if (val < 10.0) {
      status = "UVEITIC HYPOTONY (ANTERIOR UVEITIS)";
      recommendation = "Low IOP indicates active intraocular inflammation (ciliary body hyposecretion). Rule out systemic infectious diseases (e.g., Canine Ehrlichiosis, FIP, Toxoplasmosis).";
    }

    return {
      species: sp,
      measuredIopMmHg: val,
      referenceInterval: ref.min + " to " + ref.max + " mmHg",
      diagnosticStatus: status,
      therapeuticRecommendation: recommendation
    };
  };

  /**
   * EAR CLEANING & OTIC PROTOCOL WITH TYMPANUM INTEGRITY VERIFICATION:
   */
  SafetyEngine.getEarCleaningProtocol = function (tympanicMembraneIntact) {
    const isIntact = tympanicMembraneIntact !== false;

    if (!isIntact) {
      return {
        tympanumStatus: "RUPTURED / PERFORATED TYMPANIC MEMBRANE (OTITIS MEDIA)",
        ototoxicityWarning: "CRITICAL: NEOMYCIN, GENTAMICIN, TOBRAMYCIN, CHLORHEXIDINE, AND PROPYLENE GLYCOL ARE STRICTLY CONTRAINDICATED (causes permanent cochlear ototoxicity and vestibular syndrome).",
        safeCleansers: [
          "Sterile Isotonic Saline (0.9% NaCl)",
          "Tris-EDTA Aqueous Buffer Solution (Safe for middle ear)",
          "Squalene ceruminolytic aqueous flush"
        ],
        safeTopicalAntimicrobials: [
          "Ofloxacin 0.3% Injectable Solution used as ear drops (non-ototoxic)",
          "Dexamethasone Sodium Phosphate injection used topically"
        ],
        clinicalProtocol: "Perform gentle middle ear flush using warm sterile saline through a 5-Fr tomcat catheter under general anesthesia."
      };
    }

    return {
      tympanumStatus: "INTACT TYMPANIC MEMBRANE",
      safeCleansers: [
        "Commercial Ceruminolytic Flushes containing Salicylic Acid, Lactic Acid, or Chloroxylenol",
        "Tris-EDTA buffer for gram-negative bacterial sensitization"
      ],
      safeTopicalAntimicrobials: [
        "Standard veterinary tri-combination ear drops (Otomax, Easotic, Surolan)"
      ],
      clinicalProtocol: "Instill generous volume of cleaner into canal, massage ear base for 60 seconds, allow patient to shake head, wipe clean with dry cotton balls."
    };
  };

  /**
   * Fetches full clinical condition profile by ID.
   */
  SafetyEngine.getConditionById = function (id) {
    if (!id || typeof id !== "string") return null;
    const cleanId = id.trim().toLowerCase();
    const list = CLINICAL_DOSSIERS || [];
    for (let i = 0; i < list.length; i++) {
      if (list[i].id.toLowerCase() === cleanId) return list[i];
    }
    return null;
  };

  /**
   * Searches clinical dossiers by keyword.
   */
  SafetyEngine.searchConditions = function (query) {
    if (!query || typeof query !== "string") return [];
    const q = query.trim().toLowerCase();
    return CLINICAL_DOSSIERS.filter(function (c) {
      return (
        c.nameEn.toLowerCase().indexOf(q) !== -1 ||
        c.nameHi.indexOf(q) !== -1 ||
        c.system.toLowerCase().indexOf(q) !== -1
      );
    });
  };

  // Expose to public clinical data namespace
  window.VetcareApp.ClinicalData.OphthalmologyENT = SafetyEngine;

})();
