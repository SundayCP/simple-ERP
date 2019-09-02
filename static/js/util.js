export function toThousands(num) {
  var num = Number(num)
  var num1 = num.toFixed(2).split('.')[0]
  var num2 = num.toFixed(2).split('.')[1]
  var num3 = (num1 || 0).toString(), result = '';
  while (num3.length > 3) {
    result = ',' + num3.slice(-3) + result;
    num3 = num3.slice(0, num3.length - 3);
  }
  if (num3) {
    result = num3 + result;
  }
  if (typeof num2 !== 'undefined') {
    result = result + '.' + num2
  }
  return result;
}

// 没有 时分秒
export function dateFormate02(input) {
  var d = new Date(input);
  var year = d.getFullYear();
  var month = d.getMonth() + 1;
  var day = d.getDate();
  return year + '-' + _addZero(month) + '-' + _addZero(day);
}

export function dateFormate(input) {
  var d = new Date(input);
  var year = d.getFullYear();
  var month = d.getMonth() + 1;
  var day = d.getDate();
  var hour = d.getHours();
  var minutes = d.getMinutes();
  var seconds = d.getSeconds();
  return year + '-' + _addZero(month) + '-' + _addZero(day) + ' ' + _addZero(hour) + ':' + _addZero(minutes) + ':' + _addZero(seconds);
}

function _addZero(num) {
  return num < 10 ? '0' + num : num;
}


/**
 * 数组元素交换位置
 * @param {array} arr 数组
 * @param {number} index1 添加项目的位置
 * @param {number} index2 删除项目的位置
 * index1和index2分别是两个数组的索引值，即是两个要交换元素位置的索引值，如1，5就是数组中下标为1和5的两个元素交换位置
 */
function swapArray(arr, index1, index2) {
  arr[index1] = arr.splice(index2, 1, arr[index1])[0];
  return arr;
}

//上移 将当前数组index索引与后面一个元素互换位置，向数组后面移动一位

export function zIndexUp(arr, index, length) {
  if (index != 0) {
    swapArray(arr, index, index - 1);
  } else {
    // alert('已经处于置顶，无法上移');
  }
}

//下移 将当前数组index索引与前面一个元素互换位置，向数组前面移动一位

export function zIndexDown(arr, index, length) {
  if (index + 1 != length) {
    swapArray(arr, index, index + 1);
  } else {
    // alert('已经处于置底，无法下移');
  }
}

export function loginState() {

}
