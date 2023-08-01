declare module "chalk" {
  interface ChalkInstance {
    [key: string]: any;
  }

  interface ChalkChain extends ChalkInstance {
    (...text: any[]): string;
  }

  interface ChalkFunction extends ChalkInstance {
    new (): ChalkChain;
  }

  const chalk: ChalkFunction;
  export = chalk;
}
