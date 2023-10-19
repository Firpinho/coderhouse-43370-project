const { ProductDao } = require("../persistence/daos/factory");
const generate_product = require("../utils/product.utils")


const getAll = async (limit, page, sort, query) => {
  try {
    const queryDBFriendly = query
      ? { category: query, stock: { $gt: 0 }, status: true }
      : {};
    const sortDBFriendly = sort === "desc" ? -1 : 1;

    const response = await ProductDao.getAll(
      limit,
      page,
      sortDBFriendly,
      queryDBFriendly
    );

    if (response) response.status = true;
    else response.status = false;

    if (query) {
      query = query.replaceAll('"', "'");
      query = `&query=${query}`;
    } else query = ``;

    if (sort) {
      sort = sort.replaceAll('"', "'");
      sort = `&sort=${sort}`;
    } else sort = ``;

    const result = {
      status: response.status ? "success" : "error",
      payload: response.docs,
      totalPages: response.totalPages,
      prevPage: response.prevPage,
      nextPage: response.nextPage,
      page: response.page,
      hasPrevPage: response.hasPrevPage,
      hasNextPage: response.hasNextPage,
      prevLink: response.hasPrevPage
        ? `http://localhost:8080/api/products/?page=${response.prevPage}&limit=${limit}${query}${sort}`
        : null,
      nextLink: response.hasNextPage
        ? `http://localhost:8080/api/products/?page=${response.nextPage}&limit=${limit}${query}${sort}`
        : null,
    };

    return result;
  } catch (error) {
    return error;
  }
};

const getById = async (id) => {
  try {
    return await ProductDao.getById(id);
  } catch (error) {
    return error;
  } 
};

const create = async (obj) => {
  try {
    return await ProductDao.create(obj);
  } catch (error) {
    return error;
  }
};

const update = async (id, obj) => {
  try {
    console.log(obj);
    return await ProductDao.update(id, obj);
  } catch (error) {
    return error;
  }
};

const remove = async (id) => {
  try {
    return await ProductDao.delete(id);
  } catch (error) {
    return error;
  }
};

const productMock = async (number = 100) => {
  try {
      const products = []
      for (let index = 0; index < number; index++) {
          const product = generate_product();
          products.push(product)
      }        

      return products
  } catch (error) {
      return error
  }
}


module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  productMock
};
