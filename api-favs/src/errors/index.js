class HttpException extends Error {
  constructor(status, message, scope) {
    super(message);
    this.status = status;
    this.message = message;
    this.scope = scope;
  }
}

class BadRequestException extends HttpException {
  constructor(message, scope) {
    super(400, message, scope);
  }
}

class UnauthorizedException extends HttpException {
  constructor(message, scope) {
    super(401, message, scope);
  }
}

class NotFoundException extends HttpException {
  constructor(message, scope) {
    super(404, message, scope);
  }
}

module.exports = {
  HttpException,
  BadRequestException,
  UnauthorizedException,
  NotFoundException,
};
