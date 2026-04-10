const { transpileToHtml, transpileToBase } = require("../scripts/transpiler/baseTranspiler");

const useBaseTranspiler = (data) =>{
   const transpiledHtml  = transpileToHtml(data)
   const transpiledBase = transpileToBase(data)

   return {transpiledBase, transpiledHtml}
};

module.exports = useBaseTranspiler