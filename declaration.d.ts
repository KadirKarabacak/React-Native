// Fix TypeScript error of icons.ts imports
declare module "*.png" {
    const value: any;
    export default value;
}
