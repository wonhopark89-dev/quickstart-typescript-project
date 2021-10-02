const DEFAULT_NAMESPACE = 'Server';

const getTimeStamp = (): string => {
  return new Date().toISOString();
};

const info = (message: string, object?: any) => {
  if (object) {
    console.info(`[${getTimeStamp()}][${DEFAULT_NAMESPACE}] [INFO] ${message}`, object);
  } else {
    console.info(`[${getTimeStamp()}][${DEFAULT_NAMESPACE}] [INFO] ${message}`);
  }
};

const warn = (message: string, object?: any) => {
  if (object) {
    console.warn(`[${getTimeStamp()}][${DEFAULT_NAMESPACE}] [WARN] ${message}`, object);
  } else {
    console.warn(`[${getTimeStamp()}][${DEFAULT_NAMESPACE}] [WARN]] ${message}`);
  }
};

const error = (message: string, object?: any) => {
  if (object) {
    console.error(`[${getTimeStamp()}][${DEFAULT_NAMESPACE}] [ERROR] ${message}`, object);
  } else {
    console.error(`[${getTimeStamp()}][${DEFAULT_NAMESPACE}] [ERROR] ${message}`);
  }
};

const debug = (message: string, object?: any) => {
  if (object) {
    console.debug(`[${getTimeStamp()}][${DEFAULT_NAMESPACE}] [DEBUG] ${message}`, object);
  } else {
    console.debug(`[${getTimeStamp()}][${DEFAULT_NAMESPACE}] [DEBUG] ${message}`);
  }
};

export default {
  info,
  warn,
  error,
  debug
};
