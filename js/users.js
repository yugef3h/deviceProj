const ACTIVE = "active";
const OPACTIVE = "opactive";
const yql = db[1].userFaceImg;
const yyh = db[0].userFaceImg;
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
  $('a.set').click(function (e) {
    let userName = e.target.getAttribute('data-user');
    console.log(userName);
    autoSearch(userName, function (data) {
      let jpeg = 'data:image/jpeg;base64,';
      let src = jpeg + data[0].UserFaceImg;
      $('#personName').val(data[0].UserName);
      $('#cardCode').val(data[0].UserCardNo);
      $('#faceImg').attr('src',src);
    });
  });

  /**
   * 用户信息修改后保存
   * @param {[type]} options [description]
   */
  $('save').click(function () {
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
      error : function() {
        console.log('error')
      }
    })
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
        error : function() {
          console.log('error')
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
  $('.upload').click(function () {
    $.ajax({
      type:"POST",
      url:"http://10.108.52.40:8080/DoorControlService/DoorUserManage",
      dataType:"json",
      data: {
        //DoorUserManage
        "UserName": "yangyh",
        "UserFaceImg": yyh,
        "UserCardNo": "202898",
        "UserFinger": "data"
      },
      success: function (data) {
        $('.alert').fadeIn().delay(500).fadeOut();
        console.log('成功');
        console.log(data);
      },
      error : function() {
        console.log('error')
      }
    })

  });

  initSearch();
  $('#search-btn').click(function () {
    initSearch();
  })

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
        UserName = data[i].UserName;
        UserCardNo = data[i].UserCardNo;
        UserFaceImg = jpeg + data[i].UserFaceImg;
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
      error: function () {
        console.log('error');
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
      `<td><a href="#" data-toggle="modal" data-target="#setUser" class="_none set" data-user="${a}">操作</a></td></tr>`
    );
  }


})