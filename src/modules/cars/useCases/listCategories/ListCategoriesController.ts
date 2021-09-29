import { Request, Response } from "express";

import { ListCategoriesUsecase } from "./ListCategoriesUseCase";

class ListCategoriesController {
  constructor(private listCategoriesUseCase: ListCategoriesUsecase) {}
  handle(request: Request, response: Response): Response {
    const listAllCategories = this.listCategoriesUseCase.execute();

    return response.json(listAllCategories);
  }
}

export { ListCategoriesController };
