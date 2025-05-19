import * as XLSX from "xlsx";

export function transform(formula) {
  let result = [];
  const doubleFormula = "u2d2l2r2f2b2";
  for (let i = 0; i < formula.length; i++) {
    let temp = formula[i];
    if (temp.indexOf("2") > -1 && doubleFormula.indexOf(temp) == -1) {
      result.push(temp.substring(0, 1));
      result.push(temp.substring(0, 1));
    } else {
      result.push(temp);
    }
    //E y轴中间层,M x轴中间层 S z轴中间层
  }
  formula = result;
  result = [];
  for (let i = 0; i < formula.length; i++) {
    let temp = formula[i];
    switch (temp) {
      case "u":
        result.push(temp.toUpperCase());
        result.push("E'");
        break;
      case "u'":
        result.push(temp.toUpperCase());
        result.push("E");
        break;
      case "u2":
        result.push("U");
        result.push("U");
        result.push("E");
        result.push("E");
        break;
      case "d":
        result.push(temp.toUpperCase());
        result.push("E");
        break;
      case "d'":
        result.push(temp.toUpperCase());
        result.push("E'");
        break;
      case "d2":
        result.push("D");
        result.push("D");
        result.push("E");
        result.push("E");
        break;
      case "f":
        result.push(temp.toUpperCase());
        result.push("S");
        break;
      case "f'":
        result.push(temp.toUpperCase());
        result.push("S'");
        break;
      case "f2":
        result.push("F");
        result.push("F");
        result.push("S");
        result.push("S");
        break;
      case "b":
        result.push(temp.toUpperCase());
        result.push("S'");
        break;
      case "b'":
        result.push(temp.toUpperCase());
        result.push("S");
        break;
      case "b2":
        result.push("B");
        result.push("B");
        result.push("S");
        result.push("S");
        break;
      case "r":
        result.push(temp.toUpperCase());
        result.push("M'");
        break;
      case "r'":
        result.push(temp.toUpperCase());
        result.push("M");
        break;
      case "r2":
        result.push("R");
        result.push("R");
        result.push("M'");
        result.push("M'");
        break;
      case "l":
        result.push(temp.toUpperCase());
        result.push("M");
        break;
      case "l'":
        result.push(temp.toUpperCase());
        result.push("M'");
        break;
      case "l2":
        result.push("L");
        result.push("L");
        result.push("M'");
        result.push("M'");
        break;
      default:
        result.push(temp);
        break;
      //E y轴中间层,M x轴中间层 S z轴中间层
    }
  }
  return result;
}
/**
 * 将魔方公式字符串转换为步骤数组
 * @param {string} formula - 魔方公式字符串，支持多种格式：
 * 1. 空格分隔: "U R U2 R' U R U' R'"
 * 2. 多空格分隔: "U  R   U2   R'  U  R  U' R'"
 * 3. 无分隔: "URU2R'URU'R'"
 * 4. 逗号分隔: "U,R,U2,R',U,R,U',R'"
 * @returns {string[]} 标准化的步骤数组，如 ['U','R','U2',"R'",'U','R',"U'",'R']
 */
export function parseFormula(formula) {
  if (!formula) return [];

  // 1. 先将逗号分隔的格式转换为空格分隔
  formula = formula.replace(/,/g, " ");

  // 2. 去除多余空格
  formula = formula.replace(/\s+/g, " ").trim();

  // 3. 用正则匹配所有合法魔方操作（如R, R', R2, U, U', U2等），支持大小写
  // 支持大写/小写字母+可选的2+可选的'
  const moves = formula.match(
    /([ESMURFDLBurfdlb][2]?')|([ESMURFDLBurfdlb][2]?)|([xyzXYZ][2]?')|([xyzXYZ][2]?)/g,
  );
  return moves || [];
}

/*
 * CFOP公式包含面
 * */
export function GetCFOPFaces(type) {
  switch (type) {
    case "F2L":
      return "F7 F9 B7 B8 L7 L9 R7 R9 F4 F6 B4 B6 L4 L6 R4 R6".split(" ");
    case "PLL":
      return "U1 U2 U3 U4 U5 U6 U7 U8 U9";
    case "OLL":
      return "U1 U2 U3 U4 U5 U6 U7 U8 U9 F1 F2 F3 L1 F2 L3 B1 B2 B3 R1 R2 R3";
    default:
      return type;
  }
}
/**
 * 公式反转
 * @param formula
 * @returns
 */
export function getReverseFormula(arr) {
  // const arr = formula.split(/ +/);
  let reverseFormula = "";
  for (let i = arr.length - 1; i >= 0; i--) {
    arr[i] = arr[i].replace(" ", "");
    if (arr[i] == "") continue;
    if (arr[i].indexOf("2") > -1) {
      reverseFormula += " " + arr[i];
      continue;
    }
    if (arr[i].indexOf("'") == -1) {
      reverseFormula += " " + arr[i] + "'";
    } else {
      reverseFormula += " " + arr[i].replace("'", "");
    }
  }
  return reverseFormula.substring(1).split(" ");
}

export async function loadData() {
  let data = [];
  let result = {};
  try {
    const response = await fetch("/cubecode.xlsx");
    const arrayBuffer = await response.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: "array" });

    //#region 获取blindCode工作表
    let worksheet = workbook.Sheets["blindcode"];

    // 将工作表转换为JSON数据，使用header: 1获取原始数组格式
    let rawData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    // 获取表头（第一行）
    let headers = rawData[0];

    // 将数据转换为对象数组，使用表头作为属性名
    data = rawData.slice(1).map((row) => {
      const obj = {};
      headers.forEach((header, index) => {
        obj[header] = row[index];
      });
      return obj;
    });
    result.blindCode = data;
    //#endregion

    //#region 获取blindformula工作表
    worksheet = workbook.Sheets["blindformula"];

    // 将工作表转换为JSON数据，使用header: 1获取原始数组格式
    rawData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    // 获取表头（第一行）
    headers = rawData[0];

    // 将数据转换为对象数组，使用表头作为属性名
    data = rawData.slice(1).map((row) => {
      const obj = {};
      headers.forEach((header, index) => {
        obj[header] = row[index];
      });
      return obj;
    });
    result.blindformula = data;
    //#endregion

    //#region 获取cfop工作表
    worksheet = workbook.Sheets["cfop"];

    // 将工作表转换为JSON数据，使用header: 1获取原始数组格式
    rawData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    // 获取表头（第一行）
    headers = rawData[0];

    // 将数据转换为对象数组，使用表头作为属性名
    data = rawData.slice(1).map((row) => {
      const obj = {};
      headers.forEach((header, index) => {
        obj[header] = row[index];
      });
      return obj;
    });
    result.cfop = data;
    //#endregion

    //#region 获取special工作表
    worksheet = workbook.Sheets["special"];

    // 将工作表转换为JSON数据，使用header: 1获取原始数组格式
    rawData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    // 获取表头（第一行）
    headers = rawData[0];

    // 将数据转换为对象数组，使用表头作为属性名
    data = rawData.slice(1).map((row) => {
      const obj = {};
      headers.forEach((header, index) => {
        obj[header] = row[index];
      });
      return obj;
    });
    result.special = data;
    //#endregion
  } catch (error) {
    console.error("读取Excel文件失败:", error);
  }
  return result;
}
