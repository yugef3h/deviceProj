define(["jquery","js/Theme/Default/Js/User/AccountServer","MallCommon","mmGrid"], function ($, AccountServer, MallCommon) {

  var TabPageSize = 15;
  var AccountManager = {
    TabGrid: undefined,

    GetSearch: function () {
      var search = $('div.searchbar');
      var EmployeeNum = search.find('input[name="EmployeeNum"]').val();
      var UserName=search.find('input[name="UserName"]').val();
      var Email=search.find('input[name="Email"]').val();
      var Mobile=search.find('input[name="Mobile"]').val();
      var CompanyNum=search.find('input[name="CompanyNum"]').val();

      var param = {};
      param["EmployeeNum"] = EmployeeNum;
      param["UserName"]=UserName;
      param["Email"]=Email;
      param["Mobile"]=Mobile;
      param["CompanyNum"]=CompanyNum;

      return param;
    },
    /**
     * 查询分页显示
     * @param {[type]} PageIndex [description]
     * @param {[type]} PageSize [description]
     */
    PageClick: function (PageIndex, PageSize) {
      var param = AccountManager.GetSearch();
      param = param || {};
      param["PageIndex"] = PageIndex;
      param["PageSize"] = PageSize;
      $.jBox.tip("正在加载数据....", "loading");
      AccountServer.GetList(param, function (result) {
        $.jBox.closeTip();
        if(result.code==1){
          AccountManager.SetTable(result);
        }else{
          $.jBox.tip(result.message,"warn");
        }
      });
    },
    /**
     * 页面显示表格信息
     * @param {[type]} result [description]
     */
    SetTable: function (result) {
      var cols = [
        {title:'操作', name:'id', width: 70, align: 'center',lockWidth:false,  renderer: function(data,item,rowIndex){
            var html="";
            html+='<a class="Recharge" href="javascript:void(0)">充值</a>&nbsp;&nbsp;';
            return html;
          }},
        {title:'工号', name:'employeeNum', width: 80, align: 'center',lockWidth:false,  renderer: function(data,item,rowIndex){
            return data;
          }},
        {title:'姓名', name:'userName', width: 70, align: 'center',lockWidth:false,  renderer: function(data,item,rowIndex){
            return data;
          }},
        {title:'电话', name:'mobile', width: 100, align: 'center',lockWidth:false,  renderer: function(data,item,rowIndex){
            return data;
          }},
        {title:'邮箱', name:'email', width: 120, align: 'center',lockWidth:false,  renderer: function(data,item,rowIndex){
            return data;
          }},
        {title:'部门', name:'departName', width: 100, align: 'center',lockWidth:false,  renderer: function(data,item,rowIndex){
            return data;
          }},
        {title:'余额', name:'balance', width: 80, align: 'center',lockWidth:false,  renderer: function(data,item,rowIndex){
            return data;
          }},
        {title:'公司', name:'companyName', width: 180, align: 'center',lockWidth:false,  renderer: function(data,item,rowIndex){
            return data;
          }},
      ];
      if (result.result == undefined) {
        result.result = [];
      }
      if (this.TabGrid == undefined) {
        this.TabGrid = $("#tabList").mmGrid({
          cols: cols,
          items: result.result,
          checkCol: true,
          nowrap: true,
          multiSelect: true,
          indexCol: true,
          height: "auto"
        });
        AccountManager.BindEvent();
      } else {
        this.TabGrid.load(result.result);
      }

      var pageInfo = result.pageInfo;
      if (pageInfo != undefined) {
        $("#mypage").minpager({ pagenumber: pageInfo.pageIndex, recordCount: pageInfo.rowCount, pageSize: pageInfo.pageSize, buttonClickCallback: AccountManager.PageClick });
      }
    },
    /**
     * 表格的事件绑定
     * @param {[type]} options [description]
     */
    BindEvent: function () {
      AccountManager.TabGrid.off("cellSelected").on("cellSelected", function (e, item, rowIndex, colIndex) {
        if ($(e.target).is("a.Recharge")) {
          var SnNum = item.accountNum;
          AccountManager.Recharge(SnNum);
        }
      });
    },
    /**
     * 给某个账户充值
     * @param {[type]} Sn [description]
     */
    Recharge: function (Sn) {
      var submit = function (v, h, f) {
        if (v == 1) {
          var Balance = h.find('input[name="Balance"]').val();
          var CompanyNum = h.find('select[name="CompanyNum"]').val();

          var param = {};
          param["AccountNum"]=Sn;
          param["Balance"]=Balance;
          param["CompanyNum"]=CompanyNum;

          if (MallCommon.IsEmpty(CompanyNum)) {
            $.jBox.tip("请选择公司");
            return false;
          }

          if (MallCommon.IsEmpty(Balance) || isNaN(Balance)) {
            $.jBox.tip("请输入金额,且金额为大于0的数字");
            return false;
          }

          AccountServer.Recharge(param, function (result) {
            if(result.code==1){
              AccountManager.PageClick(1,TabPageSize);
            }else{
              $.jBox.tip(result.message,"warn");
            }
          });
        }
      }

      var load = function (h) {}

      $.jBox.open("get:/User/User/SetBalance", "设置金额", 360, 300, {
        buttons: { "确定": 1, "关闭": 2 }, submit: submit, loaded: load
      });
    },
    /**
     * 充值账户余额
     * @param {[type]} options [description]
     */
    Reset: function () {
      var submit = function (v, h, f) {
        if (v == 1) {

          var Balance = h.find('input[name="Balance"]').val();
          var CompanyNum = h.find('select[name="CompanyNum"]').val();

          var param = {};
          param["Balance"]=Balance;
          param["CompanyNum"]=CompanyNum;

          if (MallCommon.IsEmpty(CompanyNum)) {
            $.jBox.tip("请选择公司");
            return false;
          }

          if (MallCommon.IsEmpty(Balance) || isNaN(Balance)) {
            $.jBox.tip("请输入金额,且金额为大于0的数字");
            return false;
          }

          $.jBox.tip('重置账户余额需要较长时间,请耐心等待...','loading');
          AccountServer.ResetAccount(param, function (result) {
            if(result.code==1){
              AccountManager.PageClick(1,TabPageSize);
            }else{
              $.jBox.tip(result.message,"warn");
            }
          });
        }
      }

      var load = function (h) {

      }

      $.jBox.open("get:/User/User/SetBalance", "设置金额", 360, 300, {
        buttons: { "确定": 1, "关闭": 2 }, submit: submit,loaded:load
      });
    }
  }
  /**
   * 初始化
   * @param {[type]} options [description]
   */
  var Init = function () {
    var search = $('div.searchbar');
    search.find('button[data-command="Search"]').click( function (event) {
      AccountManager.PageClick(1, TabPageSize);
    });
    AccountManager.PageClick(1, TabPageSize);

    $('button[data-command="Init"]').click(function(event) {
      AccountManager.Reset();
    });
  }

  return {
    Init: Init,
  }
});


