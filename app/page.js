"use client";
import HeaderBase from "./components/HeaderBase.js";
import Link from "next/link";
import { Button, Flex, Radio, Switch, Table, TableColumnsType } from "antd";
import Search from "antd/es/input/Search";
import { EditOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { loadData, getReverseFormula } from "./components/baseFunction";
import target from "three/src/nodes/core/Node";
//重点参考
//https://github.com/starkeyyyy/3d-Rubiks-cube

//https://blog.songxingguo.com/posts/tech/react-three-fiber-cube/
//https://abhtri.medium.com/rubiks-cube-in-react-three-fiber-0e8d81fae769
//https://medium.com/@nicholasrogers_98170/building-a-rubiks-cube-in-react-three-js-and-good-ole-javascript-96649d1172d9
//https://github.com/selfboot/ai_gallery

export default function Home() {
  //#region 基础设置、变量
  //盲拧公式表格的列
  const blindColumns = [
    {
      title: "编码",
      key: "编码",
      dataIndex: "编码",
      width: 70,
      align: "center",
    },
    {
      title: "助记码",
      key: "助记码",
      dataIndex: "助记码",
      align: "center",
    },
    {
      title: "镜向",
      key: "镜像公式编码",
      dataIndex: "镜像公式编码",
      width: 65,
      align: "center",
    },
  ];
  const [cfopGroups, setCfopGroups] = useState([]);

  const cfopColumns = [
    {
      title: "编码",
      dataIndex: "编码",
      align: "center",
    },
    {
      title: "名称",
      dataIndex: "名称",
      align: "center",
    },
    {
      title: "分组",
      dataIndex: "分组",
      align: "center",
      showSorterTooltip: { target: "full-header" },
      sorter: (a, b) => a.分组 > b.分组,
      sortDirections: ["ascend", "descend"],
      defaultSortOrder: "descend",
      filters: cfopGroups,
      onFilter: (value, record) => record.分组.indexOf(value) === 0,
    },
  ];

  const [currentFormula, setCurrentFormula] = useState({}); //当前公式，点击表格行，或者直接输入公式后改变

  const [tabColumns, setTabColumns] = useState(blindColumns);

  const [blindCode, setBlindCode] = useState([]); //盲拧公式编码
  const [blindFormula, setBlindFormula] = useState([]); //盲拧公式数据
  const [cfopFormula, setCfopFormula] = useState([]);
  const [specialFormula, setSpecialFormula] = useState([]);

  const [cubeFormula, setCubeFormula] = useState([]); //用于表格显示的公式数据,
  const [tmpFormula, setTmpFormula] = useState("");

  const [cfopType, setCfopType] = useState("F2L");

  const [formulaType, setFormulaType] = useState("blind");
  //#endregion
  //#region 加载数据数据

  useEffect(() => {
    document.title = "魔方学习";

    async function fetchPosts() {
      const res = await loadData();
      let tmp = getCFOPGroup(res.cfop);
      tmp = tmp.map((item) => {
        return { text: item, value: item };
      });
      setCfopGroups(tmp);
      setBlindCode(res.blindCode);
      setBlindFormula(res.blindformula);
      setCfopFormula(res.cfop);
      setSpecialFormula(res.special);
    }
    fetchPosts();
  }, []);

  //React的状态更新是异步的 添加新的 useEffect 来监听 blindData 的变化
  useEffect(() => {
    setCubeFormulaData();
  }, [blindCode]);

  //React的状态更新是异步的 添加新的 useEffect 来监听 blindData 的变化
  useEffect(() => {}, [blindCode]);
  //#endregion

  //#region 基础函数
  //切换公式数据
  const setCubeFormulaData = (type = "blind") => {
    switch (type) {
      case "cfop":
        cfopFormula.forEach((item, index) => {
          item.id = index;
        });
        const tmp = cfopFormula.filter((item) => {
          return item.类型 === cfopType;
        });
        setTabColumns(cfopColumns);
        setCubeFormula(tmp);
        break;
      case "special":
        setSpecialFormula(specialFormula);
        break;
      case "blind":
      default:
        blindFormula.forEach((item, index) => {
          item.id = index;
        });
        setTabColumns(blindColumns);
        setCubeFormula(blindFormula);
        break;
    }
  };

  //获取CFOP公式分组
  const getCFOPGroup = (data) => {
    let groups = [];
    //把cfopFormula按“分组”属性进行分组，获得分组列表
    data.forEach((item) => {
      if (!groups.includes(item.分组)) {
        groups.push(item.分组);
      }
    });
    return groups;
  };
  //过滤盲拧公式
  const filterBlindData = (code = "", type) => {
    const blindType = type ? "edge" : "corner";
    const data = blindFormula.filter(
      (item) =>
        item.类型 === blindType &&
        (code === "" || item.编码.startsWith(code.toUpperCase())),
    );
    setCubeFormula(data);
  };
  //过滤CFOP公式
  const filterCFOPFormula = (type = "") => {
    if (type === "") type = "F2L";
    const data = cfopFormula.filter((item) => item.类型 === type);
    setCubeFormula(data);
  };

  //#region 点击公式行
  const clickRow = (record) => {
    record.逆向公式 = getReverseFormula(record.公式);
    setCurrentFormula(record);
    // showCube(record, allColorChecked, showCodeChecked);
  };
  //#endregion
  //#region 界面操作
  //公式类型
  const setFormulaTypeValue = ({ target: { value } }) => {
    setFormulaType(value);
    setCubeFormulaData(value);
  };

  //CFOP公式，按公式类型过滤
  const setCfopTypeValue = ({ target: { value } }) => {
    setCfopType(value);
    filterCFOPFormula(value);
  };

  const [edgeChecked, setEdgeChecked] = useState(true);
  //盲拧公式时，按角块、棱块类型过滤
  const setEdgeCheckedValue = (checked) => {
    setEdgeChecked(checked);
    filterBlindData(search, checked);
  };
  //#region 编码搜索
  const [search, setSearch] = useState("");
  const setSearchValue = (value) => {
    setSearch(value);
    filterBlindData(value, edgeChecked);
  };

  const setTmpFormulaValue = (e) => {
    setTmpFormula(e.target.value);
  };
  //#endregion
  //#region cube参数

  //颜色显示
  //颜色显示
  const [allColorChecked, setAllColorChecked] = useState(true);
  const setAllColorCheckedValue = (checked) => {
    setAllColorChecked(checked);
    // if (currentRow) showCube(currentRow, checked, showCodeChecked);
  };
  const [showCodeChecked, setShowCodeChecked] = useState(true);
  const setShowCodeCheckedValue = (checked) => {
    setShowCodeChecked(checked);
    // if (currentRow) showCube(currentRow, allColorChecked, checked);
  };
  //#endregion
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Header */}
      <HeaderBase>
        <div className="flex-auto items-center  flex  ">
          <div className="flex-none items-center justify-center flex ">
            <div className="mt-[-4px] mr-4">
              <Radio.Group
                value={formulaType}
                options={[
                  { label: "盲拧", value: "blind" },
                  { label: "CFOP", value: "cfop" },
                  { label: "特殊", value: "special" },
                ]}
                onChange={setFormulaTypeValue}
                optionType="button"
                buttonStyle="solid"
              ></Radio.Group>
            </div>
            {formulaType === "cfop" && (
              <div className="mt-[-4px]">
                <Radio.Group
                  value={cfopType}
                  options={[
                    { label: "CROSS", value: "CROSS" },
                    { label: "F2L", value: "F2L" },
                    { label: "PLL", value: "PLL" },
                    { label: "OLL", value: "OLL" },
                  ]}
                  onChange={setCfopTypeValue}
                  optionType="button"
                  buttonStyle="solid"
                ></Radio.Group>
              </div>
            )}

            {formulaType === "blind" && (
              <div className="flex ml-4">
                <div className="mr-4">
                  <Switch
                    checkedChildren="棱块"
                    unCheckedChildren="角块"
                    checked={edgeChecked}
                    onChange={setEdgeCheckedValue}
                  />
                </div>
                <div className="flex ml-4 w-[100px]">
                  <Search
                    allowClear
                    placeholder="编码搜索"
                    value={search}
                    maxLength={2}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                </div>
              </div>
            )}
            {/*竖线分割线*/}
            <div className="flex-none ml-4 w-[1px] h-[30px] bg-gray-300"></div>
          </div>
          <div className="flex items-center justify-center ">
            <div className="ml-4 w-[400px] flex-1">
              <Search
                placeholder="输入公式串，点击显示"
                allowClear
                value={tmpFormula}
                onChange={(e) => setTmpFormulaValue(e.target.value)}
              />
            </div>
            <div className="ml-4 ">
              <Switch
                checkedChildren="所有块颜色"
                unCheckedChildren="公式块颜色"
                checked={allColorChecked}
                onChange={setAllColorCheckedValue}
              />
            </div>
            <div className="ml-4">
              <Switch
                checkedChildren="显示编码"
                unCheckedChildren="不显示编码"
                checked={showCodeChecked}
                onChange={setShowCodeCheckedValue}
              />
            </div>
          </div>
        </div>
      </HeaderBase>

      {/* Main Content */}
      <main className="flex flex-1 gap-4 min-h-0">
        {/* Left Panel - 30% */}
        <div className="w-[30%] h-[100%]   overflow-auto border-r-1 border-gray-600">
          <div className="">
            <Table
              dataSource={cubeFormula}
              columns={tabColumns}
              rowKey={(record) => record.id}
              rowHoverable={false}
              bordered={true}
              size="small"
              showSorterTooltip={{ target: "sorter-icon" }}
              pagination={{
                position: ["bottomLeft"],
                align: "start",
                pageSize: 20,
                hideOnSinglePage: true,
                showSizeChanger: false,
                showLessItems: true,
                size: "small",
                showQuickJumper: true,
              }}
              rowClassName={(record, index) => {
                let className = "";
                if (record.id === currentFormula?.id) {
                  className = "dark-" + "currentRow ";
                }
                className += "dark-" + (index % 2 !== 0 ? "oddRow" : "evenRow");
                return className;
              }}
              onRow={(record) => {
                return {
                  onClick: () => {
                    console.log(record);
                    clickRow(record);
                  }, // 点击行
                };
              }}
            />
          </div>
        </div>

        {/* Right Panel - 70% with Canvas */}
        <div className="w-[70%] flex items-center justify-center rounded-lg">
          <div
            className="w-full h-full"
            style={{
              aspectRatio: "1/1",
              maxHeight: "calc(100vh - 96px - 16px)",
            }}
          ></div>
        </div>
      </main>

      {/* Footer */}
      <footer className="h-[48px] shrink-0 bg-gray-800 text-white flex items-center justify-center">
        <p>© 2024 Cube Fiber</p>
      </footer>
    </div>
  );
}
