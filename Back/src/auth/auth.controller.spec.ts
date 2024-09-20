import { Test, TestingModule } from "@nestjs/testing";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { LocalStrategy } from "./local.strategy";

describe("AuthController", () => {
  let controller: AuthController;
  let authService: AuthService;
  const mockAuthService = {
    // Mocking the AuthService
    signIn: jest.fn((email, password) => {
      return { access_token: "fake_token" }; // Mocking a signIn response
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: LocalStrategy, useValue: {} }, // Mocking LocalStrategy
      ],
    }).compile();
    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
  it("should return an access token", async () => {
    const result = await controller.signIn({
      email: "test@example.com",
      password: "password123",
    });
    expect(result).toEqual({ access_token: "fake_token" });
    expect(authService.signIn).toHaveBeenCalledWith(
      "test@example.com",
      "password123",
    );
  });
});
