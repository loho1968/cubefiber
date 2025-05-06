import * as XLSX from "xlsx";
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
