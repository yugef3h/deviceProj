define(["jquery", "MallCommon"], function ($, MallCommon) {
  var Config = {
    URL_GetList: '/User/AccountAjax/GetList',
    URL_Recharge: '',
    URL_ResetAccount: ''
  }

  var GetList = function (param, callback) {
    $.gitAjax({
      url: Config.URL_GetList,
      data: param,
      success: function (result) {
        callback(result);
      }
    });
  }

  var Recharge = function () {}

  var ResetAccount = function () {}

  return {
    GetList: GetList,
    Recharge: Recharge,
    ResetAccount: ResetAccount
  }
});