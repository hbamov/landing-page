import { ITextStyle } from '../data/TextStyles';
import 'createjs';

/*****************************************************************************/
export function applyTextStyle(text: createjs.Text, style: ITextStyle): void {
  text.color = style.color;
  text.font = style.font;
  text.lineHeight = style.lineHeight;

  if (style.textAlign) text.textAlign = style.textAlign;
}
