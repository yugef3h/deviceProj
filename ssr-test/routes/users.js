var express = require('express');
var router = express.Router();
let request = require('request');
const jszip = require('jszip');
const fs = require('fs');

const multer = require('multer');
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '.zip');
  }
})

let upload = multer({ storage: storage });



let db = require('../db/img');
const HttpUtils = exports;
let postObj = {};
postObj['Faces'] = [{'data': '', 'index': 1, 'volid': true}];
postObj['Fingers'] = [{'data': '', 'index': 1, 'valid': true}];
postObj['authorize'] = {'RightPlan': [1], 'doorRight': [1],'validTime': {
    'beginTime': '2000-01-23T04:56:07.000+00:00',
    'endTime': '2000-01-23T04:56:07.000+00:00',
    'valid': true
  }
};
postObj['cards'] = [{'cardNo': '', 'cardPassword': '', 'cardType': 1, 'index': 1, 'valid': true}];
postObj['code'] = '';
postObj['name'] = '';
postObj['valid'] = true;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.post('/ajaxfileupload',upload.single('test'), function (req, res, next)  {
// 没有附带文件
  if (!req.file) {
    res.json({ ok: false });
    return;
  }
  // console.log(req.file);
  fs.readFile('./uploads/'+ req.file.fieldname + '.zip', function(err, data) {
    if (err) throw err;
    jszip.loadAsync(data).then(function (zip) {
      let files = zip.files;
      for (let i in files){
        if (!zip.files[i].dir) {
          let base = zip.file(zip.files[i].name).async('base64');
          base.then( function (data) {
            console.log('data:image/jpeg;base64,' + data);
            if (data) {
              let obj = {};
              obj.success = 'OK';
              res.send(obj);
            }

          })
        }
      }
    })
  });

});

router.post('/gethandle',function (req, res, next) {
  let rq = req.body;
  rq.password = 'a1234567';
  rq.port = 8000;
  rq.userName = 'admin'
  let deviceName = rq.deviceName;
  if (deviceName === 'eastDoor') {
    rq.deviceAddress = '192.168.50.226';
  } else  if (deviceName === 'visitDoor') {
    rq.deviceAddress = '10.108.52.36';
  }
  let URL = 'http://10.108.52.128:8085/v1/Login';
  let param = obj(rq);
  /**
   * @Des HttpUtils.postForm method
   */
  HttpUtils.postForm(URL, param, function (result) {
    res.send(result)
  });
});

router.post('/post',function (req, res, next) {
  let actionHandle = req.body.actionHandle;
  let userName = req.body.userName;
  let tHd = encodeURIComponent(actionHandle);
  let rq = req.body;
  let URL = `http://10.108.52.128:8085/v1/User?actionHandle=${tHd}`;
  for (let i=0; i<db.data.length; i++){
    let name = db.data[i].userName;
    if (name === userName) {
       postObj.name = db.data[i].userName;
       postObj.code = db.data[i].code;
       postObj.cards[0].cardNo = db.data[i].userCardNo;
       postObj.Fingers[0].data = db.data[i].userFinger;
       postObj.Faces[0].data = db.data[i].userFaceImg;
    }
  }
  let param = postObj;
  /**
   * @Des HttpUtils.postForm method
   */
  HttpUtils.postForm(URL, param, function (result) {
    res.send(result)
  });
});

router.post('/get',function (req, res, next) {
  let CardNos = req.body.CardNos;
  let actionHandle = req.body.actionHandle;
  let tHd = encodeURIComponent(actionHandle);
  let URL = `http://10.108.52.128:8085/v1/User?actionHandle=${tHd}&CardNos=${CardNos}`;

  console.log(URL);
  request(URL, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send(body)
    }
  })
});

/**
 * @Des module:request
 */
HttpUtils.postForm = function (url, form, callback) {
  let header = getHeader();
  let option = {
    json: true,
    header : header,
    body: form    //请求体
  };
  request.post(url,option, function (error, response, body) {
    resultFunction(callback,error,response,body);
  })
};

function getHeader () {
  return {
    'Content-type': 'application/json; charset=UTF-8',
    'Accept': 'application/json; charset=UTF-8'
  }
}
function resultFunction(callback,error, response, body){
  if (!error && response.statusCode === 200) {
    callback({success: true, msg: body});
  } else {
    console.log('request is error', error);
    callback({success: false, msg: error});
  }
}
function obj(p) {
  let param = {};
  for (let i in p) {
    if (i === 'url') continue;
    param[i] = (i === 'port' )? parseInt(p[i]) : p[i];
  }
  return param;
}

module.exports = router;
