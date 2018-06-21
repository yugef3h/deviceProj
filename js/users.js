const ACTIVE = "active";
const OPACTIVE = "opactive";
const pre = "data:image/jpeg;base64,";

//jquery
$(function () {
  'use strict';
  /**
   * IE10 viewport hack for Surface/desktop Windows 8 bug
   * @param {[type]} options [description]
   */
  if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
    var msViewportStyle = document.createElement('style')
    msViewportStyle.appendChild(
      document.createTextNode(
        '@-ms-viewport{width:auto!important}'
      )
    )
    document.querySelector('head').appendChild(msViewportStyle)
  }


  /**
   * 左边导航重写
   * @param {[type]} options [description]
   */
  $('.nav-sidebar li a').click(function (e) {
    e.preventDefault();
    $('.sidebar .active').removeClass(ACTIVE);
    $('.panel-heading').removeClass(OPACTIVE)
    $(this).tab('show');

  });
  $('.panel-heading').click(function (e) {
    e.preventDefault();
    $('.panel-heading').removeClass(OPACTIVE)
    $(this).addClass(OPACTIVE);
  });


  /**
   * 提示工具
   * @param {[type]} options [description]
   */
  $('[data-toggle="tooltip"]').tooltip();


  /**
   * 时间组件
   * @param {[type]} options [description]
   */
  //'YYYY-MM-DD HH:mm A'
  $('#datetimepicker1').datetimepicker({
    viewMode: 'years',
    format: 'YYYY-MM-DD HH:mm A',
    defaultDate: moment("2018-01-01", "YYYY-MM-DD")._i
  });
  $('#datetimepicker2').datetimepicker({
    viewMode: 'years',
    format: 'YYYY-MM-DD HH:mm A',
    defaultDate: moment("2028-01-01", "YYYY-MM-DD")._i
  });
  $("#datetimepicker1").on("dp.change",function (e) {
    $('#datetimepicker2').data("DateTimePicker").minDate(e.date);
  });
  $("#datetimepicker2").on("dp.change",function (e) {
    $('#datetimepicker1').data("DateTimePicker").maxDate(e.date);
  });


  /**
   * 修改用户信息
   * @param {[type]} options [description]
   */
  window.cUser = function  (e) {
    e = e || window.event;
    let userName = e.target.getAttribute('data-user');
    autoSearch(userName, function (data) {
      let jpeg = 'data:image/jpeg;base64,';
      let src = jpeg + data[0].UserFaceImg;
      $('#personName').val(data[0].UserName);
      $('#cardCode').val(data[0].UserCardNo);
      $('#faceImg').attr('src',src);
    });
  }


  /**
   * 用户信息修改后保存
   * @param {[type]} options [description]
   */
  $('.save').click(function () {
    let UserName = $('#personName').val();
    let UserFaceImg = $('#faceImg').attr('src');
    let UserCardNo = $('#cardCode').val();
    let UserFinger = 'data';
    $.ajax({
      type:"POST",
      url:"http://10.108.52.40:8080/DoorControlService/DoorUserManage",
      dataType:"json",
      data: {
        "UserName": UserName,
        "UserFaceImg": UserFaceImg,
        "UserCardNo": UserCardNo,
        "UserFinger": UserFinger
      },
      success: function (data) {
        $('.alert').fadeIn().delay(500).fadeOut();
        console.log('成功');
        console.log(data);
        $('#setUser').modal('hide')
      },
      error : function(err) {
        console.log(err.responseText)
      }
    })
  });


  /**
   * clear
   * @param {[type]} options [description]
   */
  $('.clear').click(function () {
    $('#Faces').val('');
    $('#SubArea').val('');
    $('#IP').val('');
    $('#cardNo').val('');
    $('#name').val('');
    $('#AreaName').val('');
    $('#DoorName').val('');
  });


  /**
   *  区域配置
   * @param {[type]} options [description]
   */
  $('.areaSet').click(function () {
    let $AreaName = $('#AreaName').val();
    let $SubArea = $('#SubArea').val();
    let $IP = $('#IP').val();
    let $DoorName = $('#DoorName').val();
    if ($AreaName !== '' && $SubArea !== '' && $IP !== '' && $DoorName !== '') {
      $.ajax({
        url: 'http://10.108.52.40:8080/DoorControlService/DoorService',
        type: 'GET',
        data:{
          "AreaName": $AreaName,
          "SubArea": $SubArea,
          "IP": $IP,
          "User": "admin",
          "Passwd": "a1234567",
          "DoorName":$DoorName,
        },
        success: function (data) {
          console.log('成功');
          console.log(data);
          $('.alert').fadeIn().delay(500).fadeOut();
        },
        error: function (err) {
          console.log(err.responseText)
        }
      });
    } else {
      alert('请填写区域名称！')
    }
  });


  /**
   * 下发权限
   * @param {[type]} options [description]
   */
  $(".post").click(function () {
    let $area = $('#area option:selected').val();
    let $inp = $('.username').val();
    if (true)  {
      $.ajax({
        type:"GET",
        url:"http://10.108.52.40:8080/DoorControlService/DoorRightsSetting",
        data: {
          "AreaName": $area,
          "UserName": $inp,
        },
        success: function (data) {
          console.log('成功');
          console.log(data);
          $('.alert').fadeIn().delay(500).fadeOut();
        },
        error : function(err) {
          console.log(err.responseText)
        }
      })
    } else {
      alert('参数不能为空');
    }

  });


  /**
   * 添加数据到db
   * @param {[type]} options [description]
   */
  window.addEventListener("dragenter", function(event) { event.preventDefault(); }, false);
  window.addEventListener("dragover", function(event) { event.preventDefault(); }, false);
  window.addEventListener("drop", function(event) {
    var reader = new FileReader();
    reader.onload = function(e) {
      let base64 = e.target.result;
      base64 = base64.split(',')[1];
      $('#Faces').val(base64);
      //document.body.insertAdjacentHTML("afterBegin", '<p>' + e.target.result + '</p>');  // base64 encoded file data!
      //console.log(e.target.result);
    };
    reader.readAsDataURL(event.dataTransfer.files[0]);
    event.preventDefault();

  }, false);
  $('.upload').click(function () {
    let $name = $('#name').val();
    let $face = $('#Faces').val();
    let $card = $('#cardNo').val();

    if ($name !== '' && $face !== '' && $card !== '') {
      $.ajax({
        type:"POST",
        url:"http://10.108.52.40:8080/DoorControlService/DoorUserManage",
        dataType:"json",
        data: {
          "UserName": $name,
          "UserFaceImg": $face,
          "UserCardNo": $card,
          "UserFinger": "data"
        },
        success: function (data) {
          $('.alert').fadeIn().delay(500).fadeOut();
          console.log('成功')
          console.log(data);
        },
        error : function(err) {
          console.log(err.responseText);
        }
      })
    } else {
      alert('请填写参数！')
    }

  });

  initSearch();
  $('.manage').click(function () {
    console.log('正在加载，请稍候！');
    $('input.srh').val('');
    initSearch();
  })
  $('#search-btn').click(function () {
    initSearch();
  })
  window.InitSearch = function () {
    initSearch();
  };


  /**
   * upload
   * @param {[type]} options [description]
   */
  var file = document.querySelector('#zip');
  var upload = document.querySelector('.import');
  var xhr = new XMLHttpRequest();

  upload.addEventListener('click', uploadFile, false);
  // 点击上传
  function uploadFile(event) {
    var formData = new FormData();
    formData.append('test', file.files[0]);
    xhr.onload = uploadSuccess;
    xhr.open('post', 'http://localhost:3009/api/ajaxfileupload', true);
    xhr.send(formData);
  }
  // 成功上传
  function uploadSuccess(event) {
    if (xhr.readyState === 4) {
      console.log(xhr.responseText);
      $('#myZip').modal('hide');
    }
  }


  /**
   * 初始化
   * @param {[type]} options [description]
   */
  function initSearch () {

    autoSearch(null, function (data) {
      let UserCardNo = '';
      let UserFaceImg = '';
      let UserName = '';
      let UserDepartment = '';
      let jpeg = 'data:image/jpeg;base64,';
      $('#tableBody').empty();
      for (let i=1;i<=data.length;i++){
        UserName = data[i-1].UserName;
        UserCardNo = data[i-1].UserCardNo;
        UserFaceImg = jpeg + data[i-1].UserFaceImg;
        UserDepartment = '所属部门';
        createTable(i, UserName, UserDepartment, UserCardNo);
      }
    });
  }


  /**
   * 查找
   * @param {[type]} options [description]
   */
  function autoSearch (n, callback) {
    let $srh = (n !== null && n !== undefined) ? n : $.trim($('.srh').val());
    let str = $srh !== '' ? `?SearchName=${$srh}` : '';
    console.log(str);
    console.log(`http://10.108.52.40:8080/DoorControlService/DoorUserQuery${str}`);
    $.ajax({
      type:'get',
      url:`http://10.108.52.40:8080/DoorControlService/DoorUserQuery${str}`,
      success: function (data) {
        console.log('成功');
        console.log(data);
        callback(data);
      },
      error: function (err) {
        console.log(err.responseText);
      }
    })
  }


  /**
   * 建表
   * @param {[type]} i [description] 序列
   * @param {[type]} a [description] 用户名
   * @param {[type]} b [description] 部门
   * @param {[type]} c [description] 卡号
   */
  function createTable (i, a, b, c) {
    $("#tableBody").append(
      `<tr class='trow'><td>${i}</td>`+
      `<td>${a}</td>`+
      `<td>${b}</td>`+
      `<td>${c}</td>`+
      `<td><a href="#" data-toggle="modal" data-target="#setUser" class="_none" data-user="${a}" onclick='cUser(event);'>操作</a></td></tr>`
    );
  }
});