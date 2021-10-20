import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListCategoriesUsecase } from "./ListCategoriesUseCase";

class ListCategoriesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listCategoriesUseCase = container.resolve(ListCategoriesUsecase);

    const listAllCategories = await listCategoriesUseCase.execute();

    return response.json(listAllCategories);
  }
}

export { ListCategoriesController };
