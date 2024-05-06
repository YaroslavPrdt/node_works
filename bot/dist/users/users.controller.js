"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const base_controller_1 = require("../common/base.controller");
const inversify_1 = require("inversify");
const types_1 = require("../types");
require("reflect-metadata");
const user_register_dto_1 = require("./dto/user-register.dto");
const users_service_1 = require("./users.service");
const validate_middleware_1 = require("../common/validate.middleware");
let UserController = class UserController extends base_controller_1.BaseController {
    constructor(loggerService, userService) {
        super(loggerService);
        this.loggerService = loggerService;
        this.userService = userService;
        this.bindRoutes([
            {
                path: '/register',
                method: 'post',
                func: this.register,
                middlewares: [new validate_middleware_1.ValidateMiddleware(user_register_dto_1.UserRegisterDto)],
            },
            { path: '/login', method: 'post', func: this.login },
        ]);
    }
    login(req, res, next) {
        console.log(req.body);
        next(this.ok(res, 'login'));
    }
    register(_a, res_1, next_1) {
        return __awaiter(this, arguments, void 0, function* ({ body }, res, next) {
            const result = yield this.userService.createUser(body);
            if (!result) {
                return next(this.send(res, 422, 'Такой пользователь уже существует'));
            }
            this.ok(res, result);
        });
    }
};
exports.UserController = UserController;
exports.UserController = UserController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.ILogger)),
    __param(1, (0, inversify_1.inject)(types_1.TYPES.UserService)),
    __metadata("design:paramtypes", [Object, users_service_1.UserService])
], UserController);
//# sourceMappingURL=users.controller.js.map