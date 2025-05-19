// 此文件实现了魔方的2D界面自动化旋转功能

/**
 * 顺时针旋转一个面
 * @param {Array} faceMatrix - 3x3的面矩阵
 * @returns {Array} - 旋转后的新矩阵
 */
const rotateFaceClockwise = (faceMatrix) => {
  return [
    [faceMatrix[2][0], faceMatrix[1][0], faceMatrix[0][0]],
    [faceMatrix[2][1], faceMatrix[1][1], faceMatrix[0][1]],
    [faceMatrix[2][2], faceMatrix[1][2], faceMatrix[0][2]],
  ];
};

/**
 * 逆时针旋转一个面
 * @param {Array} faceMatrix - 3x3的面矩阵
 * @returns {Array} - 旋转后的新矩阵
 */
const rotateFaceCounterclockwise = (faceMatrix) => {
  return [
    [faceMatrix[0][2], faceMatrix[1][2], faceMatrix[2][2]],
    [faceMatrix[0][1], faceMatrix[1][1], faceMatrix[2][1]],
    [faceMatrix[0][0], faceMatrix[1][0], faceMatrix[2][0]],
  ];
};

/**
 * 顺时针旋转整个魔方
 * 面的编号说明：
 * 0: 上面(U)  1: 前面(F)  2: 右面(R)
 * 3: 后面(B)  4: 左面(L)  5: 下面(D)
 * @param {Array} cube - 魔方的当前状态
 * @returns {Array} - 旋转后的新状态
 */
const rotateFullCubeClockwise = (cube) => {
  let newCube = JSON.parse(JSON.stringify(cube));

  // Rotate Right (2) clockwise and Left (4) counterclockwise
  newCube[2] = rotateFaceClockwise(cube[2]);
  newCube[4] = rotateFaceCounterclockwise(cube[4]);

  // Swap Front, Up, Back, and Down faces

  newCube[1][0] = cube[5][0]; // Front takes Down
  newCube[1][1] = cube[5][1]; // Front takes Down
  newCube[1][2] = cube[5][2]; // Front takes Down

  newCube[5][0] = cube[3][2]; // Down takes Back
  newCube[5][1] = cube[3][1]; // Down takes Back
  newCube[5][2] = cube[3][0]; // Down takes Back

  newCube[3][0] = cube[0][2]; // back takes up
  newCube[3][1] = cube[0][1]; // back takes up
  newCube[3][2] = cube[0][0]; // back takes up

  newCube[0][0] = cube[1][0]; // Up takes Front
  newCube[0][1] = cube[1][1]; // Up takes Front
  newCube[0][2] = cube[1][2]; // Up takes Front

  console.log(newCube);
  return newCube;
};

/**
 * 逆时针旋转整个魔方
 * @param {Array} cube - 魔方的当前状态
 * @returns {Array} - 旋转后的新状态
 */
const rotateFullCubeCounterclockwise = (cube) => {
  let newCube = JSON.parse(JSON.stringify(cube));

  // Rotate Right (2) counterclockwise and Left (4) clockwise
  newCube[2] = rotateFaceCounterclockwise(cube[2]);
  newCube[4] = rotateFaceClockwise(cube[4]);

  // Swap Front, Up, Back, and Down faces in reverse order
  newCube[1][0] = cube[0][0]; // Front takes Up
  newCube[1][1] = cube[0][1]; // Front takes Up
  newCube[1][2] = cube[0][2]; // Front takes Up

  newCube[5][0] = cube[1][0]; // Down takes Front
  newCube[5][1] = cube[1][1]; // Down takes Front
  newCube[5][2] = cube[1][2]; // Down takes Front

  newCube[3][0] = cube[5][0]; // Back takes Down
  newCube[3][1] = cube[5][1]; // Back takes Down
  newCube[3][2] = cube[5][2]; // Back takes Down

  newCube[0][0] = cube[3][2]; // Up takes Back
  newCube[0][1] = cube[3][1]; // Up takes Back
  newCube[0][2] = cube[3][0]; // Up takes Back

  return newCube;
};

/**
 * 顺时针旋转前面(F)
 * 旋转规则：
 * 1. 前面顺时针旋转
 * 2. 上面底行、右面左列、下面顶行、左面右列依次交换
 * @param {Array} cube - 魔方的当前状态
 * @returns {Array} - 旋转后的新状态
 */
const rotateFrontClockwise = (cube) => {
  let newCube = JSON.parse(JSON.stringify(cube));

  // Rotate the Front face clockwise
  newCube[1] = rotateFaceClockwise(cube[1]);

  // Up bottom row takes Left right column (reversed)
  newCube[0][2][0] = cube[4][2][2];
  newCube[0][2][1] = cube[4][1][2];
  newCube[0][2][2] = cube[4][0][2];

  // Left right column takes Down top row
  newCube[4][0][2] = cube[5][0][0];
  newCube[4][1][2] = cube[5][0][1];
  newCube[4][2][2] = cube[5][0][2];

  // Down top row takes Right left column (reversed)
  newCube[5][0][2] = cube[2][0][0];
  newCube[5][0][1] = cube[2][1][0];
  newCube[5][0][0] = cube[2][2][0];

  // Right left column takes Up bottom row
  newCube[2][0][0] = cube[0][2][0];
  newCube[2][1][0] = cube[0][2][1];
  newCube[2][2][0] = cube[0][2][2];

  return newCube;
};

/**
 * 逆时针旋转前面(F)
 * @param {Array} cube - 魔方的当前状态
 * @returns {Array} - 旋转后的新状态
 */
const rotateFrontCounterclockwise = (cube) => {
  let newCube = JSON.parse(JSON.stringify(cube));

  newCube[1] = rotateFaceCounterclockwise(cube[1]);

  // Up bottom row takes Right left column
  newCube[0][2][0] = cube[2][0][0];
  newCube[0][2][1] = cube[2][1][0];
  newCube[0][2][2] = cube[2][2][0];

  // Right left column takes Down top row
  newCube[2][0][0] = cube[5][0][2];
  newCube[2][1][0] = cube[5][0][1];
  newCube[2][2][0] = cube[5][0][0];

  // Down top row takes Left right column
  newCube[5][0][0] = cube[4][0][2];
  newCube[5][0][1] = cube[4][1][2];
  newCube[5][0][2] = cube[4][2][2];

  // Left right column takes Up bottom row
  newCube[4][0][2] = cube[0][2][2];
  newCube[4][1][2] = cube[0][2][1];
  newCube[4][2][2] = cube[0][2][0];

  return newCube;
};

/**
 * 顺时针旋转右面(R)
 * 旋转规则：
 * 1. 右面顺时针旋转
 * 2. 上面右列、前面右列、下面右列、后面左列依次交换
 * @param {Array} cube - 魔方的当前状态
 * @returns {Array} - 旋转后的新状态
 */
const rotateRightClockwise = (cube) => {
  let newCube = JSON.parse(JSON.stringify(cube));

  newCube[2] = rotateFaceClockwise(cube[2]);

  // Up right column takes Front right column
  newCube[0][0][2] = cube[1][0][2];
  newCube[0][1][2] = cube[1][1][2];
  newCube[0][2][2] = cube[1][2][2];

  // Front right column takes Down right column
  newCube[1][0][2] = cube[5][0][2];
  newCube[1][1][2] = cube[5][1][2];
  newCube[1][2][2] = cube[5][2][2];

  // Down right column takes Back left column (reversed)
  newCube[5][0][2] = cube[3][2][0];
  newCube[5][1][2] = cube[3][1][0];
  newCube[5][2][2] = cube[3][0][0];

  // Back left column takes Up right column (reversed)
  newCube[3][0][0] = cube[0][2][2];
  newCube[3][1][0] = cube[0][1][2];
  newCube[3][2][0] = cube[0][0][2];

  return newCube;
};

/**
 * 逆时针旋转右面(R)
 * @param {Array} cube - 魔方的当前状态
 * @returns {Array} - 旋转后的新状态
 */
const rotateRightCounterclockwise = (cube) => {
  let newCube = JSON.parse(JSON.stringify(cube));

  newCube[2] = rotateFaceCounterclockwise(cube[2]);

  // Up right column takes Back left column (reversed)
  newCube[0][0][2] = cube[3][2][0];
  newCube[0][1][2] = cube[3][1][0];
  newCube[0][2][2] = cube[3][0][0];

  // Back left column takes Down right column (reversed)
  newCube[3][0][0] = cube[5][2][2];
  newCube[3][1][0] = cube[5][1][2];
  newCube[3][2][0] = cube[5][0][2];

  // Down right column takes Front right column
  newCube[5][0][2] = cube[1][0][2];
  newCube[5][1][2] = cube[1][1][2];
  newCube[5][2][2] = cube[1][2][2];

  // Front right column takes Up right column
  newCube[1][0][2] = cube[0][0][2];
  newCube[1][1][2] = cube[0][1][2];
  newCube[1][2][2] = cube[0][2][2];

  return newCube;
};

/**
 * 顺时针旋转左面(L)
 * 旋转规则：
 * 1. 左面顺时针旋转
 * 2. 上面左列、后面右列、下面左列、前面左列依次交换
 * @param {Array} cube - 魔方的当前状态
 * @returns {Array} - 旋转后的新状态
 */
const rotateLeftClockwise = (cube) => {
  let newCube = JSON.parse(JSON.stringify(cube));

  newCube[4] = rotateFaceClockwise(cube[4]);

  // Up left column takes Back right column (reversed)
  newCube[0][0][0] = cube[3][2][2];
  newCube[0][1][0] = cube[3][1][2];
  newCube[0][2][0] = cube[3][0][2];

  // Back right column takes Down left column (reversed)
  newCube[3][0][2] = cube[5][2][0];
  newCube[3][1][2] = cube[5][1][0];
  newCube[3][2][2] = cube[5][0][0];

  // Down left column takes Front left column
  newCube[5][0][0] = cube[1][0][0];
  newCube[5][1][0] = cube[1][1][0];
  newCube[5][2][0] = cube[1][2][0];

  // Front left column takes Up left column
  newCube[1][0][0] = cube[0][0][0];
  newCube[1][1][0] = cube[0][1][0];
  newCube[1][2][0] = cube[0][2][0];

  return newCube;
};

/**
 * 逆时针旋转左面(L)
 * @param {Array} cube - 魔方的当前状态
 * @returns {Array} - 旋转后的新状态
 */
const rotateLeftCounterclockwise = (cube) => {
  let newCube = JSON.parse(JSON.stringify(cube));

  newCube[4] = rotateFaceCounterclockwise(cube[4]);

  // Up left column takes Front left column
  newCube[0][0][0] = cube[1][0][0];
  newCube[0][1][0] = cube[1][1][0];
  newCube[0][2][0] = cube[1][2][0];

  // Front left column takes Down left column
  newCube[1][0][0] = cube[5][0][0];
  newCube[1][1][0] = cube[5][1][0];
  newCube[1][2][0] = cube[5][2][0];

  // Down left column takes Back right column (reversed)
  newCube[5][0][0] = cube[3][2][2];
  newCube[5][1][0] = cube[3][1][2];
  newCube[5][2][0] = cube[3][0][2];

  // Back right column takes Up left column (reversed)
  newCube[3][0][2] = cube[0][2][0];
  newCube[3][1][2] = cube[0][1][0];
  newCube[3][2][2] = cube[0][0][0];

  return newCube;
};

/**
 * 顺时针旋转上面(U)
 * 旋转规则：
 * 1. 上面顺时针旋转
 * 2. 前面顶行、右面顶行、后面顶行、左面顶行依次交换
 * @param {Array} cube - 魔方的当前状态
 * @returns {Array} - 旋转后的新状态
 */
const rotateUpClockwise = (cube) => {
  let newCube = JSON.parse(JSON.stringify(cube));

  newCube[0] = rotateFaceClockwise(cube[0]);

  // Save original top rows
  const frontTopRow = [...cube[1][0]];
  const rightTopRow = [...cube[2][0]];
  const backTopRow = [...cube[3][0]];
  const leftTopRow = [...cube[4][0]];

  // Front top row takes Right top row
  newCube[1][0] = rightTopRow;
  // Right top row takes Back top row
  newCube[2][0] = backTopRow;
  // Back top row takes Left top row
  newCube[3][0] = leftTopRow;
  // Left top row takes Front top row
  newCube[4][0] = frontTopRow;

  return newCube;
};

/**
 * 逆时针旋转上面(U)
 * @param {Array} cube - 魔方的当前状态
 * @returns {Array} - 旋转后的新状态
 */
const rotateUpCounterclockwise = (cube) => {
  let newCube = JSON.parse(JSON.stringify(cube));

  newCube[0] = rotateFaceCounterclockwise(cube[0]);

  // Save original top rows
  const frontTopRow = [...cube[1][0]];
  const rightTopRow = [...cube[2][0]];
  const backTopRow = [...cube[3][0]];
  const leftTopRow = [...cube[4][0]];

  // Front top row takes Left top row
  newCube[1][0] = leftTopRow;
  // Left top row takes Back top row
  newCube[4][0] = backTopRow;
  // Back top row takes Right top row
  newCube[3][0] = rightTopRow;
  // Right top row takes Front top row
  newCube[2][0] = frontTopRow;

  return newCube;
};

/**
 * 顺时针旋转下面(D)
 * 旋转规则：
 * 1. 下面顺时针旋转
 * 2. 前面底行、左面底行、后面底行、右面底行依次交换
 * @param {Array} cube - 魔方的当前状态
 * @returns {Array} - 旋转后的新状态
 */
const rotateDownClockwise = (cube) => {
  let newCube = JSON.parse(JSON.stringify(cube));

  newCube[5] = rotateFaceClockwise(cube[5]);

  // Save original bottom rows
  const frontBottomRow = [...cube[1][2]];
  const rightBottomRow = [...cube[2][2]];
  const backBottomRow = [...cube[3][2]];
  const leftBottomRow = [...cube[4][2]];

  // Front bottom row takes Left bottom row
  newCube[1][2] = leftBottomRow;
  // Left bottom row takes Back bottom row
  newCube[4][2] = backBottomRow;
  // Back bottom row takes Right bottom row
  newCube[3][2] = rightBottomRow;
  // Right bottom row takes Front bottom row
  newCube[2][2] = frontBottomRow;

  return newCube;
};

/**
 * 逆时针旋转下面(D)
 * @param {Array} cube - 魔方的当前状态
 * @returns {Array} - 旋转后的新状态
 */
const rotateDownCounterclockwise = (cube) => {
  let newCube = JSON.parse(JSON.stringify(cube));

  newCube[5] = rotateFaceCounterclockwise(cube[5]);

  // Save original bottom rows
  const frontBottomRow = [...cube[1][2]];
  const rightBottomRow = [...cube[2][2]];
  const backBottomRow = [...cube[3][2]];
  const leftBottomRow = [...cube[4][2]];

  // Front bottom row takes Right bottom row
  newCube[1][2] = rightBottomRow;
  // Right bottom row takes Back bottom row
  newCube[2][2] = backBottomRow;
  // Back bottom row takes Left bottom row
  newCube[3][2] = leftBottomRow;
  // Left bottom row takes Front bottom row
  newCube[4][2] = frontBottomRow;

  return newCube;
};

/**
 * 顺时针旋转后面(B)
 * 旋转规则：
 * 1. 后面顺时针旋转（从魔方背面看）
 * 2. 上面顶行、左面左列、下面底行、右面右列依次交换
 * @param {Array} cube - 魔方的当前状态
 * @returns {Array} - 旋转后的新状态
 */
const rotateBackClockwise = (cube) => {
  let newCube = JSON.parse(JSON.stringify(cube));

  //对于背面，从解算器的角度来看，在立方体的框架中顺时针旋转实际上是逆时针旋转
  newCube[3] = rotateFaceCounterclockwise(cube[3]);

  //上顶行取左左列（反向）
  newCube[0][0][0] = cube[4][2][0];
  newCube[0][0][1] = cube[4][1][0];
  newCube[0][0][2] = cube[4][0][0];

  // 左-左列取下最下面一行（反向）
  newCube[4][0][0] = cube[5][2][0];
  newCube[4][1][0] = cube[5][2][1];
  newCube[4][2][0] = cube[5][2][2];

  // 下一行为右列
  newCube[5][2][0] = cube[2][2][2];
  newCube[5][2][1] = cube[2][1][2];
  newCube[5][2][2] = cube[2][0][2];

  // 右列占据顶行（反向）
  newCube[2][0][2] = cube[0][0][0];
  newCube[2][1][2] = cube[0][0][1];
  newCube[2][2][2] = cube[0][0][2];

  return newCube;
};

/**
 * 逆时针旋转后面(B)
 * @param {Array} cube - 魔方的当前状态
 * @returns {Array} - 旋转后的新状态
 */
const rotateBackCounterclockwise = (cube) => {
  let newCube = JSON.parse(JSON.stringify(cube));

  // For the Back face, rotating counterclockwise in the cube's frame
  // is actually clockwise from the solver's perspective
  newCube[3] = rotateFaceClockwise(cube[3]);

  // Up top row takes Right right column
  newCube[0][0][0] = cube[2][0][2];
  newCube[0][0][1] = cube[2][1][2];
  newCube[0][0][2] = cube[2][2][2];

  // Right right column takes Down bottom row (reversed)
  newCube[2][0][2] = cube[5][2][2];
  newCube[2][1][2] = cube[5][2][1];
  newCube[2][2][2] = cube[5][2][0];

  // Down bottom row takes Left left column
  newCube[5][2][0] = cube[4][0][0];
  newCube[5][2][1] = cube[4][1][0];
  newCube[5][2][2] = cube[4][2][0];

  // Left left column takes Up top row (reversed)
  newCube[4][0][0] = cube[0][0][2];
  newCube[4][1][0] = cube[0][0][1];
  newCube[4][2][0] = cube[0][0][0];

  return newCube;
};

/**
 * 顺时针旋转 x 轴中间层（M 层，左向右看为顺时针）
 * @param {Array} cube - 魔方的当前状态
 * @returns {Array} - 旋转后的新状态
 */
const rotateMiddleLayerX = (cube) => {
  let newCube = JSON.parse(JSON.stringify(cube));
  // 只操作中间层（y=1）
  // 前面中列 -> 上面中列 -> 后面中列 -> 下面中列 -> 前面中列
  for (let i = 0; i < 3; i++) {
    newCube[0][i][1] = cube[1][i][1]; // 上 <- 前
    newCube[3][2 - i][1] = cube[0][i][1]; // 后 <- 上（注意后面顺序反向）
    newCube[5][i][1] = cube[3][2 - i][1]; // 下 <- 后
    newCube[1][i][1] = cube[5][i][1]; // 前 <- 下
  }
  return newCube;
};

/**
 * 顺时针旋转 y 轴中间层（E 层，从上往下看为顺时针）
 * @param {Array} cube - 魔方的当前状态
 * @returns {Array} - 旋转后的新状态
 */
const rotateMiddleLayerY = (cube) => {
  let newCube = JSON.parse(JSON.stringify(cube));
  // 只操作中间层（y=1）
  // 前面中行 -> 右面中行 -> 后面中行 -> 左面中行 -> 前面中行
  for (let i = 0; i < 3; i++) {
    newCube[2][1][i] = cube[1][1][i]; // 右 <- 前
    newCube[3][1][i] = cube[2][1][i]; // 后 <- 右
    newCube[4][1][i] = cube[3][1][i]; // 左 <- 后
    newCube[1][1][i] = cube[4][1][i]; // 前 <- 左
  }
  return newCube;
};

/**
 * 顺时针旋转 z 轴中间层（S 层，从前往后看为顺时针）
 * @param {Array} cube - 魔方的当前状态
 * @returns {Array} - 旋转后的新状态
 */
const rotateMiddleLayerZ = (cube) => {
  let newCube = JSON.parse(JSON.stringify(cube));
  // 只操作中间层（z=1）
  // 上面中行 -> 右面中列 -> 下面中行 -> 左面中列 -> 上面中行
  for (let i = 0; i < 3; i++) {
    newCube[2][i][1] = cube[0][1][i]; // 右 <- 上
    newCube[5][1][2 - i] = cube[2][i][1]; // 下 <- 右（下行顺序反向）
    newCube[4][2 - i][1] = cube[5][1][2 - i]; // 左 <- 下（左列顺序反向）
    newCube[0][1][i] = cube[4][2 - i][1]; // 上 <- 左
  }
  return newCube;
};

/**
 * 同时顺时针旋转右面(R)和x轴中间层(M)
 * @param {Array} cube - 魔方的当前状态
 * @returns {Array} - 旋转后的新状态
 */
const rotateRightAndMiddleXClockwise = (cube) => {
  let newCube = JSON.parse(JSON.stringify(cube));

  // 右面顺时针旋转
  newCube[2] = rotateFaceClockwise(cube[2]);
  // Up right column <- Front right column
  newCube[0][0][2] = cube[1][0][2];
  newCube[0][1][2] = cube[1][1][2];
  newCube[0][2][2] = cube[1][2][2];
  // Front right column <- Down right column
  newCube[1][0][2] = cube[5][0][2];
  newCube[1][1][2] = cube[5][1][2];
  newCube[1][2][2] = cube[5][2][2];
  // Down right column <- Back left column (reversed)
  newCube[5][0][2] = cube[3][2][0];
  newCube[5][1][2] = cube[3][1][0];
  newCube[5][2][2] = cube[3][0][0];
  // Back left column <- Up right column (reversed)
  newCube[3][0][0] = cube[0][2][2];
  newCube[3][1][0] = cube[0][1][2];
  newCube[3][2][0] = cube[0][0][2];

  // x轴中间层(M)顺时针旋转
  for (let i = 0; i < 3; i++) {
    newCube[0][i][1] = cube[1][i][1]; // 上 <- 前
    newCube[3][2 - i][1] = cube[0][i][1]; // 后 <- 上（注意后面顺序反向）
    newCube[5][i][1] = cube[3][2 - i][1]; // 下 <- 后
    newCube[1][i][1] = cube[5][i][1]; // 前 <- 下
  }

  return newCube;
};

// ... existing code ...
export {
  rotateFrontClockwise,
  rotateFrontCounterclockwise,
  rotateRightClockwise,
  rotateRightCounterclockwise,
  rotateLeftClockwise,
  rotateLeftCounterclockwise,
  rotateUpClockwise,
  rotateUpCounterclockwise,
  rotateDownClockwise,
  rotateDownCounterclockwise,
  rotateBackClockwise,
  rotateBackCounterclockwise,
  rotateFullCubeClockwise,
  rotateFullCubeCounterclockwise,
  rotateMiddleLayerX,
  rotateMiddleLayerY,
  rotateMiddleLayerZ,
  rotateRightAndMiddleXClockwise,
};
