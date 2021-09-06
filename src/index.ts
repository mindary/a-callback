export type FromCallbackOptions = {multiArgs?: boolean} | boolean;
export type FnWithCb = (cb: (error?: any, ...args: any[]) => any) => any;

export function fromCallback(fn: FnWithCb, opts?: FromCallbackOptions): Promise<any> {
  const multiArgs = typeof opts === 'object' ? Boolean(opts.multiArgs) : Boolean(opts);
  return new Promise((resolve, reject) => {
    fn((error, ...args) => {
      if (error) {
        reject(error);
      } else {
        if (multiArgs) {
          resolve(args);
        } else {
          resolve(args[0]);
        }
      }
    });
  });
}

export const fromNode = fromCallback;
export const fromCb = fromCallback;
