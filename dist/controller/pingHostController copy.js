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

// src/controller/pingHostController copy.ts
var pingHostController_copy_exports = {};
__export(pingHostController_copy_exports, {
  getIps: () => getIps,
  runPing: () => runPing,
  runPingMain: () => runPingMain
});
module.exports = __toCommonJS(pingHostController_copy_exports);
var import_ping = __toESM(require("ping"));
var import_moment = __toESM(require("moment"));
var import_client = require("@prisma/client");
var date = (0, import_moment.default)();
var prisma = new import_client.PrismaClient();
var hosts = ["192.168.1.1", "google.com", "yahoo.com"];
var runPing = () => {
  hosts.forEach(function(host) {
    import_ping.default.promise.probe(host).then(function(res) {
      if (res.alive) {
        console.log("ping alive", res.host);
      } else {
        console.log("ping dead");
      }
      console.log(res);
    });
  });
};
var runPingMain = () => {
  const dateFormat = date.format("HH:mm:ss:mm DD/MM/YYYY ");
  console.log("A ping", dateFormat);
  let hostTest = "192.168.25.48";
  try {
    const dateFormat1 = date.format("HH:mm:ss:mm DD/MM/YYYY ");
    console.log("D ping", dateFormat1);
    import_ping.default.sys.probe(hostTest, function(isAlive) {
      const dateFormat2 = date.format("HH:mm:ss:mm DD/MM/YYYY ");
      if (isAlive) {
        console.log("Ping isAlive", dateFormat);
      } else {
        console.log("Ping isDead", dateFormat);
      }
    });
  } catch (e) {
    console.log("Error: ", e);
  }
};
var getIps = async () => {
  const listIp = await prisma.$queryRawUnsafe(`SELECT * FROM networktracker.host`);
  return listIp;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getIps,
  runPing,
  runPingMain
});
