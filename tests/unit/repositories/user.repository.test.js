const { UserRepository } = require('../../../src/repositories');
const mockingoose = require('mockingoose');
const { User } = require('../../../src/models');
let { UserModelMock: { user, users} } = require ("../../mocks");

describe("User Repository Tests", () => {
    beforeEach(() => {
        mockingoose.resetAll();
        jest.clearAllMocks();
    });

    it("Should return a user by id", async () => {
        const _user = { ...user };
        delete _user.password;
        mockingoose(User).toReturn(user, "findOne");
        const _userRepository = new UserRepository({ User });
        const expected = await _userRepository.get(_user._id);

        expect(JSON.parse(JSON.stringify(expected))).toMatchObject(_user);
    });

    it("Should return a user by username", async () => {
        const _user = { ...user };
        delete _user.password;
        mockingoose(User).toReturn(user, "findOne");

        const _userRepository = new UserRepository({ User });
        const expected = await _userRepository.getUserByUsername(_user.username);

        expect(JSON.parse(JSON.stringify(expected))).toMatchObject(_user);
    });

    it("Should return a user collection", async () => {
        users = users.map(user =>{
            delete user.password;
            return user;
        });

        mockingoose(User).toReturn(users, "find");

        const _userRepository = new UserRepository({ User });
        const expected = await _userRepository.getAll();

        expect(JSON.parse(JSON.stringify(expected))).toMatchObject(users);
    });

    it("Should update an especifici user by id", async () => {
        const _user = { ...user };
        delete _user.password;
        mockingoose(User).toReturn(_user, "findOneAndUpdate");
        const _userRepository = new UserRepository({ User });
        const expected = await _userRepository.update(user._id, {
            name: "Maat"
        });
        expect(JSON.parse(JSON.stringify(expected))).toMatchObject(_user);
    });

    it("Should delete an especifici user by id", async () => {
        mockingoose(User).toReturn(user, "findOneAndDelete");
        const _userRepository = new UserRepository({ User });
        const expected = await _userRepository.delete(user._id);
        expect(JSON.parse(JSON.stringify(expected))).toEqual({"_id": "63b0353aa7d1f60f32f921a2", "name": "Maat", "password": "MyStrongPassword", "username": "MaatUsername"});
    });


})