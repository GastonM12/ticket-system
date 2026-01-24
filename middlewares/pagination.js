export default function pagination(model) {
  return async function (req, res, next) {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const result = {};

    try {
      result.totla = await model.countDocuments().exec();

      result.results = await model
        .find(req.filter)
        .skip(skip)
        .limit(limit)
        .exec();

      result.pages = Math.ceil(result.total / limit);
      result.currentPage = page;
      req.paginatedResult = result;
      next();
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
}
