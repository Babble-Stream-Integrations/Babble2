"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var functions = __importStar(require("firebase-functions"));
var users_1 = __importDefault(require("./routes/users"));
// const addonRoutes = require('./routes/addons');
var auth_1 = __importDefault(require("./routes/auth"));
// const layoutRoutes = require('./routes/layout');
var app = express_1.default();
app.use(express_1.default.urlencoded({
    extended: true,
}));
// twitchService.checkChat();
app.use("/api/v1", users_1.default);
// app.use('/api/v1', addonRoutes);
app.use("/api/v1", auth_1.default);
app.get("/", function (_req, res) {
    return res.send({ result: "hi there handsome ;)" });
});
exports.default = functions.region("europe-west1").https.onRequest(app);
