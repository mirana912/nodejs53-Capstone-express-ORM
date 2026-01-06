// src/utils/response.util.js
// ==========================================
class ResponseUtil {
  static success(res, data, message = "Success", statusCode = 200) {
    return res.status(statusCode).json({
      success: true,
      message: message,
      data: data,
    });
  }

  static error(res, message = "Error", statusCode = 400, error = null) {
    return res.status(statusCode).json({
      success: false,
      message: message,
      error: error,
    });
  }

  static created(res, data, message = "Created successfully") {
    return this.success(res, data, message, 201);
  }

  static noContent(res, message = "Deleted successfully") {
    return res.status(200).json({
      success: true,
      message: message,
    });
  }

  static unauthorized(res, message = "Unauthorized") {
    return this.error(res, message, 401);
  }

  static forbidden(res, message = "Forbidden") {
    return this.error(res, message, 403);
  }

  static notFound(res, message = "Not found") {
    return this.error(res, message, 404);
  }
}

module.exports = ResponseUtil;

// ==========================================
