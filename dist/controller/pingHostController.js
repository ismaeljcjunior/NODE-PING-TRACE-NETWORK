var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/controller/pingHostController.ts
var pingHostController_exports = {};
__export(pingHostController_exports, {
  executePing: () => executePing,
  getIps: () => getIps,
  runPing: () => runPing,
  runPingMain: () => runPingMain
});
module.exports = __toCommonJS(pingHostController_exports);
var import_ping = __toESM(require("ping"));
var import_moment = __toESM(require("moment"));
var import_client = require("@prisma/client");
var date = (0, import_moment.default)();
var prisma = new import_client.PrismaClient();
var runPingMain = async () => {
  const dateFormat = date.format("HH:mm:ss:mm DD/MM/YYYY ");
  console.log("runPingMain:", dateFormat);
  let hostTest = "8.8.8.8";
  try {
    import_ping.default.sys.probe(hostTest, async function(isAlive) {
      if (isAlive) {
        console.log(`Ping host Test  ${hostTest} isAlive 
`);
        await runPing();
      } else {
        console.log("Ping isDead");
      }
    });
  } catch (e) {
    console.log("Error: ", e);
  }
};
var runPing = async () => {
  try {
    const ipHost = await getIps();
    executePing(ipHost);
  } catch (e) {
    console.log(e);
  }
};
var getIps = async () => {
  const listIp = await prisma.$queryRawUnsafe(`SELECT * FROM networktracker.host`);
  return listIp;
};
var executePing = async (ipHost) => {
  console.log("executePing", ipHost.length);
  try {
    const pingPromises = ipHost.map((host) => {
      return new Promise((resolve, reject) => {
        if (host.IP_GATEWAY_HOST) {
          import_ping.default.promise.probe(host.IP_GATEWAY_HOST).then((res) => {
            if (res.alive) {
              console.log("ping live", res.inputHost);
              resolve("ping alive");
            } else {
              console.log("ping dead", res.inputHost);
              resolve("ping dead");
            }
          }).catch((error) => {
            reject(error);
          });
        } else {
          resolve("IP_GATEWAY_HOST is undefined");
        }
      });
    });
    return Promise.all(pingPromises);
  } catch (e) {
    console.log(e);
    return [];
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  executePing,
  getIps,
  runPing,
  runPingMain
});
