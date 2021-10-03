const getTimeStamp = (): string => {
  return new Date().toISOString();
};

const info = (namespace: string, message: string, object?: any) => {
  console.info(`${getTimeStamp()} [INFO] [${namespace}] [${message}], ${(object ??= '')}`);
};

const debug = (namespace: string, message: string, object?: any) => {
  console.debug(`${getTimeStamp()} [DEBUG] [${namespace}] [${message}], ${(object ??= '')}`);
};

const warn = (namespace: string, message: string, object?: any) => {
  console.warn(`${getTimeStamp()} [WARN] [${namespace}] [${message}], ${(object ??= '')}`);
};

const error = (namespace: string, message: string, object?: any) => {
  console.error(`${getTimeStamp()} [ERROR] [${namespace}] [${message}], ${(object ??= '')}`);
};

export default {
  info,
  debug,
  warn,
  error,
};
