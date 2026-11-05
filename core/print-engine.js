// Vetcare AI OS - Universal Print Engine, A4 Prescription Pad & 58mm/80mm Thermal POS Driver (2026 Production)

(function (window, document) {
  'use strict';

  // 1. GLOBAL NAMESPACE & STATE INITIALIZATION
  window.VetcareApp = window.VetcareApp || {};

  var STORAGE_PAPER_SIZE_KEY = 'vetcare_print_paper_size';
  var VALID_PAPER_SIZES = ['A4', 'thermal-58mm', 'thermal-80mm'];

  var Print = {
    defaultPaperSize: 'A4',
    printQueue: [],
    printingState: 'idle' // 'idle' | 'printing'
  };

  window.VetcareApp.Print = Print;

  // Safe localStorage Wrappers
  function safeStorageGet(key) {
    try {
      return window.localStorage.getItem(key);
    } catch (e) {
      console.warn('[Vetcare Print] LocalStorage read blocked:', e);
      return null;
    }
  }

  function safeStorageSet(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch (e) {
      console.warn('[Vetcare Print] LocalStorage write blocked:', e);
    }
  }

  // Toast Notification Dispatcher
  function displayToast(message, type, duration) {
    var toastDuration = typeof duration === 'number' ? duration : 3000;
    if (typeof window.showAppToast === 'function') {
      window.showAppToast(message, type, toastDuration);
    } else if (window.VetcareApp.UI && typeof window.VetcareApp.UI.showToast === 'function') {
      window.VetcareApp.UI.showToast(message, type, toastDuration);
    } else {
      console.log('[Print ' + (type || 'info').toUpperCase() + '] ' + message);
    }
  }

  // Sanitize HTML Strings
  function escapeHtml(text) {
    if (text === null || text === undefined) return '';
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Generate CSS based on Target Paper Size
  function getPrintCssRules(paperSize) {
    var baseRules =
      '* { box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }' +
      'body { margin: 0; padding: 0; background: #ffffff !important; color: #000000 !important; font-family: system-ui, -apple-system, sans-serif; }' +
      'table { width: 100%; border-collapse: collapse; }' +
      'th, td { border: 1px solid #000000; padding: 6px 8px; text-align: left; }' +
      'th { background: #f1f5f9 !important; font-weight: 700; }' +
      '.no-border, .no-border td { border: none !important; }' +
      '.text-center { text-align: center; }' +
      '.text-right { text-align: right; }' +
      '.font-bold { font-weight: bold; }';

    if (paperSize === 'thermal-58mm') {
      return (
        '@page { size: 58mm auto; margin: 1mm; }' +
        baseRules +
        'body { width: 52mm; font-size: 11px; font-family: monospace; line-height: 1.25; }' +
        'table, th, td { border: 1px dashed #000000; padding: 3px 2px; font-size: 10px; }' +
        '.thermal-header { font-size: 13px; font-weight: bold; text-align: center; margin-bottom: 4px; }' +
        '.thermal-divider { border-top: 1px dashed #000000; margin: 6px 0; }'
      );
    }

    if (paperSize === 'thermal-80mm') {
      return (
        '@page { size: 80mm auto; margin: 2mm; }' +
        baseRules +
        'body { width: 74mm; font-size: 12px; font-family: monospace; line-height: 1.3; }' +
        'table, th, td { border: 1px dashed #000000; padding: 4px; font-size: 11px; }' +
        '.thermal-header { font-size: 15px; font-weight: bold; text-align: center; margin-bottom: 6px; }' +
        '.thermal-divider { border-top: 1px dashed #000000; margin: 8px 0; }'
      );
    }

    // Default: A4 Full Clinical Sheet
    return (
      '@page { size: A4 portrait; margin: 12mm 15mm 12mm 15mm; }' +
      baseRules +
      'body { width: 100%; font-size: 13px; line-height: 1.45; }' +
      '.rx-header { border-bottom: 2px solid #000000; padding-bottom: 8px; margin-bottom: 12px; }' +
      '.rx-symbol { font-size: 26px; font-weight: 900; font-family: Georgia, serif; line-height: 1; }' +
      '.signature-box { border-top: 1px solid #000000; width: 220px; text-align: center; padding-top: 6px; }' +
      '.warning-banner { border: 1.5px solid #000000; padding: 6px 10px; font-weight: bold; background: #fafafa !important; margin: 12px 0; }'
    );
  }

  // 2. ISOLATED IFRAME PRINT DRIVER
  Print.printHtml = function (htmlContent, options) {
    var opts = options || {};
    var targetPaperSize = opts.paperSize || Print.defaultPaperSize || 'A4';
    var docTitle = opts.title || 'Vetcare AI OS - Document Print';

    displayToast('प्रिंटर से जुड़ रहा है... कृपया प्रतीक्षा करें।', 'info', 2000);

    Print.printingState = 'printing';

    // Create an isolated invisible iframe
    var iframe = document.createElement('iframe');
    iframe.id = 'vetcare-print-iframe-' + Date.now();
    iframe.setAttribute('style', 'position: fixed; right: 0; bottom: 0; width: 0; height: 0; border: 0; opacity: 0; pointer-events: none;');
    iframe.setAttribute('aria-hidden', 'true');
    document.body.appendChild(iframe);

    var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    iframeDoc.open();

    var fullHtml =
      '<!DOCTYPE html>' +
      '<html lang="hi">' +
      '<head>' +
        '<meta charset="UTF-8">' +
        '<meta name="viewport" content="width=device-width, initial-scale=1.0">' +
        '<title>' + escapeHtml(docTitle) + '</title>' +
        '<style>' + getPrintCssRules(targetPaperSize) + '</style>' +
      '</head>' +
      '<body>' +
        htmlContent +
      '</body>' +
      '</html>';

    iframeDoc.write(fullHtml);
    iframeDoc.close();

    // Safe execution after assets settle
    function executePrint() {
      try {
        iframe.contentWindow.focus();
        iframe.contentWindow.print();
      } catch (err) {
        console.error('[Vetcare Print] Execution failed:', err);
        displayToast('प्रिंटिंग के दौरान त्रुटि आई।', 'error');
      } finally {
        Print.printingState = 'idle';
        // Cleanup iframe after print dialog dismissal
        setTimeout(function () {
          if (iframe && iframe.parentNode) {
            iframe.parentNode.removeChild(iframe);
          }
        }, 1500);
      }
    }

    if (iframe.contentWindow) {
      if (iframeDoc.readyState === 'complete') {
        setTimeout(executePrint, 250);
      } else {
        iframe.contentWindow.onload = function () {
          setTimeout(executePrint, 250);
        };
      }
    } else {
      setTimeout(executePrint, 500);
    }
  };

  Print.printElement = function (elementIdOrElement, options) {
    var el = typeof elementIdOrElement === 'string'
      ? document.getElementById(elementIdOrElement)
      : elementIdOrElement;

    if (!el) {
      displayToast('प्रिंट करने के लिए अवयव नहीं मिला।', 'error');
      return;
    }

    Print.printHtml(el.innerHTML, options);
  };

  // 3. PRE-BUILT CLINICAL & DAIRY TEMPLATES
  Print.generateA4PrescriptionHtml = function (rx) {
    var data = rx || {};
    var clinicName = escapeHtml(data.clinicName || 'पशु चिकित्सालय एवं अनुसंधान केंद्र (Veterinary Clinical Center)');
    var doctorName = escapeHtml(data.doctorName || 'डॉ. पशु चिकित्सक (Veterinary Surgeon)');
    var regNo = escapeHtml(data.regNo || 'VCI/STATE-98421');
    var doctorPhone = escapeHtml(data.doctorPhone || '+91 9876543210');
    var clinicAddress = escapeHtml(data.clinicAddress || 'मुख्य मार्ग, ब्लॉक/तहसील केंद्र, भारत');

    var patientName = escapeHtml(data.patientName || 'नंदिनी / टैग #402');
    var species = escapeHtml(data.species || 'गाय (Cattle)');
    var breed = escapeHtml(data.breed || 'गीर (Gir)');
    var age = escapeHtml(data.age || '4 वर्ष');
    var weight = escapeHtml(data.weight ? data.weight + ' kg' : '380 kg (शेफर सूत्र)');
    var sex = escapeHtml(data.sex || 'मादा (Female)');

    var ownerName = escapeHtml(data.ownerName || 'श्री रामेश्वर पाटीदार');
    var ownerPhone = escapeHtml(data.ownerPhone || '9826012345');
    var ownerVillage = escapeHtml(data.ownerVillage || 'ग्राम: रामपुर, जिला: इंदौर');
    var rxDate = escapeHtml(data.date || new Date().toLocaleDateString('hi-IN'));
    var caseNo = escapeHtml(data.caseNo || ('OPD-' + Date.now().toString().slice(-6)));

    var symptoms = escapeHtml(data.symptoms || 'तीव्र बुखार (104.5°F), सुस्ती, जुगाली बंद, नाक से स्राव, दूध उत्पादन में भारी गिरावट।');
    var diagnosis = escapeHtml(data.diagnosis || 'तीव्र श्वसन संक्रमण एवं गौ-मलेरिया (Suspected Bovine Respiratory/Theileriosis)');
    var isPregnant = Boolean(data.isPregnant);
    var pregnancyStage = escapeHtml(data.pregnancyStage || 'N/A');

    // Medicine Drugs Table Rows
    var drugs = Array.isArray(data.drugs) && data.drugs.length > 0 ? data.drugs : [
      { name: 'Inj. Ceftiofur Sodium 1g', dose: '1 Vial', route: 'IM', freq: 'OD', days: '3 दिन', remarks: 'गहरा मांसल इंजेक्शन' },
      { name: 'Inj. Meloxicam + Paracetamol (Melonex Plus)', dose: '15 ml', route: 'IM', freq: 'OD', days: '3 दिन', remarks: 'भोजनोपरांत' },
      { name: 'Bolus Biosacc / Rumicare', dose: '2 Bolus', route: 'Oral', freq: 'BD', days: '5 दिन', remarks: 'गुड़ के साथ दें (रुमेन गति हेतु)' }
    ];

    var drugRowsHtml = '';
    for (var i = 0; i < drugs.length; i++) {
      var d = drugs[i];
      drugRowsHtml +=
        '<tr>' +
          '<td class="text-center font-bold">' + (i + 1) + '</td>' +
          '<td><strong>' + escapeHtml(d.name) + '</strong><br><small style="color:#333;">' + escapeHtml(d.remarks || '') + '</small></td>' +
          '<td class="text-center">' + escapeHtml(d.dose) + '</td>' +
          '<td class="text-center">' + escapeHtml(d.route) + '</td>' +
          '<td class="text-center">' + escapeHtml(d.freq) + '</td>' +
          '<td class="text-center">' + escapeHtml(d.days) + '</td>' +
        '</tr>';
    }

    var cautionBanner = isPregnant
      ? '<div class="warning-banner" style="border-color:#b91c1c; color:#991b1b; background:#fef2f2 !important;">' +
          '⚠️ गर्भावस्था अलर्ट: पशु ' + pregnancyStage + ' गाभिन है। सभी गर्भपात-कारक (Steroids/Enrofloxacin) दवाइयां पूर्णतः वर्जित हैं। सुरक्षित औषधियां दी गई हैं।' +
        '</div>' +
        '<div style="font-size:12px; margin-bottom: 8px;"><strong>गर्भ परीक्षण स्थिति:</strong> प्रमाणित गाभिन (Pregnant)</div>'
      : '<div style="font-size:12px; margin-bottom: 8px;"><strong>गर्भ परीक्षण स्थिति:</strong> गैर-गाभिन / सामान्य (Non-Pregnant)</div>';

    return (
      '<div class="rx-header">' +
        '<table class="no-border">' +
          '<tr>' +
            '<td style="width: 70%;">' +
              '<h2 style="margin: 0; font-size: 20px; text-transform: uppercase;">' + clinicName + '</h2>' +
              '<div style="font-size: 14px; font-weight: bold; margin-top: 4px;">' + doctorName + '</div>' +
              '<div style="font-size: 12px; color: #333;">पंजीकरण संख्या (Reg No.): ' + regNo + ' | मो.: ' + doctorPhone + '</div>' +
              '<div style="font-size: 11px; color: #444;">' + clinicAddress + '</div>' +
            '</td>' +
            '<td style="width: 30%; text-align: right; vertical-align: top;">' +
              '<div style="font-size: 12px;"><strong>केस क्रमांक:</strong> ' + caseNo + '</div>' +
              '<div style="font-size: 12px;"><strong>दिनांक:</strong> ' + rxDate + '</div>' +
              '<div style="margin-top: 8px; font-size: 11px; border: 1px dashed #000; padding: 4px; display: inline-block;">' +
                'Vetcare AI OS Verified' +
              '</div>' +
            '</td>' +
          '</tr>' +
        '</table>' +
      '</div>' +

      '<table style="margin-bottom: 12px; background: #fafafa;">' +
        '<tr>' +
          '<td style="width: 25%;"><strong>पशुपालक:</strong> ' + ownerName + '</td>' +
          '<td style="width: 25%;"><strong>मोबाइल:</strong> ' + ownerPhone + '</td>' +
          '<td style="width: 50%;" colspan="2"><strong>पता / ग्राम:</strong> ' + ownerVillage + '</td>' +
        '</tr>' +
        '<tr>' +
          '<td><strong>पशु / पहचान:</strong> ' + patientName + ' (' + species + ')</td>' +
          '<td><strong>नस्ल / लिंग:</strong> ' + breed + ' / ' + sex + '</td>' +
          '<td><strong>आयु:</strong> ' + age + '</td>' +
          '<td><strong>अनुमानित वजन:</strong> ' + weight + '</td>' +
        '</tr>' +
      '</table>' +

      '<div style="margin-bottom: 8px; font-size: 12px;">' +
        '<strong>लक्षण एवं क्लिनिकल अवलोकन:</strong> ' + symptoms +
      '</div>' +

      '<div style="margin-bottom: 10px; font-size: 12px;">' +
        '<strong>संभावित निदान (Differential Diagnosis):</strong> ' + diagnosis +
      '</div>' +

      cautionBanner +

      '<div style="display: flex; align-items: center; gap: 8px; margin: 12px 0 6px;">' +
        '<span class="rx-symbol">&#8478;</span>' +
        '<span style="font-size: 14px; font-weight: bold; text-decoration: underline;">उपचार एवं औषधि पर्चा (Prescription)</span>' +
      '</div>' +

      '<table style="margin-bottom: 16px;">' +
        '<thead>' +
          '<tr>' +
            '<th style="width: 6%;">क्र.</th>' +
            '<th style="width: 44%;">औषधि का नाम (Brand / Generic)</th>' +
            '<th style="width: 12%;">खुराक (Dose)</th>' +
            '<th style="width: 12%;">मार्ग (Route)</th>' +
            '<th style="width: 12%;">आवृत्ति</th>' +
            '<th style="width: 14%;">अवधि</th>' +
          '</tr>' +
        '</thead>' +
        '<tbody>' +
          drugRowsHtml +
        '</tbody>' +
      '</table>' +

      '<div style="margin-top: 10px; font-size: 11px; color: #333; line-height: 1.4;">' +
        '<strong>विशेष निर्देश:</strong> स्वच्छ एवं ताजा पानी पर्याप्त मात्रा में पिलाएं। दवा का पूरा कोर्स समाप्त करें। स्थिति में सुधार न होने पर तुरंत पुनः संपर्क करें।' +
      '</div>' +

      '<div style="margin-top: 40px; display: flex; justify-content: space-between; align-items: flex-end;">' +
        '<div style="font-size: 11px;">' +
          'फॉलो-अप तारीख: <strong>3 दिन बाद</strong><br>' +
          'आपातकालीन हेल्पलाइन: 1962 / +91 ' + doctorPhone +
        '</div>' +
        '<div class="signature-box">' +
          '<strong>' + doctorName + '</strong><br>' +
          '<span style="font-size: 11px;">हस्ताक्षर एवं सील (Veterinary Officer)</span>' +
        '</div>' +
      '</div>'
    );
  };

  Print.generateThermalReceiptHtml = function (receipt, width) {
    var data = receipt || {};
    var is58mm = width === '58mm';
    var clinic = escapeHtml(data.clinicName || 'वेटकेयर पशु चिकित्सा केंद्र');
    var tokenNo = escapeHtml(data.tokenNo || 'T-42');
    var dateStr = escapeHtml(data.date || new Date().toLocaleString('hi-IN'));
    var farmer = escapeHtml(data.farmerName || 'श्री सोहन सिंह');
    var species = escapeHtml(data.species || 'गाय (Cross HF)');
    var diagnosis = escapeHtml(data.diagnosis || 'अफरा / टिम्पनी (Bloat)');
    var fee = escapeHtml(data.fee || '₹ 150.00');

    var items = Array.isArray(data.items) ? data.items : [
      { name: 'परामर्श शुल्क (OPD)', price: '₹ 50.00' },
      { name: 'इंजे. एवं प्राथमिक दवा', price: '₹ 100.00' }
    ];

    var itemRows = '';
    for (var i = 0; i < items.length; i++) {
      itemRows +=
        '<tr>' +
          '<td>' + escapeHtml(items[i].name) + '</td>' +
          '<td class="text-right">' + escapeHtml(items[i].price) + '</td>' +
        '</tr>';
    }

    return (
      '<div class="thermal-header">' + clinic + '</div>' +
      '<div class="text-center" style="font-size:' + (is58mm ? '10px' : '11px') + ';">पशु स्वास्थ्य एवं ओपीडी रसीद</div>' +
      '<div class="thermal-divider"></div>' +
      '<div><strong>टोकन सं.: ' + tokenNo + '</strong></div>' +
      '<div>दिनांक: ' + dateStr + '</div>' +
      '<div>किसान: ' + farmer + '</div>' +
      '<div>पशु: ' + species + '</div>' +
      '<div>निदान: ' + diagnosis + '</div>' +
      '<div class="thermal-divider"></div>' +
      '<table>' +
        '<thead>' +
          '<tr><th>विवरण</th><th class="text-right">राशि</th></tr>' +
        '</thead>' +
        '<tbody>' +
          itemRows +
        '</tbody>' +
      '</table>' +
      '<div class="thermal-divider"></div>' +
      '<div style="display:flex; justify-content:space-between; font-weight:bold; font-size:' + (is58mm ? '12px' : '13px') + ';">' +
        '<span>कुल भुगतान:</span>' +
        '<span>' + fee + '</span>' +
      '</div>' +
      '<div class="thermal-divider"></div>' +
      '<div class="text-center" style="font-size:10px; margin-top:6px;">' +
        'पशु स्वास्थ्य ही किसान की समृद्धि है।<br>' +
        'धन्यवाद! पुनः पधारें।' +
      '</div>'
    );
  };

  Print.generateMilkSlipHtml = function (slip) {
    var data = slip || {};
    var dairyName = escapeHtml(data.dairyName || 'वेटकेयर किसान दुग्ध उत्पादक सहकारी समिति');
    var farmerName = escapeHtml(data.farmerName || 'श्री जगदीश पाटीदार');
    var memberCode = escapeHtml(data.memberCode || 'M-108');
    var dateStr = escapeHtml(data.date || new Date().toLocaleDateString('hi-IN'));
    var shift = escapeHtml(data.shift || 'सुबह (Morning)');
    var milkType = escapeHtml(data.milkType || 'भैंस (Buffalo)');

    var qtyLiters = parseFloat(data.quantity || 12.5).toFixed(2);
    var fat = parseFloat(data.fat || 6.8).toFixed(1);
    var snf = parseFloat(data.snf || 8.9).toFixed(1);
    var ratePerLiter = parseFloat(data.rate || 54.40).toFixed(2);
    var totalAmount = (qtyLiters * ratePerLiter).toFixed(2);

    return (
      '<div style="text-align: center; border-bottom: 1px dashed #000; padding-bottom: 4px; margin-bottom: 6px;">' +
        '<strong style="font-size: 14px;">' + dairyName + '</strong><br>' +
        '<span style="font-size: 11px;">दैनिक दुग्ध संकलन पर्ची (Milk Collection Slip)</span>' +
      '</div>' +
      '<table class="no-border" style="font-size: 11px; margin-bottom: 6px;">' +
        '<tr>' +
          '<td><strong>सदस्य कोड:</strong> ' + memberCode + '</td>' +
          '<td class="text-right"><strong>दिनांक:</strong> ' + dateStr + '</td>' +
        '</tr>' +
        '<tr>' +
          '<td><strong>किसान:</strong> ' + farmerName + '</td>' +
          '<td class="text-right"><strong>पाली:</strong> ' + shift + '</td>' +
        '</tr>' +
        '<tr>' +
          '<td colspan="2"><strong>दुग्ध प्रकार:</strong> ' + milkType + '</td>' +
        '</tr>' +
      '</table>' +
      '<table style="font-size: 11px; text-align: center; margin-bottom: 6px;">' +
        '<thead>' +
          '<tr>' +
            '<th>मात्रा (Ltr)</th>' +
            '<th>FAT %</th>' +
            '<th>SNF %</th>' +
            '<th>दर (₹/Ltr)</th>' +
          '</tr>' +
        '</thead>' +
        '<tbody>' +
          '<tr>' +
            '<td class="font-bold">' + qtyLiters + '</td>' +
            '<td>' + fat + '%</td>' +
            '<td>' + snf + '%</td>' +
            '<td>₹ ' + ratePerLiter + '</td>' +
          '</tr>' +
        '</tbody>' +
      '</table>' +
      '<div style="display: flex; justify-content: space-between; border-top: 1px dashed #000; border-bottom: 1px dashed #000; padding: 6px 0; font-size: 13px; font-weight: bold;">' +
        '<span>कुल देय राशि:</span>' +
        '<span>₹ ' + totalAmount + '</span>' +
      '</div>' +
      '<div style="margin-top: 20px; display: flex; justify-content: space-between; font-size: 10px;">' +
        '<span>जांचकर्ता हस्ताक्षर</span>' +
        '<span>समिति सील</span>' +
      '</div>'
    );
  };

  // 4. PRINT CONFIGURATION
  Print.setPaperSize = function (size) {
    if (VALID_PAPER_SIZES.indexOf(size) === -1) {
      console.warn('[Vetcare Print] Unsupported paper size:', size);
      return false;
    }
    Print.defaultPaperSize = size;
    safeStorageSet(STORAGE_PAPER_SIZE_KEY, size);
    displayToast("प्रिंटर पेपर साइज़ बदलकर '" + size + "' कर दिया गया।", 'info');
    return true;
  };

  // 5. AUTOMATIC INITIALIZATION
  function bootstrapPrintEngine() {
    var storedSize = safeStorageGet(STORAGE_PAPER_SIZE_KEY);
    if (storedSize && VALID_PAPER_SIZES.indexOf(storedSize) !== -1) {
      Print.defaultPaperSize = storedSize;
    }

    // Bind automated print button triggers across UI
    document.addEventListener('click', function (e) {
      // 1. Rx Print Button [data-print-rx]
      var rxBtn = e.target.closest ? e.target.closest('[data-print-rx]') : null;
      if (rxBtn) {
        e.preventDefault();
        var rxDataJson = rxBtn.getAttribute('data-prescription-payload');
        var rxData = null;
        if (rxDataJson) {
          try { rxData = JSON.parse(rxDataJson); } catch (err) {}
        }
        var html = Print.generateA4PrescriptionHtml(rxData);
        Print.printHtml(html, { paperSize: 'A4', title: 'Prescription Pad' });
        return;
      }

      // 2. Receipt Print Button [data-print-receipt]
      var receiptBtn = e.target.closest ? e.target.closest('[data-print-receipt]') : null;
      if (receiptBtn) {
        e.preventDefault();
        var receiptDataJson = receiptBtn.getAttribute('data-receipt-payload');
        var receiptData = null;
        if (receiptDataJson) {
          try { receiptData = JSON.parse(receiptDataJson); } catch (err) {}
        }
        var targetWidth = receiptBtn.getAttribute('data-receipt-width') || '80mm';
        var thermalHtml = Print.generateThermalReceiptHtml(receiptData, targetWidth);
        Print.printHtml(thermalHtml, { paperSize: targetWidth === '58mm' ? 'thermal-58mm' : 'thermal-80mm', title: 'Receipt' });
        return;
      }

      // 3. Milk Slip Print Button [data-print-slip]
      var slipBtn = e.target.closest ? e.target.closest('[data-print-slip]') : null;
      if (slipBtn) {
        e.preventDefault();
        var slipDataJson = slipBtn.getAttribute('data-slip-payload');
        var slipData = null;
        if (slipDataJson) {
          try { slipData = JSON.parse(slipDataJson); } catch (err) {}
        }
        var slipHtml = Print.generateMilkSlipHtml(slipData);
        Print.printHtml(slipHtml, { paperSize: 'thermal-80mm', title: 'Milk Slip' });
        return;
      }

      // 4. Generic Element Print Trigger [data-print-element]
      var elBtn = e.target.closest ? e.target.closest('[data-print-element]') : null;
      if (elBtn) {
        e.preventDefault();
        var targetElId = elBtn.getAttribute('data-print-element');
        if (targetElId) {
          Print.printElement(targetElId);
        }
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrapPrintEngine);
  } else {
    bootstrapPrintEngine();
  }

})(window, document);
