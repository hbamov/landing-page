import * as $ from 'jquery';
import * as img from '../data/ImageData';
import * as ts from '../data/TextStyles';
import { applyTextStyle } from '../utils/TextStyleUtils';
import { AssetManager } from '../managers/AssetManager';
import { Margin } from '../utils/Margin';
import 'createjs';
import { BucketContainer } from './BucketContainer';
import { GRAY } from '../data/Colors';

/*****************************************************************************/
export class FrontPage extends createjs.Container {
  //===== VARIABLES ======================================//
  private logo: createjs.Bitmap;
  private headline: createjs.Text;
  private body: createjs.Text;
  private _width: number;
  private _height: number;
  private line: createjs.Shape;
  private stars: createjs.Bitmap[] = [];
  private bucketData: any[] = [];
  private buckets: BucketContainer[] = [];
  //===== CONSTRUCTOR ====================================//
  constructor() {
    super();
    this._width = -1;
    this._height = -1;

    this.addElements();
    this.putDefaultContent();
    $('[name=buckets]').on('change', (e: Event) => this.onBucketChange(e));
    $('[name=stars]').on('change', (e: Event) => this.onNumStarsChange(e));
  }

  //===== FUNCTIONS ======================================//
  /**
   * Instantiate elements and add them to the container.
   */
  addElements(): void {
    // Logo
    this.logo = new createjs.Bitmap(this.am.getAsset(img.LOGO.id));
    this.addChild(this.logo);

    // Headline
    this.headline = new createjs.Text();
    applyTextStyle(this.headline, ts.HEADLINE);
    this.addChild(this.headline);

    // Body
    this.body = new createjs.Text();
    applyTextStyle(this.body, ts.BODY);
    this.addChild(this.body);

    // Bucket Body
    this.setBuckets();
    // Star
    this.setStars();
    this.line = new createjs.Shape();
    this.addChild(this.line);

    // add Bucket
  }
  setStars(max: number = 4): void {
    this.stars = [];
    for (let i = 0; i < max; i++) {
      let star: createjs.Bitmap = new createjs.Bitmap(
        this.am.getAsset(img.STAR.id)
      );
      this.stars.push(star);
      this.addChild(this.stars[i]);
    }
  }
  /**
   * Set default content for elements.
   */
  putDefaultContent(): void {
    // Headline
    this.headline.text = 'Creating Lasting Partnerships';

    // Body
    this.body.text =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere est sodales est lobortis interdum. Cras a turpis ullamcorper elit dignissim mattis. Mauris dignissim aliquet est, vel vestibulum nisi fermentum vel. Fusce sit amet dolor eu tellus tincidunt pellentesque et vitae mauris. Praesent convallis magna sem. Sed vel mi nunc. In porta justo urna, ac tristique mauris lobortis et. Nam imperdiet lacinia augue eu vehicula. Duis nec consequat libero. Aenean et sapien volutpat, ultricies ante sit amet, ornare leo. Proin orci felis, lacinia ac commodo vitae, suscipit eget ipsum. Sed egestas justo non dolor molestie, eu iaculis enim lobortis. Suspendisse id ipsum vel lectus luctus viverra. Donec quam neque, fringilla quis justo sagittis, malesuada vestibulum leo. Nam eget lorem at elit vestibulum molestie nec quis est.';
  }

  /**
   * Size and position elements and update the CreateJS stage.
   * This should be called whenever the layout changes.
   */
  updateSizeProperties(): void {
    // Margin
    var m: Margin = new Margin(48, 36, 60, 36);

    // Logo
    const logoWidth: number = 80;
    const logoScale: number = logoWidth / img.LOGO.width;

    this.logo.x = this.width - logoWidth - 90;
    this.logo.y = 48;
    this.logo.scaleX = logoScale;
    this.logo.scaleY = logoScale;

    // Headline
    this.headline.x = m.left;
    this.headline.y = 113;
    this.headline.lineWidth = this.width - m.horizontal;

    // Body
    this.body.x = m.left;
    this.body.y = 162;
    this.body.lineWidth = this.width - m.horizontal;

    // Star
    for (let i = 0; i < this.stars.length; i++) {
      // this.stars[i].x = this.width - i * 43 - 80;
      this.stars[i].x = this.width - i * 43 - 72;
      this.stars[i].y = this.height - img.STAR.height - 60;
    }
    this.line.graphics.beginFill(GRAY.hex).drawRect(0, 0, 300, 1);
    this.line.x = 200;
    this.line.y = 380;
    // Update Stage
    if (this.stage) {
      this.stage.update();
    }
  }

  //===== EVENT LISTENERS ================================//
  private onBucketChange(e: any) {
    const MINIMUM_BUCKETS_COUNT = 2;
    const MAXIMUM_BUCKETS_COUNT = 3;

    this.buckets.forEach(bucket => {
      this.removeChild(
        bucket.bucketImage,
        bucket.bucketBody,
        bucket.bucketHeading
      );
    });
    this.buckets = [];

    let bucketCount = 0;
    switch(true) {
      case e.target.value > 3:
        $('input[name="buckets"]').val(MAXIMUM_BUCKETS_COUNT);
        bucketCount = MAXIMUM_BUCKETS_COUNT;
        break;
      case e.target.value < 2:
        $('input[name="buckets"]').val(MINIMUM_BUCKETS_COUNT);
        bucketCount = MINIMUM_BUCKETS_COUNT;
        break;
      default:
        bucketCount = parseInt(e.target.value);
    }

    this.setBuckets(
        bucketCount,
      570 / parseInt(e.target.value),
      parseInt(e.target.value) === 2 ? 50 : 0,
      parseInt(e.target.value) === 2 ? 70 : 0
    );
    this.updateSizeProperties();
  }

  private setBuckets(
    count: number = 3,
    bucketWidth: number = 190,
    addHeadingWidth: number = 0,
    addBodyWidth: number = 0
  ) {
    this.bucketData = [];
    this.bucketData.push(
      {
        bucketBodyText:
          'Nunc posuere nibh sed urna posuere rutrum. Ut eu turpis id arcu consequat sagittis. ' +
            'Pellentesque at purus velit. Suspendisse sit amet massa augue. In sit amet arcu ac ' +
            'quam sagittis ornare sit amet ac elit. Donec tempus eu nulla ac pretium. Vivamus ' +
            'laoreet finibus leo. Donec ut massa aliquam, tincidunt nulla ut, mollis nibh.',
        bucketHeadingText: 'CONSULTING',
        bucketImage: img.IMAGE_0.id,
        margin: new Margin(48, 36, 60, count === 3 ? 36 : 45),
        bucketWidth
      },
      {
        bucketBodyText:
          'Vivamus condimentum nulla at ipsum dapibus, sed ullamcorper massa ultricies. ' +
            'Morbi ornare diam non lectus interdum, id blandit arcu tincidunt. ' +
            'Maecenas sit amet interdum ante, eget dignissim magna. Integer luctus vitae felis' +
            'sit amet venenatis. Maecenas sed porttitor massa, facilisis gravida nisi.',
        bucketHeadingText: 'PRODUCTION',
        bucketImage: img.IMAGE_1.id,
        margin: new Margin(48, 36, 60, count === 3 ? 245 : 345),
        bucketWidth
      },
      {
        bucketBodyText:
          'Cras tristique magna ex, ac eleifend nulla sodales ac. Fusce vitae semper urna. ' +
            'Donec risus neque, aliquam quis dignissim vel, vestibulum eu lorem.' +
            'Nunc ac enim fermentum, auctor leo eu, ullamcorper felis.' +
            'Ut tristique dolor dignissim consequat accumsan. Aliquam suscipit consequat aliquam.',
        bucketHeadingText: 'SUPPORT',
        bucketImage: img.IMAGE_2.id,
        margin: new Margin(48, 36, 60, 452),
        bucketWidth
      }
    );

    for (let i = 0; i < count; i++) {
      let buck = new BucketContainer(this, {
        bucketBodyText: this.bucketData[i].bucketBodyText,
        bucketHeadingText: this.bucketData[i].bucketHeadingText,
        bucketImage: this.bucketData[i].bucketImage,
        margin: this.bucketData[i].margin,
        bucketWidth: this.bucketData[i].bucketWidth,
        addBodyWidth: addBodyWidth,
        addHeadingWidth: addHeadingWidth
      });
      this.buckets.push(buck);
    }
  }
  private onNumStarsChange(e: any) {
    const MINIMUM_STARS_COUNT = 1;
    const MAXIMUM_STARS_COUNT = 4;

    this.stars.forEach(star => {
      this.removeChild(star);
    });

    switch(true) {
      case e.target.value > 4:
        $('input[name="stars"]').val(MAXIMUM_STARS_COUNT);
        this.setStars(MAXIMUM_STARS_COUNT);
        break;
      case e.target.value < 1:
        $('input[name="stars"]').val(MINIMUM_STARS_COUNT);
        this.setStars(MINIMUM_STARS_COUNT);
        break;
      default:
        this.setStars(e.target.value);
    }

    this.updateSizeProperties();
  }

  //===== GETTERS / SETTERS ==============================//
  get width(): number {
    return this._width;
  }
  set width(value: number) {
    this._width = value;
    this.updateSizeProperties();
  }

  get height(): number {
    return this._height;
  }
  set height(value: number) {
    this._height = value;
    this.updateSizeProperties();
  }

  //===== CONVENIENCE ====================================//
  private get am(): AssetManager {
    return AssetManager.instance;
  }
}
