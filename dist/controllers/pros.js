"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var client_1 = require("@prisma/client");
var prosRouter = require("express").Router();
var prisma = new client_1.PrismaClient();
prosRouter.get("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var pros;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.pros.findMany()];
            case 1:
                pros = _a.sent();
                res.json(pros);
                return [2 /*return*/];
        }
    });
}); });
// authorization : admin only
prosRouter.post("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, email, hashedPassword, adress, phone, postal_code, city, siret, pros;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, email = _a.email, hashedPassword = _a.hashedPassword, adress = _a.adress, phone = _a.phone, postal_code = _a.postal_code, city = _a.city, siret = _a.siret;
                return [4 /*yield*/, prisma.pros.create({
                        data: {
                            name: name,
                            email: email,
                            hashedPassword: hashedPassword,
                            adress: adress,
                            phone: phone,
                            postal_code: postal_code,
                            city: city,
                            siret: siret
                        }
                    })];
            case 1:
                pros = _b.sent();
                res.status(200).json(pros);
                return [2 /*return*/];
        }
    });
}); });
prosRouter.put("/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, prosUpdate;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = parseInt(req.params.id);
                return [4 /*yield*/, prisma.pros.update({
                        where: {
                            id_pros: id
                        },
                        data: {
                            name: req.body.name,
                            email: req.body.email,
                            hashedPassword: req.body.hashedPassword,
                            adress: req.body.adress,
                            phone: req.body.phone,
                            postal_code: req.body.postal_code,
                            city: req.body.city,
                            siret: req.body.siret
                        }
                    })];
            case 1:
                prosUpdate = _a.sent();
                res.json(prosUpdate);
                return [2 /*return*/];
        }
    });
}); });
prosRouter["delete"]("/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, prosDelete;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = parseInt(req.params.id);
                return [4 /*yield*/, prisma.pros["delete"]({
                        where: {
                            id_pros: id
                        }
                    })];
            case 1:
                prosDelete = _a.sent();
                res.status(200).json(prosDelete).send("User deleted!");
                return [2 /*return*/];
        }
    });
}); });
module.exports = prosRouter;
//# sourceMappingURL=pros.js.map