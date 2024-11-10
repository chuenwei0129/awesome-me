const handlerSymbol = Symbol('HttpHandler');

interface IRequest {
  url: string;
  method: string;
  headers?: Record<string, string>;
  body?: any;
}

interface RequestHandler {
  [handlerSymbol](req: IRequest): Promise<void>;
}

class HTTPServer {
  async handleRequest(handler: RequestHandler, req: IRequest): Promise<void> {
    if (typeof handler[handlerSymbol] === 'function') {
      await handler[handlerSymbol](req);
    } else {
      throw new Error('Handler does not implement the required method.');
    }
  }
}

const myHandler: RequestHandler = {
  async [handlerSymbol](req: IRequest): Promise<void> {
    console.log('Handling request:', req);
  },
};

const server = new HTTPServer();
const request: IRequest = { url: '/example', method: 'GET' }; // Example request object
server.handleRequest(myHandler, request).catch(console.error);
