export const mockConsole = () => {
    // @ts-ignore
    global.console = {
        log: (msg: string) => msg,
        warn: (msg: string) => msg,
        error: (msg: string) => msg,
        debug: (msg: string) => msg,
    }

    return {
        log: jest.spyOn(global.console, 'log'),
        warn: jest.spyOn(global.console, 'warn'),
        error: jest.spyOn(global.console, 'error'),
        debug: jest.spyOn(global.console, 'debug'),
    }
}