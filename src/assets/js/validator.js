import { vue } from "@/main.js";
import { yxValidate } from "@/network/api";
import { timeStampFormat } from "@/assets/js/common.js";

export var validate_repeat_info = (rule, value, callback) => {
  var field = rule.field;
  if (value == "") {
    return callback();
  } else {
    // 校验输入的信息不为空时是否重复
    // 实参：输入信息类型、信息内容、回调函数
    validate_info(field, value, callback);
  }
};

// 部分表单信息的校验(联系电话 + QQ + 微信)
// 形参：输入信息类型、信息内容、回调函数
function validate_info(which_field, value, callback) {
  var dataObj = { keyword: value, field: which_field };
  switch (which_field) {
    // 手机号码验证
    case "contact":
      if (!/^[1][3,4,5,7,8,9][0-9]{9}$/.test(value)) {
        return callback(new Error(`手机号码格式错误！`));
      } else {
        // 在输入信息格式正确的情况下，发送网络请求验证信息是否重复
        infoValidation(dataObj, callback);
      }
      break;
    // QQ 号码验证
    case "qq":
      if (!/^[1-9][0-9]{4,14}$/.test(value)) {
        return callback(new Error(`QQ号码格式错误！`));
      } else {
        infoValidation(dataObj, callback);
      }
      break;
    // 微信号验证
    case "weixin":
      if (!/^[a-zA-Z]([-_a-zA-Z0-9]{6,20})$/.test(value)) {
        return callback(new Error(`微信号码格式错误！`));
      } else {
        infoValidation(dataObj, callback);
      }
      break;
  }
  // return callback();
}

// 信息校验的网络请求
// 形参：输入信息类型、信息内容、回调函数
function infoValidation(form_item_data, callback) {
  yxValidate(form_item_data).then((res) => {
    if (res.data.code == 200) {
      console.log(res);
      // 用户不存在，可以继续填写其余信息
      return callback();
    } else {
      console.log(res);
      // 重复录入的用户名
      var username = res.data.content.nickname;
      // 格式化时间戳
      var postTime = timeStampFormat(res.data.content.posttime);
      // 提示框
      vue
        .$confirm(
          // 提示信息
          returnWarningTxt(
            form_item_data.field, // 该信息属于哪一类？
            form_item_data.keyword, // 信息内容
            username,
            postTime
          ),
          {
            type: "warning",
            showConfirmButton: false,
            showCancelButton: false,
            // 编译 warning_txt 中的 html&css
            dangerouslyUseHTMLString: true,
          }
        )
        .catch((error) => {
          return error;
        });
      return callback(new Error("该用户已存在！"));
    }
  });
}

// 返回警告信息
// 形参：输入信息类型、信息内容、用户名、重复信息首次录入时间
function returnWarningTxt(field, value, username, postTime) {
  let field_type;
  // 格式化警告信息
  switch (field) {
    case "contact":
      field_type = "联系电话";
      break;
    case "qq":
      field_type = "QQ号";
      break;
    case "weixin":
      field_type = "微信号";
      break;
  }
  return `
        <span style="font-weight: bold;color: #409eff;"> ${field_type} </span>
        为
        <span style="font-weight: bold;color: #409eff;"> ${value} </span>
        的用户已存在<br />
        用户名为：
        <span style="font-weight: bold;color: #409eff;"> ${username} </span><br />
        录入时间为
        <span style="font-weight: bold;color: #409eff;"> ${postTime} </span><br />
        请勿重复提交！
      `;
}
