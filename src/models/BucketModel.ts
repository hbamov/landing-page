import { Margin } from '../utils/Margin';

export interface BucketModel {
  bucketImage: any;
  bucketHeadingText: string;
  bucketBodyText: string;
  margin: Margin;
  bucketWidth?: number;
  addBodyWidth: number;
  addHeadingWidth: number;
}
