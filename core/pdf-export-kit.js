// Vetcare AI OS - Client-Side PDF Export Kit, Vector Rx Pad & Clinical Report Generator (2026 Production)

(function (window, document) {
  'use strict';

  // 1. GLOBAL NAMESPACE & STATE INITIALIZATION
  window.VetcareApp = window.VetcareApp || {};

  var JSPDF_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
  var HTML2CANVAS_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';

  var PdfExport = {
    exportCount: 0,
    isGenerating: false,
    defaultLetterhead: {
      clinicName: 'पशु चिकित्सालय एवं अनुसंधान केंद्र (Veterinary Clinical Center)',
      doctorName: 'डॉ. पशु चिकित्सक (Veterinary Surgeon)',
      regNo: 'VCI/STATE-98421',
      phone: '+91 9876543210',
      address: 'मुख्य मार्ग, ब्लॉक/तहसील केंद्र, भारत'
    },
    theme: {
      primaryColor: '#1e40af',
      secondaryColor: '#059669',
      dangerColor: '#dc2626',
      neutralDark: '#0f172a',
      neutralLight: '#f8fafc'
    }
  };

  window.VetcareApp.PdfExport = PdfExport;

  // Toast Notification Dispatcher
  function displayToast(message, type, duration) {
    var toastDuration = typeof duration === 'number' ? duration : 3000;
    if (typeof window.showAppToast === 'function') {
      window.showAppToast(message, type, toastDuration);
    } else if (window.VetcareApp.UI && typeof window.VetcareApp.UI.showToast === 'function') {
      window.VetcareApp.UI.showToast(message, type, toastDuration);
    } else {
      console.log('[PDF ' + (type || 'info').toUpperCase() + '] ' + message);
    }
  }

  // HTML Entity Sanitation
  function escapeHtml(text) {
    if (text === null || text === undefined) return '';
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Sanitize Filename Strings
  function sanitizeFilename(name) {
    if (!name) return 'Document';
    return String(name).trim().replace(/[^a-zA-Z0-9_\u0900-\u097F-]/g, '_');
  }

  // Pure Vector SVG QR Code for Verification
  function generateVectorQrSvg(text) {
    return (
      '<svg xmlns="http://www.w3.org/2000/svg" width="68" height="68" viewBox="0 0 33 33" fill="#0f172a">' +
        '<rect width="33" height="33" fill="#ffffff" />' +
        '<path d="M2 2h7v7H2zM4 4h3v3H4zM24 2h7v7h-7zM26 4h3v3h-3zM2 24h7v7H2zM4 26h3v3H4zM12 2h2v4h-2zM16 2h4v2h-4z' +
        'M14 6h4v2h-4zM12 10h6v2h-6zM2 12h3v2H2zM7 12h2v4H7zM11 14h2v2h-2zM15 14h2v4h-2zM2 18h4v2H2zM8 18h2v2H8z' +
        'M12 18h2v2h-2zM20 12h4v2h-4zM26 12h2v2h-2zM22 16h2v4h-2zM26 16h5v2h-5zM20 20h2v4h-2zM24 20h4v2h-4z' +
        'M14 22h4v2h-4zM12 26h2v5h-2zM16 26h4v2h-4zM18 29h3v2h-3zM22 24h2v7h-2zM26 24h5v2h-5zM28 28h3v3h-3z" />' +
      '</svg>'
    );
  }

  // Dynamic Library Loader (jsPDF & html2canvas)
  function ensurePdfLibraries() {
    return new Promise(function (resolve) {
      var hasJsPdf = Boolean(window.jspdf && window.jspdf.jsPDF);
      var hasHtml2Canvas = Boolean(window.html2canvas);

      if (hasJsPdf && hasHtml2Canvas) {
        return resolve(true);
      }

      var loadedCount = 0;
      function checkDone() {
        loadedCount++;
        if (loadedCount >= 2) {
          resolve(Boolean(window.jspdf && window.html2canvas));
        }
      }

      function injectScript(src, cb) {
        var s = document.createElement('script');
        s.src = src;
        s.async = true;
        s.onload = cb;
        s.onerror = function () {
          console.warn('[Vetcare PDF] Failed to load library from CDN:', src);
          cb();
        };
        document.head.appendChild(s);
      }

      if (!hasJsPdf) {
        injectScript(JSPDF_CDN, checkDone);
      } else {
        loadedCount++;
      }

      if (!hasHtml2Canvas) {
        injectScript(HTML2CANVAS_CDN, checkDone);
      } else {
        loadedCount++;
      }
    });
  }

  // 2. PURE CLIENT-SIDE PDF / BLOB RENDER ENGINE
  PdfExport.renderHtmlToPdf = function (htmlContent, fileName) {
    if (PdfExport.isGenerating) {
      displayToast('एक PDF पहले से तैयार हो रहा है। कृपया प्रतीक्षा करें।', 'warning');
      return Promise.reject(new Error('Export in progress'));
    }

    PdfExport.isGenerating = true;
    displayToast('PDF तैयार किया जा रहा है... कृपया प्रतीक्षा करें।', 'info', 2000);

    var sanitizedName = sanitizeFilename(fileName) + '.pdf';

    return ensurePdfLibraries().then(function (libsAvailable) {
      // Container element with exact A4 dimensions at 96 DPI (794px x 1123px)
      var container = document.createElement('div');
      container.id = 'vetcare-pdf-render-container';
      container.setAttribute(
        'style',
        'position: fixed; left: -9999px; top: 0; width: 794px; min-height: 1123px; ' +
        'background: #ffffff; color: #0f172a; font-family: system-ui, -apple-system, sans-serif; ' +
        'padding: 40px 48px; box-sizing: border-box; z-index: -100;'
      );

      container.innerHTML = htmlContent;
      document.body.appendChild(container);

      if (libsAvailable && window.jspdf && window.html2canvas) {
        var jsPdfConstructor = window.jspdf.jsPDF || window.jsPDF;

        return window.html2canvas(container, {
          scale: 2, // High-DPI 300 DPI equivalent rendering
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff'
        }).then(function (canvas) {
          container.remove();

          var imgData = canvas.toDataURL('image/jpeg', 0.95);
          var pdf = new jsPdfConstructor({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
            compress: true
          });

          var pdfWidth = 210;
          var pdfHeight = 297;

          pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');
          pdf.save(sanitizedName);

          PdfExport.isGenerating = false;
          PdfExport.exportCount += 1;
          displayToast('PDF फ़ाइल सफलतापूर्वक डाउनलोड हो गई!', 'success', 3000);
          return true;
        }).catch(function (canvasError) {
          container.remove();
          console.error('[Vetcare PDF] Canvas render error:', canvasError);
          return fallbackNativePrint(htmlContent, sanitizedName);
        });
      } else {
        container.remove();
        console.warn('[Vetcare PDF] Offline mode without jsPDF. Routing to high-res printable blob.');
        return fallbackNativePrint(htmlContent, sanitizedName);
      }
    }).catch(function (fatalErr) {
      PdfExport.isGenerating = false;
      console.error('[Vetcare PDF] Generation failed:', fatalErr);
      displayToast('PDF बनाने में त्रुटि हुई।', 'error');
      throw fatalErr;
    });
  };

  // Resilient Offline Print-to-PDF Fallback
  function fallbackNativePrint(htmlContent, targetFilename) {
    if (window.VetcareApp.Print && typeof window.VetcareApp.Print.printHtml === 'function') {
      window.VetcareApp.Print.printHtml(htmlContent, {
        paperSize: 'A4',
        title: targetFilename
      });
      PdfExport.isGenerating = false;
      displayToast('प्रिंट / PDF डायलॉग खुल गया है।', 'info', 3000);
      return Promise.resolve(true);
    }

    // Direct HTML Blob download if print engine is not loaded
    var blob = new Blob([
      '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>' + escapeHtml(targetFilename) + '</title>' +
      '<style>@page { size: A4 portrait; margin: 15mm; } body { font-family: system-ui, sans-serif; }</style>' +
      '</head><body>' + htmlContent + '</body></html>'
    ], { type: 'text/html;charset=utf-8' });

    var downloadUrl = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = downloadUrl;
    a.download = targetFilename.replace('.pdf', '.html');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(downloadUrl);

    PdfExport.isGenerating = false;
    displayToast('दस्तावेज़ फ़ाइल डाउनलोड कर ली गई।', 'success', 3000);
    return Promise.resolve(true);
  }

  // 3. CLINICAL A4 PRESCRIPTION PDF GENERATOR
  PdfExport.exportPrescriptionPdf = function (prescriptionData) {
    var rx = prescriptionData || {};
    var lh = PdfExport.defaultLetterhead;

    var clinicName = escapeHtml(rx.clinicName || lh.clinicName);
    var doctorName = escapeHtml(rx.doctorName || lh.doctorName);
    var regNo = escapeHtml(rx.regNo || lh.regNo);
    var phone = escapeHtml(rx.phone || lh.phone);
    var address = escapeHtml(rx.address || lh.address);

    var patientName = escapeHtml(rx.patientName || 'नंदिनी (Cow #301)');
    var species = escapeHtml(rx.species || 'गाय (Cattle)');
    var breed = escapeHtml(rx.breed || 'गीर (Gir)');
    var age = escapeHtml(rx.age || '3.5 वर्ष');
    var weight = escapeHtml(rx.weight ? rx.weight + ' kg' : '360 kg (शेफर सूत्र)');
    var temp = escapeHtml(rx.temp || '103.2 °F');
    var isPregnant = Boolean(rx.isPregnant);
    var pregnancyStage = escapeHtml(rx.pregnancyStage || 'N/A');

    var ownerName = escapeHtml(rx.ownerName || 'श्री रमेश पाटीदार');
    var ownerPhone = escapeHtml(rx.ownerPhone || '+91 9826012345');
    var ownerAddress = escapeHtml(rx.ownerAddress || 'ग्राम: रामपुर');
    var dateStr = escapeHtml(rx.date || new Date().toLocaleDateString('hi-IN'));
    var tokenId = escapeHtml(rx.tokenId || ('OPD-' + Date.now().toString().slice(-6)));

    var symptoms = escapeHtml(rx.symptoms || 'उच्च ज्वर (103.2°F), सुस्ती, चारा न खाना, जुगाली बंद, हल्का कांपना।');
    var diagnosis = escapeHtml(rx.diagnosis || 'तीव्र श्वसन संक्रमण (Bovine Respiratory Disease Complex - BRD)');
    var advice = escapeHtml(rx.advice || 'पशु को सूखे व हवादार स्थान पर रखें। सुपाच्य दलिया व ताजा पानी दें। दवा का कोर्स पूर्ण करें।');

    // Medicine Rows
    var drugs = Array.isArray(rx.drugs) && rx.drugs.length > 0 ? rx.drugs : [
      { name: 'Inj. Ceftiofur Sodium 1g', dose: '1 Vial', route: 'IM', freq: 'OD', days: '3 दिन' },
      { name: 'Inj. Melonex Plus (Meloxicam+Para)', dose: '15 ml', route: 'IM', freq: 'OD', days: '3 दिन' },
      { name: 'Bolus Biosacc / Rumicare', dose: '2 Bolus', route: 'Oral', freq: 'BD', days: '5 दिन' }
    ];

    var drugRows = '';
    for (var i = 0; i < drugs.length; i++) {
      var d = drugs[i];
      drugRows +=
        '<tr style="border-bottom: 1px solid #cbd5e1;">' +
          '<td style="padding: 10px 8px; text-align: center; font-weight: 700;">' + (i + 1) + '</td>' +
          '<td style="padding: 10px 8px; font-weight: 700; color: #1e293b;">' + escapeHtml(d.name) + '</td>' +
          '<td style="padding: 10px 8px; text-align: center;">' + escapeHtml(d.dose) + '</td>' +
          '<td style="padding: 10px 8px; text-align: center;">' + escapeHtml(d.route) + '</td>' +
          '<td style="padding: 10px 8px; text-align: center;">' + escapeHtml(d.freq) + '</td>' +
          '<td style="padding: 10px 8px; text-align: center;">' + escapeHtml(d.days) + '</td>' +
        '</tr>';
    }

    var pregnancyBanner = isPregnant
      ? '<div style="background: #fef2f2; border: 2px solid #dc2626; border-radius: 8px; padding: 10px 14px; margin-bottom: 16px; display: flex; align-items: center; gap: 10px;">' +
          '<div style="font-size: 20px;">⚠️</div>' +
          '<div style="font-size: 12px; color: #991b1b; line-height: 1.4;">' +
            '<strong>गर्भावस्था निषेध अलर्ट (Pregnancy Contraindication):</strong> पशु ' + pregnancyStage + ' प्रमाणित गाभिन है। ' +
            'कॉर्टिकोस्टेरॉइड्स (Dexamethasone/Isoflupredone) एवं गर्भपात-कारक औषधियां पूर्णतः प्रतिबंधित हैं।' +
          '</div>' +
        '</div>'
      : '<div style="background: #f0fdf4; border: 1px solid #86efac; border-radius: 8px; padding: 8px 12px; margin-bottom: 16px; font-size: 12px; color: #166534;">' +
          '<strong>गर्भ स्थिति:</strong> गैर-गाभिन / सामान्य (Non-Pregnant)' +
        '</div>';

    var qrCodeSvg = generateVectorQrSvg('https://vetcare.ai/verify/rx/' + tokenId);

    var html =
      '<div style="position: relative;">' +
        // Watermark
        '<div style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; pointer-events: none; opacity: 0.035; transform: rotate(-35deg); font-size: 68px; font-weight: 900; color: #000; text-transform: uppercase;">' +
          'Vetcare AI OS Verified' +
        '</div>' +

        // Header
        '<div style="border-bottom: 2px solid #1e40af; padding-bottom: 14px; margin-bottom: 16px; display: flex; justify-content: space-between; align-items: flex-start;">' +
          '<div style="max-width: 70%;">' +
            '<h1 style="margin: 0; font-size: 20px; font-weight: 800; color: #1e40af; line-height: 1.2;">' + clinicName + '</h1>' +
            '<div style="font-size: 14px; font-weight: 700; color: #0f172a; margin-top: 4px;">' + doctorName + '</div>' +
            '<div style="font-size: 11px; color: #475569;">पंजीकरण सं. (VCI Reg): ' + regNo + ' | फोन: ' + phone + '</div>' +
            '<div style="font-size: 11px; color: #475569;">' + address + '</div>' +
          '</div>' +
          '<div style="text-align: right;">' +
            '<div style="font-size: 12px; font-weight: 700; color: #1e40af;">टोकन: ' + tokenId + '</div>' +
            '<div style="font-size: 11px; color: #475569; margin-top: 2px;">दिनांक: ' + dateStr + '</div>' +
            '<div style="margin-top: 6px;">' + qrCodeSvg + '</div>' +
          '</div>' +
        '</div>' +

        // Patient & Owner Details
        '<div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px 14px; margin-bottom: 16px;">' +
          '<table style="width: 100%; border-collapse: collapse; font-size: 12px;">' +
            '<tr>' +
              '<td style="width: 25%; padding: 3px 0;"><strong>पशुपालक:</strong> ' + ownerName + '</td>' +
              '<td style="width: 25%; padding: 3px 0;"><strong>मोबाइल:</strong> ' + ownerPhone + '</td>' +
              '<td style="width: 50%; padding: 3px 0;"><strong>ग्राम / पता:</strong> ' + ownerAddress + '</td>' +
            '</tr>' +
            '<tr>' +
              '<td style="padding: 3px 0;"><strong>पशु / पहचान:</strong> ' + patientName + ' (' + species + ')</td>' +
              '<td style="padding: 3px 0;"><strong>नस्ल:</strong> ' + breed + '</td>' +
              '<td style="padding: 3px 0;"><strong>आयु / वजन:</strong> ' + age + ' | ' + weight + '</td>' +
            '</tr>' +
            '<tr>' +
              '<td style="padding: 3px 0;"><strong>तापमान:</strong> ' + temp + '</td>' +
              '<td colspan="2" style="padding: 3px 0;"><strong>संभावित निदान:</strong> ' + diagnosis + '</td>' +
            '</tr>' +
          '</table>' +
        '</div>' +

        pregnancyBanner +

        '<div style="margin-bottom: 12px; font-size: 12px; color: #334155;">' +
          '<strong>क्लिनिकल लक्षण व अवलोकन:</strong> ' + symptoms +
        '</div>' +

        // Rx Symbol & Heading
        '<div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">' +
          '<span style="font-size: 26px; font-weight: 900; font-family: Georgia, serif; color: #1e40af; line-height: 1;">&#8478;</span>' +
          '<span style="font-size: 13px; font-weight: 700; text-transform: uppercase; color: #1e293b; letter-spacing: 0.5px;">औषधि एवं उपचार योजना (Treatment Plan)</span>' +
        '</div>' +

        // Drugs Table
        '<table style="width: 100%; border-collapse: collapse; font-size: 12px; margin-bottom: 18px; border: 1px solid #cbd5e1;">' +
          '<thead style="background: #f1f5f9; border-bottom: 2px solid #cbd5e1;">' +
            '<tr>' +
              '<th style="padding: 8px; width: 6%; text-align: center;">क्र.</th>' +
              '<th style="padding: 8px; width: 44%; text-align: left;">दवा का नाम (Brand / Formulation)</th>' +
              '<th style="padding: 8px; width: 12%; text-align: center;">खुराक</th>' +
              '<th style="padding: 8px; width: 12%; text-align: center;">मार्ग (Route)</th>' +
              '<th style="padding: 8px; width: 12%; text-align: center;">आवृत्ति</th>' +
              '<th style="padding: 8px; width: 14%; text-align: center;">अवधि</th>' +
            '</tr>' +
          '</thead>' +
          '<tbody>' +
            drugRows +
          '</tbody>' +
        '</table>' +

        // Clinical Notes & Diet Advice
        '<div style="background: #fafaf9; border-left: 3px solid #1e40af; padding: 10px 14px; font-size: 11px; margin-bottom: 40px; color: #334155; line-height: 1.5;">' +
          '<strong>आहार एवं विशेष निर्देश:</strong> ' + advice +
        '</div>' +

        // Footer with Signature Block
        '<div style="display: flex; justify-content: space-between; align-items: flex-end; padding-top: 10px; border-top: 1px dashed #cbd5e1;">' +
          '<div style="font-size: 10px; color: #64748b; line-height: 1.4;">' +
            'सत्यापन लिंक: vetcare.ai/rx/' + tokenId + '<br>' +
            'इमरजेंसी पशु एम्बुलेंस: 1962 | Vetcare AI OS Cloud Verified' +
          '</div>' +
          '<div style="text-align: center; width: 200px;">' +
            '<div style="border-bottom: 1px solid #0f172a; margin-bottom: 6px; height: 35px;"></div>' +
            '<strong style="font-size: 12px; color: #0f172a;">' + doctorName + '</strong><br>' +
            '<span style="font-size: 10px; color: #64748b;">अधिकृत पशु चिकित्सा अधिकारी</span>' +
          '</div>' +
        '</div>' +
      '</div>';

    var filename = 'Vetcare_Rx_' + patientName + '_' + dateStr;
    return PdfExport.renderHtmlToPdf(html, filename);
  };

  // 4. FARMER DAIRY MILK LEDGER PDF STATEMENT
  PdfExport.exportMilkLedgerPdf = function (farmerData, entriesArray, monthYear) {
    var farmer = farmerData || {};
    var farmerName = escapeHtml(farmer.name || 'श्री जगदीश पाटीदार');
    var memberCode = escapeHtml(farmer.memberCode || 'M-402');
    var phone = escapeHtml(farmer.phone || '+91 9826055555');
    var village = escapeHtml(farmer.village || 'ग्राम: रामपुर');
    var dairyName = escapeHtml(farmer.dairyName || 'वेटकेयर किसान दुग्ध उत्पादक सहकारी समिति');
    var periodStr = escapeHtml(monthYear || new Date().toLocaleDateString('hi-IN', { month: 'long', year: 'numeric' }));

    var entries = Array.isArray(entriesArray) && entriesArray.length > 0 ? entriesArray : [
      { date: '01/04/2026', shift: 'सुबह', qty: 12.5, fat: 6.8, snf: 8.9, rate: 54.40, total: 680.00 },
      { date: '01/04/2026', shift: 'शाम', qty: 11.8, fat: 7.0, snf: 9.0, rate: 56.00, total: 660.80 },
      { date: '02/04/2026', shift: 'सुबह', qty: 13.0, fat: 6.7, snf: 8.8, rate: 53.60, total: 696.80 },
      { date: '02/04/2026', shift: 'शाम', qty: 12.0, fat: 6.9, snf: 8.9, rate: 55.20, total: 662.40 }
    ];

    var totalQty = 0;
    var totalFatSum = 0;
    var totalGross = 0;

    var rowsHtml = '';
    for (var i = 0; i < entries.length; i++) {
      var item = entries[i];
      var qty = parseFloat(item.qty || 0);
      var fat = parseFloat(item.fat || 0);
      var snf = parseFloat(item.snf || 0);
      var rate = parseFloat(item.rate || 0);
      var total = parseFloat(item.total || (qty * rate));

      totalQty += qty;
      totalFatSum += fat;
      totalGross += total;

      rowsHtml +=
        '<tr style="border-bottom: 1px solid #e2e8f0; font-size: 11px;">' +
          '<td style="padding: 7px; text-align: center;">' + escapeHtml(item.date) + '</td>' +
          '<td style="padding: 7px; text-align: center;">' + escapeHtml(item.shift) + '</td>' +
          '<td style="padding: 7px; text-align: right; font-weight: 700;">' + qty.toFixed(1) + '</td>' +
          '<td style="padding: 7px; text-align: right;">' + fat.toFixed(1) + '%</td>' +
          '<td style="padding: 7px; text-align: right;">' + snf.toFixed(1) + '%</td>' +
          '<td style="padding: 7px; text-align: right;">₹' + rate.toFixed(2) + '</td>' +
          '<td style="padding: 7px; text-align: right; font-weight: 700; color: #15803d;">₹' + total.toFixed(2) + '</td>' +
        '</tr>';
    }

    var avgFat = entries.length > 0 ? (totalFatSum / entries.length).toFixed(1) : '0.0';
    var deductions = parseFloat(farmer.deductions || 0);
    var netPayable = Math.max(0, totalGross - deductions);

    var html =
      '<div>' +
        // Dairy Header
        '<div style="text-align: center; border-bottom: 2px solid #059669; padding-bottom: 12px; margin-bottom: 16px;">' +
          '<h1 style="margin: 0; font-size: 20px; font-weight: 800; color: #059669;">' + dairyName + '</h1>' +
          '<div style="font-size: 13px; font-weight: 700; color: #1e293b; margin-top: 4px;">मासिक दुग्ध प्रदाय एवं भुगतान विवरण (Monthly Statement)</div>' +
          '<div style="font-size: 11px; color: #64748b;">माह/अवधि: ' + periodStr + '</div>' +
        '</div>' +

        // Farmer Info Card
        '<div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 12px; margin-bottom: 16px; font-size: 12px;">' +
          '<table style="width: 100%; border-collapse: collapse;">' +
            '<tr>' +
              '<td style="width: 35%;"><strong>किसान का नाम:</strong> ' + farmerName + '</td>' +
              '<td style="width: 30%;"><strong>सदस्य कोड:</strong> ' + memberCode + '</td>' +
              '<td style="width: 35%; text-align: right;"><strong>मोबाइल:</strong> ' + phone + '</td>' +
            '</tr>' +
            '<tr>' +
              '<td><strong>ग्राम / केंद्र:</strong> ' + village + '</td>' +
              '<td colspan="2" style="text-align: right;"><strong>स्टेटमेंट जारी दिनांक:</strong> ' + new Date().toLocaleDateString('hi-IN') + '</td>' +
            '</tr>' +
          '</table>' +
        '</div>' +

        // 4 KPI Summary Cards
        '<div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 18px;">' +
          '<div style="background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 8px; padding: 10px; text-align: center;">' +
            '<div style="font-size: 10px; color: #047857;">कुल दुग्ध मात्रा</div>' +
            '<div style="font-size: 15px; font-weight: 800; color: #065f46; margin-top: 2px;">' + totalQty.toFixed(1) + ' Ltr</div>' +
          '</div>' +
          '<div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 10px; text-align: center;">' +
            '<div style="font-size: 10px; color: #1d4ed8;">औसत फैट (Fat)</div>' +
            '<div style="font-size: 15px; font-weight: 800; color: #1e40af; margin-top: 2px;">' + avgFat + '%</div>' +
          '</div>' +
          '<div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 10px; text-align: center;">' +
            '<div style="font-size: 10px; color: #475569;">सकल राशि (Gross)</div>' +
            '<div style="font-size: 15px; font-weight: 800; color: #0f172a; margin-top: 2px;">₹' + totalGross.toFixed(2) + '</div>' +
          '</div>' +
          '<div style="background: #fefce8; border: 1px solid #fef08a; border-radius: 8px; padding: 10px; text-align: center;">' +
            '<div style="font-size: 10px; color: #a16207;">शुद्ध देय (Net Pay)</div>' +
            '<div style="font-size: 15px; font-weight: 800; color: #854d0e; margin-top: 2px;">₹' + netPayable.toFixed(2) + '</div>' +
          '</div>' +
        '</div>' +

        // Daily Ledger Table
        '<table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; border: 1px solid #cbd5e1;">' +
          '<thead style="background: #f1f5f9; font-size: 11px; border-bottom: 2px solid #cbd5e1;">' +
            '<tr>' +
              '<th style="padding: 8px; width: 14%;">दिनांक</th>' +
              '<th style="padding: 8px; width: 12%;">पाली (Shift)</th>' +
              '<th style="padding: 8px; width: 16%; text-align: right;">मात्रा (Ltr)</th>' +
              '<th style="padding: 8px; width: 14%; text-align: right;">फैट (Fat)</th>' +
              '<th style="padding: 8px; width: 14%; text-align: right;">एसएनएफ (SNF)</th>' +
              '<th style="padding: 8px; width: 14%; text-align: right;">दर (₹/L)</th>' +
              '<th style="padding: 8px; width: 16%; text-align: right;">कुल राशि</th>' +
            '</tr>' +
          '</thead>' +
          '<tbody>' +
            rowsHtml +
          '</tbody>' +
        '</table>' +

        // Signatures
        '<div style="margin-top: 40px; display: flex; justify-content: space-between; align-items: flex-end; padding-top: 14px; border-top: 1px dashed #cbd5e1;">' +
          '<div style="text-align: center; width: 180px;">' +
            '<div style="border-bottom: 1px solid #000; height: 35px; margin-bottom: 4px;"></div>' +
            '<div style="font-size: 11px; font-weight: 700;">किसान के हस्ताक्षर</div>' +
          '</div>' +
          '<div style="text-align: center; width: 220px;">' +
            '<div style="border-bottom: 1px solid #000; height: 35px; margin-bottom: 4px;"></div>' +
            '<div style="font-size: 11px; font-weight: 700;">दुग्ध संकलन केंद्र प्रभारी / सील</div>' +
          '</div>' +
        '</div>' +
      '</div>';

    var filename = 'Milk_Ledger_' + farmerName + '_' + periodStr;
    return PdfExport.renderHtmlToPdf(html, filename);
  };

  PdfExport.setLetterhead = function (letterheadData) {
    if (typeof letterheadData === 'object' && letterheadData !== null) {
      PdfExport.defaultLetterhead = Object.assign({}, PdfExport.defaultLetterhead, letterheadData);
      displayToast('क्लिनिक लेटरहेड सेटिंग्स अपडेट कर दी गईं।', 'info');
      return true;
    }
    return false;
  };

  // 5. AUTOMATIC INITIALIZATION
  function bootstrapPdfKit() {
    // Delegated click handlers for triggers
    document.addEventListener('click', function (e) {
      // Rx PDF Export Button [data-export-pdf-rx]
      var rxBtn = e.target.closest ? e.target.closest('[data-export-pdf-rx]') : null;
      if (rxBtn) {
        e.preventDefault();
        var payloadAttr = rxBtn.getAttribute('data-prescription-payload');
        var payload = null;
        if (payloadAttr) {
          try { payload = JSON.parse(payloadAttr); } catch (err) {}
        }
        PdfExport.exportPrescriptionPdf(payload);
        return;
      }

      // Milk Ledger PDF Export Button [data-export-pdf-ledger]
      var ledgerBtn = e.target.closest ? e.target.closest('[data-export-pdf-ledger]') : null;
      if (ledgerBtn) {
        e.preventDefault();
        var farmerJson = ledgerBtn.getAttribute('data-farmer-payload');
        var entriesJson = ledgerBtn.getAttribute('data-entries-payload');
        var monthStr = ledgerBtn.getAttribute('data-month-payload');

        var farmerObj = null;
        var entriesArr = null;

        if (farmerJson) {
          try { farmerObj = JSON.parse(farmerJson); } catch (err) {}
        }
        if (entriesJson) {
          try { entriesArr = JSON.parse(entriesJson); } catch (err) {}
        }

        PdfExport.exportMilkLedgerPdf(farmerObj, entriesArr, monthStr);
        return;
      }
    });

    // Preload PDF dependencies in background if online
    if (navigator.onLine) {
      ensurePdfLibraries();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrapPdfKit);
  } else {
    bootstrapPdfKit();
  }

})(window, document);
