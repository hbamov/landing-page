/*****************************************************************************/
export class Margin {
  //===== VARIABLES ======================================//
  top: number;
  right: number;
  bottom: number;
  left: number;

  //===== CONSTRUCTOR ====================================//
  constructor(top, right, bottom, left) {
    this.top = top;
    this.right = right;
    this.bottom = bottom;
    this.left = left;
  }

  //===== GETTERS / SETTERS ==============================//
  /**
   * Returns the sum of the right and left margins.
   */
  get horizontal(): number {
    return this.right + this.left;
  }

  /**
   * Returns the sum of the top and bottom margins.
   */
  get vertical(): number {
    return this.top + this.bottom;
  }
}
