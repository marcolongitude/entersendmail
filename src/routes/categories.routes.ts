import { Router } from "express";

import { Category } from "../model/Category";

const categoriesRoutes = Router();

const catetories: Category[] = [];

categoriesRoutes.post("/", (request, response) => {
  const { name, description } = request.body;

  const category = new Category();

  Object.assign(category, {
    name,
    description,
    created_at: new Date(),
  });

  catetories.push(category);

  return response.status(201).json({ category });
});

export { categoriesRoutes };
