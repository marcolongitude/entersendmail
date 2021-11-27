import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Email or password incorrect");
    }

    const passwordMatched = await compare(password, (await user).password);

    if (!passwordMatched) {
      throw new AppError("Email or password incorrect");
    }

    const token = sign({}, "116e6fd3e7f60540bffe0ac83d2cd81a", {
      subject: (await user).id,
      expiresIn: "1d",
    });

    return {
      user: {
        name: (await user).name,
        email: (await user).email,
      },
      token,
    };
  }
}

export { AuthenticateUserUseCase };
