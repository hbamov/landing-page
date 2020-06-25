import * as img from '../data/ImageData';
import * as ts from '../data/TextStyles';
import { applyTextStyle } from '../utils/TextStyleUtils';
import { AssetManager } from '../managers/AssetManager';
import { Margin } from '../utils/Margin';
import 'createjs';
import { FrontPage } from './FrontPage';
import { BucketModel } from '../models/BucketModel';

/*****************************************************************************/
export class BucketContainer extends createjs.Container {
  public bucketImage: createjs.Bitmap;
  public bucketHeading: createjs.Text;
  public bucketBody: createjs.Text;
  public parent: FrontPage;
  public props: BucketModel;

  constructor(parent, props: BucketModel) {
    super();
    this.parent = parent;
    this.props = props;
    this.addElements();
    this.putDefaultContent();
    this.updateSizeProperties();
  }

  //===== FUNCTIONS ======================================//
  /**
   * Instantiate elements and add them to the container.
   */
  addElements(): void {
    this.bucketImage = new createjs.Bitmap(
      this.am.getAsset(this.props.bucketImage)
    );
    this.parent.addChild(this.bucketImage);

    this.bucketHeading = new createjs.Text();
    applyTextStyle(this.bucketHeading, ts.BUCKET_HEADLINE);
    this.parent.addChild(this.bucketHeading);

    this.bucketBody = new createjs.Text();
    applyTextStyle(this.bucketBody, ts.BUCKET_BODY);
    this.parent.addChild(this.bucketBody);
  }

  /**
   * Set default content for elements.
   */
  putDefaultContent(): void {
    this.bucketImage.image = this.am.getAsset(this.props.bucketImage);
    this.bucketHeading.text = this.props.bucketHeadingText;
    this.bucketBody.text = this.props.bucketBodyText;
  }

  updateSizeProperties(): void {
    var m: Margin = this.props.margin;
    const bucketWidth: number = this.props.bucketWidth;
    const imageData: img.IImageData | null = img.getImageDataById(
      this.props.bucketImage
    );
    const imageScale: number = imageData ? bucketWidth / imageData.width : 1;

    this.bucketImage.x = m.left;
    this.bucketImage.y = 432;
    this.bucketImage.scaleX = imageScale;
    this.bucketImage.scaleY = imageScale;

    // Header
    this.bucketHeading.x = m.left;
    this.bucketHeading.y =
      this.bucketImage.y + 146 + this.props.addHeadingWidth;
    this.bucketHeading.lineWidth = bucketWidth;

    // Body
    this.bucketBody.x = m.left;
    this.bucketBody.y = this.bucketImage.y + 175 + this.props.addBodyWidth;
    this.bucketBody.lineWidth = bucketWidth;
  }

  //===== CONVENIENCE ====================================//
  private get am(): AssetManager {
    return AssetManager.instance;
  }
}
