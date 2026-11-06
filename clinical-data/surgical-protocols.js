// Vetcare AI OS - Veterinary Field Surgery Protocols, Regional Anaesthesia & Operative Care (2026 Production)
(function () {
  "use strict";

  // 1. GLOBAL NAMESPACE ATTACHMENT
  window.VetcareApp = window.VetcareApp || {};
  window.VetcareApp.ClinicalData = window.VetcareApp.ClinicalData || {};

  // 2. COMPREHENSIVE ANAESTHESIA & SEDATION DOSSIERS
  const ANAESTHESIA_REGISTRY = {
    sedatives: [
      {
        drugKey: "xylazine-2-percent",
        genericName: "Xylazine Hydrochloride",
        concentration: "20 mg/ml (2% Injection)",
        concentrationMgPerMl: 20.0,
        speciesDosing: {
          bovine: {
            standingSedationMgPerKg: 0.05,
            recumbentSurgicalMgPerKg: 0.15,
            route: "IM",
            clinicalNote: "CRITICAL 1/10TH EQUINE DOSE RULE: Ruminants possess extreme alpha-2 adrenoceptor sensitivity; require only 1/10th of the equine dose. Overdosing induces fatal bloat, hypothermia, bradycardia, and uterine rupture."
          },
          bubaline: {
            standingSedationMgPerKg: 0.04,
            recumbentSurgicalMgPerKg: 0.12,
            route: "IM",
            clinicalNote: "Water buffaloes are even more sensitive than cattle. Fast for 24-36 hrs prior to avoid severe regurgitation and ruminal bloat."
          },
          caprine: {
            standingSedationMgPerKg: 0.02,
            recumbentSurgicalMgPerKg: 0.05,
            route: "IM",
            clinicalNote: "Extreme sensitivity. High risk of severe respiratory depression and hypoxemia. Keep head elevated."
          },
          ovine: {
            standingSedationMgPerKg: 0.02,
            recumbentSurgicalMgPerKg: 0.05,
            route: "IM",
            clinicalNote: "Can precipitate acute pulmonary edema in sheep. Use lowest effective dose."
          },
          equine: {
            standingSedationMgPerKg: 0.5,
            recumbentSurgicalMgPerKg: 1.1,
            route: "IV",
            clinicalNote: "Standard equine sedative. Lowers head carriage, relaxes penis, and provides visceral analgesia for colic."
          },
          canine: {
            standingSedationMgPerKg: 1.0,
            recumbentSurgicalMgPerKg: 2.0,
            route: "IM",
            clinicalNote: "Induces emesis in dogs. Pre-medicate with Atropine to prevent severe bradycardia."
          }
        },
        reversalAgents: [
          { drug: "Yohimbine HCl", doseMgPerKg: 0.125, route: "IV", notes: "Specific alpha-2 antagonist. Complete reversal within 3-5 minutes." },
          { drug: "Tolazoline HCl", doseMgPerKg: 2.0, route: "IV slow", notes: "Alternative reversal for ruminants." },
          { drug: "Atipamezole", doseMgPerKg: 0.05, route: "IM", notes: "Highly selective alpha-2 antagonist for small animals and ruminants." }
        ],
        contraindications: [
          "ABSOLUTELY CONTRAINDICATED IN THIRD-TRIMESTER PREGNANCY: Causes powerful oxytocin-mimicking myometrial contractions leading to premature abortion or uterine rupture.",
          "ABSOLUTELY CONTRAINDICATED IN URETHRAL OBSTRUCTION / BLOCKED BLADDER: Xylazine induces profound osmotic diuresis and relaxes the detrusor muscle, accelerating fatal bladder rupture in urolithiasis."
        ]
      },
      {
        drugKey: "diazepam",
        genericName: "Diazepam",
        concentration: "5 mg/ml Injection",
        concentrationMgPerMl: 5.0,
        speciesDosing: {
          bovine: { doseMgPerKg: 0.2, route: "IV", clinicalNote: "Excellent muscle relaxant for downer cows, calves, and tetanus spasms." },
          caprine: { doseMgPerKg: 0.3, route: "IV", clinicalNote: "Choice safe sedative for small ruminant surgical procedures." },
          canine: { doseMgPerKg: 0.5, route: "IV", clinicalNote: "Anticonvulsant of choice; pre-anesthetic co-induction agent." },
          feline: { doseMgPerKg: 0.3, route: "IV", clinicalNote: "Avoid chronic oral administration (causes hepatic necrosis); IV safe for acute induction." },
          equine: { doseMgPerKg: 0.1, route: "IV", clinicalNote: "Combined with Ketamine for field anaesthesia induction." }
        },
        reversalAgents: [
          { drug: "Flumazenil", doseMgPerKg: 0.02, route: "IV", notes: "Specific benzodiazepine competitive antagonist." }
        ],
        contraindications: [
          "Do not inject rapidly IV in propylene glycol base (triggers bradycardia and thrombophlebitis).",
          "Avoid in animals with severe hepatic failure."
        ]
      },
      {
        drugKey: "ketamine-50",
        genericName: "Ketamine Hydrochloride",
        concentration: "50 mg/ml Injection",
        concentrationMgPerMl: 50.0,
        speciesDosing: {
          bovine: {
            doseMgPerKg: 2.0,
            route: "IV",
            clinicalNote: "Administered strictly after sedation with Xylazine (0.1 mg/kg) for 15-20 minutes of surgical anesthesia."
          },
          equine: {
            doseMgPerKg: 2.2,
            route: "IV",
            clinicalNote: "Field anaesthesia ('Knockdown combo'): Xylazine (1.1 mg/kg IV) followed 5 minutes later by Ketamine (2.2 mg/kg IV bolus)."
          },
          canine: {
            doseMgPerKg: 5.0,
            route: "IV",
            clinicalNote: "Co-administered with Diazepam (0.25 mg/kg IV) in the same syringe for smooth induction."
          },
          caprine: {
            doseMgPerKg: 5.0,
            route: "IM",
            clinicalNote: "Combined with Xylazine (0.05 mg/kg IM) for short surgical operations."
          }
        },
        reversalAgents: [],
        contraindications: [
          "NEVER administer Ketamine as a sole agent without a muscle relaxant (causes violent muscle rigidity, catatonia, and emergence delirium).",
          "Contraindicated in head trauma, glaucoma, and elevated intracranial or intraocular pressure."
        ]
      }
    ],

    nerveBlocks: [
      {
        blockKey: "paravertebral-proximal",
        nameEn: "Proximal Paravertebral Nerve Block (Farquharson Technique)",
        nameHi: "प्रॉक्सिमल पैरासर्टेब्रल नर्व ब्लॉक (T13, L1, L2)",
        species: ["bovine", "bubaline"],
        targetNerves: "Dorsal and ventral nerve roots of T13 (last thoracic), L1, and L2 spinal nerves as they emerge from intervertebral foramina.",
        anatomicalLandmarks: "Transverse processes of L1, L2, and L3. Needle enters 5 cm lateral to dorsal midline, walks off the cranial border of the transverse process down to the intervertebral foramen.",
        needleSpecification: "18G, 3.5 to 4.5 inch (9 to 11 cm) spinal needle with stylet.",
        localAnaesthetic: "Lignocaine HCl 2% (without adrenaline)",
        volumePerSite: "10 to 15 ml per site (total 35-45 ml for all three nerves).",
        areaDesensitized: "Complete full-thickness desensitization of the paralumbar flank wall: skin, cutaneous muscle, external oblique, internal oblique, transversus abdominis, and parietal peritoneum.",
        clinicalSignsOfSuccess: "Immediate scoliosis of the spine (spine curves toward the blocked side due to muscular paralysis), skin warm to touch (vasodilation), and complete loss of pain reflex to needle prick."
      },
      {
        blockKey: "paravertebral-distal",
        nameEn: "Distal Paravertebral Nerve Block (Magda / Cakala Technique)",
        nameHi: "डिस्टल पैरासर्टेब्रल नर्व ब्लॉक (L1, L2, L4 ट्रांसवर्स प्रोसेस)",
        species: ["bovine", "bubaline", "caprine", "ovine"],
        targetNerves: "Dorsal and ventral branches of T13, L1, and L2 at the tips of the transverse processes.",
        anatomicalLandmarks: "Tips of the transverse processes of L1 (for T13 nerve), L2 (for L1 nerve), and L4 (for L2 nerve).",
        needleSpecification: "18G, 1.5 to 2.5 inch needle.",
        localAnaesthetic: "Lignocaine HCl 2%",
        volumePerSite: "10 ml injected below the transverse process (ventral branch) and 5 ml injected above the transverse process (dorsal branch) in a fan shape.",
        areaDesensitized: "Entire paralumbar flank without producing scoliosis or ataxia.",
        clinicalSignsOfSuccess: "Absence of panniculus reflex, skin warmth, and analgesia in flank skin and abdominal muscle."
      },
      {
        blockKey: "epidural-caudal",
        nameEn: "Caudal (Low) Epidural Anaesthesia",
        nameHi: "कॉडल (लो) एपिड्यूरल एनेस्थीसिया (सैक्रो-कॉक्सीजियल)",
        species: ["bovine", "bubaline", "equine", "caprine", "ovine"],
        targetNerves: "Sacral and coccygeal spinal nerve roots in the epidural space.",
        anatomicalLandmarks: "Sacrococcygeal space (S5-Co1) or First Intercoccygeal space (Co1-Co2). Pump the tail up and down like a pump handle; feel the first prominent movable depression on the dorsal midline.",
        needleSpecification: "18G, 1.5 inch needle in cattle/buffalo; 20G 1 inch in small ruminants. Insert at 45° to 90° angle on dorsal midline.",
        localAnaesthetic: "Lignocaine HCl 2% (without adrenaline)",
        volumePerSite: "Low Standing Epidural: 1.0 ml per 50 kg body weight (approx 6-8 ml for adult cattle; 1.0-1.5 ml for sheep/goats). High Recumbent Epidural: >15-20 ml (causes hindlimb motor paralysis).",
        areaDesensitized: "Tail, anus, rectum, perineum, vulva, vagina, posterior cervix. Animal remains standing comfortably without hindquarter ataxia.",
        clinicalSignsOfSuccess: "Loss of tail tone (flaccid hanging tail), relaxed anal sphincter (ballooning rectum), and absence of straining.",
        indications: "Uterine prolapse replacement, dystocia relief, episiotomy, rectovaginal fistula repair."
      },
      {
        blockKey: "cornual-block",
        nameEn: "Cornual Nerve Block (Dehorning / Disbudding)",
        nameHi: "कॉर्नुअल नर्व ब्लॉक (सींग काटना / बधियाकरण)",
        species: ["bovine", "bubaline", "caprine"],
        targetNerves: "Cornual branch of the zygomaticotemporal (lacrimal) nerve.",
        anatomicalLandmarks: "Cattle: Midway between the lateral canthus of the eye and the base of the horn, immediately ventral to the temporal crest / frontal ridge. Goats: Requires two blocks -> (1) Cornual branch of zygomaticotemporal midway between lateral canthus and horn; (2) Cornual branch of infratrochlear nerve midway between medial canthus and horn.",
        needleSpecification: "20G, 1 inch needle.",
        localAnaesthetic: "Lignocaine HCl 2%",
        volumePerSite: "Cattle: 5 to 10 ml per horn. Goats: 1 to 2 ml per site (WARNING: Goats easily overdose on Lignocaine; do not exceed 5-6 mg/kg total dose).",
        areaDesensitized: "Horn core, horn corium, and peri-cornual skin.",
        clinicalSignsOfSuccess: "Drooping of the upper eyelid and complete analgesia to pinprick around the horn base."
      },
      {
        blockKey: "inverted-l-block",
        nameEn: "Inverted L-Block (Field Infiltration)",
        nameHi: "इनवर्टेड एल-ब्लॉक (फिल्ड इनफिल्ट्रेशन)",
        species: ["bovine", "bubaline", "caprine", "ovine"],
        targetNerves: "Non-specific infiltration of all sensory nerve fibers entering the surgical paralumbar field.",
        anatomicalLandmarks: "Inverted 'L' configuration: Vertical line cranial to the planned incision (parallel to last rib) and horizontal line below the lumbar transverse processes.",
        needleSpecification: "18G, 2.5 to 3.0 inch needle.",
        localAnaesthetic: "Lignocaine HCl 2%",
        volumePerSite: "50 to 100 ml total in cattle (infiltrated into skin, muscles, and deep fascial layers).",
        areaDesensitized: "Flank area caudal and ventral to the 'L' line.",
        clinicalSignsOfSuccess: "Analgesia within 10-15 minutes inside the enclosed operational field."
      }
    ]
  };

  // 3. FIELD SURGICAL OPERATIVE GUIDELINES (6 CORE CLINICAL PROCEDURES)
  const SURGICAL_PROTOCOLS = [
    // ========================================================================
    // 1. LEFT FLANK RUMENOTOMY (रुमेनोटॉमी)
    // ========================================================================
    {
      id: "surg-rumenotomy",
      nameEn: "Left Flank Rumenotomy (Rumen Foreign Body & Hardware Retrieval)",
      nameHi: "लेफ्ट फ्लैंक रुमेनोटॉमी (पेट चीरा ऑपरेशन / पॉलीथिन व तार निकालना)",
      indications: [
        "Traumatic Reticuloperitonitis (TRP / Hardware Disease - metallic wire/nails)",
        "Severe ruminal plastic/polythene foreign body impaction (Polybezoars)",
        "Acute toxic grain engorgement / Ruminal acidosis unresponsive to medical lavage",
        "Refractory frothy bloat with persistent fungal/phytobezoar obstruction"
      ],
      preOperativePreparation: [
        "Withhold feed for 12 to 18 hours if non-emergent (reduces intra-ruminal pressure). Water can remain accessible.",
        "Secure animal in cattle stocks or against a sturdy wall in a standing position.",
        "Clip and shave hair over the entire left paralumbar fossa (from last rib to tuber coxae, and transverse processes to ventral abdomen).",
        "Perform surgical scrub: 3 alternating washes of Povidone-Iodine 10% scrub and 70% surgical spirit."
      ],
      anaesthesiaProtocol: "Proximal or Distal Paravertebral Nerve Block (T13, L1, L2) using 35-45 ml Lignocaine 2%. Supplement with light physical restraint; avoid heavy sedation to keep animal standing.",
      stepByStepProcedure: [
        "Step 1 (Incision): Make a 20-25 cm vertical skin incision in the center of the left paralumbar fossa, starting 5 cm ventral to the lumbar transverse processes.",
        "Step 2 (Muscle Separation): Incise external abdominal oblique muscle, internal abdominal oblique muscle, and transversus abdominis muscle along the line of incision. Grasp and carefully incise the parietal peritoneum between hemostatic forceps to enter the peritoneal cavity.",
        "Step 3 (Rumen Exteriorization): Identify the dorsal sac of the rumen. Grasp the rumen wall with two sterile towel clamps and exteriorize a 10 cm fold of the rumen wall outside the abdominal incision.",
        "Step 4 (Securing the Rumen): Fix the rumen to the skin to PREVENT PERITONEAL CONTAMINATION using a Weingart rumenotomy frame, Cushing cloth technique, or continuous anchoring mattress sutures to the skin margins.",
        "Step 5 (Rumen Incision): Incise the exteriorized rumen wall vertically (15-18 cm) using a scalpel. Suction or manually scoop out the top 1/3rd of the ruminal contents into clean buckets.",
        "Step 6 (Exploration): Pass arm cranioventrally through the rumino-reticular fold into the reticulum. Systematically palpate the honeycomb cells of the reticulum, remove all foreign bodies (nails, wires, plastic), and inspect the anterior wall for abscesses or adhesions.",
        "Step 7 (Rumen Closure): Clean and disinfect the rumen wound edges with sterile saline. Close the rumen wall in TWO INVERTING LAYERS using Chromic Catgut #2 or Polyglycolic Acid (Vicryl) #2: First layer = Continuous Cushing pattern; Second layer = Continuous Lembert pattern (ensures serosa-to-serosa leakproof seal).",
        "Step 8 (Decontamination & Release): Remove the frame or skin stay sutures, flush the exterior surface with sterile saline, and gently replace the closed rumen back into the abdominal cavity.",
        "Step 9 (Abdominal Wall Closure): Close the peritoneum and transversus abdominis together with Chromic Catgut #2 in continuous locking pattern. Close internal and external oblique muscle layers in separate continuous layers with Vicryl #2. Close the skin with Monofilament Nylon #2 or braided silk using the Ford Interlocking or Cross Mattress pattern."
      ],
      postOperativeCare: [
        "Administer Broad-Spectrum Antibiotic (Streptopenicillin or Ceftiofur 2.2 mg/kg IM) for 5-7 consecutive days.",
        "Administer Flunixin Meglumine (1.1 mg/kg IV OD) or Meloxicam (0.5 mg/kg IM) for 3-4 days.",
        "Feed soft green fodder and fresh hay in small divided meals for 48 hours; avoid sudden overeating.",
        "Transfaunate with 5 to 10 liters of fresh rumen fluid from a healthy cow to restore ruminal fermentation flora.",
        "Remove skin sutures on the 10th to 12th post-operative day."
      ]
    },

    // ========================================================================
    // 2. BOVINE CAESAREAN SECTION (सिजेरियन ऑपरेशन)
    // ========================================================================
    {
      id: "surg-c-section",
      nameEn: "Bovine Caesarean Section (Left Flank Hysterotomy)",
      nameHi: "गाय-भैंस का सिजेरियन ऑपरेशन (बड़ा बछड़ा / गर्भाशय मरोड़ / बंद बच्चेदानी)",
      indications: [
        "Fetal-maternal disproportion (oversized fetus relative to maternal pelvic canal)",
        "Failure of cervical dilation (Ringwomb / indurated cervix)",
        "Irreducible or recurrent uterine torsion (गर्भाशय मरोड़) with compromised uterine wall",
        "Fetal monstrosities (Schistosomus reflexus, Perosomus elumbis, hydrocephalus)"
      ],
      preOperativePreparation: [
        "Standing left paralumbar flank laparotomy is preferred; if the cow is exhausted or recumbent, position in right lateral recumbency.",
        "Administer IV fluids (Ringer's Lactate 5-10 Liters) to combat hypovolemic dehydration.",
        "Shave and aseptically scrub the entire left flank and sub-lumbar fossa.",
        "Tie maternal hind legs loosely with hobbles to prevent sudden kicking during exteriorization."
      ],
      anaesthesiaProtocol: "Distal or Proximal Paravertebral Nerve Block (T13, L1, L2) + Low Caudal Epidural (5 ml Lignocaine 2%) to abolish active maternal straining.",
      stepByStepProcedure: [
        "Step 1 (Incision): Make a generous 35-40 cm vertical skin incision in the middle of the left paralumbar fossa, starting 10 cm below the transverse processes and extending ventrally.",
        "Step 2 (Laparotomy): Incise abdominal muscles and peritoneum cleanly down to the abdominal cavity.",
        "Step 3 (Uterine Exteriorization): Reach into the caudo-ventral abdomen, identify the gravid uterine horn by palpating the fetal limbs (hock or carpus). Grasp a fetal extremity through the uterine wall and gently rock and elevate the apex of the gravid horn up to the laparotomy incision.",
        "Step 4 (Positioning Uterus): Hold the apex of the uterine horn securely outside the abdominal incision margins so that spilled fetal fluids (allantoic/amniotic) drain externally and do not contaminate the peritoneal cavity.",
        "Step 5 (Hysterotomy): Incise the uterine wall along the greater curvature over the fetal limb, taking care not to cut maternal cotyledons. Extend the incision longitudinally (25-30 cm) with blunt-pointed scissors.",
        "Step 6 (Fetal Extraction): Grasp the fetal feet, apply sterile calving chains or ropes above the fetlocks, and deliver the calf through the incision via coordinated traction following the pelvic curvature.",
        "Step 7 (Membranes & Hygiene): Resuscitate calf (clear airway, stimulate breathing). Remove easily detachable portions of the fetal placenta; DO NOT peel adherent cotyledons forcefully (prevents fatal uterine hemorrhage).",
        "Step 8 (Uterine Closure): Close the uterine incision in TWO INVERTING CONTINUOUS LAYERS using Polyglycolic acid (Vicryl) #2 or Chromic Catgut #2: First layer = Continuous Utrecht pattern (inverting with suture knots buried); Second layer = Continuous Cushing pattern. Ensure completely hemostatic, watertight, leakproof closure.",
        "Step 9 (Lavage & Abdominal Closure): Rinse the uterine serosa with warm sterile saline containing potassium penicillin. Replace the uterus into its anatomical pelvic position. Close peritoneum and muscle layers in 3 separate continuous passes; close skin with Ford interlocking monofilament nylon."
      ],
      postOperativeCare: [
        "Administer Oxytocin (30-40 IU IM) immediately post-closure to stimulate myometrial contraction and rapid placental shedding.",
        "Aggressive parenteral antibiotic therapy (Ceftriaxone or Amoxicillin-Sulbactam) for 7 days.",
        "Intensive fluid therapy and anti-inflammatory analgesics (Flunixin Meglumine 1.1 mg/kg IV BD for 3 days).",
        "Monitor for retained fetal membranes, septic metritis, and peritonitis."
      ]
    },

    // ========================================================================
    // 3. CLOSED & OPEN CASTRATION (बधियाकरण)
    // ========================================================================
    {
      id: "surg-castration",
      nameEn: "Bovine & Small Ruminant Castration (Burdizzo vs Surgical Open)",
      nameHi: "पशु बधियाकरण (बर्डीजो रक्तहीन विधि व सर्जिकल ऑपरेशन)",
      indications: [
        "Suppression of male aggressive behavior and elimination of unwanted breeding",
        "Improvement of meat quality and fattening efficiency in bullocks, steers, and buck kids",
        "Testicular trauma, orchitis, or scrotal hernia"
      ],
      preOperativePreparation: [
        "Physical examination to ensure both testicles have descended into the scrotum (rule out cryptorchidism).",
        "Cleanse scrotal sac with antiseptic povidone-iodine scrub.",
        "Mandatory administration of prophylactic Tetanus Toxoid or Tetanus Antitoxin (1,500 IU SC)."
      ],
      anaesthesiaProtocol: "Infiltration of 5-10 ml Lignocaine 2% into each spermatic cord (high in scrotal neck) + 2 ml into the scrotal skin.",
      stepByStepProcedure: [
        "BURDIZZO BLOODLESS CASTRATION (FIELD CHOICE):",
        "Step 1: Restrain animal securely. Locate the spermatic cord on one side of the neck of the scrotum between thumb and forefingers.",
        "Step 2: Push the cord to the lateral side of the scrotal neck. Apply the jaws of the Burdizzo castrator across the cord, approx 4-5 cm above the testicle.",
        "Step 3: Clamp the castrator handles firmly until a distinct crushing 'click' is felt. Maintain full pressure for 15-20 seconds.",
        "Step 4: Release and apply a second crush 1-2 cm lower on the SAME cord. Repeat on the contralateral cord.",
        "CRITICAL RULE: NEVER CRUSH BOTH CORDS SIMULTANEOUSLY ACROSS THE MIDLINE (crushing the median septum destroys scrotal blood supply causing dry gangrene and sloughing).",
        "",
        "SURGICAL OPEN ORCHIECTOMY:",
        "Step 1: Excised lower 1/3rd of the scrotal sac (scrotal ablation/apex removal) with a sharp scalpel to ensure dependent ventral drainage.",
        "Step 2: Strip the tunica dartos, exteriorize each testis, strip the cremaster muscle proximally.",
        "Step 3: Transfix and securely ligate the spermatic cord with Chromic Catgut #1 or #2, then sever cord 1 cm distal to the ligature (or use an emasculator held for 2 minutes to crush and cut).",
        "Step 4: Leave scrotal wound completely open for open drainage; pack with fly repellent antiseptic ointment."
      ],
      postOperativeCare: [
        "Fly-repellent spray (Topicure / D-Mag) applied twice daily to scrotal area.",
        "Single dose of Meloxicam (0.5 mg/kg IM) for pain management.",
        "Exercise animal daily to minimize post-operative scrotal edema."
      ]
    },

    // ========================================================================
    // 4. UMBILICAL & VENTRAL HERNIORRHAPHY (हर्निया ऑपरेशन)
    // ========================================================================
    {
      id: "surg-herniorrhaphy",
      nameEn: "Bovine & Caprine Umbilical / Ventral Herniorrhaphy",
      nameHi: "हर्निया का ऑपरेशन (नाभि हर्निया / आंतों का बाहर उभार)",
      indications: [
        "Congenital umbilical hernia in calves and foals with hernial ring >3 fingers",
        "Traumatic ventral abdominal hernia with visceral entrapment risk",
        "Strangulated hernia causing acute colic"
      ],
      preOperativePreparation: [
        "Fast animal for 24 hours (withhold feed and water) to reduce intra-abdominal visceral volume.",
        "Position animal in dorsal recumbency (on its back) with head slightly lowered.",
        "Shave and aseptically drape the entire ventral umbilical region."
      ],
      anaesthesiaProtocol: "Calves/Small ruminants: Xylazine (0.05 mg/kg IM) + Ketamine (2.5 mg/kg IV) general field anaesthesia; local ring infiltration with Lignocaine 2%.",
      stepByStepProcedure: [
        "Step 1 (Incision): Make an elliptical, longitudinal skin incision over the apex of the hernial swelling, removing redundant skin.",
        "Step 2 (Dissection): Carefully dissect through the subcutaneous tissue to expose the fibrous hernial sac without puncturing the underlying peritoneum or entrapped intestines.",
        "Step 3 (Adhesion Reduction): Open the hernial sac carefully if visceral adhesions exist. Gently free all omental or intestinal adhesions and return the contents into the abdominal cavity.",
        "Step 4 (Hernial Ring Debridement): Debride the smooth, avascular edges of the fibrous hernial ring down to fresh bleeding muscular edges (essential for biological fibroblastic union).",
        "Step 5 (Mayo Overlapping Mattress Closure - 'Vest-over-Pants'): Close the hernial ring using heavy non-absorbable or slow-absorbing suture (Polyamide Nylon #2/#3 or PDS #2) with horizontal overlapping mattress sutures. The lower muscular flap is drawn up beneath the upper flap by 1.5 to 2.0 cm, creating a dual-layer reinforced barrier.",
        "Step 6 (Obliterate Dead Space): Close the subcutaneous dead space with continuous simple sutures using Vicryl #0 or #1.",
        "Step 7 (Skin Closure): Close skin with Cruciate or Horizontal Mattress sutures using Monofilament Nylon #1."
      ],
      postOperativeCare: [
        "Apply a supportive belly-bandage or canvas truss around the abdomen for 10-14 days.",
        "Strict stall confinement; prevent jumping, running, or over-feeding.",
        "Broad-spectrum antibiotic cover for 5 days.",
        "Remove skin sutures on post-operative day 14."
      ]
    },

    // ========================================================================
    // 5. TEAT SPIDER & LACERATION SURGERY (थन की सर्जरी)
    // ========================================================================
    {
      id: "surg-teat-surgery",
      nameEn: "Thelotomy & Teat Obstruction Surgery (Teat Spider / Hard Milker)",
      nameHi: "थन की सर्जरी (थन बंद होना / दूध न आना / थन का कटना)",
      indications: [
        "Fibrous teat spider (fibrosis/obstruction in the teat cistern blocking milk outflow)",
        "Stenosis or trauma to the streak canal rosette of Furstenberg ('Hard Milker')",
        "Full-thickness traumatic teat lacerations with active milk leakage (milk fistula)"
      ],
      preOperativePreparation: [
        "Restrain cow securely in stocks; tie tail to foreleg.",
        "Wash teat thoroughly with chlorhexidine scrub; infuse teat cistern with sterile saline containing penicillin.",
        "Apply a soft rubber tourniquet lightly at the base of the teat to provide temporary hemostasis."
      ],
      anaesthesiaProtocol: "Ring block at the base of the teat or inverted-V block using 5-8 ml Lignocaine 2% injected subcutaneously (avoid injecting into the teat cistern).",
      stepByStepProcedure: [
        "INTERNAL TEAT OBSTRUCTION (TEAT SPIDER):",
        "Step 1: Dilate the teat sphincter using a sterile Hug's teat dilator.",
        "Step 2: Introduce a Hudson teat spiral or Cornell teat curette into the teat cistern up to the fibrous obstruction.",
        "Step 3: Rotate the curette to engage and crush the fibrous spider web, then withdraw to excise the obstructing tissue core.",
        "Step 4: If streak canal stenosis exists, introduce a Stoll teat bistoury with concealed blade; open blade and make 3 to 4 tiny radial incisions in the sphincter to expand outflow.",
        "",
        "FULL-THICKNESS TEAT LACERATION REPAIR:",
        "Step 1: Debride wound edges sharply under tourniquet hemostasis.",
        "Step 2 (3-Layer Closure):",
        "  - Layer 1 (Mucosa): Close the mucosal lining with 4-0 Polyglactin 910 (Vicryl) using continuous inverting Lembert sutures (DO NOT penetrate the teat lumen with knots).",
        "  - Layer 2 (Intermediate Muscularis): Close the muscular and connective tissue layer with 3-0 Vicryl using simple continuous sutures (provides structural strength).",
        "  - Layer 3 (Skin): Close teat skin with 3-0 Monofilament Nylon using vertical mattress sutures.",
        "Step 3: Insert a sterile self-retaining silicone teat siphon/plug for 3 to 5 days to allow continuous milk drainage without milking friction."
      ],
      postOperativeCare: [
        "Infuse intramammary antibiotic infusion (e.g., Ceftiofur or Cloxacillin) twice daily for 5 days.",
        "Drain milk via sterile siphon tube; avoid manual hand milking for 7 days.",
        "Remove skin sutures after 10-12 days."
      ]
    },

    // ========================================================================
    // 6. EMERGENCY WOUND DEBRIDEMENT (घाव डिब्राइडमेंट)
    // ========================================================================
    {
      id: "surg-wound-debridement",
      nameEn: "Traumatic Wound Debridement & Contaminated Laceration Management",
      nameHi: "आपातकालीन घाव की सफाई, डिब्राइडमेंट व टांके (गहरे घाव व कटे-फटे अंग)",
      indications: [
        "Extensive wire cuts, horn gores, predator bite lacerations, and infected wounds",
        "Necrotic avulsion injuries with foreign matter contamination"
      ],
      preOperativePreparation: [
        "Fill the open wound cavity with sterile water-soluble lubricating jelly (K-Y jelly) to trap cut hair.",
        "Clip and shave wide perimeter of hair (10 cm around wound margins).",
        "Flush away the water-soluble jelly along with trapped hair and gross dirt using copius sterile normal saline."
      ],
      anaesthesiaProtocol: "Local line infiltration around wound margins with Lignocaine 2% (buffered with 1 ml 8.4% Sodium Bicarbonate per 9 ml Lignocaine to reduce stinging pain).",
      stepByStepProcedure: [
        "Step 1 (High-Pressure Copious Lavage): Flush the wound thoroughly with 3 to 5 liters of warm sterile isotonic saline using an 18G needle on a 30-50 ml syringe (generates 7-8 psi pressure to dislodge bacteria without driving them into tissues).",
        "Step 2 (Sharp Excisional Debridement): Using sharp scalpel and tissue forceps, excise all non-viable, blackened, green, or devitalized tissue margins ('freshening the edges'). Preserve healthy bleeding pink tissue.",
        "Step 3 (Hemostasis): Ligate larger bleeding vessels with Chromic Catgut 2-0; control capillary bleeding with pressure packs.",
        "Step 4 (Dead Space Elimination): Extensive subcutaneous undermining creates dead space that fills with seroma/hematoma. Obliterate dead space using walking sutures or continuous tacking sutures with 2-0 Vicryl.",
        "Step 5 (Drain Placement): In heavily contaminated or pocketed wounds, insert a sterile Fenestrated Penrose Drain exiting through a separate dependent stab incision below the wound line.",
        "Step 6 (Skin Closure): Re-approximate skin edges without excessive tension using tension-relieving Vertical Mattress or Far-Near-Near-Far sutures with Monofilament Nylon #1 or #2."
      ],
      postOperativeCare: [
        "Administer Broad-Spectrum Antibiotics (Amoxicillin-Clavulanate or Ceftriaxone) for 5-7 days.",
        "Administer NSAIDs (Meloxicam 0.5 mg/kg IM) for pain and swelling.",
        "Remove Penrose drain after 48-72 hours once serosanguinous discharge ceases.",
        "Remove skin sutures on post-operative day 10 to 14."
      ]
    }
  ];

  // 4. SUTURE SELECTION & TECHNIQUE MATRIX
  const SUTURE_MATRIX = {
    materials: [
      {
        materialId: "chromic-catgut",
        genericName: "Chromic Catgut",
        type: "Natural Absorbable (Multifilament twisted)",
        tensileStrengthRetention: "14 to 21 days",
        completeAbsorptionDays: "60 to 90 days",
        tissueReactivity: "High (enzymatic phagocytosis)",
        idealIndications: "Rumenotomy wall closure, ligation of testicular spermatic cords, uterine closure (field settings)."
      },
      {
        materialId: "polyglactin-910",
        genericName: "Polyglycolic Acid / Polyglactin 910 (Vicryl)",
        type: "Synthetic Absorbable (Braided multifilament)",
        tensileStrengthRetention: "21 to 28 days (50% strength at 21 days)",
        completeAbsorptionDays: "56 to 70 days (hydrolysis)",
        tissueReactivity: "Very Low",
        idealIndications: "Gold standard for abdominal muscular layers, bladder wall, uterine hysterotomy, subcutis."
      },
      {
        materialId: "polydioxanone",
        genericName: "Polydioxanone (PDS II)",
        type: "Synthetic Absorbable (Monofilament)",
        tensileStrengthRetention: "Extended: 6 weeks (50% strength at 42 days)",
        completeAbsorptionDays: "180 to 210 days",
        tissueReactivity: "Minimal",
        idealIndications: "High-tension closures, linea alba in horses, herniorrhaphy rings, slow-healing fascial sheaths."
      },
      {
        materialId: "monofilament-nylon",
        genericName: "Polyamide (Monofilament Nylon / Ethilon)",
        type: "Synthetic Non-Absorbable (Monofilament)",
        tensileStrengthRetention: "Permanent (gradual loss over years)",
        completeAbsorptionDays: "Non-absorbable",
        tissueReactivity: "Extremely Low",
        idealIndications: "Gold standard for external skin closure in all veterinary species. Smooth, non-capillary, zero bacteria wicking."
      },
      {
        materialId: "braided-silk",
        genericName: "Surgical Silk",
        type: "Natural Non-Absorbable (Braided)",
        tensileStrengthRetention: "Loss over 1 year",
        completeAbsorptionDays: "Non-absorbable",
        tissueReactivity: "Moderate to High",
        idealIndications: "Cardiovascular ligation, temporary stay sutures. AVOID in contaminated skin wounds due to high capillary wicking."
      }
    ],

    tissueRecommendations: {
      hollowViscera: {
        tissueName: "Hollow Viscera (Rumen, Uterus, Bladder, Intestine)",
        recommendedMaterial: "Polyglycolic Acid (Vicryl) or Chromic Catgut",
        gaugeRecommended: "Bovine: #1 or #2; Small Animals/Caprine: 2-0 or 3-0",
        patternRecommended: "Inverting Patterns: Cushing, Lembert, or Utrecht (Continuous serosa-to-serosa seal)",
        rationale: "Requires watertight, non-leaking inverting seals to prevent septic peritonitis."
      },
      abdominalMuscleAndFascia: {
        tissueName: "Abdominal Muscle Layers & Linea Alba",
        recommendedMaterial: "Polyglactin 910 (Vicryl) or Polydioxanone (PDS)",
        gaugeRecommended: "Bovine: #2 or #3; Small Animals: 0 or 2-0",
        patternRecommended: "Simple Continuous or Ford Interlocking (with strong knot security)",
        rationale: "Fascia bears the entire bursting strength of the abdominal wall."
      },
      subcutaneousTissue: {
        tissueName: "Subcutaneous Dead Space",
        recommendedMaterial: "Vicryl or Chromic Catgut",
        gaugeRecommended: "Bovine: #0 or 2-0; Small Animals: 3-0",
        patternRecommended: "Simple Continuous or Buried Tacking sutures",
        rationale: "Obliterates dead space to prevent seroma and hematoma formation."
      },
      skin: {
        tissueName: "External Skin Closure",
        recommendedMaterial: "Monofilament Nylon (Polyamide)",
        gaugeRecommended: "Bovine/Equine: #1, #2 or #3; Small Animals: 2-0 or 3-0",
        patternRecommended: "Large Animal Field: Ford Interlocking or Cross Mattress; Small Animal: Simple Interrupted or Cruciate",
        rationale: "Non-capillary, high knot tensile strength, zero capillary fluid wicking."
      }
    },

    sutureRemovalTimelineDays: {
      bovine: 10,
      bubaline: 12,
      equine: 12,
      canine: 10,
      feline: 10,
      caprine: 10,
      ovine: 10
    }
  };

  // 5. SURGICAL PROTOCOLS ENGINE IMPLEMENTATION
  const SurgicalEngine = {
    anaesthesia: ANAESTHESIA_REGISTRY,
    protocols: SURGICAL_PROTOCOLS,
    sutureMatrix: SUTURE_MATRIX
  };

  /**
   * AUTOMATED ANESTHETIC DOSE & VOLUME CALCULATOR:
   * Accurately calculates injectable volumes incorporating species sensitivity factors.
   *
   * @param {string} drugKey - 'xylazine-2-percent', 'diazepam', 'ketamine-50'
   * @param {string} species - 'bovine', 'bubaline', 'caprine', 'equine', 'canine', 'feline'
   * @param {number} weightKg - Live body weight in kg
   * @param {boolean} isStanding - True for light/standing sedation; False for recumbent/deep
   */
  SurgicalEngine.calculateAnaestheticDose = function (drugKey, species, weightKg, isStanding) {
    const wt = parseFloat(weightKg);
    if (isNaN(wt) || wt <= 0) {
      return { error: "Invalid body weight provided: " + weightKg };
    }

    const sp = (species || "bovine").trim().toLowerCase();
    const drug = ANAESTHESIA_REGISTRY.sedatives.find(d => d.drugKey === drugKey);

    if (!drug) {
      return { error: "Sedative/Anesthetic drug '" + drugKey + "' not found." };
    }

    const speciesConfig = drug.speciesDosing[sp];
    if (!speciesConfig) {
      return { error: "No validated dosage configured for species '" + sp + "' with drug '" + drug.genericName + "'." };
    }

    let targetMgPerKg = 0;
    if (drug.drugKey === "xylazine-2-percent") {
      targetMgPerKg = isStanding !== false
        ? speciesConfig.standingSedationMgPerKg
        : speciesConfig.recumbentSurgicalMgPerKg;
    } else {
      targetMgPerKg = speciesConfig.doseMgPerKg || 0.2;
    }

    const totalMg = wt * targetMgPerKg;
    const totalMl = totalMg / drug.concentrationMgPerMl;

    return {
      drugKey: drug.drugKey,
      genericName: drug.genericName,
      species: sp,
      weightKg: wt,
      isStandingTarget: isStanding !== false,
      calculatedDoseMg: Number(totalMg.toFixed(2)),
      calculatedDoseMl: Number(totalMl.toFixed(2)),
      route: speciesConfig.route,
      clinicalRule: speciesConfig.clinicalNote,
      reversalOptions: drug.reversalAgents,
      contraindications: drug.contraindications
    };
  };

  /**
   * Fetches full anatomical landmarks and execution parameters for a regional nerve block.
   */
  SurgicalEngine.getNerveBlockDetails = function (blockKey) {
    if (!blockKey) return null;
    const cleanKey = blockKey.trim().toLowerCase();
    const block = ANAESTHESIA_REGISTRY.nerveBlocks.find(b => b.blockKey === cleanKey);
    return block ? Object.assign({}, block) : null;
  };

  /**
   * Fetches comprehensive step-by-step surgical operative protocol by ID.
   */
  SurgicalEngine.getSurgicalProtocol = function (surgeryId) {
    if (!surgeryId) return null;
    const cleanId = surgeryId.trim().toLowerCase();
    const surg = SURGICAL_PROTOCOLS.find(s => s.id === cleanId);
    return surg ? Object.assign({}, surg) : null;
  };

  /**
   * Recommends optimal suture material, gauge, and closure pattern for target anatomical tissue.
   */
  SurgicalEngine.recommendSuture = function (tissueType) {
    if (!tissueType) return null;
    const cleanKey = tissueType.trim();
    const recs = SUTURE_MATRIX.tissueRecommendations;

    if (recs[cleanKey]) {
      return Object.assign({}, recs[cleanKey]);
    }

    // Fuzzy matching
    const lower = cleanKey.toLowerCase();
    if (lower.indexOf("skin") !== -1) return Object.assign({}, recs.skin);
    if (lower.indexOf("rumen") !== -1 || lower.indexOf("uterus") !== -1 || lower.indexOf("bladder") !== -1 || lower.indexOf("gut") !== -1) {
      return Object.assign({}, recs.hollowViscera);
    }
    if (lower.indexOf("muscle") !== -1 || lower.indexOf("fascia") !== -1 || lower.indexOf("linea") !== -1) {
      return Object.assign({}, recs.abdominalMuscleAndFascia);
    }
    if (lower.indexOf("subcut") !== -1 || lower.indexOf("fat") !== -1) {
      return Object.assign({}, recs.subcutaneousTissue);
    }

    return null;
  };

  // Expose to public clinical data namespace
  window.VetcareApp.ClinicalData.SurgicalProtocols = SurgicalEngine;

})();
