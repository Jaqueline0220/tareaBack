const validate = (schema) => async (req, res, next) => {
  try {
    await schema.parseAsync({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (err) {
    const messages = err.issues.map(
      (issue) => `${issue.path.join('.')} ${issue.message}`,
    );

    return res.status(400).json({
      status: 400,
      errors: {
        message: messages.join(', '),
      },
    });
  }
};

module.exports = { validate };
