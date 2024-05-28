export class TopicDTO {
  id?: number;
  name: string;
  desc: string;
  status: number;
  [key: string]: any;
}

export class SubscriptionTopicDTO {
  id?: number;
  user?: any | any[];
  type = 1;
  money: number;
  topic?: any | any[];
  comment: string;
  topicId: number;
}
