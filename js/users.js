const ACTIVE = "active";
const OPACTIVE = "opactive";
const yql = db[1].userFaceImg;
const yyh = db[0].userFaceImg;
const pre = "data:image/jpeg;base64,";

//jquery
$(function () {
  $('.nav-sidebar li a').click(function (e) {
    e.preventDefault();
    $('.sidebar .active').removeClass(ACTIVE);
    $('.panel-heading').removeClass(OPACTIVE)
    $(this).tab('show');

  });
  //$('#myTab li:eq(0) a').tab('show');

  //tag
  $('.panel-heading').click(function (e) {
    e.preventDefault();
    $('.panel-heading').removeClass(OPACTIVE)
    $(this).addClass(OPACTIVE);
  });

  //tooltip
  $('[data-toggle="tooltip"]').tooltip();
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

  //setUser
  $('a.set').click(function (e) {
    let userName = e.target.getAttribute('data-user');
    console.log(userName);
    autoSearch(userName, function (data) {
      $('#personName').val(data[0].UserName);
      $('#cardCode').val(data[0].UserCardNo);
      $('#faceImg').attr('src',data[0].UserFaceImg);
    });
  });
  //save


  //下发权限
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
          console.log(data);
          $('.alert').fadeIn().delay(500).fadeOut();
        },
        error : function() {
          console.log('0')
        }
      })
    } else {
      alert('参数不能为空');
    }

  });
  //添加数据至db
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
        console.log(data);
      },
      error : function() {
        console.log('0')
      }
    })

  });
  //搜索
  autoSearch();
  $('#search-btn').click(function () {
    autoSearch(null, function (data) {
      let UserCardNo = '';
      let UserFaceImg = '';
      let UserName = '';
      let UserDepartment = '';
      $('#tableBody').empty();
      for (let i=1;i<=data.length;i++){
        UserName = data[i].UserName;
        UserCardNo = data[i].UserCardNo;
        UserFaceImg = data[i].UserFaceImg;
        UserDepartment = '所属部门';
        createTable(i, UserName, UserDepartment, UserCardNo);
      }
    });
  })
  //
  function autoSearch (n, callback) {
    let $srh = (n !== null && n !== undefined) ? n : $.trim($('.srh').val());
    let str = $srh !== '' ? `?SearchName=${$srh}` : '';
    console.log(str);
    console.log(`http://10.108.52.40:8080/DoorControlService/DoorUserQuery${str}`);
    $.ajax({
      type:'get',
      url:`http://10.108.52.40:8080/DoorControlService/DoorUserQuery${str}`,
      success: function (data) {
        console.log(data);
        // let UserCardNo = '';
        // let UserFaceImg = '';
        // let UserName = '';
        // let UserDepartment = '';
        // $('#tableBody').empty();
        // for (let i=1;i<=data.length;i++){
        //   UserName = data[i].UserName;
        //   UserCardNo = data[i].UserCardNo;
        //   UserFaceImg = data[i].UserFaceImg;
        //   UserDepartment = '所属部门';
        //   createTable(i, UserName, UserDepartment, UserCardNo);
        // }
        callback(data);
      },
      error: function () {
        console.log('0');
      }
    })
  }
  //createTable
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