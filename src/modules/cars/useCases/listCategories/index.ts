// import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { ListCategoriesController } from "./ListCategoriesController";
import { ListCategoriesUsecase } from "./ListCategoriesUseCase";

// const categoriesRepository = new CategoriesRepository();
const categoriesRepository = null;
const listCategoriesUseCase = new ListCategoriesUsecase(categoriesRepository);
const listCategoriesController = new ListCategoriesController(
  listCategoriesUseCase
);

export { listCategoriesController };
