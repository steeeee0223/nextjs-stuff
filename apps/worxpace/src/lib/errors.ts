export class UnauthorizedError extends Error {
    constructor() {
        super("Unauthorized");
    }
}

export class NotFound extends Error {
    constructor() {
        super("Not Found");
    }
}
