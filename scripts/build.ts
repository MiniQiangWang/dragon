import webpack from "webpack";
import MainProcessWebpackConfig from "../build/webpack.config.main.prod";
import RendererWebpackConfig from "../build/webpack.config.renderer.prod";

async function buildMainProcess() {
  console.log("构建主进程");
  await new Promise((resolve, reject) => {
    webpack(MainProcessWebpackConfig, err => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
  console.log("主进程构建完成");
}

async function buildRendererProcess() {
  console.log("构建渲染进程");
  await new Promise((resolve, reject) => {
    webpack(RendererWebpackConfig, err => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
  console.log("渲染进程构建完成");
}

async function main() {
  await buildMainProcess();
  await buildRendererProcess();
}

main();
