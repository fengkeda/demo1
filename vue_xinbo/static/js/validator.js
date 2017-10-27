'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _veeValidate = require('vee-validate');

var _veeValidate2 = _interopRequireDefault(_veeValidate);

var _zh_CN = require('vee-validate/dist/locale/zh_CN');

var _zh_CN2 = _interopRequireDefault(_zh_CN);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_veeValidate.Validator.addLocale(_zh_CN2.default);

var config = {
  locale: 'zh_CN'
};

_vue2.default.use(_veeValidate2.default, config);

var dictionary = {
  zh_CN: {
    messages: {
      required: function required(file) {
        return "请输入" + file;
      },
      password: function password() {
        return '[提示]密码为6-10为数字或英文组合，请区分大小写';
      }
    },
    attributes: {
      mobile: '手机号',
      code_phone: '手机验证码',
      weixin: '微信号',
      qq: 'QQ号',
      kouling: '交易口令',
      oldpass: '原密码',
      newpass: '新的密码',
      myMoney: '提款金额',
      name: '真实姓名',
      bank: '银行分支',
      credit_card: '银行卡号',
      choosbank: '银行',
      transferMoney: '转账金额',
      remit_name: '2-4位中文名',
      amount: '金额',
      user: '账号/手机号码',
      xb_user:'用户名',
      password: '密码',
      code: '验证码',
      againpass: '重复密码',
      agency_user: '代理姓名',
      email: '电子邮箱',
      agency_address: '地址'
    }
  }
};
_veeValidate.Validator.updateDictionary(dictionary);

_veeValidate.Validator.extend('mobile', {
  messages: {
    zh_CN: function zh_CN(field) {
      return '电话号码无效';
    }
  },
  validate: function validate(value) {
    return value.length == 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value);
  }
});

_veeValidate.Validator.extend('agency_user', {
  messages: {
    zh_CN: function zh_CN(field) {
      return '代理姓名无效';
    }
  },
  validate: function validate(value) {
    return (/^[\u4e00-\u9fa5 ]{2,20}$/.test(value) || /^[a-zA-Z\/ ]{2,20}$/.test(value)
    );
  }
});

exports.default = _veeValidate.Validator;

//载入

_vue2.default.use(_veeValidate2.default, {
  locale: 'zh_CN'
});