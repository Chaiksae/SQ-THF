/**
* Template Name: NiceAdmin
* Template URL: https://bootstrapmade.com/nice-admin-bootstrap-admin-html-template/
* Updated: Apr 20 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    if (all) {
      select(el, all).forEach(e => e.addEventListener(type, listener))
    } else {
      select(el, all).addEventListener(type, listener)
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Sidebar toggle
   */
  if (select('.toggle-sidebar-btn')) {
    on('click', '.toggle-sidebar-btn', function(e) {
      select('body').classList.toggle('toggle-sidebar')
    })
  }

  /**
   * Search bar toggle
   */
  if (select('.search-bar-toggle')) {
    on('click', '.search-bar-toggle', function(e) {
      select('.search-bar').classList.toggle('search-bar-show')
    })
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Initiate tooltips
   */
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
  })

  /**
   * Initiate quill editors
   */
  if (select('.quill-editor-default')) {
    new Quill('.quill-editor-default', {
      theme: 'snow'
    });
  }

  if (select('.quill-editor-bubble')) {
    new Quill('.quill-editor-bubble', {
      theme: 'bubble'
    });
  }

  if (select('.quill-editor-full')) {
    new Quill(".quill-editor-full", {
      modules: {
        toolbar: [
          [{
            font: []
          }, {
            size: []
          }],
          ["bold", "italic", "underline", "strike"],
          [{
              color: []
            },
            {
              background: []
            }
          ],
          [{
              script: "super"
            },
            {
              script: "sub"
            }
          ],
          [{
              list: "ordered"
            },
            {
              list: "bullet"
            },
            {
              indent: "-1"
            },
            {
              indent: "+1"
            }
          ],
          ["direction", {
            align: []
          }],
          ["link", "image", "video"],
          ["clean"]
        ]
      },
      theme: "snow"
    });
  }

  /**
   * Initiate TinyMCE Editor
   */

  const useDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isSmallScreen = window.matchMedia('(max-width: 1023.5px)').matches;

  tinymce.init({
    selector: 'textarea.tinymce-editor',
    plugins: 'preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons accordion',
    editimage_cors_hosts: ['picsum.photos'],
    menubar: 'file edit view insert format tools table help',
    toolbar: "undo redo | accordion accordionremove | blocks fontfamily fontsize | bold italic underline strikethrough | align numlist bullist | link image | table media | lineheight outdent indent| forecolor backcolor removeformat | charmap emoticons | code fullscreen preview | save print | pagebreak anchor codesample | ltr rtl",
    autosave_ask_before_unload: true,
    autosave_interval: '30s',
    autosave_prefix: '{path}{query}-{id}-',
    autosave_restore_when_empty: false,
    autosave_retention: '2m',
    image_advtab: true,
    link_list: [{
        title: 'My page 1',
        value: 'https://www.tiny.cloud'
      },
      {
        title: 'My page 2',
        value: 'http://www.moxiecode.com'
      }
    ],
    image_list: [{
        title: 'My page 1',
        value: 'https://www.tiny.cloud'
      },
      {
        title: 'My page 2',
        value: 'http://www.moxiecode.com'
      }
    ],
    image_class_list: [{
        title: 'None',
        value: ''
      },
      {
        title: 'Some class',
        value: 'class-name'
      }
    ],
    importcss_append: true,
    file_picker_callback: (callback, value, meta) => {
      /* Provide file and text for the link dialog */
      if (meta.filetype === 'file') {
        callback('https://www.google.com/logos/google.jpg', {
          text: 'My text'
        });
      }

      /* Provide image and alt text for the image dialog */
      if (meta.filetype === 'image') {
        callback('https://www.google.com/logos/google.jpg', {
          alt: 'My alt text'
        });
      }

      /* Provide alternative source and posted for the media dialog */
      if (meta.filetype === 'media') {
        callback('movie.mp4', {
          source2: 'alt.ogg',
          poster: 'https://www.google.com/logos/google.jpg'
        });
      }
    },
    height: 600,
    image_caption: true,
    quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
    noneditable_class: 'mceNonEditable',
    toolbar_mode: 'sliding',
    contextmenu: 'link image table',
    skin: useDarkMode ? 'oxide-dark' : 'oxide',
    content_css: useDarkMode ? 'dark' : 'default',
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }'
  });

  /**
   * Initiate Bootstrap validation check
   */
  var needsValidation = document.querySelectorAll('.needs-validation')

  Array.prototype.slice.call(needsValidation)
    .forEach(function(form) {
      form.addEventListener('submit', function(event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })

  /**
   * Initiate Datatables
   */
  const datatables = select('.datatable', true)
  datatables.forEach(datatable => {
    new simpleDatatables.DataTable(datatable, {
      perPageSelect: [5, 10, 15, ["All", -1]],
      columns: [{
          select: 2,
          sortSequence: ["desc", "asc"]
        },
        {
          select: 3,
          sortSequence: ["desc"]
        },
        {
          select: 4,
          cellClass: "green",
          headerClass: "red"
        }
      ]
    });
  })

  /**
   * Autoresize echart charts
   */
  const mainContainer = select('#main');
  if (mainContainer) {
    setTimeout(() => {
      new ResizeObserver(function() {
        select('.echart', true).forEach(getEchart => {
          echarts.getInstanceByDom(getEchart).resize();
        })
      }).observe(mainContainer);
    }, 200);
  }

})();

// Apexchart from csv file SDPPM

document.addEventListener('DOMContentLoaded', function() {
  const apiKey = 'AIzaSyC_lhDmL90Fw_XEVkPRVGckW7Ap_9eB7BU'; // แทนที่ด้วย API key ของคุณ
  const spreadsheetId = '1begjGJct3_4fQ6mpyxUXfqeNaS_bEDc3uGQL4bA5kAc'; // แทนที่ด้วย ID ของ Google Sheet ของคุณ
  const sheetName = 'SDPPM'; // แทนที่ด้วยชื่อชีตของคุณ

  fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}?key=${apiKey}`)
      .then(response => response.json())
      .then(data => {
          const rows = data.values.slice(1); // ละเว้น header
          const categories = [];
          const seriesData = [];

          rows.forEach(row => {
              const category = row[0];
              const value = parseFloat(row[1]);

              if (!isNaN(value)) {
                  categories.push(category);
                  seriesData.push(value);
              }
          });

          var options = {
              chart: {
                  type: 'bar',
                  height: 450,
                  toolbar: {
                      show: false
                  },
              },
              series: [{
                  name: 'Data',
                  data: seriesData
              }],
              xaxis: {
                  categories: categories
              },
              plotOptions: {
                  bar: {
                      dataLabels: {
                          position: 'top'
                      },
                  },
              },
              dataLabels: {
                  enabled: true,
                  offsetY: -20,
                  style: {
                      colors: ['#000'],
                      fontSize: '14px',
                  }
              },
              stroke: {
                  curve: 'smooth',
                  width: 1
              },
              annotations: {
                  yaxis: [{
                      y: 434,
                      borderColor: '#FF0000',
                      borderWidth: 2,
                      label: {
                          borderColor: '#FF0000',
                          style: {
                              color: '#fff',
                              background: '#FF0000',
                              fontSize: '16px',
                          },
                          text: 'Target = 434 PPM',
                      }
                  }]
              }
          };

          var chart = new ApexCharts(document.querySelector("#sdppmchart"), options);
          chart.render();
      })
      .catch(error => console.error('Error:', error));
});



// End Apec chart from csv file SDPPM

// Data table 
document.getElementById('upload').addEventListener('change', handleFile, false);

let currentPage = 1;
const rowsPerPage = 10;
let jsonData = [];

function handleFile(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = function(event) {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        jsonData = XLSX.utils.sheet_to_json(worksheet);
        displayData();
        setupPagination();
    };
    reader.readAsArrayBuffer(file);
}

function displayData() {
    const table = document.getElementById('data-table');
    table.innerHTML = '';
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const pageData = jsonData.slice(start, end);

    if (pageData.length > 0) {
        const headerRow = document.createElement('tr');
        Object.keys(pageData[0]).forEach(key => {
            const th = document.createElement('th');
            th.textContent = key;
            headerRow.appendChild(th);
        });
        table.appendChild(headerRow);
    }

    pageData.forEach(row => {
        const tr = document.createElement('tr');
        Object.values(row).forEach(cell => {
            const td = document.createElement('td');
            td.textContent = cell;
            tr.appendChild(td);
        });
        table.appendChild(tr);
    });
}

function setupPagination() {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';
    const pageCount = Math.ceil(jsonData.length / rowsPerPage);

    for (let i = 1; i <= pageCount; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.addEventListener('click', () => {
            currentPage = i;
            displayData();
        });
        pagination.appendChild(button);
    }
}


// End data table


// JavaScript เพื่อกำหนดค่าเริ่มต้นเป็นวันที่ปัจจุบัน
document.addEventListener('DOMContentLoaded', () => {
    let dateInput = document.getElementById('date');
    let today = new Date().toISOString().split('T')[0];
    dateInput.value = today;
});



// ฟังก์ชันเพื่อโหลด Google Sheets API
function loadSheetsApi() {
    return gapi.client.load('https://sheets.googleapis.com/$discovery/rest?version=v4').then(() => {
        gapi.client.setApiKey('AIzaSyC_lhDmL90Fw_XEVkPRVGckW7Ap_9eB7BU');
    });
}

// ฟังก์ชันเพื่อดึงข้อมูลจาก Google Sheet
function lookupPartDetails(partNo) {
    return gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: '1qucvkIKCCqRsJbNdcnKGcGrCCVfX_7zmDb0xgxxMTnw',
        range: 'ItemMaster!A:J',
    }).then(response => {
        const rows = response.result.values;
        for (let i = 0; i < rows.length; i++) {
            if (rows[i][0] === partNo) {
                return {
                    partName: rows[i][1], // ชื่อสินค้า
                    supplier: rows[i][9]  // ผู้จัดจำหน่าย
                };
            }
        }
        return {
            partName: 'ไม่พบข้อมูล',
            supplier: 'ไม่พบข้อมูล'
        };
    }).catch(error => {
        console.error('Error:', error);
        return {
            partName: 'เกิดข้อผิดพลาด',
            supplier: 'เกิดข้อผิดพลาด'
        };
    });
}

// ฟังก์ชันเพื่อบันทึกข้อมูลไปยัง Google Sheet
function savePartDetails(partNo, partName, supplier) {
    return gapi.client.sheets.spreadsheets.values.append({
        spreadsheetId: '1Qu0CKDLuqG0YxuUW8ov22sEtpdrRIm7gG-hDI1m58pc',
        range: 'Sheet1!A:C',
        valueInputOption: 'RAW',
        insertDataOption: 'INSERT_ROWS',
        resource: {
            values: [[partNo, partName, supplier]]
        }
    }).then(response => {
        console.log('Success:', response);
    }).catch(error => {
        console.error('Error:', error);
    });
}

// ฟังก์ชันเพื่อจัดการเมื่อผู้ใช้กรอกข้อมูล
document.getElementById('floatingpartno').addEventListener('blur', async (event) => {
    const partNo = event.target.value;
    document.getElementById('floatingpartname').value = 'Loading...(กำลังเรียกข้อมูล)';
    document.getElementById('floatingsupplier').value = 'Loading...(กำลังเรียกข้อมูล)';
    await gapi.load('client', async () => {
        await loadSheetsApi(); // โหลด Google Sheets API เมื่อผู้ใช้กรอกข้อมูลเสร็จ
        const details = await lookupPartDetails(partNo);
        document.getElementById('floatingpartname').value = details.partName;
        document.getElementById('floatingsupplier').value = details.supplier;
    });
});

// ฟังก์ชันเพื่อจัดการเมื่อผู้ใช้กดปุ่ม Submit
document.getElementById('submitBtn').addEventListener('click', async () => {
    const partNo = document.getElementById('floatingpartno').value;
    const partName = document.getElementById('floatingpartname').value;
    const supplier = document.getElementById('floatingsupplier').value;
    await gapi.load('client', async () => {
        await loadSheetsApi(); // โหลด Google Sheets API ก่อนบันทึกข้อมูล
        await savePartDetails(partNo, partName, supplier);
    });
});

// โหลด Google API client library
gapi.load('client');
