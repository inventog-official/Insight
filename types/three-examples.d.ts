declare module "three/examples/jsm/loaders/FontLoader" {
  import { Loader } from "three";
  export class FontLoader extends Loader {
    load(
      url: string,
      onLoad: (font: any) => void,
      onProgress?: (event: ProgressEvent) => void,
      onError?: (event: ErrorEvent) => void
    ): void;
  }
}

declare module "three/examples/jsm/geometries/TextGeometry" {
  import { BufferGeometry } from "three";
  export class TextGeometry extends BufferGeometry {
    constructor(
      text: string,
      parameters?: {
        font?: any;
        size?: number;
        height?: number;
        curveSegments?: number;
        bevelEnabled?: boolean;
        bevelThickness?: number;
        bevelSize?: number;
        bevelOffset?: number;
        bevelSegments?: number;
      }
    );
  }
}
