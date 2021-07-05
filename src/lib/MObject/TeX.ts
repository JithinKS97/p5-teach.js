import TeXToSVG from 'tex-to-svg';
import { TexObject } from '../interfaces';
import { add } from '../Scene/add';
import { play } from '../Scene/play';

//TODO : add test cases

/**
 * TeX class
 *
 * @param    {String} - escaped TeX input
 * @param    {number} - x
 * @param    {number} - y
 * @param    {number} - width
 * @param    {number} - height
 *
 * @example
 *
 * example for playing animation of type 'appear' for TeX object:
 * ```js
 * let tex_1 = new TeX(
 *  '\\ce{Hg^2+ ->[I-] HgI2 ->[I-] [Hg^{II}I4]^2-}\\overrightarrow{F}_{12} = k_e \\frac{q_1 q_2}{r^2}',
 *   200,
 *   300,
 *   200,
 *   100
 * );
 * ```
 * @experimental
 */
export class TeX {
  writeTexElement!: p5.Element;
  svgEquation: string | undefined;
  //startTime: number; // left for later decision -> need not specify such details at initialisation
  x: number = 10;
  y: number = 10;
  svgWidth: number;
  svgHeight: number;
  _tex: string;
  fillColor: p5.Color;
  strokeWidth: number;
  strokeColor: p5.Color;
  constructor({
    _tex,
    x = 10,
    y = 10,
    svgWidth = 300,
    svgHeight = 300
  }: TexObject) {
    this.x = x;
    this.y = y;
    this._tex = _tex;
    this.svgWidth = svgWidth;
    this.svgHeight = svgHeight;
    this.svgEquation = TeXToSVG(_tex);
    this.fillColor = color('black');
    this.strokeWidth = 0;
    this.strokeColor = color('black');
  }

  position(x: number = 10, y: number = 10) {
    if (arguments.length === 0) {
      return [this.x, this.y];
    } else {
      this.x = x;
      this.y = y;
    }
  }

  size(svgWidth: number = 300, svgHeight: number = 300) {
    if (arguments.length === 0) {
      return [this.svgWidth, this.svgHeight];
    } else {
      this.svgWidth = svgWidth;
      this.svgHeight = svgHeight;
    }
  }

  fill(fillColor: p5.Color = color('black')) {
    if (arguments.length === 0) {
      return this.fillColor;
    } else {
      this.fillColor = fillColor;
    }
  }
  scale(scaleFactor) {
    this.writeTexElement.style('transform', `scale(${scaleFactor})`);
  }
  remove() {
    //TODO : should throw error if called on object which has not been added
    this.writeTexElement.remove();
  }

  add() {
    add(this);
    //this.writeTexElement.style('opacity', '1');
  }

  play(
    animationType: string = 'write',
    startTime: number = 0,
    endTime: number = 0
  ) {
    play(this, animationType, startTime, endTime);
  }
}

export function createTeX(...args: any[]) {
  const _texArg: TexObject = {
    _tex: args[0],
    x: args[1],
    y: args[2],
    svgWidth: args[3],
    svgHeight: args[4]
  };
  if (
    !(
      typeof _texArg.svgWidth == 'undefined' ||
      typeof _texArg.svgWidth == 'number'
    )
  ) {
    //size
    throw new Error('size must be passed as number');
  } else if (
    !(typeof _texArg.svgWidth == 'undefined') &&
    _texArg.svgWidth < 0
  ) {
    //size
    throw new Error('width of tex should be greater than zero!');
  }

  if (
    !(
      typeof _texArg.svgHeight == 'undefined' ||
      typeof _texArg.svgHeight == 'number'
    )
  ) {
    //size
    throw new Error('size must be passed as number');
  } else if (
    !(typeof _texArg.svgHeight == 'undefined') &&
    _texArg.svgHeight < 0
  ) {
    //size
    throw new Error('height of tex should be greater than zero!');
  }
  return new TeX(_texArg);
}
