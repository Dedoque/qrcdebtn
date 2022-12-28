const QRCode = require('qrcode')

const formatter = (data) => {
  data = JSON.parse(data);
  let res =""
  for (const [k, v] of Object.entries(data)){
    res = `${res}
[${k}]
    `
    for (const [kk, vv] of Object.entries(v)){
      if(typeof vv == 'string'){
        res = `${res}
${kk} = ${vv}
        `
      }
      if (typeof vv == 'object') {
        for (const [ek, ev] of Object.entries(vv)) {
          if (ek == 'inet'){
            res = `${res}
${kk} = ${ev}:51820`

          }
        }
      }
    }
  }
  return res
}

const getqr = () => {
  $.ajax({
    url: "/api/getconfig",
    success: function(data) {
      console.log(data);
      const text = formatter(data);
  QRCode.toCanvas(document.getElementById('canvas'), formatter(data), function (error) {
    if (error) console.error(error)
    console.log('success!');
  })

    }
  });
}

const qrclickhandle = (e) => {
  getqr()
}

$("#qrbtn").on('click', qrclickhandle);
