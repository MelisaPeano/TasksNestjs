import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { UnauthorizedException } from "@nestjs/common";
// pasos para este testing
// 1. Crear el moking module user y Jwt y sus métodos
// como primer paso espero que AuthService este definido
// luego cree un grupo de test para la función "validate users" del servicio AuthService
// simulo la llamada a findOne con un mock usuario
// testeo la respuesta sin el password
// Simular el comportamiento de `findOne` con un usuario con contraseña incorrecta
// Debe devolver `null` cuando la contraseña no coincide
// Simulamos que no se encuentra ningún usuario con el email indicado "findOne"
// testeo el método "singIn" simulo que el usuario existe y la contraseña es correcta
// además que me devuelve el JWT token

describe("AuthService", () => {
  let authService: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findOne: jest.fn(),
            createOneUsers: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            singAsync: jest.fn().mockReturnValue("mockedToken"),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });
  it("should be defined", () => {
    expect(authService).toBeDefined();
  });
  describe("validateUser", () => {
    it("should return the user without password if credentials are valid", async () => {
      const mockUser = {
        email: "testUser@test.com",
        name: "testUser",
        createdAt: new Date(),
        updateaT: new Date(),
        username: "testUser",
        password: "12345",
        id: "eref4543",
      };
      jest.spyOn(usersService, "findOne").mockResolvedValue(mockUser);
      const { password, ...userWithoutPassword } = mockUser;
      const result = await authService.validateUser(
        "testUser@test.com",
        "12345",
      );
      expect(result).toEqual(mockUser);
    });
    it("should return null if credentials are invalid", async () => {
      const mockUser = {
        email: "testUser@test.com",
        name: "testUser",
        createdAt: new Date(),
        updateaT: new Date(),
        username: "testUser",
        password: "12345",
        id: "eref4543",
      };
      jest.spyOn(usersService, "findOne").mockResolvedValue(mockUser);
      const result = await authService.validateUser("testUser", "12385");
      expect(result).toBeNull();
    });

    it("should return null if user is not found", async () => {
      jest.spyOn(usersService, "findOne").mockResolvedValue(null);

      const result = await authService.validateUser(
        "nonExistentUser",
        "password",
      );
      expect(result).toBeNull();
    });
  });
  describe("signIn", () => {
    it("should throw an UnauthorizedException if credentials are invalid", async () => {
      const mockUser = {
        email: "testUser@test.com",
        name: "testUser",
        createdAt: new Date(),
        updateaT: new Date(),
        username: "testUser",
        password: "12345",
        id: "eref4543",
      };
      jest.spyOn(usersService, "findOne").mockResolvedValue(mockUser);
      // Esperar que se lance una excepción si las credenciales son incorrectas
      await expect(authService.signIn("testUser", "12345")).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
  describe("findOrCreateUser", () => {
    it("should return an existing user if found", async () => {
      const mockUser = {
        email: "testUser@test.com",
        name: "testUser",
        createdAt: new Date(),
        updateaT: new Date(),
        username: "testUser",
        password: "12345",
        id: "eref4543",
      };
      // Simulamos que el usuario ya existe
      jest.spyOn(usersService, "findOne").mockResolvedValue(mockUser);
      const result = await authService.findOrCreateUser(mockUser);
      expect(result).toEqual(mockUser);
    });
    it("should create a new user if not found", async () => {
      const mockUser = {
        email: "testUser@test.com",
        name: "testUser",
        createdAt: new Date(),
        updateaT: new Date(),
        username: "testUser",
        password: "12345",
        id: "eref4543",
      };
      // Simulamos que el usuario no existe
      jest.spyOn(usersService, "findOne").mockResolvedValue(null);
      // Simulamos la creación de un nuevo usuario
      jest.spyOn(usersService, "createOneUsers").mockResolvedValue(mockUser);
      const result = await authService.findOrCreateUser(mockUser);
      expect(result).toEqual(mockUser);
    });
  });
});
