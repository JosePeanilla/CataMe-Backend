const validateWineData = (req, res, next) => {
  const { name, winery, type, region, year, price, description, additionalDescription, grapeType } =
    req.body

  if (
    !name ||
    !winery ||
    !type ||
    !region ||
    !year ||
    !price ||
    !description ||
    !grapeType
  ) {
    return res.status(400).json({ error: "Missing required wine fields" })
  }

  next()
}

/*************************************************** Module export ****************************************************/
module.exports = { validateWineData }
